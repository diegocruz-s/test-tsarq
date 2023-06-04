import { Router } from 'express'
import { PlaylistCreateRepository } from '../repositories/playlist/prisma-create'
import { PlaylistCreateController } from '../controllers/playlist/create/create'
import { checkAuth } from '../helpers/checkAuth'
import { PlaylistDeleteRepository } from '../repositories/playlist/prisma-delete'
import { PlaylistDeleteController } from '../controllers/playlist/delete/delete'

const routes = Router()

routes.use(checkAuth)

routes.post('/', async (req,res) => {
    const playlistCreateRepository = new PlaylistCreateRepository()
    const playlistCreateController = new PlaylistCreateController(playlistCreateRepository)

    const { body, statusCode } = await playlistCreateController.handle({
        body: req.body,
        params: {
            userId: req.userId
        }
    }) 

    return res.status(statusCode).json(body)

})

routes.delete('/:playlistId', async (req,res) => {
    const playlistDeleteRepository = new PlaylistDeleteRepository()
    const playlistDeleteController = new PlaylistDeleteController(playlistDeleteRepository)

    const { body, statusCode } = await playlistDeleteController.handle({
        body: req.body,
        params: {
            userId: req.userId,
            playlistId: req.params.playlistId
        }
    }) 

    return res.status(statusCode).json(body)

})

export {
    routes
}