import { Router } from 'express'
import path from 'path'

// Controllers
import { CreateUserController } from '../controllers/user/create/create'
import { DeleteUserController } from '../controllers/user/delete/delete'
import { UpdateUserController } from '../controllers/user/update/update'
// Middlewares
import { checkAuth } from '../helpers/checkAuth'
// Repositories
import { CreateUserRepository } from '../repositories/user/create/prisma-create-user'
import { DeleteUserRepository } from '../repositories/user/delete/prisma-delete-user'
import { UpdateUserRepository } from '../repositories/user/update/prisma-update-user'
import { ReadUserRepository } from '../repositories/user/read/read'
import { ReadUserController } from '../controllers/user/read/read'

const routes = Router()

routes.post('/', async (req,res) => {
    const createUserRepository = new CreateUserRepository()
    const createUserController = new CreateUserController(createUserRepository)

    const { body, statusCode } = await createUserController.handle({
        body: req.body
    }) 

    return res.status(statusCode).json(body)

})

routes.use(checkAuth)

routes.get('/', async (req, res) => {
    const readUserRepository = new ReadUserRepository()
    const readUserController = new ReadUserController(readUserRepository)

    const { body, statusCode } = await readUserController.handle({
        params: {
            userId: req.userId
        }
    })

    return res.status(statusCode).json(body)

})

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