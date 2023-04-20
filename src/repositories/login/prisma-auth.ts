import e from "express";
import { prisma } from "../../database/prisma/prisma";
import { IAuthBody, IAuthRepository } from "../../interfaces/login/auth";
import { User } from "../../models/user";

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

        const checkPwd = user.password === body.password

        if(!checkPwd) {
            throw new Error('Authentication invalid!')
            
        }

        const { password, ...rest } = user

        return rest

    }
}
