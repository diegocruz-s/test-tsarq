import { Router } from 'express'

// Controllers
import { MusicCreateController } from '../controllers/music/create/create'

// Middlewares
import { checkAuth } from '../helpers/checkAuth'

// Repositories
import { MusicCreateRepository } from '../repositories/music/prisma-create'
import { MusicDeleteRepository } from '../repositories/music/prisma-delete'
import { MusicDeleteController } from '../controllers/music/delete/delete'

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

routes.delete('/:musicId', async (req,res) => {
    const deleteMusicRepository = new MusicDeleteRepository()
    const deleteMusicController = new MusicDeleteController(deleteMusicRepository)

    const { body, statusCode } = await deleteMusicController.handle({
        body: req.body,
        params: {
            userId: req.userId,
            musicId: req.params.musicId
        }
    }) 

    return res.status(statusCode).json(body)

})

export {
    routes
}