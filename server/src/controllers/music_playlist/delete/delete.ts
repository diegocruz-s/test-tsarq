import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IMusicPlaylistDeleteController, IMusicPlaylistDeleteRepository, IResponseMusicPlaylistDelete } from "../../../interfaces/music_playlist/delete/delete";
import { ParamsMusicPlaylistSchema } from "../../../validators/music_playlist/params";

export class MusicPlaylistDeleteController implements IMusicPlaylistDeleteController{
    repository: IMusicPlaylistDeleteRepository
    constructor(repository: IMusicPlaylistDeleteRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseMusicPlaylistDelete>> {
        try {
            const { userId, musicId, playlistId } = httpRequest.params!
            const validationErrors = await validation({
                schema: ParamsMusicPlaylistSchema,
                context: httpRequest.params
            })

            if(validationErrors.errors) return badRequest(validationErrors.errors)

            const deletedMusic = await this.repository.delete({
                musicId: musicId!,
                playlistId: playlistId!,
                userId: userId!
            })

            return {
                body: {
                    message: deletedMusic
                },
                statusCode: 200
            }

        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}