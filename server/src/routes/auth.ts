import { Router } from 'express'
import { LoginController } from '../controllers/login/auth'
import { AuthRepository } from '../repositories/login/prisma-auth'

const routes = Router()

routes.post('/', async (req,res) => {
    const loginRepository = new AuthRepository()
    const loginController = new LoginController(loginRepository)

    const { body, statusCode } = await loginController.handle(req) 

    return res.status(statusCode).json(body)

})

export {
    routes
}