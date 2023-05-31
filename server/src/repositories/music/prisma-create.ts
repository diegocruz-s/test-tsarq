import { HttpRequest } from "../../interfaces/http/request";
import { HttpResponse } from "../../interfaces/http/response";
import { IMusicCreateRepository } from "../../interfaces/music/create/create";
import { Music } from "../../models/music";
import { prisma } from '../../database/prisma/prisma'

export class MusicCreateRepository implements IMusicCreateRepository {

    async checkExistsMusic(name: string): Promise<Music | false> {
        const existsMusic = await prisma.music.findUnique({
            where: {
                name: name
            }
        })  

        if(!existsMusic) {
            return false
        }

        return existsMusic
    }

    async create(userId: string, musicDatas: Omit<Music, 'id'>): Promise<Music> {
        const existMusic = await this.checkExistsMusic(musicDatas.name)
        if(existMusic) {

            const musicIsAlreadyRelatedToTheUser = await prisma.userMusic.findUnique({
                where: {
                    userId_musicId: {
                        musicId: existMusic.id,
                        userId: userId
                    }
                }
            })

            if(musicIsAlreadyRelatedToTheUser) {
                return existMusic
            }

            await prisma.userMusic.create({
                data: {
                    musicId: existMusic.id,
                    userId: userId
                }
            })

            return existMusic
        }

        const newMusic = await prisma.music.create({
            data: musicDatas
        })

        await prisma.userMusic.create({
            data: {
                musicId: newMusic.id,
                userId: userId
            }
        })

        return newMusic
    }

}