import { prisma } from "../../../database/prisma/prisma";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDatasAllowedUpdate, IUpdateResponse, IUpdateUserRepository } from "../../../interfaces/user/update/update";
import { User } from "../../../models/user";

export class UpdateUserRepository implements IUpdateUserRepository {
    
    async update(id: string, datas: IDatasAllowedUpdate): Promise<Omit<User, "password">> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            throw new Error("User not found!");
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: datas
        })

        if(!updatedUser) {
            throw new Error("Error updated user!");
        }

        const { password, ...rest } = updatedUser

        return rest
    }

}