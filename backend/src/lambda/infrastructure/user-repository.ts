import { User, UserId, UserMaillAdress, UserName } from "../domains/model/User";
import { IUserRepository } from "../domains/repository-interface/user-repository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || "userTable";
const INDEX_TABLE_NAME = process.env.TABLE_NAME || "userTable-Index";

export default class UserRepository implements IUserRepository {
    private client: DocumentClient
    constructor() {

        this.client = new DocumentClient({
            region: "ap-northeast-1",
            endpoint: "http://172.26.0.1:8000"
        })
    }
    async getAll() {
        const params = {
            TableName: TABLE_NAME
        }
        const result = await this.client.scan(params).promise()

        return result.Items?.map((u) => {
            u.user_id.toString()
            return User.create({
                id: UserId.create(u.user_id.toString()),
                name: UserName.create(u.user_name.toString()),
                maillAdress: UserMaillAdress.create(u.user_mailaddress.toString()),
            })
        })
    }
    async findById(id: UserId) {
        console.log(id.value)
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
        return User.create({
            id: UserId.create(result.Item.user_id),
            name: UserName.create(result.Item.user_name),
            maillAdress: UserMaillAdress.create(result.Item.user_mailaddress)
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
            u.user_id.toString()
            return User.create({
                id: UserId.create(u.user_id.toString()),
                name: UserName.create(u.user_name.toString()),
                maillAdress: UserMaillAdress.create(u.user_mailaddress.toString()),
            })
        })[0]
    }

    async save(newuser: User) {
        const userId=UserId.create(newuser.id)
        const olduser=await this.findById(userId)
        if (olduser){
            if (olduser.name!==newuser.name){
                const params: DocumentClient.UpdateItemInput = {
                    TableName: TABLE_NAME,
                    Key:{
                        user_id:userId.value
                    },
                    UpdateExpression:"set user_name=:name",
                    ExpressionAttributeValues:{
                        ":name":newuser.name.toString()
                    }
                }
                await this.client.update(params).promise()
            }
            if (olduser.maillAdress!==newuser.maillAdress){
                const params: DocumentClient.UpdateItemInput = {
                    TableName: TABLE_NAME,
                    Key:{
                        user_id:userId.value
                    },
                    UpdateExpression:"set user_mailaddress=:mail",
                    ExpressionAttributeValues:{
                        ":mail":newuser.maillAdress.toString()
                    }
                }
                await this.client.update(params).promise()
            }
        }else{
            const params: DocumentClient.PutItemInput = {
                TableName: TABLE_NAME,
                Item: {
                    user_id: newuser.id.toString(),
                    user_name: newuser.name.toString(),
                    user_mailaddress: newuser.maillAdress.toString()
                }
            }
            await this.client.put(params).promise()
        }


    }


    async delete(user: User): Promise<void> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: TABLE_NAME,
            Key: {
                "user_id": user.id
            }
        }
        await this.client.delete(params).promise()
    }

}