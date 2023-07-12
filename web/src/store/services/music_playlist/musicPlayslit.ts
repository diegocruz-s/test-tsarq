import { api } from "../../../utils/api";
import { IDatasOperationMusicPlaylist } from "../../slices/music_playlist/musicPlaylistSlice";

export const addMusicPlaylistFetch = async (datas: IDatasOperationMusicPlaylist) => {
    try {
        const response = await api.post(`/music_playlist/${datas.musicId}/${datas.playlistId}`)
            .then (res => {
                return res.data
            })
            .catch(err => {
                return err.respose.data
            })

        return response
    } catch (error: any) {
        return [error.message]
    }
}

