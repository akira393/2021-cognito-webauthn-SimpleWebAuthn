import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UserRepository from "../infrastructure/user-repository"
import Log from "@dazn/lambda-powertools-logger"
import { UserNameAlreadyExist} from "../application-service/users/user-error"
import { UserDeleteService } from '../application-service/users/user-delete-service';
import { UserDeleteCommand } from '../application-service/users/command/user-delete-command';


export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userRepository = new UserRepository()
    const userDeleteService=new UserDeleteService(userRepository)

    try {
        const id=event.pathParameters?event.pathParameters["userId"]:undefined
        if (id === undefined){
            throw new Error("パスパラメータの取得に失敗しました。")
        }
        const userDeleteCommand=new UserDeleteCommand({id:id})
        await userDeleteService.execute(userDeleteCommand)

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