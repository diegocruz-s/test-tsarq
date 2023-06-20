import ytdl from "ytdl-core"

export interface IDatasReturnInfoMusic {
    name: string | null, 
    duration: string | null,
    thumbnail: string | null
}

export async function dinamicFieldsMusic (url: string): Promise<IDatasReturnInfoMusic | false> {
    try {
        const infoMusic = await ytdl.getBasicInfo(url!)
        
        const nameFormat = infoMusic.videoDetails.title
            .replace(' - YouTube', '')
            .toLowerCase()
            .replaceAll(' ', '-')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replaceAll(/[^a-zA-Z0-9\-]+/g, '')
            .replaceAll('--', '-')
            .replaceAll('---', '-')
        return {
            duration: infoMusic.videoDetails.lengthSeconds,
            name: nameFormat,
            thumbnail: infoMusic.videoDetails.thumbnail.thumbnails[0].url
        }
    } catch (error: any) {
        console.log('Error catch infos music', error.message)
        return false
    }
    
}