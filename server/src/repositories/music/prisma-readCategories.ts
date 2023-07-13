import { Category } from "@prisma/client";
import { IReadCategoriesRepository } from "../../interfaces/music/readCategories/readCategories";
import { prisma } from "../../database/prisma/prisma";

export class ReadCategoriesRepository implements IReadCategoriesRepository {
    async readCategories(): Promise<Category[]> {
        const readCategories = await prisma.category.findMany()

        if(!readCategories) throw new Error('Categories not found!')

        return readCategories

    }
}

