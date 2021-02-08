import { UserId, UserMailAddress, UserName } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { UserService } from "../../domains/service/User";
import { UserUpdateCommand } from "./command/UserUpdateCommand";
import { UserNotFoundException,CanNotRegisterUserException} from "./user-error"


export class UserUpdateService {
    private userRepository: IUserRepository
    private userService: UserService

    constructor(userRepository: IUserRepository, userService: UserService) {
        this.userRepository = userRepository
        this.userService = userService
    }
    async execute(command:UserUpdateCommand) {

        var targetId = UserId.create(command.id)

        const user = await this.userRepository.findById(targetId)
        if (user === undefined) {
            throw new UserNotFoundException(`${command.id}は存在しません。`)
        }
        const newname=command.name
        if(newname!==undefined){
            const newUserName = UserName.create(newname)
            user.changeName(newUserName)
            if (await this.userService.Exist(user)) {
                throw new CanNotRegisterUserException(`${command.name}はすでに存在しています。`)
            }
        }
        const mailAddress=command.mailAddress
        if(mailAddress!==undefined){
            const newUserMaillAdress = UserMailAddress.create(mailAddress)
            user.changeMailAddress(newUserMaillAdress)

        }
        await this.userRepository.save(user)
    }
}