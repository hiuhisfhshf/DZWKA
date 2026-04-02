import { z } from "zod";

export const updateCategorySchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Назва обов'язкове"),
    description: z.string().min(4, "Опис обов'язкове"),
    image: z.any().refine((file) => file !== undefined, {
        message:"Зображення є обов'язковим"
    }),
})


export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;