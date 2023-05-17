import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.optional(z.string().min(2)),
    username: z.optional(z.string().min(5)),
    bios: z.optional(z.string()),
    password: z.optional(z.string().min(6)),
})
