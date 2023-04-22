import { Router } from 'express'

// Middlewares
import { checkAuth } from '../helpers/checkAuth'

// Repositories
import { CreateUserRepository } from '../repositories/user/create/prisma-create-user'
import { UpdateUserRepository } from '../repositories/user/update/prisma-update-user'
import { DeleteUserRepository } from '../repositories/user/delete/prisma-delete-user'

// Controllers
import { CreateUserController } from '../controllers/user/create/create'
import { UpdateUserController } from '../controllers/user/update/update'
import { DeleteUserController } from '../controllers/user/delete/delete'

const routes = Router()

routes.post('/', async (req,res) => {
    const createUserRepository = new CreateUserRepository()
    const createUserController = new CreateUserController(createUserRepository)

    const { body, statusCode } = await createUserController.handle(req) 

    return res.status(statusCode).json(body)

})

routes.use(checkAuth)

routes.patch('/:id', async (req, res) => {
    const updateUserRepository = new UpdateUserRepository()
    const updateUserController = new UpdateUserController(updateUserRepository)
    
    const { body, statusCode } = await updateUserController.handle({
        body: req.body ,
        params: {
            id: req.params.id,
            userId: req.userId
        }
    }) 

    return res.status(statusCode).json(body)
})

routes.delete('/:id', async(req, res) => {
    const deleteUserRepository = new DeleteUserRepository()
    const deleteUserController = new DeleteUserController(deleteUserRepository)

    const { body, statusCode } = await deleteUserController.handle({
        params: {
            id: req.params.id,
            userId: req.userId
        }
    }) 

    return res.status(statusCode).json(body)
}) 

export {
    routes
}