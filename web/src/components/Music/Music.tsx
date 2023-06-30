import "./styles/main.scss";
import { useState } from "react";
import { Music } from "../../interfaces/musics/musics";
import { BsTrash } from "react-icons/bs";
import { deleteMusic } from "../../store/slices/musics/musicSlice";
import { useAppDispatch } from "../../store/store";

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
    <div className="musicContainer" key={music.id}>
      <div 
        className="music"
        onMouseLeave={() => setShowPrompt(false)}
      >
        <a href={`/music/${music.id}`}>
          <img src={music.image} alt="Imagem da música" />
          <div className="textsMusic">
            <h4>{formatStrMusic(music.name)}</h4>
            <p>{formatStrMusic(music.band)}</p>
            <p>{formatDurationMusic(music.duration)}</p>
          </div>
        </a>

        <div
          className="deleteMusic"
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
        <div className="promptDeleteMusic">
          <p className="deleteMusicText">Delete Music:</p>
          <p className="nameDeleteMusic">
            {formatStrMusic(showPrompt.name, true)}?
          </p>
          <div className="options">
            <button
              className="Y"
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
              className="N"
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
