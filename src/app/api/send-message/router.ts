import UserModel from "@/model/User";
import dbConnect from "@/lib/dbconnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const { username, content } = await request.json()

    try {
        const user = await UserModel.findOne(username);
        if (!user) {
            return Response.json({
                success: false,
                message: "User Not found"
            }, { status: 404 })
        }

        //if user is found we have to check whether the user is accepting the messages 
        if (!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "User is not accepting the messages"
            }, { status: 403 })
        }

        const newMessage = { content, createdAt: new Date() };

        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success: true,
            message: "Message Sent Successfully"
        }, { status: 200 })
    } 
    catch (error) {
        console.log("An unexpected errro occured", error)
        return Response.json({
            success: false,
            message: "User Not found"
        }, { status: 500 })
    }
}