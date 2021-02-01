import { User } from "../model/User";

export abstract class IUserRepository {
    save:(user:User)=>Promise<void>
    getById:(id:number)=>Promise<User|undefined>

}