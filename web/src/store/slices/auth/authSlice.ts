import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInitialStates, DatasStorage } from '../../../interfaces/context/initialStates'
import { loginService } from '../../services/auth/login'
import { IAuth } from '../../../interfaces/user/auth'

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
        console.log('slice')
        const res = await loginService(datas)
        console.log('resSlice:', res)
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
    }
})

export const { resetStates } = authSlice.actions
export default authSlice.reducer
