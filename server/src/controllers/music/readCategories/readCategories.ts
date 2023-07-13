import { internalError, notFound, ok } from "../../../helpers/controllerResponse";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IReadCategoriesController, IReadCategoriesRepository, IResponseReadCategories } from "../../../interfaces/music/readCategories/readCategories";

export class ReadCategoriesController implements IReadCategoriesController {
    repository: IReadCategoriesRepository

    constructor (repository: IReadCategoriesRepository) {
        this.repository = repository
    }
    async handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseReadCategories>> {
        try {
            const categories = await this.repository.readCategories()

            return ok({ categories })
        } catch (error: any) {
            if(error.message.includes('not found')) return notFound([error.message])
            return internalError([error.message])
        }
    }
}