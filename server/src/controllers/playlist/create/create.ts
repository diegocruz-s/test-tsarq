import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IPlaylistCreateController, IDatasPlaylistCreate, IPlaylistCreateRepository, IResponsePlaylistCreate } from "../../../interfaces/playlist/create/create";
import { Playlist } from "../../../models/playlist";
import { PlaylistCreateSchema } from "../../../validators/playlist/create";

export class PlaylistCreateController implements IPlaylistCreateController {
    repository: IPlaylistCreateRepository
    constructor (repository: IPlaylistCreateRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<Omit<Playlist, "id">>): Promise<HttpResponse<IResponsePlaylistCreate>> {
        try {
            const { userId } = httpRequest.params!
            const { datasFile } = httpRequest.file!
            if(!userId) return badRequest(['Value \'userId\' is not found!']) 
            
            const validationDatas = await validation({
                schema: PlaylistCreateSchema,
                context: httpRequest.body
            })

            if(validationDatas.errors) return badRequest(validationDatas.errors)
            if(!datasFile) return badRequest(['Image required!'])

            
            const datasCreatePlaylist: IDatasPlaylistCreate = {
                name: httpRequest.body!.name,
                userId,
                image: datasFile.filename
            }


            const datas = await this.repository.create(datasCreatePlaylist)
            console.log('datas', datas)

            console.log(datas)
            return {
                body: {
                    playlist: datas,
                    message: 'Playlist created with success!'
                },
                statusCode: 201
            }
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}