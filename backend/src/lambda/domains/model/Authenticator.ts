import { ValueObject, PrimitiveValueObject } from './base'

class AuthenticatorName extends PrimitiveValueObject<string>{
    static create(value: string): AuthenticatorName {
        if (!(value.length >= 3)) {
            throw new Error('nameは3以上を指定してください')
        }
        return new AuthenticatorName(value)
    }
}

class PublicKey extends PrimitiveValueObject<string>{
    static create(value: string): PublicKey {
        if (!(value.length > 0)) {
            throw new Error('keyは0文字以上')
        }
        return new PublicKey(value)
    }
}

interface AuthenticatorProps {
    name: AuthenticatorName;
    key:PublicKey
}

interface AuthenticatorArgs {
    name: string;
    key: string
}

export class Authenticator extends ValueObject<AuthenticatorProps> {
    static create(args: AuthenticatorArgs): Authenticator {
        return new Authenticator({
            name: AuthenticatorName.create(args.name),
            key: PublicKey.create(args.key)
        });
    }
    // get name(): string {
    //     return this._value.name.value;
    // }
}