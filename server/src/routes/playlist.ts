import { Router } from 'express'
import { PlaylistCreateRepository } from '../repositories/playlist/prisma-create'
import { PlaylistCreateController } from '../controllers/playlist/create/create'
import { checkAuth } from '../helpers/checkAuth'
import { PlaylistDeleteRepository } from '../repositories/playlist/prisma-delete'
import { PlaylistDeleteController } from '../controllers/playlist/delete/delete'
import { PlaylistUpdateRepository } from '../repositories/playlist/prisma-update'
import { PlaylistUpdateController } from '../controllers/playlist/update/update'
import { PlaylistReadRepository } from '../repositories/playlist/prisma-read'
import { PlaylistReadController } from '../controllers/playlist/read/read'
import { PlaylistReadForIdRepository } from '../repositories/playlist/prisma-readForId'
import { PlaylistReadForIdController } from '../controllers/playlist/readForId/readForId'
import { imageUpload } from '../helpers/fileUpload'
const routes = Router()

routes.use(checkAuth)

routes.post('/', imageUpload.single('image'), async (req,res) => {
    const playlistCreateRepository = new PlaylistCreateRepository()
    const playlistCreateController = new PlaylistCreateController(playlistCreateRepository)
    console.log('fileName:', req.file?.filename)

    const { body, statusCode } = await playlistCreateController.handle({
        body: req.body,
        params: {
            userId: req.userId
        },
        file: {
            datasFile: req.file
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

routes.patch('/:playlistId', async (req,res) => {
    const playlistUpdateRepository = new PlaylistUpdateRepository()
    const playlistUpdateController = new PlaylistUpdateController(playlistUpdateRepository)

    const { body, statusCode } = await playlistUpdateController.handle({
        body: req.body,
        params: {
            userId: req.userId,
            playlistId: req.params.playlistId
        }
    }) 

    return res.status(statusCode).json(body)

})

routes.get('/', async (req,res) => {
    const playlistReadRepository = new PlaylistReadRepository()
    const playlistReadController = new PlaylistReadController(playlistReadRepository)

    const { body, statusCode } = await playlistReadController.handle({
        body: req.body,
        params: {
            userId: req.userId
        },
        query: {
            skip: Number(req.query.skip),
            take: Number(req.query.take), 
            name: req.query.name ? String(req.query.name) : undefined,
        }
    }) 

    return res.status(statusCode).json(body)

})


routes.get('/:playlistId', async (req,res) => {
    const playlistReadForIdRepository = new PlaylistReadForIdRepository()
    const playlistReadForIdController = new PlaylistReadForIdController(playlistReadForIdRepository)

    const { body, statusCode } = await playlistReadForIdController.handle({
        body: req.body,
        params: {
            userId: req.userId,
            playlistId: req.params.playlistId
        },
    }) 

    return res.status(statusCode).json(body)

})

export {
    routes
}