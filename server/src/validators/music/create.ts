import { z } from 'zod'

export const createMusicSchema = z.object({
    name: z.optional(z.string().min(5)),
    url: z.string().url(),
    band: z.string().min(3),
    duration: z.optional(z.string().min(5)),
    composer: z.string().min(3),
    categoryId: z.string(),
    year: z.number().min(4),
})

// id: string 
//     name: string
//     band: string
//     duration: string
//     composer: string
//     categoryId: string
//     year: number
//     createdAt: Date