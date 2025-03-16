import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { z } from 'zod';
import { usernameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})


export async function GET(request: Request) {
    await dbConnect()
    //SampleURL : localhost:300/api/cuu?username=amans1ngh?phone=android
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)

        console.log(result)

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                successs: false,
                message: usernameError?.length > 0 ? usernameError.join(',') : 'Invalid query parameters'
            }, { status: 400 })
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username , isVerified:true})

        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: 'Username is already taken'
            },{status: 400})
        }
        else{
            return Response.json({
                success: true,
                message: 'Username is Unique'
            },{status: 200})
        }
    } 
    
    catch (error) {
        console.error("Error Checking Username", error)
        return Response.json({
            successs: false,
            message: "Error Checking Username"
        }, { status: 500 })
    }
}