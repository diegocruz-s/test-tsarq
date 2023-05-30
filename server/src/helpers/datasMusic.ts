import ytdl from "ytdl-core"

export interface IDatasReturnInfoMusic {
    name: string | null, 
    duration: string | null
}

export async function dinamicFieldsMusic (url: string): Promise<IDatasReturnInfoMusic> {
    try {
        const infoMusic = await ytdl.getBasicInfo(url!)
        return {
            name: infoMusic.videoDetails.lengthSeconds,
            duration: infoMusic.videoDetails.title
        }
    } catch (error: any) {
        console.log('Error catch infos music', error.message)
        return {
            name: null,
            duration: null
        }
    }
    
}