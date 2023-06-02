import { prisma } from "../../database/prisma/prisma";
import { IDeleteMusicRepository } from "../../interfaces/music/delete/delete";

export class MusicDeleteRepository implements IDeleteMusicRepository {
    async delete(musicId: string, userId: string): Promise<boolean> {
        const existsMusic = await prisma.music.findUnique({
            where: {
                id: musicId
            }
        })

        if(!existsMusic) {
            throw new Error('Music not found!')
        }

        const musicUserRelational = await prisma.userMusic.findUnique({
            where: {
                userId_musicId: {
                    musicId: musicId,
                    userId: userId
                }
            }
        }) 

        if(!musicUserRelational) {
            throw new Error('This song is not part of your downloads!')
        }

        const deleteMusic = await prisma.userMusic.delete({
            where: {
                userId_musicId: {
                    musicId: musicUserRelational.musicId,
                    userId: musicUserRelational.userId
                }
            }
        })

        if(!deleteMusic) {
            throw new Error('Error deleting music!')
        }

        return true 
    }
}