import { injectable, inject } from 'tsyringe'
import { User } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { UserDataModel, UserDataModelBuilder } from "./UserData";

@injectable()
export class UserGetAllService {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async execute() :Promise<undefined|UserDataModel[]>{
        const users = await this.userRepository.getAll()
        if (users === undefined) {
            return undefined
        }
        return users.map((user:User)=>{
            const userDataModelBuilder=new UserDataModelBuilder()
            user.notify(userDataModelBuilder)
            const userDataModel=userDataModelBuilder.Build()
            return userDataModel
        })

    }
}