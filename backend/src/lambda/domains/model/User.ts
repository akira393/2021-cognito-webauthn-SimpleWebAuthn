import { ValueObject } from './base'
import {PrimitiveValueObject} from './base'

class UserId extends PrimitiveValueObject<number>{
    static create(value: number): UserId {
        if (!(value > 0)) {
            throw new Error('idは1以上を指定してください')
        }
        return new UserId(value)
    }
}

class UserName extends PrimitiveValueObject<string> {
    static create(value: string): UserName {
        if (!(value.length > 0)) {
            throw new Error('nameは1文字以上指定してください');
        }
        return new UserName(value);
    }
}
interface UserProps {
    id: UserId;
    name: UserName;
}

interface UserArgs {
    id: number;
    name: string;
}


export class User extends ValueObject<UserProps> {
    static create(args: UserArgs): User {
        return new User({
            id: UserId.create(args.id),
            name: UserName.create(args.name),
        });
    }

    get name(): string {
        return this._value.name.value;
    }
    get id(): number {
        return this._value.id.value;
    }
    equals(other:User){
        console.log("o-ba-ro-do",this._value.id.value===other.id)
        return this._value.id.value===other.id
    }
}



// interface UserProps {
//     id: UserId;
//     name: UserName;
// }

// export class User extends ValueObject<UserProps> {
//     static create(props: UserProps): User {
//         return new User(props);
//     }
//     check(other:User):boolean{
//         return this.equals(other)
//     }

//     // get name(): string {
//     //     return this._value.name.value;
//     // }
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
