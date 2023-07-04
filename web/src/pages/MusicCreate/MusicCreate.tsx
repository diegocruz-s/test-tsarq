import { useState } from 'react'
import styles from './styles/main.module.scss'
import { Music } from '../../interfaces/musics/musics'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { createMusic } from '../../store/slices/musics/musicSlice'
import { Message } from '../../components/Message/Message'

export const MusicCreate = () => {

    const dispatch = useAppDispatch()
    const { loading, success } = useAppSelector(state => state.music)

    const [datasMusic, setDatasMusic] = useState<Partial<Music>>({
        url: '',
        band: '',
        composer: '',
        year: 0,
        categoryId: '',
    })

    console.log('datasMusic:', datasMusic)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let validationDatasForm = true

        await Object.entries(datasMusic).map(key => {
            if(!key[0] || !key[1]) validationDatasForm = false
        })
        
        if(!validationDatasForm) return

        dispatch(createMusic(datasMusic))
    }

    const onChangeDatas = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)
        setDatasMusic({
            ...datasMusic, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="musicCreate">
            {success && <Message message={success} type='success' />}
            
            <form
                onSubmit={onSubmit}
            >
                <label>
                    <input 
                        type="url" 
                        placeholder='URL music'
                        name='url'
                        value={datasMusic.url || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <input 
                        type="text" 
                        placeholder='Band'
                        name='band'
                        value={datasMusic.band || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <input 
                        type="text" 
                        placeholder='Composer'
                        name='composer'
                        value={datasMusic.composer || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <input 
                        type="number" 
                        placeholder='year'
                        name='year'
                        value={datasMusic.year || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <input 
                        type="text" 
                        placeholder='categoryId'
                        name='categoryId'
                        value={datasMusic.categoryId || ''}
                        onChange={onChangeDatas}
                    />
                </label>

                {loading ? (
                    <button disabled>Aguarde...</button>
                ) : (
                    <button type='submit'>Vai</button>
                )}
            </form>
        </div>
    )
}