import 'reflect-metadata'
import { container } from '../config';
import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Log from "@dazn/lambda-powertools-logger"
import { UserNameAlreadyExist} from "../applicationService/Users/user-error"
import { UserGetService } from '../applicationService/Users/UserGetService';

export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userGetService=container.resolve<UserGetService>("UserGetService")


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