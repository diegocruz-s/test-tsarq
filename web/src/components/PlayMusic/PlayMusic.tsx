import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useAuth } from '../../utils/checkAuth';
import './styles/main.scss'

export const PlayMusic = () => {
  const [loading, setLoading] = useState(false)
  const { token, user } = useAppSelector(state => state.auth.datasStorage)!;
  const [pause, setPause] = useState(false)

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [musicId, setMusicId] = useState('3744fc6d-2677-4632-b182-5c0093267df8')
  const audioSource = `http://localhost:3000/music/${musicId}/${user.id}/${token}`;

  useEffect(() => {
    audioPlayerRef.current!.addEventListener('ended', () => console.log('acabou'));
    
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
  
        audioPlayerRef.current!.src = audioSource;
        audioPlayerRef.current!.load();
      })
      .catch(error => {
        console.log('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  
    return () => {
      audioPlayerRef.current!.src = '';
      audioPlayerRef.current!.load();
      setLoading(false);
      audioPlayerRef.current!.removeEventListener('ended', () => console.log('acabou'));
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
          onClick={() => setMusicId('3744fc6d-2677-4632-b182-5c0093267df8')}
        >
          #
        </button>
        <button
          onClick={() => setMusicId('c21b52a5-31ca-4844-8fd2-9195a39d8209')}
        >
          #
        </button>
        <button
          onClick={() => setMusicId('5df2139a-20e0-4c46-aaa4-c9c888bac00a')}
        >
          #
        </button>

        <button onClick={pauseAndPlayMusic}>P</button>
        <audio ref={audioPlayerRef} controls controlsList='nodowload' preload="none" />

    </div>
  );
};

