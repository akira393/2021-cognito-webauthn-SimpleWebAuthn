import { User } from "../domains/model/User";
import { IUserRepository } from "../domains/repository-interface/user-repository";
import { UserService } from "../domains/service/User";


export class CreateUser{
    private userRepository:IUserRepository

    constructor(userRepository:IUserRepository){
        this.userRepository=userRepository
    }

    async execute(id:number,name:string){
        let user=User.create({
            id:id,
            name:name
        })
        const userService=new UserService(this.userRepository)
        if (!await userService.checkUser(user)){
            throw new Error(`${user.name}はすでに存在しています`)
        }
        return this.userRepository.save(user)
    }
}