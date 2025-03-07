import {z} from 'zod'

 export const verificationCodeSchema = z.object({
    code: z
    .string()
    .length(6, "Verification Code Must Be Of 6 Digit")
 })