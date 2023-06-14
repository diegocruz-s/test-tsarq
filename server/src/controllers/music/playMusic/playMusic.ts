// import path from "path";
// import { badRequest, internalError, notFound } from "../../../helpers/controllerResponse";
// import { validation } from "../../../helpers/validation";
// import { HttpRequest } from "../../../interfaces/http/request";
// import { HttpResponse } from "../../../interfaces/http/response";
// import { IPlayMusicController, IPlayMusicRepository, IResponsePlayMusic,  } from "../../../interfaces/music/playMusic/playMusic";
// import { Playlist } from "../../../models/playlist";
// import { PlayMusicParamsSchema } from "../../../validators/music/playMusicParams";
// // import {} from '../../../uploads/'
// import { statSync } from "fs";
// import rangeParser from 'range-parser'

// export class PlayMusicController implements IPlayMusicController {
//     repository: IPlayMusicRepository
//     constructor(repository: IPlayMusicRepository) {
//         this.repository = repository
//     }

//     async handle(httpRequest: HttpRequest<null>): Promise<IResponsePlayMusic>  {
//         try {
//             console.log('Chamou')
//             const validationErrors = await validation({
//                 schema: PlayMusicParamsSchema,
//                 context: httpRequest.params
//             })
//             if(validationErrors.errors) { 
//                 return {
//                     errors: validationErrors.errors
//                 }
//             }

//             const { musicId, userId } = httpRequest.params!

//             const music = await this.repository.readMusic({
//                 musicId: musicId!,
//                 userId: userId!
//             })

//             if (!music) return false

//             return {
//                 name: music.name
//             }

//             // const musicPath = path.join(__dirname, `../../../uploads/${music.name}.mp3`)
//             // console.log('path:', musicPath)
//             // const musicStat = statSync(musicPath)

//             // let range = httpRequest.headers?.range

//             // if(!range || range === "bytes=-") {
//             //     range = 'bytes=0-'
//             // }


//             // // const parts = range.replace(/bytes=/, '').split('-')
//             // // console.log('parts:', range.replace(/bytes=/, '').split('-'))
//             // // const start = parseInt(parts[0], 10)
//             // // const end = parts[1] ? parseInt(parts[1], 10) : musicStat.size - 1

//             // const positions = rangeParser(musicStat.size, range, { combine: true }) as rangeParser.Ranges
//             // console.log('rangeDatas: ', range)

//             // const start = positions[0].start
//             // console.log('start: ', start)

//             // const end = positions[0].end
//             // console.log('end: ', end)

//             // const chunk = (end - start) + 1
//             // console.log('chunkSize: ', chunk)

//             // const objReturn: IResponsePlayMusic = {
//             //     start,
//             //     end,
//             //     chunk,
//             //     size: musicStat.size,
//             //     musicPath 
//             // }

//             // return objReturn

//         } catch (error: any) {
//             // if(error.message.includes('not found')) {return notFound([error.message])}
//             return {
//                 errors: [error.message]
//             }
//         }
//     }
// }