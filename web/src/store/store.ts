import { configureStore } from '@reduxjs/toolkit'
    // authReducer armazena todos os reducers de authSlice.ts
import authReducer from './slices/auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import musicSlice from './slices/musics/musicSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        music: musicSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
