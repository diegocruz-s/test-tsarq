import './styles/main.scss'
import { useEffect, useState } from "react"
import { IDatasReadPlaylist, readPlaylists } from "../../store/slices/playlists/playlistSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
const imagesSaves = 'http://localhost:3000/uploads/images'

export const Playlists = () => {
    const [datasReadPlaylistParams, setDatasReadPlaylistParams] = useState<IDatasReadPlaylist>({
        skip: 0,
        take: 10,
    })
    const { playlists, loading } = useAppSelector(state => state.playlist)!
    const dispatch = useAppDispatch()

    console.log('playlists:', playlists)

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
                        <div className="playlist" key={playlist.id}>
                            <a href={`/playlists/${playlist.id}`} className="linkPlaylist">
                                <img src={`${imagesSaves}/${playlist.image}`} alt="" />

                                <div className="texts">
                                    <p>{playlist.name}</p>
                                    <p>{playlist._count.musics > 1 ?  
                                    playlist._count.musics + ' musics' : 
                                    playlist._count.musics + ' music' } </p>
                                </div>
                                
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma playlist encontrada</p>
            )}
        </div>
    )
}