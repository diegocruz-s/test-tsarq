import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDeleteMusicController, IDeleteMusicRepository, IResponseDeleteMusic } from "../../../interfaces/music/delete/delete";

export class MusicDeleteController implements IDeleteMusicController {
    repository: IDeleteMusicRepository
    constructor(repository: IDeleteMusicRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseDeleteMusic>> {
        try {
            const { musicId, userId } = httpRequest.params!

            if(!musicId || !userId) {
                return badRequest(['Music not informed!'])
            }

            const deletedMusic = await this.repository.delete(musicId, userId)

            return {
                body: {
                    message: 'Music deleted with success!'
                },
                statusCode: 200
            }

        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
        
    }
}