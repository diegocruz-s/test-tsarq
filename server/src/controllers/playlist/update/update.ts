import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IPlaylistUpdateController, IResponsePlaylistUpdate, IPlaylistUpdateRepository } from "../../../interfaces/playlist/update/update";
import { Playlist } from "../../../models/playlist";
import { UpdatePlaylistSchema } from "../../../validators/playlist/update";

export class PlaylistUpdateController implements IPlaylistUpdateController {
    repository: IPlaylistUpdateRepository
    constructor (repository: IPlaylistUpdateRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<Omit<Playlist, "id">>): Promise<HttpResponse<IResponsePlaylistUpdate>> {
        try {
            const { userId, playlistId } = httpRequest.params!
            if(!userId || !playlistId) return badRequest(['Invalid datas!'])

            const validationErrors = await validation({
                schema: UpdatePlaylistSchema,
                context: httpRequest.body
            })

            if(validationErrors.errors) return badRequest(validationErrors.errors)

            const datasUpdatePlaylist: Playlist = {
                id: playlistId,
                name: httpRequest.body?.name!,
                userId
            }

            const playlist = await this.repository.update(datasUpdatePlaylist)

            return {
                body: {
                    playlist,
                    message: 'Playlist updated with success'
                },
                statusCode: 200
            }

        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}