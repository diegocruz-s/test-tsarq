import './styles/main.scss'
import { useEffect, useState } from "react"
import { IDatasReadPlaylist, readPlaylists } from "../../store/slices/playlists/playlistSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { PlaylistItem } from '../../components/PlaylistItem/PlaylistItem'
import { Message } from '../../components/Message/Message'

export const Playlists = () => {
    const dispatch = useAppDispatch()
    const { success, error } = useAppSelector(state => state.playlist)!

    const [datasReadPlaylistParams, setDatasReadPlaylistParams] = useState<IDatasReadPlaylist>({
        skip: 0,
        take: 10,
    })
    const { playlists, loading } = useAppSelector(state => state.playlist)!

    useEffect(() => {
        dispatch(readPlaylists(datasReadPlaylistParams))
    }, [datasReadPlaylistParams])

    // if(loading) {
    //     return <p>Loading Playlists...</p>
    // }

    return (
        <div className="playlistsPage">
            Your Playlists
            {success && <Message message={success} type='success' />}
            {error && <Message message={error[0]} type='error' />}

            {(playlists && playlists.length > 0) ? (
                <div className="playlists">
                    {playlists.map((playlist, i) => (
                        <PlaylistItem key={i} playlist={playlist} />
                    ))}
                </div>
            ) : (
                <p>Nenhuma playlist encontrada</p>
            )}
        </div>
    )
}