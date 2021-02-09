import { container } from "tsyringe";
import { UserDeleteService } from "./applicationService/Users/UserDeleteService";
import { UserGetAllService } from "./applicationService/Users/UserGetAllService";
import { UserGetService } from "./applicationService/Users/UserGetService";
import { UserRegisterService } from "./applicationService/Users/UserRegisterService";
import { UserUpdateService } from "./applicationService/Users/UserUpdateService";
import { UserService } from "./domains/service/User";
import UserRepository from "./infrastructure/UserRepository";

container.register("UserRepository",{useClass:UserRepository})
container.register("UserGetAllService",{useClass:UserGetAllService})
container.register("UserGetService",{useClass:UserGetService})
container.register("UserUpdateService",{useClass:UserUpdateService})
container.register("UserDeleteService",{useClass:UserDeleteService})
container.register("UserRegisterService",{useClass:UserRegisterService})
container.register("UserService",{useClass:UserService})

export {container}