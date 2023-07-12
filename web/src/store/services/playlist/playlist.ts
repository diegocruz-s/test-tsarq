import { Playlist } from "../../../interfaces/playlist/playlist"
import { api } from "../../../utils/api"
import { IDatasOperationMusicPlaylist } from "../../slices/music_playlist/musicPlaylistSlice"
import { IDatasReadPlaylist } from "../../slices/playlists/playlistSlice"

export interface IDatasEditPlaylist {
    id: string
    name: string
}

export const removeMusicPlaylistFetch = async (datas: IDatasOperationMusicPlaylist) => {
    try {
        const response = await api.delete(`/music_playlist/${datas.musicId}/${datas.playlistId}`)
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

export const createPlaylistFetch = async (datas: FormData) => {
    try {
        const response = await api.post('/playlist', datas)
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

export const readPlaylistsFetch = async (datas: IDatasReadPlaylist) => {
    try {
        const response = await api.get(`/playlist?skip=${datas.skip || 0}&take=${datas.take || 10}&name=${datas.name || ''}`)
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

export const deletePlaylistFetch = async (id: string) => {
    try {
        const deleted = await api.delete(`/playlist/${id}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err.response.data
            })

        return deleted
    } catch (error: any) {
        return [error.message]
    }
}

export const editPlaylistFetch = async (datas: IDatasEditPlaylist) => {
    try {
        const edited = await api.patch(`/playlist/${datas.id}`, { 
            name: datas.name
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err.response.data
            })

        return edited
    } catch (error: any) {
        return [error.message]
    }
}

export const readPlaylistFetch = async (id: string) => {
    try {
        const datas = await api.get(`/playlist/${id}`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err.response.data
            })
        return datas
    } catch (error: any) {
        return [error.message]
    }
}