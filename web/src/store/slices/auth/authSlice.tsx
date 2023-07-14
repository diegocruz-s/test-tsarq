import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInitialStates, DatasStorage } from '../../../interfaces/context/initialStates'
import { loginService, logoutFecth, registerService } from '../../services/auth/auth'
import { IAuth } from '../../../interfaces/user/auth'
import { IUser } from '../../../interfaces/user/user'
import { api } from '../../../utils/api'

const datasUser: DatasStorage = JSON.parse(localStorage.getItem('datasStorage') || '{}')

const initialState: IInitialStates = {
    error: null,
    loading: false,
    success: null,
    datasStorage: datasUser
}

export const login = createAsyncThunk(
    'auth/login', 
    async (datas: IAuth, thunkAPI) => {
        resetStates()
        if(!datas) {
            return
        }

        const res = await loginService(datas)
        if('errors' in res) {
            return thunkAPI.rejectWithValue(res.errors)
        }

        return res
    }   
)

export const register = createAsyncThunk(
    'auth/register', 
    async (datas: Omit<IUser, 'id'>, thunkAPI) => {
        resetStates()
        if(!datas) {
            return
        }

        const res = await registerService(datas)
        if('errors' in res) {
            return thunkAPI.rejectWithValue(res.errors)
        }

        return res
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        await logoutFecth()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetStates(states){
            states.error = null
            states.loading = false
            states.success = null
        },
        
    },
    extraReducers(builder) {
        builder
            // login
            .addCase(login.rejected, (state, { payload }) => {
                state.error = payload as string[]
                state.loading = false
                state.success = null
            })
            .addCase(login.pending, (state) => {
                state.error = null
                state.loading = true
                state.success = null
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                const payloadDatas = payload as DatasStorage
                state.error = null,
                state.loading = false
                state.datasStorage = payloadDatas
                api.defaults.headers.authorization = `Bearer ${payloadDatas.token}`
                localStorage.setItem('datasStorage', JSON.stringify(payload))
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.error = null
                state.loading = false
                state.datasStorage = undefined
            })
            // register
            .addCase(register.rejected, (state, { payload }) => {
                state.error = payload as string[]
                state.loading = false
                state.success = null
            })
            .addCase(register.pending, (state) => {
                state.error = null
                state.loading = true
                state.success = null
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.error = null,
                state.loading = false
                if(payload && 'message' in payload) {
                    state.success = payload?.message
                }
            })
    }
})

export const { resetStates } = authSlice.actions
export default authSlice.reducer
