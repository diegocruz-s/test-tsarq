import { prisma } from "../../database/prisma/prisma";
import { IMusicReadManyRepository } from "../../interfaces/music/readMany/readMany";
import { Music } from "../../models/music";

export class MusicReadManyRepository implements IMusicReadManyRepository {
    async readMany(userId: string, skip: number, take: number, name?: string): Promise<Music[]> {
        const datas = await prisma.userMusic.findMany({
            where: {
                userId,
                music: name && name?.length >= 1 ? {
                    name: {
                        contains: name
                    }
                } : undefined
            },
            include: {
                music: true,
            },
            skip,
            take
        })
        // console.log('datas::', datas)

        const musics = datas.map(userMusic => {
            const { musicId, userId, music } = userMusic  
            return music
        })
        // console.log('musics::', musics)

        return musics
    } 
}
