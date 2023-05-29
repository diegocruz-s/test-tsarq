import { HttpRequest } from '../../http/request'
import { HttpResponse } from '../../http/response'
import { Music } from '../../../models/music'

type IResponseMusicCreate = {
    music: Music,
    message: string
} | { errors: [] }

export interface IMusicCreateController {
    handle(httpRequest: HttpRequest<Music>): Promise<HttpResponse<IResponseMusicCreate>>
}

export interface IMusicCreateRepository {
    create(music: Music, userId: string): Promise<Music>
}