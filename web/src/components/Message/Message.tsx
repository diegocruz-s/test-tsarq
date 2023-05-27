import { useState } from 'react'
import './styles/main.scss'
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
                    className={`message ${props.type === 'error' ? 'error' : 'success'}`}
                >
                    <p>{props.message}</p>
                </div>
            )}
        </>
        
    )
}