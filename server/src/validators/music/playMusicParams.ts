import { z } from "zod";

export const PlayMusicParamsSchema = z.object({
    musicId: z.string(),
    userId: z.string(),
})