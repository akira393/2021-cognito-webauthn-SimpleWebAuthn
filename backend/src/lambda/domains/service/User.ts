import { UserDataModelBuilder } from "../../applicationService/Users/UserData";
import { User, UserName } from "../model/User";
import { IUserRepository } from "../repositoryInterface/IUserRepository";


export class UserService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }


    async Exist(user: User): Promise<boolean> {
        const userDataModelBuilder=new UserDataModelBuilder()
        user.notify(userDataModelBuilder)
        const userDataModel=userDataModelBuilder.Build()

        const name=UserName.create(userDataModel.name)
        const duplicatedUser = await this.userRepository.findByName(name)
        return duplicatedUser!==undefined
    }
}

