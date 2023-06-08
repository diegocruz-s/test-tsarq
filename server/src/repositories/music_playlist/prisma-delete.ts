import { prisma } from "../../database/prisma/prisma";
import { IDatasMusicPlaylistDelete, IMusicPlaylistDeleteRepository } from "../../interfaces/music_playlist/delete/delete";

export class MusicPlaylistDeleteRepository implements IMusicPlaylistDeleteRepository {
    async delete(datas: IDatasMusicPlaylistDelete): Promise<string> {
        const music = await prisma.userMusic.findUnique({
            where: {
                userId_musicId: {
                    musicId: datas.musicId,
                    userId: datas.userId
                }
            }
        })
        if(!music) throw new Error('Music not found!')

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

        const relationalMusicPlaylist = await prisma.musicPlaylist.findUnique({
            where: {
                musicId_playlistId: {
                    musicId: datas.musicId,
                    playlistId: datas.playlistId
                }
            }
        }) 
        if(!relationalMusicPlaylist) throw new Error('Music not found in playlist!')

        const deleteMusicInPlaylist = await prisma.musicPlaylist.delete({
            where: {
                musicId_playlistId: {
                    musicId: datas.musicId,
                    playlistId: datas.playlistId
                }
            }
        })
        if(!deleteMusicInPlaylist) throw new Error('Error deleted music in playlist!')

        const messageReturn = `Music deleted in playlist '${playlist.name}'`

        return messageReturn

    }
}