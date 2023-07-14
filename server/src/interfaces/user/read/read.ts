import { User } from "@prisma/client";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IReadUserResponse = {
    user: User
}  | {
    errors: string[]
}

export interface IReadUserController {
    handle (httpRequest: HttpRequest<null>): Promise<HttpResponse<IReadUserResponse>> 
}

export interface IReadUserRepository {
    read (id: string): Promise<Omit<User, 'password'>>
}