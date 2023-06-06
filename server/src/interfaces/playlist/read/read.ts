import { Playlist } from "@prisma/client";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponsePlaylistRead = {
    playlists: Playlist[]
} | {
    errors: string[]
}

export interface IPlaylistReadController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponsePlaylistRead>>
}

export interface IPlaylistReadRepository {
    read(userId: string, skip: number, take: number, name?: string): Promise<Playlist[]>
}