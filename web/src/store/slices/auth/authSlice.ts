import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInitialStates } from '../../../interfaces/context/initialStates'

const initialState: IInitialStates = {
    error: null,
    loading: false,
    success: null,
    user: {
        bios: 'Qualquer',
        email: 'diego@gmail.com',
        id: '1',
        name: 'Diego',
        password: '123456',
        username: 'dsc_0'
    }
}


export const login = createAsyncThunk('auth/login', () => {
    return ''
})


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
            .addCase(login.rejected, (state, action) => {
                state.error = '',
                state.loading = false
                state.success = null
            })
    }
})

export const { resetStates } = authSlice.actions
export default authSlice.reducer
