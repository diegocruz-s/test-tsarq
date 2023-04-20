import { User } from "../../../models/user";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IBodyResponse = {
    token: string
    user: Omit<User, 'password'>
} | {
    errors: string[]
}


export interface ICreateUserController {
    handle(httpRequest: HttpRequest<Omit<User, 'id'>>): Promise<HttpResponse<IBodyResponse>>
}

export interface ICreateUserRepository {
    create(user: Omit<User, 'id'>): Promise<Omit<User, 'password'>>
}

