import './styles/main.scss'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { readPlaylistFetch } from '../../store/services/playlist/playlist'
import { readPlaylist } from '../../store/slices/playlists/playlistSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

export const Playlist = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { datasPlay } = useAppSelector(state => state.playlist)!

    console.log('playlist:', datasPlay)

    useEffect(() => {
        if(id) dispatch(readPlaylist(id))
    }, [id])

    console.log('id', id)
    return (
        <div className="playlistId">
            <div className="playlistDatas">
                {datasPlay && (
                    <div className="namePlaylist">
                        {datasPlay.playlist.name}
                    </div>
                )}
                
            </div>
            <div className="musicsDatas"></div>
        </div>
    )
}