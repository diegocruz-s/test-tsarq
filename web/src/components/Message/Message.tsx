import { useState } from 'react'
import styles from './styles/main.module.scss'
import { resetStates } from '../../store/slices/auth/authSlice'
interface Props {
    type: string
    message: string
}

export const Message = (props: Props) => {
    const [showMsg, setShowMsg] = useState(true) 
    setTimeout(() => {
        setShowMsg(false)
        resetStates()
    }, 3000)

    return (

        <>
            {showMsg && (
                <div 
                className={`${styles.message} ${props.type === 'error' ? styles.error : styles.success}`}
                >
                    <p>{props.message}</p>
                </div>
            )}
        </>
        
    )
}