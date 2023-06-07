import { MusicPlaylist } from "../../../models/music_playlist";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponseMusicPlaylistCreate = {
    musicPlaylist: MusicPlaylist,
    message: string
} | {
    errors: string[]
}

export interface IDatasMusicPlaylistCreateRepository {
    userId: string
    musicId: string
    playlistId: string
}

export interface IMusicPlaylistCreateController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseMusicPlaylistCreate>>
}

export interface IMusicPlaylistCreateRepository {
    create(datas: IDatasMusicPlaylistCreateRepository): Promise<MusicPlaylist>
}