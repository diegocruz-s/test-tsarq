import { badRequest, internalError, notFound } from '../../helpers/controllerResponse'
import { generateToken } from '../../helpers/generateToken'
import { validation } from '../../helpers/validation'
import { HttpRequest } from '../../interfaces/http/request'
import { HttpResponse } from '../../interfaces/http/response'
import { IAuthBody, IAuthController, IAuthRepository, IAuthResponse } from '../../interfaces/login/auth'
import { authSchema } from '../../validators/login/auth'

export class LoginController implements IAuthController {
    repository: IAuthRepository

    constructor(repository: IAuthRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<IAuthBody>): Promise<HttpResponse<IAuthResponse | { errors: string[] }>> {
        try {
            const valueValidation = await validation({
                schema: authSchema,
                context: httpRequest.body!
            })

            if(valueValidation.errors) {
                return badRequest(valueValidation.errors)
            }

            const email = httpRequest.body?.email
            const password = httpRequest.body?.password
            
            const user = await this.repository.login({
                email: email!,
                password: password!,
            })

            const token = await generateToken(user)
    
            return {
                body: {
                    user,
                    token
                }, 
                statusCode: 200
            }

        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
       
    }

}
