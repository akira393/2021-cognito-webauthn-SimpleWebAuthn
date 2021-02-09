import { inject, injectable } from "tsyringe";
import { UserId} from "../../domains/model/User";
import { IUserRepository } from "../../domains/repositoryInterface/IUserRepository";
import { UserDeleteCommand } from "./command/UserDeleteCommand";
import { UserNotFoundException} from "./user-error"

@injectable()
export class UserDeleteService {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async execute(command:UserDeleteCommand){
        var targetId = UserId.create(command.id)
        const user = await this.userRepository.findById(targetId)
        if (user === undefined) {
            // 存在しなかったときは例外を出しているが、正常終了させるでも良いかな
            //return
            throw new UserNotFoundException(`${command.id}は存在しません。`)
        }
        await this.userRepository.delete(user)


    }

}