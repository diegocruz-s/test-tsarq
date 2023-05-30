import { HttpRequest } from '../../http/request'
import { HttpResponse } from '../../http/response'
import { Music } from '../../../models/music'

export type IResponseMusicCreate = {
    music: Music,
    message: string
} | { errors: string[] }

type IRequestMusicCreate = {
    music: Music,
    userId: string
}

export interface IMusicCreateController {
    handle(httpRequest: HttpRequest<Music>): Promise<HttpResponse<IResponseMusicCreate>>
}

export interface IMusicCreateRepository {
    create(userId: string, music: Omit<Music, 'id'>): Promise<Music>,
}