import { User, UserId, UserName } from "../model/User";

export abstract class IUserRepository {
    findById:(id:UserId)=>Promise<User|undefined>
    findByName:(name:UserName)=>Promise<User|undefined>
    save:(user:User)=>Promise<void>
    delete:(user:User)=>Promise<void>
    getAll:()=>Promise<User[]|undefined>
}