import { badRequest, internalError } from "../../../helpers/controllerResponse";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDeleteResponse, IDeleteUserController, IDeleteUserRepository } from "../../../interfaces/user/delete/delete";

export class DeleteUserController implements IDeleteUserController {
    repository: IDeleteUserRepository
    constructor(repository: IDeleteUserRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<{}>): Promise<HttpResponse<IDeleteResponse>> {
        try {
            if(!httpRequest.params?.id) return badRequest(['Id is requires'])
            const { id, userId } = httpRequest.params

            if(id !== userId) return badRequest(['You can only delete your user!']) 

            const { message } = await this.repository.delete(id)

            return {
                statusCode: 200,
                body: {
                    message
                }
            }

        } catch (error: any) {
            return internalError([error.message])
        }
    }

}