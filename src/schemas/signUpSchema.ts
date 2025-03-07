import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be greater than 2 character")
    .max(20, "Username must not be greater than 20 character")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z
        .string()
        .email({ message: "Invalid Email Address" }),
    password: z
        .string()
        .min(6, { message: "Password must Contain 6 character" })
        .max(10, { message: "Password should not be more than 10 character" })
})
