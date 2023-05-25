import "./styles/main.scss";
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IUser } from '../../interfaces/user/user'
import { FormAuth } from "../../components/formAuth/FormAuth"

export const Auth = () => {

    const [formLogin, setFormLogin] = useState(true)

    return (
        <div className="containerAuth">
            <div className="auth">
                <div className="optionForm">
                    <button onClick={() => {
                        setFormLogin(true)
                    }}>Sign in</button>
                    <button onClick={() => {
                        setFormLogin(false)
                    }}>Register</button>
                </div>
                <div className="form">
                    {formLogin ? (
                        <FormAuth valuesForm={['email', 'password']} />
                    ) : (
                        <FormAuth valuesForm={['name', 'userName', 'bios', 'email', 'password']} />
                    )}
                </div>
                {formLogin ? <p>Login</p> : <p>Register</p>}
            </div>

            
        </div>
        
    )
};
