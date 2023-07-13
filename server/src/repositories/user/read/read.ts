import { User } from "@prisma/client";
import { IReadUserRepository } from "../../../interfaces/user/read/read";
import { prisma } from "../../../database/prisma/prisma";

export class ReadUserRepository implements IReadUserRepository {
    async read(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) throw new Error('User not found!')

        return user
    }
}

