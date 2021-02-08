import { User } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { UserDataModel, UserDataModelBuilder } from "./UserData";

export class UserGetAllService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    //dtoに差し替えて、userデータを返却
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