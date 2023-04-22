import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IDeleteResponse = {
    message: string
} | {
    errors: string[]
}

export interface IDeleteUserController {
    handle(httpRequest: HttpRequest<{}>): Promise<HttpResponse<IDeleteResponse>>
}

export interface IDeleteUserRepository {
    delete(id: string): Promise<{ message: string }>
}

