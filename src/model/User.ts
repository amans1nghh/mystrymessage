import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    _id: string;
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "UserName is Required"],
        trim: true,
        unique:true
    },
    email:{
        type: String,
        required: [true,"Email is Required"],
        unique:true,
        match: [/.+\@.+\..+/, "Please Use a Valid Email Address"]
    },
    password:{
        type: String,
        required: [true, "Password is Required"]
    },
    verifyCode:{
        type: String,
        required:[true, "VerifyCode is Required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "verifyCodeExpiry is Required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAcceptingMessage:{
        type: Boolean,
        required: true
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;