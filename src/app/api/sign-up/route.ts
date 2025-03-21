import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationemail";

export async function POST(request: Request) {
    await dbConnect()

    try {
        //de-structured the json response and got the required username, email, password
        const { username, email, password } = await request.json()

        // checking for the username
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()


        const existingUserByEmail = await UserModel.findOne({ email })
        if (existingUserByEmail) {

            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User Already Exist With This Email"
                }, { status: 400 })
            }
            else {
                const hasedpassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hasedpassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save();
            }
        }
        else {
            //encrypting the password received by the user
            const hasedpassword = await bcrypt.hash(password, 10)

            //setting the expiry to 1 hour from time of login
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hasedpassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save();
        }

        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            message: "User registered successfully. Please Verify Your Email"
        }, { status: 201 })

    } 
    catch (error) {
        console.error("Error Registering User", error)
        return Response.json(
            {
                success: false,
                message: "Error registering User"
            },
            {
                status: 500
            }
        )
    }
}