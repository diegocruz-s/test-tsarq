import { User } from "../../../models/user"
import { HttpRequest } from "../../http/request"
import { HttpResponse } from "../../http/response"

export interface IDatasAllowedUpdate {
    name?: string
    username?: string
    bios?: string
    password?: string 
}

export type IUpdateResponse = {
    user: Omit<User, 'password'>,
    message: string
} | {
    errors: string[]
}

export interface IUpdateUserController {
    handle(httpRequest: HttpRequest<IDatasAllowedUpdate>): Promise<HttpResponse<IUpdateResponse>> 
}

export interface IUpdateUserRepository {
    update(id: string, datas: IDatasAllowedUpdate): Promise<Omit<User, 'password'>> 
}
