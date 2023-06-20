import { randomUUID } from 'crypto'
import multer from 'multer'
import path from 'path'

const configs = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../uploads/images'))

    },
    filename: (req, file, cb) => {
        console.log('file:', file)
        const nameImage = file.originalname.split('.')[0]
        cb(null, nameImage + '_' + randomUUID() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: configs,
    
})

export {
    imageUpload
}