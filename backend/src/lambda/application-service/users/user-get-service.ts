import { UserId } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repository-interface/user-repository";
import { UserData } from "../../domains/model/UserData";

export class UserGetService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    //dtoに差し替えて、userデータを返却
    async execute(id: string) :Promise<undefined|UserData>{
        const targetId = UserId.create(id)
        const user = await this.userRepository.findById(targetId)
        if (user === undefined) {
            return undefined
        }
        const userData = new UserData(user)
        return userData
    }
}