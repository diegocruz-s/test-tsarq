import { DatasStorage } from "../../../interfaces/context/initialStates";
import { IAuth } from "../../../interfaces/user/auth";
import { api } from "../../../utils/api";
type ReturnDatasLogin = DatasStorage | string[]


export const loginService = async (datas: IAuth): Promise<ReturnDatasLogin> => {
    try {
        console.log('service')
        const res: ReturnDatasLogin = await api.post('/auth', datas)
            .then(response => {
                return response.data
            })
            .catch((err) => {
                return err.response.data
                
            })
        console.log('res:', res)
        return res
    } catch (error: any) {
        return [error.message]
        
    }
}
