interface UserDeleteCommandProps {
    id: string
    // name: string | undefined
    // maillAdress: string | undefined
}

export class UserDeleteCommand {
    _id: string
    // _name?: string
    // _maillAdress?: string
    constructor(props: UserDeleteCommandProps) {
        this._id = props.id
        // this._name = props.name
        // this._maillAdress = props.maillAdress
    }
    get id(): string {
        return this._id
    }
    // get name(): string | undefined {
    //     return this._name
    // }
    // get maillAdress(): string | undefined {
    //     return this._maillAdress
    // }

}