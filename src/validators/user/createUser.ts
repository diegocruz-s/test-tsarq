import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(5),
    username: z.string().min(5),
    bios: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
})
