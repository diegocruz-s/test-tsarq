import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IBodyResponse, ICreateUserController, ICreateUserRepository } from "../../../interfaces/user/create/create";
import { User } from "../../../models/user";
import { createUserSchema } from "../../../validators/user/createUser";

export class CreateUserController implements ICreateUserController {
    repository: ICreateUserRepository
    constructor(repository: ICreateUserRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<Omit<User, 'id'>>): Promise<HttpResponse<IBodyResponse>> {
        try {
            const valueValidation = await validation({
                schema: createUserSchema,
                context: httpRequest.body!
            })

            if(valueValidation.errors) {
                return {
                    statusCode: 400,
                    body: {
                        errors: valueValidation.errors
                    }
                }
            }

            const user: Omit<User, 'password'> = {
                bios: '',
                email: '',
                id: '',
                name: '',
                username: ''
            }

            return {
                statusCode: 200,
                body: {
                    token: '',
                    user
                }
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                body: error.message
            }
        }
    }
}