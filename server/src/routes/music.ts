import { RequestHandler, Router } from 'express'

// Controllers
import { MusicCreateController } from '../controllers/music/create/create'

// Middlewares
import { IdUserVerify, checkAuth } from '../helpers/checkAuth'

// Repositories
import { MusicCreateRepository } from '../repositories/music/prisma-create'
import { MusicDeleteRepository } from '../repositories/music/prisma-delete'
import { MusicDeleteController } from '../controllers/music/delete/delete'
import { MusicReadManyRepository } from '../repositories/music/prisma-readMany'
import { MusicReadManyController } from '../controllers/music/readMany/readMany'
// import { PlayMusicController } from '../controllers/music/playMusic/playMusic'
import { IResponsePlayMusic } from '../interfaces/music/playMusic/playMusic'
import { badRequest, internalError, notFound } from '../helpers/controllerResponse'
import { createReadStream, statSync } from 'fs'
import rangeParser from 'range-parser'
import path from 'path'
import jwt from 'jsonwebtoken'
import { PlayMusicRepository } from '../repositories/music/prisma-playMusic'
import { CountMusicRepository } from '../repositories/music/prisma-count'
import { CountMusicController } from '../controllers/music/count/count'
import { ReadCategoriesRepository } from '../repositories/music/prisma-readCategories'
import { ReadCategoriesController } from '../controllers/music/readCategories/readCategories'
export interface IdUser {
    id: string;
}

const routes = Router()
  
// PlayMusic
routes.get('/:musicId/:userId/:token', async (req, res, next) => {
    try {
        console.log('foi')
        const { musicId, token, userId } = req.params!
        console.log(musicId, token, userId)

        const checkToken = jwt.verify(token, process.env.SECRET_TOKEN!) as IdUser | null
        if(!checkToken) return res.status(422).json({
            errors: ['Token invalid!']
        })
        if(checkToken.id !== userId) return res.status(422).json({
            errors: ['Invalid datas!']
        })

        const playMusicRepository = new PlayMusicRepository()
        // console.log('ok até aqui')
        const datasMusic = await playMusicRepository.readMusic({
            musicId,
            userId
        })
        if(!datasMusic) return res.status(404).json({
            errors: ['Music not found!']
        })

        const musicPath = path.join(__dirname, `../../../server/src/uploads/${datasMusic.name}.mp3`)
        const musicStat = statSync(musicPath)

        let range = req.headers.range;
        if(!range || range === 'bytes=-') {
            range = 'bytes=0-'
        }

        const positions = rangeParser(musicStat.size, range, { combine: true }) as rangeParser.Ranges
        const start = positions[0]?.start || 0;
        const end = positions[0]?.end || musicStat.size - 1;
        const chunkSize = (end - start) + 1;

        console.log('------------------------')
        console.log('range: ', range)
        console.log('start: ', start)
        console.log('end: ', end)
        console.log('chunkSize: ', chunkSize)

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${musicStat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'audio/mpeg', 
        });
    
        const stream = createReadStream(musicPath, { start, end });
    
        stream.on('open', () => {
            stream.pipe(res);
        });
        
        stream.on('error', (err: any) => {
            res.end('errorStream:', err.message);
        });
        
       
    } catch (error: any) {
        return internalError([error.message]) 
    }
    
 })

routes.use(checkAuth)

routes.get('/count', async (req,res) => {
    const countMusicRepository = new CountMusicRepository()
    const countMusicController = new CountMusicController(countMusicRepository)

    const { body, statusCode } = await countMusicController.handle({
        body: req.body,
        params: {
            userId: req.userId,
        }
    }) 

    return res.status(statusCode).json(body)

})

routes.post('/', async (req,res) => {
    const createMusicRepository = new MusicCreateRepository()
    const createMusicController = new MusicCreateController(createMusicRepository)

    console.log(req.body)

    const { body, statusCode } = await createMusicController.handle({
        body: {
            ...req.body,
            year: Number(req.body.year || '')
        },
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

routes.get('/', async (req,res) => {
    console.log('ok')
    const readManyMusicRepository = new MusicReadManyRepository()
    const readManyMusicController = new MusicReadManyController(readManyMusicRepository)

    const { body, statusCode } = await readManyMusicController.handle({
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

routes.get('/categories', async (req, res) => {
    const readCategoriesRepository = new ReadCategoriesRepository()
    const readCategoriesController = new ReadCategoriesController(readCategoriesRepository)

    const { body, statusCode } = await readCategoriesController.handle({})

    return res.status(statusCode).json(body)

})

export {
    routes
}
































// const musicPath = path.join(__dirname, `../../../server/src/uploads/familia-bezerra-podcats-4-temp-11.mp3`)
//     console.log('path:', musicPath)
//     const musicStat = statSync(musicPath)

//     let range = req.headers.range;
//     if(!range || range === 'bytes=-') {
//         range = 'bytes=0-'
//     }

//     const positions = rangeParser(musicStat.size, range, { combine: true }) as rangeParser.Ranges
//     console.log('positions:', positions)
//     const start = positions[0]?.start || 0;
//     const end = positions[0]?.end || musicStat.size - 1;
//     const chunkSize = (end - start) + 1;
  
//     console.log('range: ', range)
//     console.log('start: ', start)
//     console.log('end: ', end)
//     console.log('chunkSize: ', chunkSize)

//     res.writeHead(206, {
//       'Content-Range': `bytes ${start}-${end}/${musicStat.size}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunkSize,
//       'Content-Type': 'audio/mpeg', 
//     });
   
//     const stream = createReadStream(musicPath, { start, end });
  
//     stream.on('open', () => {
//         stream.pipe(res);
//     });
    
//     stream.on('error', (err) => {
//         res.end(err);
//     });