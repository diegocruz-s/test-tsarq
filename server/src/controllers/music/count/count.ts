import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { ICountMusicController, ICountMusicRepository } from "../../../interfaces/music/count/count";
import { PlayMusicParamsSchema } from "../../../validators/music/playMusicParams";

export class CountMusicController implements ICountMusicController {
    repository: ICountMusicRepository
    constructor(repository: ICountMusicRepository) {
        this.repository = repository
    }
    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<{ count: number; } | { errors: string[]; }>> {
        try {
            const { userId } = httpRequest.params!
            if(!userId) return badRequest(['Invalid datas!'])

            const { count } = await this.repository.count({
                userId: userId!
            })

            return {
                statusCode: 200,
                body: {
                    count
                }
            }

        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}