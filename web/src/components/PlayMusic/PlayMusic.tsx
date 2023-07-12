import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';
// import { useAuth } from '../../utils/checkAuth';
import styles from './styles/main.module.scss'
import { Music } from '../../interfaces/musics/musics';
import { useParams } from 'react-router-dom';
import { Howl, Howler } from 'howler'


type IDatasPlayMusic = {
  music: Music,
  setCount?: React.Dispatch<React.SetStateAction<number>>
  count?: number
}

export const PlayMusic = ({ music, setCount, count }: IDatasPlayMusic) => {
  const { token, user } = useAppSelector(state => state.auth.datasStorage)!;
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [pause, setPause] = useState(false)

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [musicId, setMusicId] = useState(id)
  const audioSource = `http://localhost:3000/music/${music.id}/${user.id}/${token}`;

  useEffect(() => {
    if(audioPlayerRef.current) {
      audioPlayerRef.current.addEventListener('ended', () => {
        if (setCount) {
          setCount(prevCount => {
            // Verificar se o count já foi incrementado
            if (prevCount === count) {
              return prevCount + 1;
            } else {
              return prevCount;
            }
          });
        }
      });
    }
    
    if (!token) {
      return;
    }
  
    setLoading(true);
  
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
  
    fetch(audioSource, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch audio');
        }
  
        if(audioPlayerRef.current) {
          audioPlayerRef.current.src = audioSource;
          audioPlayerRef.current.load();
          setTimeout(() => {
            audioPlayerRef.current?.play()
          }, 1000)
        }
        
      })
      .catch(error => {
        console.log('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  
    return () => {
      if(audioPlayerRef.current) {
        audioPlayerRef.current.src = '';
        audioPlayerRef.current.load();
        setLoading(false);
        audioPlayerRef.current.removeEventListener('ended', () => console.log('acabou'));
      }
      
    };
  }, [audioSource]);

  return (
    <div className={styles.audio_player}>
        <audio ref={audioPlayerRef} controls={true} />
    </div>
  );
};











// backup 
// import { useEffect, useRef, useState } from 'react';
// import { useAppSelector } from '../../store/store';
// // import { useAuth } from '../../utils/checkAuth';
// import styles from './styles/main.module.scss'
// import { Music } from '../../interfaces/musics/musics';
// import { useParams } from 'react-router-dom';

// type IDatasPlayMusic = {
//   music: Music,
//   setCount?: React.Dispatch<React.SetStateAction<number>>
//   count?: number
// }

// export const PlayMusic = ({ music, setCount, count }: IDatasPlayMusic) => {
//   const { token, user } = useAppSelector(state => state.auth.datasStorage)!;
//   const { id } = useParams()
//   const [loading, setLoading] = useState(false)
//   const [pause, setPause] = useState(false)

//   const audioPlayerRef = useRef<HTMLAudioElement>(null);
//   const [musicId, setMusicId] = useState(id)
//   const audioSource = `http://localhost:3000/music/${music.id}/${user.id}/${token}`;

//   useEffect(() => {
//     if(audioPlayerRef.current) {
//       audioPlayerRef.current.addEventListener('ended', () => {
//         if (setCount) {
//           setCount(prevCount => {
//             // Verificar se o count já foi incrementado
//             if (prevCount === count) {
//               return prevCount + 1;
//             } else {
//               return prevCount;
//             }
//           });
//         }
//       });
//     }
    
//     if (!token) {
//       return;
//     }
  
//     setLoading(true);
  
//     const headers = new Headers();
//     headers.append('Authorization', `Bearer ${token}`);
  
//     fetch(audioSource, { headers })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch audio');
//         }
  
//         if(audioPlayerRef.current) {
//           audioPlayerRef.current.src = audioSource;
//           audioPlayerRef.current.load();
//           setTimeout(() => {
//             audioPlayerRef.current?.play()
//           }, 1000)
//         }
        
//       })
//       .catch(error => {
//         console.log('Error:', error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
  
//     return () => {
//       if(audioPlayerRef.current) {
//         audioPlayerRef.current.src = '';
//         audioPlayerRef.current.load();
//         setLoading(false);
//         audioPlayerRef.current.removeEventListener('ended', () => console.log('acabou'));
//       }
      
//     };
//   }, [audioSource]);
  
//   const pauseAndPlayMusic = () => {
//     setPause(!pause)
//     pause ? audioPlayerRef.current?.pause() : audioPlayerRef.current?.play()
//   }

//   return (
//     <div className={styles.audio_player}>
//         <button onClick={pauseAndPlayMusic}>P</button>
//         <audio style={{ color: "#fff",  }} ref={audioPlayerRef} controls />

//     </div>
//   );
// };

