import { z } from "zod";

export const PlaylistCreateSchema = z.object({
    name: z.string().min(2)
})
