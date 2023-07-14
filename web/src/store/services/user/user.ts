import { api } from "../../../utils/api"

export const readUserFetch = async () => {
    try {
        const response = await api.get(`/user`)
            .then (res => {
                return res.data
            })
            .catch(err => {
                return err.respose.data
            })
        
        return response
    } catch (error: any) {
        return [error.message]
    }
}

export interface IUpdateUserDatas {
    userId: string
    bios: string
}

export const updateUserFetch = async (datas: IUpdateUserDatas) => {
    try {
        const response = await api.patch(`/user/${datas.userId}`, { bios: datas.bios })
            .then (res => {
                return res.data
            })
            .catch(err => {
                return err.respose.data
            })
        
        return response
    } catch (error: any) {
        return [error.message]
    }
}