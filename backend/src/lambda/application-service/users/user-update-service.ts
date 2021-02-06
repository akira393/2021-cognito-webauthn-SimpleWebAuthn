import { UserId, UserMaillAdress, UserName } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repository-interface/user-repository";
import { UserService } from "../../domains/service/User";
import { UserUpdateCommand } from "./command/user-update-command";
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
            throw new UserNotFoundException(`${targetId}は存在しません。`)
        }
        const newname=command.name
        if(newname!==undefined && newname!==user.name.toString()){
            const newUserName = UserName.create(newname)
            user.changeName(newUserName)
            if (await this.userService.Exist(user)) {
                throw new CanNotRegisterUserException(`${user.name}はすでに存在しています。`)
            }
            await this.userRepository.save(user)
        }
        const maillAdress=command.maillAdress
        if(maillAdress!==undefined&& maillAdress !==user.maillAdress){
            const newUserMaillAdress = UserMaillAdress.create(maillAdress)
            user.changeMaillAdress(newUserMaillAdress)
            await this.userRepository.save(user)
        }
    }
}