import styles from "./styles/main.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { readPlaylist, removeMusicPlaylist } from "../../store/slices/playlists/playlistSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayMusic } from "../../components/PlayMusic/PlayMusic";
import { Music } from "../../interfaces/musics/musics";
import { pathImages } from "../../App";
import { formatDurationMusic, formatStrMusic } from "../../utils/formatDatas";
import { BsFillPlayCircleFill } from "react-icons/bs";

export const Playlist = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { datasPlay } = useAppSelector((state) => state.playlist);
  const [musicExec, setMusicExec] = useState<Music[]>([]);
  const [countMusic, setCountMusic] = useState<number>(0);
  const [allTimePlaylist, setAllTimePlaylist] = useState(0);
  // const [showDeleteMusicPlaylist, setShowDeleteMusicPlaylist] = useState(false)

  useEffect(() => {
    setMusicExec([]);
  }, []);

  useEffect(() => {
    if (id) dispatch(readPlaylist(id));
  }, [id]);

  useEffect(() => {
    if (datasPlay?.musics) {
      const totalDuration = datasPlay.musics.reduce(
        (accumulator, currentMusic) => accumulator + +currentMusic.duration,
        0
      );
      setAllTimePlaylist(totalDuration);
    }
  }, [datasPlay?.musics]);

  useEffect(() => {
    if (
      datasPlay?.musics &&
      datasPlay.musics[countMusic] &&
      musicExec.length > 0
    ) {
      setMusicExec(datasPlay.musics.slice(0, countMusic + 1));
    }
  }, [countMusic]);

  return (
    <div className={styles.playlistId}>
      {datasPlay && (
        <>
          <div className={styles.playlistDatas}>
            <img src={`${pathImages}/${datasPlay.playlist.image}`} alt="" />
            <div className={styles.textsPlaylist}>
              <div className={styles.namePlaylist}>
                {datasPlay.playlist.name}
              </div>
              <div className={styles.infosPlaylist}>
                <p>
                  {datasPlay.playlist._count?.musics &&
                    (datasPlay.playlist._count?.musics > 1
                      ? `${datasPlay.playlist._count?.musics} Musics`
                      : `${datasPlay.playlist._count?.musics} Music`)}
                </p>
                <p>{formatDurationMusic(allTimePlaylist)}</p>
                {datasPlay.musics && datasPlay.musics.length > 0 && (
                  <div className={styles.runPlaylist}>
                    <BsFillPlayCircleFill
                      onClick={() => {
                        setCountMusic(0);
                        setMusicExec([datasPlay.musics[countMusic]]);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.musicsDatas}>
            {datasPlay.musics && datasPlay.musics.length > 0 && (
              <table className={styles.musics}>
                <thead>
                  <tr>
                    <td className={styles.indexMusicHead}>#</td>
                    <td className={styles.titleMusicHead}>Title</td>
                    <td className={styles.bandMusicHead}>Band</td>
                    <td className={styles.durationMusicHead}>Duration</td>
                  </tr>
                </thead>
                {/* <div className={styles.separate} /> */}
                <tbody>
                  {datasPlay.musics.map((music, i) => (
                    <tr key={music.id} className={styles.music}>
                      <td className={styles.indexMusic}>
                        <p>{++i} </p>
                      </td>
                      <td>
                        <div
                          className={styles.musicImageAndName}
                          onClick={(e) => {
                            const element = e.target as HTMLElement

                            if(element.tagName !== 'BUTTON') {
                              const clickedIndex = datasPlay.musics.findIndex(
                                (item) => item.id === music.id
                              );
                              setMusicExec([music]);
                              setCountMusic(clickedIndex);
                            }
                          }}
                        >
                          <img
                            src={music.image}
                            alt=""
                            className={styles.imageMusic}
                          />
                          <p className={styles.nameMusic}>
                            {formatStrMusic(music.name, 85)}
                          </p>

                          <div 
                            onClick={() => {
                              console.log('music', music.id, '\n', 'playlist', datasPlay.playlist.id)
                              if(musicExec[countMusic].id !== music.id) {
                                dispatch(removeMusicPlaylist({
                                  musicId: music.id,
                                  playlistId: datasPlay.playlist.id
                                }))
                              }
                            }}
                            className={styles.deleteMusicPlaylist}
                          >
                            {(!musicExec[countMusic] || musicExec[countMusic].id !== music.id) ? (
                              <button>X</button>
                            ) : (
                              <button disabled style={{ backgroundColor: "#4141f7" }}>E</button>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className={styles.bandMusic}>{music.band}</td>
                      <td className={styles.durationMusic}>
                        {formatDurationMusic(music.duration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={styles.executeMusic}>
            {musicExec && musicExec.length > 0 && musicExec[countMusic] && (
              <PlayMusic
                music={musicExec[countMusic]}
                setCount={setCountMusic}
                count={countMusic}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
