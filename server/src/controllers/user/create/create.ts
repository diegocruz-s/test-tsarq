import { hashSync } from "bcrypt";

import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
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
                return badRequest(valueValidation.errors)
            }

            const newUser = {
                ...httpRequest.body!, password: hashSync(httpRequest.body!.password, 12)
            }
            
            const user: Omit<User, 'password'> = await this.repository.create(newUser)

            return {
                statusCode: 200,
                body: {
                    user,
                    message: 'User create succesfully!'
                }
            }
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}