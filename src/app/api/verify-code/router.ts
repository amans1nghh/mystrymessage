import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json({
                successs: false,
                message: "User Not Found"
            }, { status: 500 })
        }

        const isCodevalid = user.verifyCode == code;
        const isCodeNotExpired = new Date(user.verifyCode) > new Date();

        if (isCodevalid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json({
                successs: true,
                message: "Account Verified Successfully"
            }, { status: 200 })
        }
        else if (!isCodeNotExpired) {
            return Response.json({
                successs: false,
                message: "Verification Code has expired, Please SignUp again to get a new code"
            }, { status: 400 })
        }
        else{
            return Response.json({
                successs: false,
                message: "Incorrect Verification Code"
            }, { status: 400 })
        }
    }
    catch (error) {
        console.error("Error Verifying User", error)
        return Response.json({
            successs: false,
            message: "Error Verifying User"
        }, { status: 500 })
    }
}