import { Category } from "@prisma/client";
import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export type IResponseReadCategories = {
    categories: Category[]
} | {
    errors: string[]
}

export interface IReadCategoriesController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IResponseReadCategories>>
}

export interface IReadCategoriesRepository {
    readCategories (): Promise<Category[]>
}