import { badRequest, internalError, notFound, ok } from "../../../helpers/controllerResponse";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IReadUserController, IReadUserRepository, IReadUserResponse } from "../../../interfaces/user/read/read";

export class ReadUserController implements IReadUserController {
    repository: IReadUserRepository
    constructor (repository: IReadUserRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IReadUserResponse>> {
        try {
            const { userId } = httpRequest.params!

            if(!userId) return badRequest(['userId required!'])

            const user = await this.repository.read(userId)

            return ok({
                user
            })

        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}