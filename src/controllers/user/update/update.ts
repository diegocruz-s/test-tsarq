import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDatasAllowedUpdate, IUpdateResponse, IUpdateUserController, IUpdateUserRepository } from "../../../interfaces/user/update/update";
import { createUserSchema } from "../../../validators/user/createUser";

export class IUpdateController implements IUpdateUserController {
    repository: IUpdateUserRepository
    constructor(repository: IUpdateUserRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<IDatasAllowedUpdate>): Promise<HttpResponse<IUpdateResponse>> {
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
            
            const userUpdate = await this.repository.update(httpRequest.params.id)
        } catch (error: any) {
            return {
                body: {
                    errors: [error.message]
                },
                statusCode: 500
            }
        }
        throw new Error("Method not implemented.");
    }

}
