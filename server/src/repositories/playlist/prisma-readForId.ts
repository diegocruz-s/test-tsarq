import { prisma } from "../../database/prisma/prisma";
import { IDatasReadForIdRepository, IPlaylistReadForIdRepository } from "../../interfaces/playlist/readForId/readForId";
import { Playlist } from "../../models/playlist";

export class PlaylistReadForIdRepository implements IPlaylistReadForIdRepository {
    async readForId(datas: IDatasReadForIdRepository): Promise<Playlist> {
        const playlist = await prisma.playlist.findFirst({
            where: {
                AND: [
                    {
                        id: datas.playlistId
                    },
                    {
                        userId: datas.userId
                    }
                ]
            }
        })

        if(!playlist) throw new Error('Playlist not found!')
        
        return playlist
    }
}