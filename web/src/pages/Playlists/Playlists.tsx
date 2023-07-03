import styles from './styles/main.module.scss'
import { useEffect, useState } from "react"
import { IDatasReadPlaylist, readPlaylists } from "../../store/slices/playlists/playlistSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { PlaylistItem } from '../../components/PlaylistItem/PlaylistItem'
import { Message } from '../../components/Message/Message'
import { BsFillPlusCircleFill } from 'react-icons/bs'

export const Playlists = () => {
    const dispatch = useAppDispatch()
    const { success, error } = useAppSelector(state => state.playlist)

    const [datasReadPlaylistParams, setDatasReadPlaylistParams] = useState<IDatasReadPlaylist>({
        skip: 0,
        take: 10,
    })
    const [showFormCreate, setShowFormCreate] = useState(false)
    const { playlists, loading } = useAppSelector(state => state.playlist)!

    useEffect(() => {
        dispatch(readPlaylists(datasReadPlaylistParams))
    }, [datasReadPlaylistParams])

    // if(loading) {
    //     return <p>Loading Playlists...</p>
    // }

    return (
        <div className={styles.playlistsPage}>
            <div className={styles.addMusic}>
                <div className={styles.iconPlus}>
                    <BsFillPlusCircleFill 
                        onClick={(() => setShowFormCreate(!showFormCreate))}
                    />
                </div>
            </div>

            {success && <Message message={success} type='success' />}
            {error && <Message message={error[0]} type='error' />}

            {(playlists && playlists.length > 0) ? (
                <div className={styles.playlists}>
                    {playlists.map((playlist, i) => (
                        <PlaylistItem key={i} playlist={playlist} />
                    ))}
                </div>
            ) : (
                <p>Nenhuma playlist encontrada</p>
            )}
            
            {showFormCreate && (
                <div className={styles.formCreate}
                    onClick={(e) => {
                        const clickedElement = e.target
                        if(clickedElement instanceof HTMLElement) {
                            const className = clickedElement.className
                            
                            if(className.includes('formCreate')) setShowFormCreate(false)
                        }
                    }}
                >
                    <div className={styles.componentesForm}>
                        <input type="text" placeholder='Name playlist' />
                        <input type="file" />
                        <button type='submit'>
                            Create
                        </button>
                    </div>
                    
                </div>
            )}
        </div>
    )
}