import { prisma } from "../../../database/prisma/prisma";
import { IDeleteUserRepository } from "../../../interfaces/user/delete/delete";

export class DeleteUserRepository implements IDeleteUserRepository {
    async delete(id: string): Promise<{ message: string }> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) throw new Error('User not found!')

        const deletedUser = await prisma.user.update({
            where: {
                id ,
            },
            data: {
                active_account: false
            }
        })

        

        if(!deletedUser) throw new Error('Error deleted user!')

        return {
            message: 'Successfully deleted user'
        }
    }

}