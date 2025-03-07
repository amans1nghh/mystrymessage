import {z} from 'zod'

export const messageSchema = z.object({
    contenr: z
    .string()
    .min(10, {message: "Content must be greater than 10 character"})
    .max(300, {message: "Content must not be greater than 300 character"})

})