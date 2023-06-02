import { HttpRequest } from "../../http/request"
import { HttpResponse } from "../../http/response"

export type IResponseDeleteMusic = {
    message: string
} | { 
    errors: string[] 
}
export interface IDeleteMusicRepository {
    delete(musicId: string, userId: string): Promise<boolean>
}

export interface IDeleteMusicController {   
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseDeleteMusic>>
}