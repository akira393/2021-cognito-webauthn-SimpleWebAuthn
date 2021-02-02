import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import UserRepository from "../infrastructure/inmemory-user-repository"
import { CreateUser } from "../usecases/createUser"

export async function handler(
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {

    const createuser = new CreateUser(new UserRepository())
    try {
        const result = await createuser.execute(1, "test")
    } catch (e) {

        let msg = ""
        if (e instanceof Error) {
            msg = "error"
        }
        else {
            msg = "default"
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: e.name
            })
        }
    }

    return {
        statusCode: 201,
        body: JSON.stringify({
            status: "ok",
            error: ""
        })
    }
}