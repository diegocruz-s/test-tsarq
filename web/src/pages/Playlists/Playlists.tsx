import styles from './styles/main.module.scss'
import { useEffect, useState } from "react"
import { IDatasReadPlaylist, createPlaylist, readPlaylists } from "../../store/slices/playlists/playlistSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { PlaylistItem } from '../../components/PlaylistItem/PlaylistItem'
import { Message } from '../../components/Message/Message'
import { BsFillPlusCircleFill } from 'react-icons/bs'
export interface IDatasCreatePlaylist {
    name: string
    image: string | File
}

export const Playlists = () => {
    const dispatch = useAppDispatch()
    const { success, error } = useAppSelector(state => state.playlist)

    const [datasReadPlaylistParams, setDatasReadPlaylistParams] = useState<IDatasReadPlaylist>({
        skip: 0,
        take: 10,
    })
    const [showFormCreate, setShowFormCreate] = useState(false)
    const [datasCreateCar, setDatasCreateCar] = useState<IDatasCreatePlaylist>({
        name: '',
        image: ''
    })
    const { playlists, loading } = useAppSelector(state => state.playlist)

    useEffect(() => {
        dispatch(readPlaylists(datasReadPlaylistParams))
    }, [datasReadPlaylistParams])

    const resetForm = () => {
        setDatasCreateCar({
            image: '',
            name: ''
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatasCreateCar({
            ...datasCreateCar, [e.target.name]: e.target.value
        })
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files![0]) {
            setDatasCreateCar(prev => {
                const newDatas = { ...prev, image: e.target.files![0] }
                return newDatas
            })
        }
    }

    const handleSubmit = async () => {
        let validationDatasForm = true

        await Object.entries(datasCreateCar).map(key => {
            if(!key[0] || !key[1]) validationDatasForm = false
        })
        
        if(!validationDatasForm) return

        const formData = new FormData()

        formData.append('name', datasCreateCar.name)
        formData.append('image', datasCreateCar.image)

        dispatch(createPlaylist(formData))
        setShowFormCreate(false)
    }

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
                            
                            if(className.includes('formCreate')) {
                                setShowFormCreate(false)
                                resetForm()
                            }
                        }
                    }}
                >
                    <div className={styles.componentesForm}>
                        <input 
                            type="text" 
                            placeholder='Name playlist' 
                            name='name'
                            value={datasCreateCar.name || ''}
                            onChange={(e) => handleChange(e)}
                        />
                        <input 
                            type="file" 
                            name='file'
                            onChange={handleFile}
                        />
                        <button 
                            type='submit'
                            onClick={handleSubmit}    
                        >
                            Create
                        </button>
                    </div>
                    
                    
                </div>
            )}
        </div>
    )
}