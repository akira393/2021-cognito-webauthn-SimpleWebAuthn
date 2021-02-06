import { ValueObject } from './base'
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

export class UserMaillAdress extends PrimitiveValueObject<string> {
    static create(value: string): UserMaillAdress {
        if (!(value.length > 0)) {
            throw new Error('mailは1文字以上を指定してください');
        }
        if (!(value.length <= 20)) {
            throw new Error('mailは20文字以内を指定してください');
        }
        return new UserMaillAdress(value);
    }
}

interface UserProps {
    id: UserId;
    name: UserName;
    maillAdress:UserMaillAdress
}

export class User {
    _value: any;

    constructor(value: UserProps) {
        this._value = value;
    }

    static create(props: UserProps): User {
        return new User(props);
    }
    check(other: User): boolean {
        return this._value.id.value === other._value.id.value
    }
    get name(): string {
        return this._value.name.value;
    }
    get id(): string {
        return this._value.id.value;
    }
    get maillAdress(): string {
        return this._value.maillAdress.value;
    }
    equals(other: User) {
        return this._value.id.value === other.id
    }
    changeName(newUserName:UserName){
        this._value.name=newUserName

    }
    changeMaillAdress(newUserMaillAdress:UserMaillAdress){
        this._value.maillAdress=newUserMaillAdress
    }
}

// interface UserArgs {
//     id: number;
//     name: string;
// }


// export class User extends ValueObject<UserProps> {
//     static create(args: UserArgs): User {
//         return new User({
//             id: UserId.create(args.id),
//             name: UserName.create(args.name),
//         });
//     }

//     get name(): string {
//         return this._value.name.value;
//     }
//     get id(): number {
//         return this._value.id.value;
//     }
//     equals(other:User){
//         console.log("o-ba-ro-do",this._value.id.value===other.id)
//         return this._value.id.value===other.id
//     }
// }




// interface UserProps {
//     id: number;
//     name: string;
// }

// class User extends ValueObject<UserProps> {
//     static create(props: UserProps): User {
//         if (!(props.id > 0)) {
//             throw new Error('idは1以上を指定してください');
//         }
//         if (!(props.name.length > 0)) {
//             throw new Error('nameは1文字以上指定してください');
//         }
//         return new User(props);
//     }
// }
