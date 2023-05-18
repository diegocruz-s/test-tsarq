import { configureStore } from '@reduxjs/toolkit'
    // authReducer armazena todos os reducers de authSlice.ts
import authReducer from './slices/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

