import 'reflect-metadata'
import { container } from '../config';
import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Log from "@dazn/lambda-powertools-logger"
import { UserRegisterService } from '../applicationService/Users/UserRegisterService';
import { UserNameAlreadyExist} from "../applicationService/Users/user-error"


export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userRegisterService=container.resolve<UserRegisterService>('UserRegisterService')
    try {

        const { userName,userMailAddress } = JSON.parse(event.body||"");
        await userRegisterService.execute(userName,userMailAddress)

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