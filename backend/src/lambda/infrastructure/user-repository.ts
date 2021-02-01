import { User } from "../domains/model/User";
import { IUserRepository } from "../domains/repository-interface/user-repository";

export default class UserRepository implements IUserRepository{
    async getById(id:number){

        // return User.create({
        //     id:1,
        //     name:"test"
        // })
        return undefined
    }
    async save(user:User){
        console.log("save")
    }

}