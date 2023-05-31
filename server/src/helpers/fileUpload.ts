import { randomUUID } from 'crypto'
import multer from 'multer'
import path from 'path'

const configs = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../uploads')),
    filename: (req, file, cb) => {
        cb(null, randomUUID() + path.extname(file.originalname))
    }
})

const musicUpload = multer({
    storage: configs,
    
})

export {
    musicUpload
}