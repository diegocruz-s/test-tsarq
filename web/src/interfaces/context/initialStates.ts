import { IUser } from "../user/user"

export interface IInitialStates {
    loading: boolean
    error: any
    success: string | null
    user?: IUser | null
}
