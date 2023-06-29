import './styles/main.scss'
import { useEffect, useState } from "react"
import { IDatasReadPlaylist, readPlaylists } from "../../store/slices/playlists/playlistSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { PlaylistItem } from '../../components/PlaylistItem/PlaylistItem'

export const Playlists = () => {
    const [datasReadPlaylistParams, setDatasReadPlaylistParams] = useState<IDatasReadPlaylist>({
        skip: 0,
        take: 10,
    })
    const { playlists, loading } = useAppSelector(state => state.playlist)!
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(readPlaylists(datasReadPlaylistParams))
    }, [datasReadPlaylistParams])

    if(loading) {
        return <p>Loading Playlists...</p>
    }

    return (
        <div className="playlistsPage">
            Your Playlists
            {(playlists && playlists.length > 0) ? (
                <div className="playlists">
                    {playlists.map(playlist => (
                        <PlaylistItem playlist={playlist} />
                    ))}
                </div>
            ) : (
                <p>Nenhuma playlist encontrada</p>
            )}
        </div>
    )
}