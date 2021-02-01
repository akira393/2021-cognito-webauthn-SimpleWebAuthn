import UserRepository from "../infrastructure/inmemory-user-repository"
import { CreateUser } from "../usecases/createUser"

export async function handler(event: any, context: any): Promise<any> {

    const createuser=new CreateUser(new UserRepository())
    try{
        const result=await createuser.execute(1,"test")
    }catch(e){
        console.log(e)
        let msg=""
        if (e instanceof Error){
            msg="error"
        }
        else{
            msg="default"
        }

        return {
            statusCode:500,
            body:JSON.stringify({
                message:e.name
            })
        }
    }

    return {
        statusCode: 201,
    }
}

handler({},{}).then((data:any)=>{
    console.log(data)
}).catch((e:any)=>{
    console.log(e)
})
