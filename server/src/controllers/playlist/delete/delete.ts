import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDeletePlaylistController, IDeletePlaylistRepository, IResponseDeletePlaylist } from "../../../interfaces/playlist/delete/delete";

export class PlaylistDeleteController implements IDeletePlaylistController {
    repository: IDeletePlaylistRepository
    constructor(repository: IDeletePlaylistRepository) {
        this.repository = repository
    }
 
    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseDeletePlaylist>> {
        try {
            const { playlistId, userId } = httpRequest.params!

            if(!playlistId || !userId) return badRequest(['Invalid datas!'])

            const message = await this.repository.delete({
                playlistId, 
                userId
            })

            return {
                body: {
                    message
                }, 
                statusCode: 200
            }
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }

}