import { IUser } from "../user/user"
export interface UserSave {
    user: Omit<IUser, 'password'>,
    token: string
}

export interface IInitialStates {
    loading: boolean
    error: any
    success: string | null
    datasStorage?: UserSave | null
}
