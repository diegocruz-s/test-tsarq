import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'
interface IdUserVerify {
    id: string
}

export const checkAuth: RequestHandler = async (req, res, next): Promise<any> => {
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            return res.status(422).json({
                errors: ['Access denied!!']
            })
        }

        const [, token] = authorization.split(' ')
        if(!token) {
            return res.status(422).json({
                errors: ['Token invalid']
            })
        }

        const checkToken = await jwt.verify(token, process.env.SECRET_TOKEN!) 
        if(checkToken) {
            const { id } = checkToken as IdUserVerify

            req.userId = id
            
            next()
        }

    } catch (error: any) {
        return res.status(500).json({
            errors: [error.message]
        })
    }
}