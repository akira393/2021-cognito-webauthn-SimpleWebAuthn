import { inject, injectable } from "tsyringe";
import { UserDataModelBuilder } from "../../applicationService/Users/UserData";
import { User, UserName } from "../model/User";
import { IUserRepository } from "../repositoryInterface/IUserRepository";

@injectable()
export class UserService {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}



    async Exist(user: User): Promise<boolean> {
        const userDataModelBuilder=new UserDataModelBuilder()
        user.notify(userDataModelBuilder)
        const userDataModel=userDataModelBuilder.Build()

        const name=UserName.create(userDataModel.name)
        const duplicatedUser = await this.userRepository.findByName(name)
        return duplicatedUser!==undefined
    }
}

