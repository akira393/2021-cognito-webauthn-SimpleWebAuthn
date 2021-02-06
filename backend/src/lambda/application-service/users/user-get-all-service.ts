import { User } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repository-interface/user-repository";
import { UserData } from "../../domains/model/UserData";

export class UserGetAllService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    //dtoに差し替えて、userデータを返却
    async execute() :Promise<undefined|UserData[]>{
        const users = await this.userRepository.getAll()
        if (users === undefined) {
            return undefined
        }
        return users.map((user:User)=>{
            return new UserData(user)
        })

    }
}