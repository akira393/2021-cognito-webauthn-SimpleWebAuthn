import { User, UserName } from "../model/User";
import { IUserRepository } from "../repository-interface/user-repository";


export class UserService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    /*同じユーザ名を探す */
    async Exist(user: User): Promise<boolean> {
        const name=UserName.create(user.name)
        const duplicatedUser = await this.userRepository.findByName(name)
        console.log({duplicatedUser})
        return duplicatedUser!==undefined
    }
}

