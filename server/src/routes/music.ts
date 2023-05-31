import { Router } from 'express'

// Controllers
import { MusicCreateController } from '../controllers/music/create/create'

// Middlewares
import { checkAuth } from '../helpers/checkAuth'

// Repositories
import { MusicCreateRepository } from '../repositories/music/prisma-create'

const routes = Router()

routes.use(checkAuth)

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

export {
    routes
}