import { User, UserId, UserMailAddress, UserName } from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { UserService } from "../../domains/service/User";
import { v4 as uuidv4 } from "uuid"
import { UserNameAlreadyExist} from "./user-error"
import { inject, injectable } from "tsyringe";


@injectable()
export class UserRegisterService {
    constructor(@inject('UserRepository') private userRepository: IUserRepository,@inject('UserService') private userService:UserService) {}
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