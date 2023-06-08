import { HttpRequest } from "../../http/request"
import { HttpResponse } from "../../http/response"

export type IResponseMusicPlaylistDelete = {
    message: string
} | {
    errors: string[]
}

export interface IDatasMusicPlaylistDelete {
    userId: string
    playlistId: string
    musicId: string
}

export interface IMusicPlaylistDeleteController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseMusicPlaylistDelete>>
}

export interface IMusicPlaylistDeleteRepository {
    delete(datas: IDatasMusicPlaylistDelete): Promise<string>
}
