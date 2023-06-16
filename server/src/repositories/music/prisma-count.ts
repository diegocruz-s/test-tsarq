import { prisma } from "../../database/prisma/prisma";
import { ICountMusicRepository, IDatasCountMusicRepository } from "../../interfaces/music/count/count";

export class CountMusicRepository implements ICountMusicRepository {
    async count(datas: IDatasCountMusicRepository): Promise<{ count: number; }> {
        const count = await prisma.userMusic.count({
            where: {
                userId: datas.userId
            }
        })

        if(!count) throw new Error('Datas not found!')

        return { count }
    }
}