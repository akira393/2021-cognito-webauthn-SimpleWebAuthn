import { IUserNotification } from '../notificationInterface/IUserNotification'
import { PrimitiveValueObject } from './base'

export class UserId extends PrimitiveValueObject<string>{
    static create(value: string): UserId {
        if (!(value.length > 0)) {
            throw new Error('idは1以上を指定してください')
        }
        if (!(value.length <= 100)) {
            throw new Error('idは100以下を指定してください')
        }
        return new UserId(value)
    }
}

export class UserName extends PrimitiveValueObject<string> {
    static create(value: string): UserName {
        if (!(value.length > 0)) {
            throw new Error('nameは1文字以上を指定してください');
        }
        if (!(value.length <= 20)) {
            throw new Error('nameは20文字以内を指定してください');
        }
        return new UserName(value);
    }
}

export class UserMailAddress extends PrimitiveValueObject<string> {
    static create(value: string): UserMailAddress {
        if (!(value.length > 0)) {
            throw new Error('mailは1文字以上を指定してください');
        }
        if (!(value.length <= 20)) {
            throw new Error('mailは20文字以内を指定してください');
        }
        return new UserMailAddress(value);
    }
}

interface UserProps {
    id: UserId;
    name: UserName;
    mailAddress:UserMailAddress
}

export class User {
    id:UserId
    private name:UserName
    private mailAddress:UserMailAddress

    constructor(props: UserProps) {
        this.id=props.id
        this.name=props.name
        this.mailAddress=props.mailAddress
    }

    equals(other: User) {
        return this.id === other.id
    }
    changeName(newUserName:UserName){
        this.name=newUserName

    }
    changeMailAddress(newUserMaillAdress:UserMailAddress){
        this.mailAddress=newUserMaillAdress
    }
    //通知オブジェクト
    notify(note:IUserNotification){
        note.id(this.id)
        note.name(this.name)
        note.mailAddress(this.mailAddress)
    }
}
