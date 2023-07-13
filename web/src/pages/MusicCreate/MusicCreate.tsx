import { useEffect, useState } from 'react'
import styles from './styles/main.module.scss'
import { Music } from '../../interfaces/musics/musics'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { createMusic, getCategories } from '../../store/slices/musics/musicSlice'
import { Message } from '../../components/Message/Message'
import { BsBodyText, BsBorderWidth, BsCardList, BsFillCalendarRangeFill, BsFillPersonFill, BsMusicNote } from 'react-icons/bs'

export const MusicCreate = () => {

    const dispatch = useAppDispatch()
    const { loading, success, categories } = useAppSelector(state => state.music)

    const [datasMusic, setDatasMusic] = useState<Partial<Music>>({
        url: '',
        band: '',
        composer: '',
        year: 0,
        categoryId: '',
    })

    console.log(datasMusic)

    useEffect(() => {
        dispatch(getCategories())
    }, [])
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let validationDatasForm = true

        await Object.entries(datasMusic).map(key => {
            if(!key[0] || !key[1]) validationDatasForm = false
        })
        
        if(!validationDatasForm) return

        dispatch(createMusic(datasMusic))
    }

    const onChangeDatas = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatasMusic({
            ...datasMusic, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="musicCreate">
            
            <form
                className={styles.formCreateMusic}
                onSubmit={onSubmit}
            >
                {success && <Message message={success} type='success' />}
                <label>
                    <BsBorderWidth />
                    <input 
                        type="url" 
                        placeholder='URL music'
                        name='url'
                        value={datasMusic.url || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <BsMusicNote />
                    <input 
                        type="text" 
                        placeholder='Band'
                        name='band'
                        value={datasMusic.band || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <BsFillPersonFill />
                    <input 
                        type="text" 
                        placeholder='Composer'
                        name='composer'
                        value={datasMusic.composer || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <BsFillCalendarRangeFill />
                    <input 
                        type="number" 
                        placeholder='year'
                        name='year'
                        value={datasMusic.year || ''}
                        onChange={onChangeDatas}
                    />
                </label>
                <label>
                    <BsCardList />
                    <select 
                        onChange={onChangeDatas} 
                        name="categoryId"
                    >
                        <option>Category</option>
                        {(categories && categories.length > 0) && (
                            <>
                                {categories.map(category => (
                                    <option 
                                        key={category.id} 
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </label>

                {loading ? (
                    <button disabled>Wait...</button>
                ) : (
                    <button type='submit'>Create</button>
                )}
            </form>
        </div>
    )
}