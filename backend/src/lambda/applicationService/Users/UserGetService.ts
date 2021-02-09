import {UserDataModel, UserDataModelBuilder} from "./UserData"
import { UserId } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { inject, injectable } from "tsyringe";
import {UserNotFoundException} from "./user-error"

@injectable()
export class UserGetService {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
    //dtoに差し替えて、userデータを返却
    async execute(id: string) :Promise<undefined|UserDataModel>{
        const targetId = UserId.create(id)
        const user = await this.userRepository.findById(targetId)
        if (user === undefined) {
            throw new UserNotFoundException("見つかりませんでした。")
        }
        const userDataModelBuilder=new UserDataModelBuilder()
        user.notify(userDataModelBuilder)
        const userDataModel=userDataModelBuilder.Build()

        return userDataModel
    }
}