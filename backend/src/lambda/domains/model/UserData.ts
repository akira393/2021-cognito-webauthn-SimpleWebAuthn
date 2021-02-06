import { User } from "./User";

export class UserData{
    _id:string
    _name:string
    _maillAdress:string

    constructor(source:User|undefined){
        if (source===undefined){
            throw new Error("userData is undefined")
        }
        this._id=source.id
        this._name=source.name
        this._maillAdress=source.maillAdress
    }
    get id():string{
        return this._id
    }
    get name():string{
        return this._name
    }
    get maillAdress():string{
        return this._maillAdress
    }
}