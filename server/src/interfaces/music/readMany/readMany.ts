import { Music } from "../../../models/music";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IReadManyResponse = {
    musics: Music[]
} | {
    errors: string[]
}

export interface IMusicReadManyController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IReadManyResponse>>
}

export interface IMusicReadManyRepository {
    readMany(userId: string, skip: number, take: number, name?: string): Promise<Music[]>
}