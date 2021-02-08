import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UserRepository from "../infrastructure/UserRepository"
import Log from "@dazn/lambda-powertools-logger"
import { UserNameAlreadyExist} from "../applicationService/Users/user-error"
import { UserUpdateService } from '../applicationService/Users/UserUpdateService';
import { UserService } from '../domains/service/User';
import { UserUpdateCommand } from '../applicationService/Users/command/UserUpdateCommand';


export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userRepository = new UserRepository()
    const userService=new UserService(userRepository)
    const userUpdateService=new UserUpdateService(userRepository,userService)

    try {
        const id=event.pathParameters?event.pathParameters["userId"]:undefined
        if (id === undefined){
            throw new Error("パスパラメータの取得に失敗しました。")
        }
        if (!event.body){
            throw new Error("リクエストがからです。")
        }
        const {userName,userMailAddress}=JSON.parse(event.body);
        const updateCommand=new UserUpdateCommand({id:id,name:userName,mailAddress:userMailAddress})
        await userUpdateService.execute(updateCommand)

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "ok",
                error: "",
            })
        }

    } catch (e) {
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

}