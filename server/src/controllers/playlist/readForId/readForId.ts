import { badRequest, internalError } from "../../../helpers/controllerResponse";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDatasReadForIdRepository, IPlaylistReadForIdController, IPlaylistReadForIdRepository, IResponsePlaylistReadForId } from "../../../interfaces/playlist/readForId/readForId";

export class PlaylistReadForIdController implements IPlaylistReadForIdController {
    repository: IPlaylistReadForIdRepository
    constructor(repository: IPlaylistReadForIdRepository) {
        this.repository = repository
    }
    
    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponsePlaylistReadForId>> {
        try {
            const { userId, playlistId } = httpRequest.params!
            if(!userId || !playlistId) return badRequest(['Invalid datas'])

            const datasReadForId: IDatasReadForIdRepository = {
                playlistId,
                userId
            } 

            const playlist = await this.repository.readForId(datasReadForId)

            return {
                body: {
                    playlist
                },
                statusCode: 200
            }
        } catch (error: any) {
            return internalError([error.message])
        }
    }
}