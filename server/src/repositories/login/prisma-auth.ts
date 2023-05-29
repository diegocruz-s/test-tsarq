import { prisma } from "../../database/prisma/prisma";
import { IAuthBody, IAuthRepository } from "../../interfaces/login/auth";
import { User } from "../../models/user";
import { compareSync } from "bcrypt";

export class AuthRepository implements IAuthRepository {
    async login(body: IAuthBody): Promise<Omit<User, 'password'>> {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if(!user) {
            throw new Error('Authentication invalid!!')
        }

        const checkPwd = compareSync(body.password, user.password)

        if(!checkPwd) {
            throw new Error('Authentication invalid!')
            
        }

        const { password, ...rest } = user

        return rest

    }
}
