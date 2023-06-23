import { IDatasGetMusics } from "../../../interfaces/musics/musics";
import { api } from "../../../utils/api";

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