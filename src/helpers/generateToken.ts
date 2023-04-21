import jwt from 'jsonwebtoken'
import { User } from '../models/user'

export const generateToken = (user: Omit<User, 'password'>) => {

    const token = jwt.sign({
        id: user.id
    }, process.env.SECRET_TOKEN!, {
        expiresIn: '7d'
    })

    return token

}