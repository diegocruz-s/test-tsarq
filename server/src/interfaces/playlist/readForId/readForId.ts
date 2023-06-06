import { Playlist } from "../../../models/playlist";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponsePlaylistReadForId = {
    playlist: Playlist
} | {
    errors: string[]
}

export interface IDatasReadForIdRepository {
    userId: string
    playlistId: string
}

export interface IPlaylistReadForIdRepository {
    readForId(datas: IDatasReadForIdRepository): Promise<Playlist>
}

export interface IPlaylistReadForIdController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponsePlaylistReadForId>>
}