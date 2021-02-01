import { User } from "../domains/model/User";
import { IUserRepository } from "../domains/repository-interface/user-repository";

let userList:User[]=new Array()
export default class UserRepository implements IUserRepository{
    async getById(id:number){
        userList.push(User.create({id:id,name:"aki"}))
        console.log(userList)
    return userList.find((user)=>{
            return user.id===id
        })
    }
    async save(user:User){
        userList.push(user)
        console.log(`${user} is saved`)
    }

}