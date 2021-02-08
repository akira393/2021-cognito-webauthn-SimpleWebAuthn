import { User, UserId, UserMailAddress, UserName } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { UserService } from "../../domains/service/User";
import { v4 as uuidv4 } from "uuid"
import { UserNameAlreadyExist} from "./user-error"



export class UserRegisterService {
    private userRepository: IUserRepository
    private userService: UserService

    constructor(userRepository: IUserRepository, userService: UserService) {
        this.userRepository = userRepository
        this.userService = userService
    }
    async execute(name: string, mailAddress: string) {
        var user = new User({
            id: UserId.create(uuidv4().toString()),
            name: UserName.create(name),
            mailAddress: UserMailAddress.create(mailAddress)
        })
        if (await this.userService.Exist(user)) {
            throw new UserNameAlreadyExist(`${name}はすでに存在しています。`)
        }
        await this.userRepository.save(user)
    }

}