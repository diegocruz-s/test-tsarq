import { FormEventHandler, useEffect, useState } from 'react'
import styles from './styles/main.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { readUser, updateUser } from '../../store/slices/users/userSlice'
import { IUser } from '../../interfaces/user/user'
import { logout } from '../../store/slices/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user, loading } = useAppSelector(state => state.user)
    const [datasFormUser, setDatasFormUser] = useState({
        bios: '',
    })

    useEffect(() => {
        dispatch(readUser())
    }, [dispatch])

    useEffect(() => {
        if(user) setDatasFormUser({
            ...datasFormUser,
            bios: user.bios
        })
    }, [user])

    const onChangeDatas = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatasFormUser({
            ...datasFormUser, [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(user) {
            console.log({
                bios: datasFormUser.bios,
                userId: user.id
            })
            dispatch(updateUser({
                bios: datasFormUser.bios,
                userId: user.id
            }))
        }   
    }

    console.log('datasFormUser:', datasFormUser)
    return (
        <div className={styles.profile}>
            <h2>Your Profile</h2>

            {user && (
                <form onSubmit={onSubmit} className={styles.formDatasUser}>
                    <label>
                        {/* Icon */}
                        <input 
                            type="email" 
                            placeholder='Email'
                            name='email'
                            value={user.email || ''}
                            disabled
                        />
                    </label>
                    <label>
                        {/* Icon */}
                        <input 
                            type="text" 
                            placeholder='Name'
                            name='name'
                            value={user.name || ''}
                            disabled
                        />
                    </label>
                    <label>
                        {/* Icon */}
                        <input 
                            type="text" 
                            placeholder='Username'
                            name='username'
                            value={user.username || ''}
                            disabled
                        />
                    </label>
                    <label>
                        {/* Icon */}
                        <input 
                            type="text" 
                            placeholder='Bios'
                            name='bios'
                            value={datasFormUser.bios || ''}
                            onChange={onChangeDatas}
                        />
                    </label>

                    {loading ? (
                        <button
                            disabled
                        >Wait...</button>
                    ) : (
                        <button
                            type='submit'
                        >Update</button>
                    )}
                    
                </form>
            )}

            <div className={styles.logout}>
                <p
                    onClick={async () => {
                        await dispatch(logout())
                        navigate('/')
                    }}
                >Sair...</p>
            </div>
        </div>
    )
}