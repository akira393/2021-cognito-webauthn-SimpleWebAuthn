import { UserId, UserMailAddress, UserName } from "../../domains/model/User"
import { IUserNotification } from "../../domains/notificationInterface/IUserNotification"

interface IUserDataModel {
    id: string
    name: string
    mailAddress: string
}


export class UserDataModel {
    public id: string
    public name: string
    public mailAddress: string

    constructor(source: IUserDataModel) {
        this.id = source.id
        this.name = source.name
        this.mailAddress = source.mailAddress
    }

}

export class UserDataModelBuilder implements IUserNotification {
    private userId: UserId
    private userName: UserName
    private userMailAddress: UserMailAddress

    public name(name: UserName) {
        this.userName = name
    }
    public id(id: UserId) {
        this.userId = id
    }
    public mailAddress(mailAddress: UserMailAddress) {
        this.userMailAddress = mailAddress
    }
    public Build() {
        return new UserDataModel({
            id: this.userId.value,
            name: this.userName.value,
            mailAddress: this.userMailAddress.value,
        })
    }

}