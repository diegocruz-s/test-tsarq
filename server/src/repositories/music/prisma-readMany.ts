import { prisma } from "../../database/prisma/prisma";
import { IMusicReadManyRepository } from "../../interfaces/music/readMany/readMany";
import { Music } from "../../models/music";

export class MusicReadManyRepository implements IMusicReadManyRepository {
    async readMany(userId: string, skip: number, take: number, name?: string): Promise<Music[]> {
        const datas = await prisma.userMusic.findMany({
            where: {
                userId,
                music: name && name?.length >= 1 ? {
                    OR: [
                        {
                            name: {
                                contains: name
                            },
                        },
                        {
                            band: {
                                contains: name
                            }
                        }
                    ]
                    
                } : undefined
            },
            include: {
                music: true,
            },
            skip,
            take
        })

        const musics = datas.map(userMusic => {
            const { musicId, userId, music } = userMusic  
            return music
        })

        return musics
    } 
}
