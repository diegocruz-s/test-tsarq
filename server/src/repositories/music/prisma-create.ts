import { HttpRequest } from "../../interfaces/http/request";
import { HttpResponse } from "../../interfaces/http/response";
import { IMusicCreateRepository } from "../../interfaces/music/create/create";
import { Music } from "../../models/music";
import { prisma } from '../../database/prisma/prisma'

export class MusicCreateRepository implements IMusicCreateRepository {

    async create(userId: string, musicDatas: Omit<Music, 'id'>): Promise<Music> {

        const existsMusic = await prisma.music.findUnique({
            where: {
                name: musicDatas.name
            }
        })

        if(existsMusic) {
            await prisma.userMusic.create({
                data: {
                    musicId: existsMusic.id,
                    userId: userId
                }
            })

            return existsMusic
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