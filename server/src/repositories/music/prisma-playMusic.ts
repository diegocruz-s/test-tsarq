import { Music } from "@prisma/client";
import { IDatasPlayMusicRepository, IPlayMusicRepository } from "../../interfaces/music/playMusic/playMusic";
import { prisma } from "../../database/prisma/prisma";

export class PlayMusicRepository implements IPlayMusicRepository {
    async readMusic(datas: IDatasPlayMusicRepository): Promise<Music | false> {
        const datasMusic = await prisma.userMusic.findUnique({
            where: {
                userId_musicId: {
                    musicId: datas.musicId,
                    userId: datas.userId
                }
            },
            include: {
                music: true,
                user: false
            }
        })
        if(!datasMusic || !datasMusic.music) return false

        return datasMusic.music 
    }
}