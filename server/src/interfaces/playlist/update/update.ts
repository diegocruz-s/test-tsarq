import { Playlist } from "../../../models/playlist";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponsePlaylistUpdate = {
    playlist: Playlist
    message: string
} | {
    errors: string[]
}

export interface IPlaylistUpdateController {
    handle(httpRequest: HttpRequest<Omit<Playlist, 'id'>>): Promise<HttpResponse<IResponsePlaylistUpdate>>
}

export interface IPlaylistUpdateRepository {
    update(datas: Playlist): Promise<Playlist>
}