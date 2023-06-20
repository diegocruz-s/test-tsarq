import { Express } from 'express'
export interface HttpRequest<B> {
    body?: B
    params?: {
        id?: string
        userId?: string
        musicId?: string
        playlistId?: string
    }
    query?: {
        id?: string
        musicId?: string
        take: number | string
        skip: number | string
        name?: string
    } 
    headers?: {
        range?: string
    }
    file?: {
        datasFile: Express.Multer.File | undefined
    }
}

