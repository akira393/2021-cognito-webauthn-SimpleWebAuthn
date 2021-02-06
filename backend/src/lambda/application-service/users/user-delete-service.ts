import { UserId} from "../../domains/model/User";
import { IUserRepository } from "../../domains/repository-interface/user-repository";
import { UserDeleteCommand } from "./command/user-delete-command";
import { UserNotFoundException} from "./user-error"

export class UserDeleteService {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }
    async execute(command:UserDeleteCommand){
        var targetId = UserId.create(command.id)
        const user = await this.userRepository.findById(targetId)
        if (user === undefined) {
            // 存在しなかったときは例外を出しているが、正常終了させるでも良いかな
            //return
            throw new UserNotFoundException(`${targetId}は存在しません。`)
        }
        this.userRepository.delete(user)


    }

}