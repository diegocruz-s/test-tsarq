import { badRequest, internalError, notFound } from '../../../helpers/controllerResponse'
import { validation } from '../../../helpers/validation'
import { HttpRequest } from '../../../interfaces/http/request'
import { HttpResponse } from '../../../interfaces/http/response'
import { IMusicReadManyController, IMusicReadManyRepository, IReadManyResponse } from '../../../interfaces/music/readMany/readMany'
import { QueryReadSchema } from '../../../validators/readQuery/query'

export class MusicReadManyController implements IMusicReadManyController {
    repository: IMusicReadManyRepository
    constructor(repository: IMusicReadManyRepository) {
        this.repository = repository
    }
    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IReadManyResponse>> {
        try {
            const { userId } = httpRequest.params!
            const { skip, take, name } = httpRequest.query!

            if(!userId) {
                return badRequest(['Invalid Datas!'])
            } 
            const checkQueries = await validation({
                schema: QueryReadSchema,
                context: httpRequest.query,
            })
            if(checkQueries.errors) {
                return badRequest(checkQueries.errors)
            }

            const musics = await this.repository.readMany(
                userId, 
                Number(skip),
                Number(take),
                name ? name : undefined
            )
            console.log('musics:', musics)

            return {
                body: {
                    musics
                },
                statusCode: 200
            }
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
        
        
    }
}