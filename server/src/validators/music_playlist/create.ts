import { z } from "zod";

export const ParamsCreateMusicPlaylistSchema = z.object({
    musicId: z.string(),
    playlistId: z.string(),
    userId: z.string(),
})