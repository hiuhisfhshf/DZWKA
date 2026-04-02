import {z} from 'zod';

export const userRegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    imageFile: z.any().refine((file) => file !== undefined, {
        message:"Зображення є обов'язковим"
    }),
})

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;