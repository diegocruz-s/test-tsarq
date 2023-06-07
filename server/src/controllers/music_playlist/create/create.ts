import { badRequest, internalError } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IMusicPlaylistCreateController, IMusicPlaylistCreateRepository, IResponseMusicPlaylistCreate } from "../../../interfaces/music_playlist/create/create";
import { ParamsCreateMusicPlaylistSchema } from "../../../validators/music_playlist/create";

export class MusicPlaylistCreateController implements IMusicPlaylistCreateController {
    repository: IMusicPlaylistCreateRepository
    constructor(repository: IMusicPlaylistCreateRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseMusicPlaylistCreate>> {
        try {
            const { userId, musicId, playlistId } = httpRequest.params!

            const validationErrors = await validation({
                schema: ParamsCreateMusicPlaylistSchema,
                context: httpRequest.params
            })
            if(validationErrors.errors) return badRequest(validationErrors.errors)

            const musicPlaylist = await this.repository.create({
                userId: userId!,
                musicId: musicId!, 
                playlistId: playlistId!,
            })

            return {
                body: {
                    musicPlaylist ,
                    message: 'Music added playlist with success!'
                },
                statusCode: 201
            }
        } catch (error: any) {
            return internalError([error.message])
        }
    }
}