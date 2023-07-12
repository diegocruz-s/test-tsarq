import { prisma } from "../../database/prisma/prisma";
import { IDatasMusicPlaylistCreateRepository, IMusicPlaylistCreateRepository, } from "../../interfaces/music_playlist/create/create";
import { MusicPlaylist } from "../../models/music_playlist";

export class MusicPlaylistCreateRepository implements IMusicPlaylistCreateRepository {
    async create(datas: IDatasMusicPlaylistCreateRepository): Promise<MusicPlaylist> {
        const { userId, musicId, playlistId } = datas
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!userExists) throw new Error('User not found!')

        const music = await prisma.userMusic.findUnique({
            where: {
                userId_musicId: {
                    musicId,
                    userId
                }
            }
        })
        if(!music) throw new Error('Music not found!')

        const playlist = await prisma.playlist.findFirst({
            where: {
                AND: [
                    {
                        id: playlistId
                    },
                    {
                        userId
                    }
                ]
            }
        })
        if(!playlist) throw new Error('Playlist not found!')

        const relationalMusicPlaylist = await prisma.musicPlaylist.findUnique({
            where: {
                musicId_playlistId: {
                    musicId,
                    playlistId
                }
            },
            include: {
                playlist: true
            },
        })
        if(relationalMusicPlaylist) return relationalMusicPlaylist

        const creatingRelationMusicPlaylist = await prisma.musicPlaylist.create({
            data: {
                musicId,
                playlistId
            },
            include: {
                playlist: true
            },
        })
        if(!creatingRelationMusicPlaylist) throw new Error('Error adding music to playlist!')

        return creatingRelationMusicPlaylist

    }
}