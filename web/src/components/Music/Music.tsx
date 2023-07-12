import styles from "./styles/main.module.scss";
import { useEffect, useState } from "react";
import { Music } from "../../interfaces/musics/musics";
import { BsTrash, BsMusicNoteBeamed, BsSearch } from "react-icons/bs";
import { deleteMusic } from "../../store/slices/musics/musicSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import { formatDurationMusic, formatStrMusic } from "../../utils/formatDatas";
import { readPlaylists } from "../../store/slices/playlists/playlistSlice";
import { addMusicPlaylist } from "../../store/slices/music_playlist/musicPlaylistSlice";
import { Message } from "../Message/Message";

interface ITypeMusicItem {
  music: Music;
  setMusicExec: React.Dispatch<React.SetStateAction<Music[]>>;
  // setCount: React.Dispatch<React.SetStateAction<number>>
}

export const MusicItem = ({ music, setMusicExec }: ITypeMusicItem) => {
  const dispatch = useAppDispatch();
  const { playlists } = useAppSelector(state => state.playlist)

  const [showPrompt, setShowPrompt] = useState<
    false | { id: string; name: string }
  >(false);
  const [showAddPlay, setShowAddPlay] = useState(false);

  const [datasGetPlaylists, setDatasGetPlaylists] = useState({
    take: 10,
    skip: 0,
    name: "",
  });

  useEffect(() => {
   dispatch(readPlaylists(datasGetPlaylists))
    // (async () => {
    //   // await dispatch(readPlaylists(datasGetPlaylists))
    // })();
}, [datasGetPlaylists])

  return (
    <div className={styles.musicContainer} key={music.id}>
      <div
        className={styles.music}
        onMouseLeave={(e) => {
          const relatedTarget = e.relatedTarget as Node;
          const isLeavingDiv = !e.currentTarget.contains(relatedTarget);

          if(isLeavingDiv) {
            setShowAddPlay(false);
          }
          setShowPrompt(false);
          setDatasGetPlaylists({
            ...datasGetPlaylists,
            name: ''
          })
        }}
      >
        <div className={styles.musicDatas}>
          <img
            src={music.image}
            alt="Imagem da música"
            onClick={() => {
              setMusicExec([music]);
            }}
          />
          <div className={styles.textsMusic}>
            <h4>{formatStrMusic(music.name, 25)}</h4>
            <p>{formatStrMusic(music.band, 20)}</p>
            <p>{formatDurationMusic(music.duration)}</p>
          </div>
        </div>

        <div
          className={styles.deleteMusic}
          onClick={() => {
            setShowPrompt({
              id: music.id,
              name: music.name,
            });
          }}
        >
          <BsTrash />
        </div>

        <div
          className={styles.addMusic}
          onClick={() => {
            setDatasGetPlaylists({
              ...datasGetPlaylists,
              name: '',
            })
            setShowAddPlay(true)
          }}
        >
          <BsMusicNoteBeamed />
        </div>
        {/* <div 
          className={styles.addMusicQueue}
          onClick={() => {
            console.log('Add')
            setMusicExec(prev => {
              return [
                ...prev,
                music
              ]
            })
          }}
        ></div> */}

        {showPrompt && (
          <div className={styles.promptDeleteMusic}>
            <p className={styles.deleteMusicText}>Delete Music:</p>
            <p className={styles.nameDeleteMusic}>
              {formatStrMusic(showPrompt.name, 25, true)}?
            </p>
            <div className={styles.options}>
              <button
                className={styles.Y}
                onClick={() => {
                  // setShowPrompt(false)
                  dispatch(deleteMusic(showPrompt.id));
                  setShowPrompt(false);
                }}
              >
                Y
              </button>
              <button
                onClick={() => {
                  setShowPrompt(false);
                }}
                className={styles.N}
              >
                N
              </button>
            </div>
          </div>
        )}

        {showAddPlay && (
          <div className={styles.findPlaylist}>
            <div className={styles.filter}>
              <label>
                <BsSearch />

                <input
                  type="text"
                  name='name'
                  placeholder="Find Playlist"
                  value={datasGetPlaylists.name || ""}
                  onChange={(e) => {
                    setDatasGetPlaylists({
                      ...datasGetPlaylists,
                      name: e.target.value,
                    });
                  }}
                />
              </label>
            </div>

            <div className={styles.playlistsOptions}>
              {(datasGetPlaylists.name && playlists && playlists.length > 0) && (
                  <div className={styles.playlists}>
                      {playlists.map(playlist => (
                        <div 
                          key={playlist.id}
                          className={styles.playlist}
                          onClick={() => {
                            dispatch(addMusicPlaylist({
                              musicId: music.id,
                              playlistId: playlist.id
                            }))
                            setShowAddPlay(false)
                          }}  
                        >
                          <p>{playlist.name}</p>
                        </div>
                      ))}
                  </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
