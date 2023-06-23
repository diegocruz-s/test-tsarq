import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';
// import { useAuth } from '../../utils/checkAuth';
import './styles/main.scss'

export const PlayMusic = () => {
  const [loading, setLoading] = useState(false)
  const { token, user } = useAppSelector(state => state.auth.datasStorage)!;
  const [pause, setPause] = useState(false)

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [musicId, setMusicId] = useState('2abb8151-2fff-452c-b7f1-0cf7a3697b73')
  const audioSource = `http://localhost:3000/music/${musicId}/${user.id}/${token}`;

  useEffect(() => {
    if(audioPlayerRef.current) {
      audioPlayerRef.current.addEventListener('ended', () => console.log('acabou'));
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
  }, [audioSource, token]);
  
  const pauseAndPlayMusic = () => {
    console.log('pause', pause)
    setPause(!pause)
    console.log('pause', pause)

    pause ? audioPlayerRef.current?.pause() : audioPlayerRef.current?.play()

  }

  return (
    <div className="audio-player">

        <button
          onClick={() => setMusicId('2abb8151-2fff-452c-b7f1-0cf7a3697b73')}
        >
          #
        </button>
        <button
          onClick={() => setMusicId('b8e734c7-61c8-4583-a074-93b69fbfa338')}
        >
          #
        </button>
        <button
          onClick={() => setMusicId('e7f6ea62-146d-453f-add9-d30cb645141b')}
        >
          #
        </button>

        <button onClick={pauseAndPlayMusic}>P</button>
        <audio ref={audioPlayerRef} controls controlsList='nodowload' preload="none" />

    </div>
  );
};

