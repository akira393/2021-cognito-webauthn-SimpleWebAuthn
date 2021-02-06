import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UserRepository from "../infrastructure/user-repository"
import Log from "@dazn/lambda-powertools-logger"
import { UserNameAlreadyExist} from "../application-service/users/user-error"
import { UserGetService } from '../application-service/users/user-get-service';


export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userRepository = new UserRepository()
    const userGetService=new UserGetService(userRepository)

    try {
        const id=event.pathParameters?event.pathParameters["userId"]:undefined
        if (id === undefined){
            throw new Error("パスパラメータの取得に失敗しました。")
        }
        const user=await userGetService.execute(id)

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "ok",
                error: "",
                user:user
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