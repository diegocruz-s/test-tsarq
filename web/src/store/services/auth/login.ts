import { IAuth } from "../../../interfaces/user/auth";
import { api } from "../../../utils/api";

export const loginService = async (datas: IAuth) => {
    try {
        console.log('service')
        const res = await api.post('/auth', datas)
            .then(response => {
                return response.data
            })
            .catch(err => {
                return err.response.data
            })

        return res
    } catch (error: any) {
        console.log('Foi')
    }
}
