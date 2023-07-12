import { DatasStorage } from "../../../interfaces/context/initialStates";
import { IAuth } from "../../../interfaces/user/auth";
import { IUser } from "../../../interfaces/user/user";
import { api } from "../../../utils/api";

type ReturnDatasLogin = DatasStorage | string[]
type ReturnDatasRegister = {
    user: Omit<IUser, 'password'>,
    message: string
} | string[]

export const loginService = async (datas: IAuth): Promise<ReturnDatasLogin> => {
    try {
        const res: ReturnDatasLogin = await api.post('/auth', datas)
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
                
            })
        return res
    } catch (error: any) {
        return [error.message]
        
    }
}

export const registerService = async (datas: Omit<IUser, 'id'>): Promise<ReturnDatasRegister> => {
    try {
        const res: ReturnDatasRegister = await api.post('/user', datas)
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
                
            })
        return res
    } catch (error: any) {
        return [error.message]
    }
}
