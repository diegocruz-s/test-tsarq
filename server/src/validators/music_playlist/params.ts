import { z } from "zod";

export const ParamsMusicPlaylistSchema = z.object({
    musicId: z.string(),
    playlistId: z.string(),
    userId: z.string(),
})