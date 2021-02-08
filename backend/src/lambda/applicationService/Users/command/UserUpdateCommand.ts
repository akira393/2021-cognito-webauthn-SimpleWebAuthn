interface UserUpdateCommandProps {
    id: string
    name: string | undefined
    mailAddress: string | undefined
}

export class UserUpdateCommand{
    public id: string
    public name?: string
    public mailAddress?: string
    constructor(props: UserUpdateCommandProps) {
        if (props.id===undefined){
            throw new Error("bud request")
        }
        if (props.name===undefined&& props.mailAddress===undefined){
            throw new Error("bud request")
        }

        this.id = props.id
        this.name = props.name
        this.mailAddress = props.mailAddress
    }

}