import './styles/main.scss'
import { useState, useRef, useEffect } from 'react'
import { Playlist } from '../../interfaces/playlist/playlist'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { deletePlaylist, editPlaylist } from '../../store/slices/playlists/playlistSlice'
import { Message } from '../Message/Message'
const imagesSaves = 'http://localhost:3000/uploads/images'

interface IPlaylist {
    playlist: Playlist
}
export const PlaylistItem = ({ playlist }: IPlaylist) => {
    const dispatch = useAppDispatch()
    const { loading, success } = useAppSelector(state => state.playlist)!
    const [showOptions, setShowOptions] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    const refInput = useRef<HTMLInputElement  | null>(null)

    useEffect(() => {
        if(success) setShowFormEdit(false)
    }, [success])

    return (
        <div 
            className="playlist" 
            key={playlist.id}
            onMouseLeave={() => {
                setShowOptions(false)
                setShowFormEdit(false)
            }}
        >
            <a href={`/playlists/${playlist.id}`} className="linkPlaylist">
                <img src={`${imagesSaves}/${playlist.image}`} alt="" />
                <div className="texts">
                <p>{playlist.name}</p>
                <p>
                    {playlist._count!.musics > 1
                    ? playlist._count!.musics + ' musics'
                    : playlist._count!.musics + ' music'}
                </p>
                </div>
            </a>
            <div
                className="optionsPlaylist"
                onClick={() => setShowOptions(!showOptions)}
            >
                <BsThreeDotsVertical />
            </div>
            {(showOptions && !showFormEdit) && (
                <div className="chooseOptions">

                    <div 
                        className="edit"
                        onClick={() => {
                            setShowOptions(false)
                            setShowFormEdit(true)
                        }}
                    >
                        <p>Edit</p>
                    </div>

                    <div 
                        className="delete"
                        onClick={() => {
                            dispatch(deletePlaylist(playlist.id))
                        }}
                    >
                        <p>Delete</p>
                    </div>
                    
                </div>
            )}

            {showFormEdit && (
                <div className="formEditPlaylist">
                    <input ref={refInput} type="text" placeholder='Name' />
                    {loading ? (
                        <button 
                        type='button'
                        disabled
                    >...</button>
                    ) : (
                        <button 
                        type='button'
                        onClick={() => {
                            if(!refInput.current || refInput.current?.value === '') return
                            dispatch(editPlaylist({
                                id: playlist.id,
                                name: refInput.current.value
                            }))
                        }}
                    >V</button>
                    )}
                </div>
            )}
        </div>
    )
} 