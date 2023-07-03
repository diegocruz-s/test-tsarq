import styles from './styles/main.module.scss'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { readPlaylist } from '../../store/slices/playlists/playlistSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { PlayMusic } from '../../components/PlayMusic/PlayMusic'

export const Playlist = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { datasPlay } = useAppSelector(state => state.playlist)

    console.log('playlist:', datasPlay)

    useEffect(() => {
        if(id) dispatch(readPlaylist(id))
    }, [id])

    console.log('id', id)
    return (
        <div className={styles.playlistId}>
            {datasPlay && (
                <>
                    <div className={styles.playlistDatas}>

                    <div className={styles.namePlaylist}>
                        {datasPlay.playlist.name}
                    </div>
                    
                    </div>

                    <div className={styles.musicsDatas}>
                    {(datasPlay.musics && datasPlay.musics.length > 0) && (
                        <div className={styles.musics}>
                            {datasPlay.musics.map(music => (
                                <div key={music.id} className={styles.music}>
                                    {music.name}
                                </div>
                            ))}
                        </div>
                    )}
                    </div>

                    <div className={styles.executeMusic}></div>
                </>
            )}
           

        </div>
    )
}