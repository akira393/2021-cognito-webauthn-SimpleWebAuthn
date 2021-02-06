import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UserRepository from "../infrastructure/user-repository"
import Log from "@dazn/lambda-powertools-logger"
import { UserRegisterService } from '../application-service/users/user-register-service';
import { UserService } from '../domains/service/User';
import { UserNameAlreadyExist} from "../application-service/users/user-error"


export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userRepository = new UserRepository()
    const userService=new UserService(userRepository)
    const userRegisterService = new UserRegisterService(userRepository,userService)
    try {
        if (!event.body){
            throw new Error("リクエストがからです。")
        }
        const { username,usermailladress } = JSON.parse(event.body);

        await userRegisterService.execute(username,usermailladress)
    }catch (e) {
        let msg = "error"
        if (e instanceof UserNameAlreadyExist) {
            Log.error(msg, { ms: e.message })
        }
        else {
            msg = "default"
            Log.error(msg, { ms: e.message })
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: "err",
                error:{
                    message: e.message,
                    name:e.name,
                }
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "ok",
            error: ""
        })
    }
}