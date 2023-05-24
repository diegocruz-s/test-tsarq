import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInitialStates, UserSave } from '../../../interfaces/context/initialStates'
import { loginService } from '../../services/auth/login'
import { IUser } from '../../../interfaces/user/user'
import { IAuth } from '../../../interfaces/user/auth'

const datasUser: UserSave = JSON.parse(localStorage.getItem('datasStorage') || '{}')

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
        
        if(res.errors) {
            return thunkAPI.rejectWithValue(res.errors[0])
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
                state.error = payload
                state.loading = false
                state.success = null
            })
            .addCase(login.pending, (state, action) => {
                state.error = null
                state.loading = true
                state.success = null
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                console.log('payload_success_login:', payload)
                state.error = null,
                state.loading = false
                state.datasStorage = payload
                localStorage.setItem('datasStorage', JSON.stringify(payload))
            })
    }
})

export const { resetStates } = authSlice.actions
export default authSlice.reducer
