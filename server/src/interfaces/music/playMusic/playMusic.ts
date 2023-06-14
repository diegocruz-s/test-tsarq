import { Music } from "@prisma/client";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponsePlayMusic = {
    // start: number
    // end: number
    // chunk: number
    // size: number
    // musicPath: string 
    name: string
} | { 
    errors: string[] 
}

export interface IDatasPlayMusicRepository {
    userId: string
    musicId: string
}

export interface IPlayMusicController {
    handle(httpRequest: HttpRequest<null>): Promise<IResponsePlayMusic> 
}

export interface IPlayMusicRepository {
    readMusic(datas: IDatasPlayMusicRepository): Promise<Music | false>
}