import './styles/main.scss'
import { useState, useEffect } from 'react'
import { Playlist } from '../../interfaces/playlist/playlist'
import { BsThreeDotsVertical } from 'react-icons/bs'
const imagesSaves = 'http://localhost:3000/uploads/images'

interface IPlaylist {
    playlist: Playlist
}
export const PlaylistItem = ({ playlist }: IPlaylist) => {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <div 
            className="playlist" 
            key={playlist.id}
            onMouseLeave={() => setShowOptions(false)}
        >
            <a href={`/playlists/${playlist.id}`} className="linkPlaylist">
                <img src={`${imagesSaves}/${playlist.image}`} alt="" />
                <div className="texts">
                <p>{playlist.name}</p>
                <p>
                    {playlist._count.musics > 1
                    ? playlist._count.musics + ' musics'
                    : playlist._count.musics + ' music'}
                </p>
                </div>
            </a>
            <div
                className="optionsPlaylist"
                onClick={() => setShowOptions(!showOptions)}
            >
                <BsThreeDotsVertical />
            </div>
            {showOptions && (
                <div className="chooseOptions">

                    <div 
                        className="edit"
                        onClick={() => console.log('Edit')}
                    >
                        <p>Edit</p>
                    </div>

                    <div 
                        className="delete"
                        onClick={() => console.log('Delete')}
                    >
                        <p>Delete</p>
                    </div>
                    
                </div>
            )}
        </div>
    )
} 