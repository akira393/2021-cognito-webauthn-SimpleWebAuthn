import { User } from "../model/User";
import { IUserRepository } from "../repository-interface/user-repository";


export class UserService{
    private userRepository:IUserRepository

    constructor(userRepository:IUserRepository){
        this.userRepository=userRepository
    }

    async checkUser(user:User):Promise<boolean>{
        const result =await this.userRepository.getById(user.id)
        // return result.equals(user)
        return result!==undefined
    }


}

