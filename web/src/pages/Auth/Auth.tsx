import "./styles/main.scss";
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IUser } from '../../interfaces/user/user'
import { FormAuth, UserData } from "../../components/formAuth/FormAuth"
import { datasFormLogin, datasFormRegister } from "../../datas/form/auth";

export const Auth = () => {



    const [formLogin, setFormLogin] = useState<boolean>(true)
    const [optionsDatasForm, setOptionsDatasForm] = useState<UserData>(
        {
            bios: "",
            email: "",
            name: "",
            password: "",
            username: "",
        }
      )
      console.log('valueDatas', optionsDatasForm)

    return (
        <div className="containerAuth">
            <div className="auth">
                <div className="optionForm">
                    <button 
                        onClick={() => {
                            setFormLogin(true)
                        }}
                        className={formLogin ? 'active' : ''}
                    >
                        <span>Sign in</span> 
                    </button>
                    <button 
                        onClick={() => {
                            setFormLogin(false)
                        }}
                        className={!formLogin ? 'active' : ''}
                    >
                        <span>Register</span> 
                    </button>
                </div>
                <div className="form">

                    {formLogin ? (
                        <FormAuth 
                            valuesForm={datasFormLogin} 
                            datasForm={optionsDatasForm}
                            setDatasForm={setOptionsDatasForm}
                        />
                    ) : (
                        <FormAuth 
                            valuesForm={datasFormRegister} 
                            datasForm={optionsDatasForm}
                            setDatasForm={setOptionsDatasForm}
                        />
                    )}

                    <div className="elementSubmit">
                        <button type="button">Send</button>
                    </div>
                </div>
            </div>

            
        </div>
        
    )
};
