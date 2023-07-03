// Scss
import styles from "./styles/main.module.scss";
// React
import { useEffect, useState } from "react";
// Store
import {
  getMusics,
  countMusics,
} from "../../store/slices/musics/musicSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
// Interface
import { IDatasGetMusics } from "../../interfaces/musics/musics";
// Components
import { Message } from "../../components/Message/Message";
// Icons
import { BsSearch } from "react-icons/bs";
import { MusicItem } from "../../components/Music/Music";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { musics, count, success } = useAppSelector((state) => state.music)
  const [datasGetMusics, setDatasGetMusics] = useState<IDatasGetMusics>({
    take: 10,
    skip: 0,
    name: "",
  });
  const [pags, setPags] = useState(0);

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

  {
    console.log("success", success);
  }
  return (
    <div className={styles.home}>
      <div className={styles.filter}>
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

      <div className={styles.musics}>
        {musics && musics.length > 0 ? (
          musics.map((music) => (
            <MusicItem key={music.id} music={music} />
          ))
        ) : (
          <p>Músicas não encontradas...</p>
        )}
      </div>

      
      <div className={styles.pagination}>
        {!datasGetMusics.name &&
          pags > 1 &&
          Array.from({ length: pags }).map((_, i) => {
            return (
              <div
                key={i}
                className={styles.elementPag}
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

      
    </div>
  );
};
