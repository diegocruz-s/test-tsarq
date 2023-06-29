import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import express, { Express } from "express"
import path from 'path'
import cors from 'cors'
import { prisma } from './database/prisma/prisma'
import { routes as routesAuth } from "./routes/auth"
import { routes as routesUser } from "./routes/user"
import { routes as routesMusic } from "./routes/music"
import { routes as routesPlaylist} from "./routes/playlist"
import { routes as routesMusicPlaylist} from "./routes/music_playlist"

class AppController {
    app: Express
    prisma: PrismaClient

    constructor (){
        config()
        this.prisma = prisma
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares (){
        this.app.use(cors())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use('/user', express.static(path.resolve(__dirname, 'uploads')))
        this.app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))
    }

    routes () {
        this.app.use('/auth', routesAuth)
        this.app.use('/user', routesUser) 
        this.app.use('/music', routesMusic) 
        this.app.use('/playlist', routesPlaylist) 
        this.app.use('/music_playlist', routesMusicPlaylist) 
    }
}
 
const app = new AppController().app

export {
    app
}
