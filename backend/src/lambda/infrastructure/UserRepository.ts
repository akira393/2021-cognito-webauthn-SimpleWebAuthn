import { injectable } from 'tsyringe'
import { User, UserId, UserMailAddress, UserName } from "../domains/model/User";
import { IUserRepository } from "../domains/repositoryInterface/IUserRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { UserDataModelBuilder } from "../applicationService/Users/UserData";


const TABLE_NAME = process.env.TABLE_NAME || "userTable";
const INDEX_TABLE_NAME = process.env.TABLE_NAME || "userTable-Index";

@injectable()
export default class UserRepository implements IUserRepository {
    private client: DocumentClient
    constructor() {

        this.client = new DocumentClient({
            endpoint: "http://172.18.0.2:8000"
        })
    }
    async getAll() {
        const params = {
            TableName: TABLE_NAME
        }
        const result = await this.client.scan(params).promise()

        return result.Items?.map((user) => {
            return new User({
                id: UserId.create(user.user_id),
                name: UserName.create(user.user_name),
                mailAddress: UserMailAddress.create(user.user_mailaddress)
            })

        })
    }
    async findById(id: UserId) {
        const params: DocumentClient.GetItemInput = {
            TableName: TABLE_NAME,
            Key: {
                user_id: id.value
            }
        };
        const result = await this.client.get(params).promise()
        if (!result.Item) {
            return undefined
        }
        return new User({
            id: UserId.create(result.Item.user_id),
            name: UserName.create(result.Item.user_name),
            mailAddress: UserMailAddress.create(result.Item.user_mailaddress)
        })
    }
    async findByName(name: UserName) {
        const params = {
            TableName: TABLE_NAME,
            IndexName: INDEX_TABLE_NAME,
            ExpressionAttributeNames: { '#user_name': 'user_name' },
            ExpressionAttributeValues: { ':val': name.value },
            KeyConditionExpression: '#user_name = :val'//検索対象が満たすべき条件を指定
        };
        const result = await this.client.query(params).promise()

        return result.Items?.map((u) => {
            const user= new User({
                id: UserId.create(u.user_id),
                name: UserName.create(u.user_name),
                mailAddress: UserMailAddress.create(u.user_mailaddress),
            })
            return user
        })[0]
    }

    async save(user: User) {
        const userDataModelBuilder = new UserDataModelBuilder()
        user.notify(userDataModelBuilder)
        const userDataModel = userDataModelBuilder.Build()

        const result = await this.findById(user.id)
        // ユーザがいた場合は、update。いない場合はput
        if (result) {
            const params: DocumentClient.UpdateItemInput = {
                TableName: TABLE_NAME,
                Key: {
                    user_id: userDataModel.id
                },
                UpdateExpression: "set user_name=:name,user_mailaddress=:mail",
                ExpressionAttributeValues: {
                    ":name": userDataModel.name,
                    ":mail": userDataModel.mailAddress

                }
            }
            await this.client.update(params).promise()
        } else {
            const params: DocumentClient.PutItemInput = {
                TableName: TABLE_NAME,
                Item: {
                    user_id: userDataModel.id,
                    user_name: userDataModel.name,
                    user_mailaddress: userDataModel.mailAddress
                }
            }
            await this.client.put(params).promise()
        }
    }


    async delete(user: User): Promise<void> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: TABLE_NAME,
            Key: {
                "user_id": user.id.value
            }
        }
        await this.client.delete(params).promise()
    }

}