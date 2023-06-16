import { createSlice } from "@reduxjs/toolkit";
import { IInitialStates } from "../../../interfaces/context/initialStates";
import { Music } from '../../../interfaces/musics/musics'

const initialState: IInitialStates = {
    error: null,
    success: '',
    loading: false,
    musics: undefined,
    music: undefined
}

export const musicSlice = createSlice({
    initialState,
    name: 'slice',
    reducers: {
        resetStates(state) {
            state.error = null
            state.success = ''
            state.loading = false
        }
    },
    extraReducers (builder) {
        builder.addCase('', (state, payload) => {
            console.log('abc')
        })
    }
})

export const { resetStates } = musicSlice.actions
export default musicSlice.reducer