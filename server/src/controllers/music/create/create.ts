import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
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
                console.log(validationDatas.errors)
                return badRequest(validationDatas.errors)
            }
    
            const { url } = httpRequest.body!
            const { userId } = httpRequest.params!
            if(!userId) return badRequest(['Invalid datas(userId required)!'])

            await this.repository.checkExistsUser(userId)
    
            const infoMusic = await dinamicFieldsMusic(url!)
            console.log('infoMusic:', infoMusic)

            if(!infoMusic) {
                return badRequest(['Errors catch datas music'])
            }
            console.log('infoMusic:', infoMusic)
    
            const datasMusic = {
                ...httpRequest.body!,
                duration: infoMusic.duration!,
                name: infoMusic.name!,
                image: infoMusic.thumbnail!
            }
            console.log('datasMusic:', datasMusic)

            const checkExistsMusic = await this.repository.checkExistsMusic(datasMusic.name)

            if(!checkExistsMusic) {
                console.log('Entrou no download')
                const uploadMusic = await musicUpload(url, infoMusic.name!)
                    .catch(() => new Error('Error upload music!!!'))

                console.log('uploadMusic:', uploadMusic)
                if(typeof uploadMusic !== 'string') {
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
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}
