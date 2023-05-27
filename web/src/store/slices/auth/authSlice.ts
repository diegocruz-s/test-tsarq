import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInitialStates, DatasStorage } from '../../../interfaces/context/initialStates'
import { loginService, registerService } from '../../services/auth/auth'
import { IAuth } from '../../../interfaces/user/auth'
import { IUser } from '../../../interfaces/user/user'

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
        console.log('datasRegister:', datas)
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
                console.log('payload_rejected_login:', payload)
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
                console.log('payload_success_login:', payload)
                state.error = null,
                state.loading = false
                state.datasStorage = payload as DatasStorage
                localStorage.setItem('datasStorage', JSON.stringify(payload))
            })
            // register
            .addCase(register.rejected, (state, { payload }) => {
                console.log('payload_rejected_register:', payload)
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
                console.log('payload_success_register:', payload)
                state.error = null,
                state.loading = false
                if('message' in payload!) {
                    state.success = payload?.message
                }
            })
    }
})

export const { resetStates } = authSlice.actions
export default authSlice.reducer
