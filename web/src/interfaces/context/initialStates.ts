import { IUser } from "../user/user"
export interface DatasStorage {
    user: Omit<IUser, 'password'>,
    token: string
}

export interface IInitialStates {
    loading: boolean
    error: string[] | null
    success: string | null
    datasStorage?: DatasStorage | null
}
