import { Playlist } from "@prisma/client";
import { IPlaylistReadRepository } from "../../interfaces/playlist/read/read";
import { prisma } from "../../database/prisma/prisma";

export class PlaylistReadRepository implements IPlaylistReadRepository {
    async read(userId: string, skip: number, take: number, name?: string | undefined): Promise<Playlist[]> {
        const playlists = await prisma.playlist.findMany({
            where: {
                AND: [
                    {
                        userId
                    },
                    {
                        name: (name && name.length > 0) ? {
                            contains: name
                        } : undefined
                    }
                ],
            },
            skip,
            take
        })

        return playlists
    }
}