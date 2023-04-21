import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    username: z.string().min(5).optional(),
    bios: z.string().optional(),
    password: z.string().min(6).optional(),
})
