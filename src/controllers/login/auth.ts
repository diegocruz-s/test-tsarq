import { HttpRequest } from '../../interfaces/http/request'
import { HttpResponse } from '../../interfaces/http/response'
import { IAuthBody, IAuthController, IAuthRepository } from '../../interfaces/login/auth'
import { User } from '../../models/user'

export class LoginController implements IAuthController {
    repository: IAuthRepository

    constructor(repository: IAuthRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<IAuthBody>): Promise<HttpResponse<Omit<User, 'password'> | { error: string }>> {
        try {
            const email = httpRequest.body?.email
            const password = httpRequest.body?.password
            
            if(!email || !password) {
                return {
                    body: {
                        error: 'Invalid fields' 
                    },
                    statusCode: 500
                }
            }
            const user = await this.repository.login({
                email,
                password,
            })
    
            return {
                body: user, 
                statusCode: 200
            }

        } catch (error: any) {
            return {
                body: {
                    error: error.message
                },
                statusCode: 500
            }
        }
       
    }

}
