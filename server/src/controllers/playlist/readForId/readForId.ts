import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
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

            const datas = await this.repository.readForId(datasReadForId)

            return {
                body: {
                    playlist: datas.playlist,
                    musics: datas.musics
                },
                statusCode: 200
            }
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}