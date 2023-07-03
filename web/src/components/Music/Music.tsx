import styles from "./styles/main.module.scss";
import { useState } from "react";
import { Music } from "../../interfaces/musics/musics";
import { BsTrash } from "react-icons/bs";
import { deleteMusic } from "../../store/slices/musics/musicSlice";
import { useAppDispatch } from "../../store/store";
import { Link } from "react-router-dom";

interface ITypeMusicItem {
  music: Music;
}

export const MusicItem = ({ music }: ITypeMusicItem) => {
  const dispatch = useAppDispatch();
  const [showPrompt, setShowPrompt] = useState<
    false | { id: string; name: string }
  >(false);

  const formatStrMusic = (name: string, completed?: boolean) => {
    let nameFormat = name;
    if (name.length > 25 && !completed) {
      nameFormat = name.substring(0, 25) + "...";
    }

    nameFormat = nameFormat.replaceAll("-", " ").replaceAll("--", " ");

    return nameFormat;
  };

  const formatDurationMusic = (time: string) => {
    const rawTime = Number(time);

    const min = Math.floor(rawTime / 60);
    const sec = Math.floor(rawTime % 60);

    const duration = `${min}:${sec < 10 ? "0" + String(sec) : String(sec)}`;

    return duration;
  };

  return (
    <div className={styles.musicContainer} key={music.id}>
      <div 
        className={styles.music}
        onMouseLeave={() => setShowPrompt(false)}
      >
        <Link to={`/music/${music.id}`}>
          <img src={music.image} alt="Imagem da música" />
          <div className={styles.textsMusic}>
            <h4>{formatStrMusic(music.name)}</h4>
            <p>{formatStrMusic(music.band)}</p>
            <p>{formatDurationMusic(music.duration)}</p>
          </div>
        </Link>

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

        {showPrompt && (
        <div className={styles.promptDeleteMusic}>
          <p className={styles.deleteMusicText}>Delete Music:</p>
          <p className={styles.nameDeleteMusic}>
            {formatStrMusic(showPrompt.name, true)}?
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
      </div>

      
    </div>
  );
};
