import { Router } from 'express'
import { MusicPlaylistCreateRepository } from '../repositories/music_playlist/prisma-create'
import { MusicPlaylistCreateController } from '../controllers/music_playlist/create/create'
import { checkAuth } from '../helpers/checkAuth'
import { MusicPlaylistDeleteController } from '../controllers/music_playlist/delete/delete'
import { MusicPlaylistDeleteRepository } from '../repositories/music_playlist/prisma-delete'

const routes = Router()

routes.use(checkAuth)

routes.post('/:musicId/:playlistId', async (req,res) => {
    const musicPlaylistCreateRepository = new MusicPlaylistCreateRepository()
    const musicPlaylistCreateController = new MusicPlaylistCreateController(musicPlaylistCreateRepository)

    const { body, statusCode } = await musicPlaylistCreateController.handle({
        params: {
            userId: req.userId,
            musicId: req.params.musicId,
            playlistId: req.params.playlistId
        }
    }) 

    return res.status(statusCode).json(body)

})

routes.delete('/:musicId/:playlistId', async (req,res) => {
    const musicPlaylistDeleteRepository = new MusicPlaylistDeleteRepository()
    const musicPlaylistDeleteController = new MusicPlaylistDeleteController(musicPlaylistDeleteRepository)

    const { body, statusCode } = await musicPlaylistDeleteController.handle({
        params: {
            userId: req.userId,
            musicId: req.params.musicId,
            playlistId: req.params.playlistId
        }
    }) 

    return res.status(statusCode).json(body)

})

export {
    routes
}