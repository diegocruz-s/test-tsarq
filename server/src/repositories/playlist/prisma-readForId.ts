import { prisma } from "../../database/prisma/prisma";
import { IDatasReadForIdRepository, IPlaylistReadForIdRepository, IPlaylistReadForIdWithMusics } from "../../interfaces/playlist/readForId/readForId";
import { Music } from "../../models/music";
import { Playlist } from "../../models/playlist";

export class PlaylistReadForIdRepository implements IPlaylistReadForIdRepository {
    async readForId(datas: IDatasReadForIdRepository): Promise<IPlaylistReadForIdWithMusics> {
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
            },
            include: {
                _count: true
            },
        })
        if(!playlist) throw new Error('Playlist not found!')

        const musicsDatas = await prisma.musicPlaylist.findMany({
            where: {
                playlistId: playlist.id
            },
            include: {
                music: true,
            }
        })

        const musics: Music[] = musicsDatas.map(musicPlaylist => musicPlaylist.music)
        
        console.log('datas:', {
            playlist,
            musics
        })

        return {
            playlist,
            musics
        }
    }
}