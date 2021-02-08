interface UserDeleteCommandProps {
    id: string
}

export class UserDeleteCommand {
    id: string
    constructor(props: UserDeleteCommandProps) {
        if(props.id===undefined){
            throw new Error("bud request")
        }
        this.id = props.id
    }
}