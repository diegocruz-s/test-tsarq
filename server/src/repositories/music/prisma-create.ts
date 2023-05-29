import { HttpRequest } from "../../interfaces/http/request";
import { HttpResponse } from "../../interfaces/http/response";
import { IMusicCreateRepository } from "../../interfaces/music/create/create";
import { Music } from "../../models/music";
import { prisma } from '../../database/prisma/prisma'

// export class MusicCreateRepository implements IMusicCreateRepository {
//     async create(musicDatas: Music, userId: string): Promise<Music> {
//         const music = await prisma.music.findUnique
//     }
// }