import { Router } from 'express'
import path from 'path'

// Controllers
import { CreateUserController } from '../controllers/user/create/create'
import { DeleteUserController } from '../controllers/user/delete/delete'
import { UpdateUserController } from '../controllers/user/update/update'
// Middlewares
import { checkAuth } from '../helpers/checkAuth'
import { musicUpload } from '../helpers/musicUpload'
import { MusicCreateController } from '../controllers/music/create/create'
import { MusicCreateRepository } from '../repositories/music/prisma-create'
// Repositories


const routes = Router()

routes.post('/', async (req,res) => {
    const createMusicRepository = new MusicCreateRepository()
    const createMusicController = new MusicCreateController(createMusicRepository)

    const { body, statusCode } = await createMusicController.handle({
        body: req.body,
        params: {
            userId: req.userId
        }
    }) 

    return res.status(statusCode).json(body)

})

routes.use(checkAuth)

export {
    routes
}