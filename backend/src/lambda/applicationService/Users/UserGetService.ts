import {UserDataModel, UserDataModelBuilder} from "./UserData"
import { UserId } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";

export class UserGetService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    //dtoに差し替えて、userデータを返却
    async execute(id: string) :Promise<undefined|UserDataModel>{
        const targetId = UserId.create(id)
        const user = await this.userRepository.findById(targetId)
        if (user === undefined) {
            return undefined
        }
        const userDataModelBuilder=new UserDataModelBuilder()
        user.notify(userDataModelBuilder)
        const userDataModel=userDataModelBuilder.Build()

        return userDataModel
    }
}