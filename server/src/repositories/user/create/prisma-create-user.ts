import { prisma } from "../../../database/prisma/prisma";
import { ICreateUserRepository } from "../../../interfaces/user/create/create";
import { User } from "../../../models/user";

export class CreateUserRepository implements ICreateUserRepository {
    async create (user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
        const userFound = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: user.email },
                    { username: user.username }
                ]
            }
        })

        if(userFound) {
            throw new Error('User already exists!')
        }

        const newUser = await prisma.user.create({
            data: {
                ...user,
                active_account: true
            }
        })

        if(!newUser) {
            throw new Error('Error create user!')
        }

        const { password, ...rest } = newUser

        return rest

    }
}