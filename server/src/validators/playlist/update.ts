import { z } from "zod";

export const UpdatePlaylistSchema = z.object({
    name: z.string().min(2)
})