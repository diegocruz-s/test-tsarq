import { Router } from 'express'
import { LoginController } from '../controllers/login/auth'
import { AuthRepository } from '../repositories/login/prisma-auth'
import { CreateUserRepository } from '../repositories/user/create/prisma-create-user'
import { CreateUserController } from '../controllers/user/create/create'
import { checkAuth } from '../helpers/checkAuth'

const routes = Router()

routes.post('/', async (req,res) => {
    const createUserRepository = new CreateUserRepository()
    const createUserController = new CreateUserController(createUserRepository)

    const { body, statusCode } = await createUserController.handle(req) 

    return res.status(statusCode).json(body)

})

routes.patch('/:id', checkAuth, async (req, res) => {
    return res.status(201).json({
        update: req.params.id
    })
})

export {
    routes
}