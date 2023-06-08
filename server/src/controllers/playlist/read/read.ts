import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IPlaylistReadController, IPlaylistReadRepository, IResponsePlaylistRead } from "../../../interfaces/playlist/read/read";
import { QueryReadSchema } from "../../../validators/readQuery/query";

export class PlaylistReadController implements IPlaylistReadController {
    repository: IPlaylistReadRepository
    constructor(repository: IPlaylistReadRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponsePlaylistRead>> {
        try {
            const { userId } = httpRequest.params!
            const { skip, take, name } = httpRequest.query!
            const validationQuery = await validation({
                schema: QueryReadSchema,
                context: httpRequest.query
            })
            if(validationQuery.errors) return badRequest(validationQuery.errors)

            if(!userId) return badRequest(['Invalid datas!'])

            const playlists = await this.repository.read(
                userId, 
                Number(skip), 
                Number(take),
                name || undefined
            )

            return {
                body: {
                    playlists
                },
                statusCode: 200
            }
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}