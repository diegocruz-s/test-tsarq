import { Music } from "../../../models/music";
import { Playlist } from "../../../models/playlist";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponsePlaylistReadForId = {
    playlist: Playlist,
    musics: Music[]
} | {
    errors: string[]
}

export interface IPlaylistReadForIdWithMusics {
    playlist: Playlist
    musics: Music[]
}

export interface IDatasReadForIdRepository {
    userId: string
    playlistId: string
}

export interface IPlaylistReadForIdRepository {
    readForId(datas: IDatasReadForIdRepository): Promise<IPlaylistReadForIdWithMusics>
}

export interface IPlaylistReadForIdController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponsePlaylistReadForId>>
}
