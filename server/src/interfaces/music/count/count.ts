import { HttpRequest } from "../../http/request"
import { HttpResponse } from "../../http/response"

export interface IDatasCountMusicRepository {
    userId: string
}

export interface ICountMusicController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<
        { count: number } | { errors: string[] }
    >>
}

export interface ICountMusicRepository {
    count(datas: IDatasCountMusicRepository): Promise<{ count: number} >
}