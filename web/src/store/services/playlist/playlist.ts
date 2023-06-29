import { api } from "../../../utils/api"
import { IDatasReadPlaylist } from "../../slices/playlists/playlistSlice"

export const readPlaylistsFetch = async (datas: IDatasReadPlaylist) => {
    try {
        const response = await api.get(`/playlist?skip=${datas.skip || 0}&take=${datas.take || 10}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err.response.data
            })

        return response
    } catch (error: any) {
        return [error.message]
    }
}