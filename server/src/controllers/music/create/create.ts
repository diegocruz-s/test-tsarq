import { badRequest, internalError } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IMusicCreateController, IMusicCreateRepository, IResponseMusicCreate } from "../../../interfaces/music/create/create";
import { Music } from "../../../models/music";
import { createMusicSchema } from "../../../validators/music/create";
import { dinamicFieldsMusic } from "../../../helpers/datasMusic";
import { musicUpload } from "../../../helpers/musicUpload";

export class MusicCreateController implements IMusicCreateController {
    repository: IMusicCreateRepository
    constructor (repository: IMusicCreateRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<Music>): Promise<HttpResponse<IResponseMusicCreate>> {
        try {
            const validationDatas = await validation({
                schema: createMusicSchema,
                context: httpRequest.body
            })
    
            if(validationDatas.errors) {
                return badRequest(validationDatas.errors)
            }
    
            const { url } = httpRequest.body!
            const userId = httpRequest.params?.userId
    
            const infoMusic = await dinamicFieldsMusic(url!)
            // const errorInfoMusic = Object.entries(infoMusic).map((key, value) => {
            //     return key !== null ? false : true
            // })
            // console.log('errorInfoMusic:', errorInfoMusic)
            // if(errorInfoMusic.includes(true)) {
            //     return badRequest(['Errors catch datas music'])
            // }
            if(!infoMusic) {
                return badRequest(['Errors catch datas music'])
            }
            console.log('infoMusic:', infoMusic)
    
            const datasMusic = {
                ...httpRequest.body!,
                duration: infoMusic.duration!,
                name: infoMusic.name!,
            }

            const checkExistsMusic = await this.repository.checkExistsMusic(datasMusic.name)

            if(!checkExistsMusic) {
                const uploadMusic = await musicUpload(url, infoMusic.name!)
                    .catch(() => new Error('Error upload music!!!'))

                if(!uploadMusic) {
                    return internalError(['Error music upload!!'])
                }
            }

            const music: Music = await this.repository.create(userId!, datasMusic)
    
            return {
                statusCode: 201,
                body: {
                    music,
                    message: 'Created Music!'
                }
            }
        } catch (error: any) {
            return internalError(error.message)
        }
    }
}

