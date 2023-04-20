import { User } from "../../models/user"
import { HttpRequest } from "../http/request"
import { HttpResponse } from "../http/response"

export interface IAuthBody {
    email: string
    password: string
}

export interface IAuthController {
    handle(httpRequest: HttpRequest<IAuthBody>): Promise<HttpResponse<Omit<User, 'password'> | {
        error: string
    }>>
}

export interface IAuthRepository {
    login(body: IAuthBody): Promise<Omit<User, 'password'>> 
}

// login
    // req: { email, password }
    // res: {
    //  token: '',
    //  user: {
    
    //  }
    // }