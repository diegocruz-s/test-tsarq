import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import express, { Express } from "express"
import path from 'path'

import { prisma } from './database/prisma/prisma'
import { routes as routesAuth } from "./routes/auth"
import { routes as routesUser } from "./routes/user"

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
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use('/user', express.static(path.resolve(__dirname, 'uploads')))
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
