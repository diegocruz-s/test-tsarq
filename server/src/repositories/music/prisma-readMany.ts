import { prisma } from "../../database/prisma/prisma";
import { IMusicReadManyRepository } from "../../interfaces/music/readMany/readMany";
import { Music } from "../../models/music";

export class MusicReadManyRepository implements IMusicReadManyRepository {
    async readMany(userId: string, skip: number, take: number, name?: string): Promise<Music[]> {
        // console.log('name::', name)
        console.log('name::', typeof name)
        console.log('skip::', skip)
        console.log('take::', take)

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
 
const abc = new MusicReadManyRepository()
async function a () {
    const datas = await abc.readMany('a820c479-e298-45b6-a4cd-785109fbefab', 0, 10, '')
    return datas
}
a().then(data => {
    // console.log('data', data)
})