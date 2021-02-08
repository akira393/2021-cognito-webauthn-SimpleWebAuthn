import { UserId, UserMailAddress, UserName } from "../model/User";

export abstract class IUserNotification{
    id:(id:UserId)=>void
    name:(name:UserName)=>void
    mailAddress:(mailAddress:UserMailAddress)=>void
}