import { HttpRequest } from "../../http/request"
import { HttpResponse } from "../../http/response"

export type IResponseDeletePlaylist = {
    message: string
} | {
    errors: string[]
}

export interface IDatasDeletePlaylistRepository {
    userId: string
    playlistId: string
}

export interface IDeletePlaylistController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseDeletePlaylist>>
}

export interface IDeletePlaylistRepository {
    delete(datas: IDatasDeletePlaylistRepository): Promise<string>
}