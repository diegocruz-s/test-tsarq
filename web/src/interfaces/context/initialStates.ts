import { Category, Music } from "../musics/musics"
import { Playlist } from "../playlist/playlist"
import { IUser } from "../user/user"

export interface DatasStorage {
    user: Omit<IUser, 'password'>,
    token?: string,
    message?: string,
}

export interface IInitialStates {
    loading: boolean
    error: string[] | null
    success: string | null
    datasStorage?: DatasStorage | null
    musics?: Music[]
    music?: Music
    count?: number
    datasPlay?: { playlist: Playlist, musics: Music[] }
    playlists?: Playlist[]
    playlistName?: string
    categories?: Category[]
    user?: IUser
}
