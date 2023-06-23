import './styles/main.scss'
import { useEffect, useState } from 'react'
import { getMusics, countMusics } from '../../store/slices/musics/musicSlice'
import { IDatasGetMusics } from '../../interfaces/musics/musics'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { BsSearch } from 'react-icons/bs'
import { Music } from '../../interfaces/musics/musics'

export const Home = () => {
    const dispatch = useAppDispatch()
    const { musics, count } = useAppSelector(state => state.music)!
    const [datasGetMusics, setDatasGetMusics] = useState<IDatasGetMusics>({
        take: 10,
        skip: 0,
        name: ''
    })
    const [pags, setPags] = useState(0)

    console.log('pags:', pags)

    useEffect(() => {
        (async () => {
            await dispatch(countMusics())
            await dispatch(getMusics(datasGetMusics))
        })()
    }, [datasGetMusics])

    useEffect(() => {
        if(count) {
            setPags(Math.ceil(count / datasGetMusics.take))
            if(count <= 10) {
                setDatasGetMusics({
                    ...datasGetMusics, take: 10
                })
            } else {
                const newValueTake = Math.floor(Math.random() * (count - 10)) + 10
                const newValueSkip = newValueTake <= 10 ? 0 : newValueTake - 10
                setDatasGetMusics({
                    ...datasGetMusics, take: newValueTake, skip: newValueSkip
                })
            }
        }
    }, [count])

    const formatStrMusic = (name: string) => {
        let nameFormat = name
        if(name.length > 25) {
            nameFormat = name
                .substring(0, 25) + '...'
        }

        nameFormat = nameFormat
            .replaceAll('-', ' ')
            .replaceAll('--', ' ')


        return nameFormat
    }

    return (
        <div className="home">
            <div className="filter">
                <label>
                    <BsSearch />

                    <input 
                        type='text'
                        placeholder='Procurar música'
                        value={datasGetMusics.name || ''}
                        onChange={(e) => {
                            setDatasGetMusics({
                                ...datasGetMusics, name: e.target.value
                            })
                        }}
                    />
                </label>
                
            </div>
            <div className="musics">
                {(musics && musics.length > 0) ? (
                    musics.map(music => (
                        <div className="music" key={music.id}>
                            <img src={music.image} alt="Imagem da música" />
                            <div className="textsMusic">
                                <h4>{formatStrMusic(music.name)}</h4>
                                <p>{formatStrMusic(music.band)}</p>
                                <p>
                                    {
                                        (Number(music.duration) / 60).toFixed(2).replace('.', ':')
                                    }
                                </p>
                            </div>
                            
                        </div>
                    ))
                    
                ) : (
                    <p>Músicas não encontradas...</p>
                )}
                
            </div>
            <div className="pagination">
                {(!datasGetMusics.name && pags > 0) && Array.from({ length: pags }).map((_, i) => {
                    return (
                        <div 
                            key={i} 
                            className="elementPag"
                            onClick={() => {
                                const take = (i + 1) * 10
                                setDatasGetMusics({
                                    ...datasGetMusics, 
                                    take,
                                    skip: take - 10
                                })
                            }}
                        >
                            {i + 1}
                        </div>
                    )
                })}
            </div>
            
            
        </div>
    )
}

