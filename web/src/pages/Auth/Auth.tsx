import styles from "./styles/main.module.scss";
import { useState } from 'react'
import { FormAuth, UserData } from "../../components/formAuth/FormAuth"
import { datasFormLogin, datasFormRegister } from "../../datas/form/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login, register } from "../../store/slices/auth/authSlice";
import { Message } from "../../components/Message/Message";

export const Auth = () => {
    const dispatch = useAppDispatch()
    const { error, success, loading } = useAppSelector(state => state.auth)
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
    
    const resetDatasForm = () => {
        setOptionsDatasForm({
            bios: "",
            email: "",
            name: "",
            password: "",
            username: "",
        })
    }

    return (
        <div className={styles.containerAuth}>
            <div className={styles.auth}>
                <div className={styles.optionForm}>
                    <button 
                        onClick={() => {
                            setFormLogin(true)
                        }}
                        className={formLogin ? styles.active : ''}
                    >
                        <span>Sign in</span> 
                    </button>
                    <button 
                        onClick={() => {
                            setFormLogin(false)
                        }}
                        className={!formLogin ? styles.active : ''}
                    >
                        <span>Register</span> 
                    </button>
                </div>
                <div className={styles.form}>

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

                    <div className={styles.btnsAuth}>
                        {loading ? (
                            <button 
                                type="button"
                                className={styles.btnSubmit}
                                disabled
                            >Wait...</button>
                        ) : (
                            <button 
                                type="button"
                                className={styles.btnSubmit}
                                onClick={
                                    formLogin 
                                    ? () => dispatch(login(optionsDatasForm)) 
                                    : () => dispatch(register(optionsDatasForm))
                                }
                            >Send</button>
                        )}
                        <button
                            className={styles.resetDatasForm}
                            type="button"
                            onClick={resetDatasForm}
                        >X</button>
                    </div>

                </div>
                
                { error && (
                    <Message
                        message={error[0]}
                        type="error"
                    />
                ) }
                { success && (
                    <Message
                        message={success}
                        type="success"
                    />
                ) }

            </div>

            
        </div>
        
    )
};
