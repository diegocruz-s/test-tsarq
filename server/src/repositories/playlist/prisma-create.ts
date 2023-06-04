import { prisma } from "../../database/prisma/prisma";
import { IDatasPlaylistCreate, IPlaylistCreateRepository } from "../../interfaces/playlist/create/create";
import { Playlist } from "../../models/playlist";

export class PlaylistCreateRepository implements IPlaylistCreateRepository {
    async create(data: IDatasPlaylistCreate): Promise<Playlist> {
        const existsPlaylist = await prisma.playlist.findUnique({
            where: {
                name: data.name
            }
        })

        if(existsPlaylist) throw new Error('A playlist with that name already exists!')

        const playlist = await prisma.playlist.create({
            data: {
                userId: data.userId,
                name: data.name
            }
        })

        if(!playlist) throw new Error('Error creating playlist!')

        return playlist
    }
}

