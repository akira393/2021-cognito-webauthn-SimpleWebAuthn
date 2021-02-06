import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UserRepository from "../infrastructure/user-repository"
import Log from "@dazn/lambda-powertools-logger"
import { UserNameAlreadyExist} from "../application-service/users/user-error"
import { UserGetAllService } from '../application-service/users/user-get-all-service';


export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const userRepository = new UserRepository()
    const userGetAllService=new UserGetAllService(userRepository)

    try {
        const allUsers=await userGetAllService.execute()
        allUsers?.map((u)=>{

            console.log(u)
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "ok",
                error: "",
                users:allUsers
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