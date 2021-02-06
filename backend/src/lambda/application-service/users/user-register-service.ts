import { User, UserId, UserMaillAdress, UserName } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repository-interface/user-repository";
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
    async execute(name: string, maillAdress: string) {
        var user = User.create({
            id: UserId.create(uuidv4().toString()),
            name: UserName.create(name),
            maillAdress: UserMaillAdress.create(maillAdress)
        })

        //usernameの重複チェックをしている
        //重複を禁止していることは、ドメインのルールなのでドメイン（userService）に記述する
        if (await this.userService.Exist(user)) {
            throw new UserNameAlreadyExist(`${user.name}はすでに存在しています。`)
        }
        await this.userRepository.save(user)
    }

}