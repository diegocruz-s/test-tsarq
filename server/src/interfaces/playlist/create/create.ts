import { Playlist } from "../../../models/playlist";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export interface DatasResponsePlaylistCreate extends Playlist {
    _count: {
        music: number
    }
}

export interface IDatasPlaylistCreate {
    name: string
    userId: string
    image: string
} 

export type IResponsePlaylistCreate = {
    playlist: Playlist
    message: string
} | {
    errors: string[]
}

// export interface IDatasPlaylistCreateRepository {
//     playlist: Playlist, 
//     _count: { music: number }
// }

export interface IPlaylistCreateRepository {
    create(data: IDatasPlaylistCreate): Promise<Playlist>
}

export interface IPlaylistCreateController {
    handle(httpRequest: HttpRequest<Omit<Playlist, 'id'>>): Promise<HttpResponse<IResponsePlaylistCreate>>
}
