import { config } from 'dotenv'
import express, { Express } from "express"

import { routes as routesAuth } from "./routes/auth"
import { routes as routesUser } from "./routes/user"
import { PrismaClient } from '@prisma/client'
import { prisma } from './database/prisma/prisma'

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
        this.app.use(express.json())
    }

    routes () {
        this.app.use('/auth', routesAuth)
        this.app.use('/user', routesUser)
    }
}
 
const app = new AppController().app

export {
    app
}
