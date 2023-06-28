// Scss
import "./styles/main.scss";
// React
import { useEffect, useState } from "react";
// Store
import {
  getMusics,
  countMusics,
  deleteMusic,
} from "../../store/slices/musics/musicSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
// Interface
import { IDatasGetMusics } from "../../interfaces/musics/musics";
// Components
import { Message } from "../../components/Message/Message";
// Icons
import { BsSearch, BsTrash } from "react-icons/bs";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { musics, count, success } = useAppSelector((state) => state.music)!;
  const [showPrompt, setShowPrompt] = useState<false | { id: string, name: string }>(false);
  const [datasGetMusics, setDatasGetMusics] = useState<IDatasGetMusics>({
    take: 10,
    skip: 0,
    name: "",
  });
  const [pags, setPags] = useState(0);

  console.log("showPrompt:", showPrompt);

  useEffect(() => {
    (async () => {
      await dispatch(countMusics());
      await dispatch(getMusics(datasGetMusics));
    })();
  }, [datasGetMusics]);

  useEffect(() => {
    if (count) {
      setPags(Math.ceil(count / datasGetMusics.take));
      if (count <= 10) {
        setDatasGetMusics({
          ...datasGetMusics,
          take: 10,
        });
      } else {
        const newValueTake = Math.floor(Math.random() * (count - 10)) + 10;
        const newValueSkip = newValueTake <= 10 ? 0 : newValueTake - 10;
        setDatasGetMusics({
          ...datasGetMusics,
          take: newValueTake,
          skip: newValueSkip,
        });
      }
    }
  }, [count]);

  const formatStrMusic = (name: string, completed?: boolean) => {
    let nameFormat = name;
    if (name.length > 25 && !completed) {
      nameFormat = name.substring(0, 25) + "...";
    }

    nameFormat = nameFormat.replaceAll("-", " ").replaceAll("--", " ");

    return nameFormat;
  }

  const formatDurationMusic = (time: string) => {
    const rawTime = Number(time)

    const min = Math.floor(rawTime / 60)
    const sec = Math.floor(rawTime % 60)

    const duration = `${min}:${sec < 10 ? '0' + String(sec) : String(sec)}`

    return duration
  }

  {
    console.log("success", success);
  }
  return (
    <div className="home">
      <div className="filter">
        <label>
          <BsSearch />

          <input
            type="text"
            placeholder="Procurar música"
            value={datasGetMusics.name || ""}
            onChange={(e) => {
              setDatasGetMusics({
                ...datasGetMusics,
                name: e.target.value,
              });
            }}
          />
        </label>
      </div>

      {success && <Message message={success} type="success" />}

      <div className="musics">
        {musics && musics.length > 0 ? (
          musics.map((music) => (
            <div>
              <div
                className="music"
                key={music.id}
              >
                <a  href={`/music/${music.id}`}>
                  <img src={music.image} alt="Imagem da música" />
                  <div className="textsMusic">
                    <h4>{formatStrMusic(music.name)}</h4>
                    <p>{formatStrMusic(music.band)}</p>
                    <p>
                      {formatDurationMusic(music.duration)}
                    </p>
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
              </div>
            </div>
          ))
        ) : (
          <p>Músicas não encontradas...</p>
        )}
      </div>
      <div className="pagination">
        {!datasGetMusics.name &&
          pags > 1 &&
          Array.from({ length: pags }).map((_, i) => {
            return (
              <div
                key={i}
                className="elementPag"
                onClick={() => {
                  const take = (i + 1) * 10;
                  setDatasGetMusics({
                    ...datasGetMusics,
                    take,
                    skip: take - 10,
                  });
                }}
              >
                {i + 1}
              </div>
            );
          })}
      </div>

      {showPrompt && (
        <div className="promptDeleteMusic">
          <p className="deleteMusic">Delete Music:</p>
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
  );
};
