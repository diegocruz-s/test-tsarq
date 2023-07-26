import { FormEventHandler, useEffect, useState } from 'react'
import styles from './styles/main.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { deleteUser, readUser, updateUser } from '../../store/slices/users/userSlice'
import { IUser } from '../../interfaces/user/user'
import { logout } from '../../store/slices/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { BsDoorOpenFill } from 'react-icons/bs'


export const Profile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user, loading } = useAppSelector(state => state.user)
    const [datasFormUser, setDatasFormUser] = useState({
        bios: '',
    })
    const [promptDeleteUser, setPromptDeleteUser] = useState(false)

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
        if(user && (user.bios !== datasFormUser.bios)) {
            console.log({
                bios: datasFormUser.bios,
                userId: user.id
            })
            dispatch(updateUser({
                bios: datasFormUser.bios,
                userId: user.id
            }))
        }else return
    }

    // const handleDeleteUser = async () => {
    //     await dispatch(deleteUser(user.id))
    //     await dispatch(logout())    
    // }

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

                    <label>
                        {loading ? (
                            <button
                                disabled
                            >Wait...</button>
                        ) : (
                            <button
                                type='submit'
                            >Update</button>
                        )}
                    </label>
                    
                </form>
            )}

            <div className={styles.logout}>
                <BsDoorOpenFill
                    onClick={async () => {
                        await dispatch(logout())
                        navigate('/')
                    }}
                />
            </div>

            <div className={styles.deleteAccount}>
                {loading ? (
                    <button disabled>
                        Delete Account
                    </button>
                ) : (
                    <button
                        onClick={() => setPromptDeleteUser(!promptDeleteUser)}
                    >
                        Delete Account
                    </button>
                )}
                
            </div>

            {(promptDeleteUser && user) && (
                <div className={styles.promptDeleteUser}>
                    <h3>Delete Account?</h3>
                    <div className={styles.btns}>
                        <button
                            className={styles.btnDelete}
                            onClick={async () => {
                                await dispatch(deleteUser(user.id))
                                await dispatch(logout())  
                            }}
                        >V</button>
                        <button
                            className={styles.btnNotDelete}
                            onClick={() => setPromptDeleteUser(false)}
                        >X</button>
                    </div>
                </div>
            )}
        </div>
    )
}