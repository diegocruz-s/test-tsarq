import { IDatasGetMusics, Music } from "../../../interfaces/musics/musics";
import { api } from "../../../utils/api";

export const createMusicFetch = async (datas: Partial<Music>) => {
    try {
        const newMusic = await api.post('/music', datas)
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
                
            })

        return newMusic
    } catch (error: any) {
        return [error.message]
    }
}

export const deleteMusicFetch = async(id: string) => {
    try {
        const message = await api.delete(`/music/${id}`)
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
                
            })

        return message

    } catch (error: any) {
        return [error.message]
    }
}

export const getMusicsFetch = async (datas: IDatasGetMusics) => {
    try {
        const musics = await api.get(
            `/music?take=${datas.take || 10}&skip=${datas.skip || 0}&name=${datas.name || ''}`
        )
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
                
            })

        return musics

    } catch (error: any) {
        return [error.message]
    }
}

export const countMusicsFetch = async () => {
    try {
        const musics = await api.get(
            `/music/count`
        )
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
            })

        return musics

    } catch (error: any) {
        return [error.message]
    }
}