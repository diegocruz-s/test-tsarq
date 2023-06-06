import { z } from "zod";

export const QueryReadSchema = z.object({
    take: z.number(),
    skip: z.number(),
    name: z.optional(z.string())
})

