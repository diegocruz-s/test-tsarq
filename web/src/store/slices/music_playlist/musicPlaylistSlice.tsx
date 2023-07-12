import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialStates } from "../../../interfaces/context/initialStates";
import { IDatasGetMusics, Music } from '../../../interfaces/musics/musics'
import { addMusicPlaylistFetch } from "../../services/music_playlist/musicPlayslit";
import { Playlist } from "../../../interfaces/playlist/playlist";

const initialState: IInitialStates = {
    error: null,
    success: '',
    loading: false,
    playlistName: ''
}

export interface IDatasOperationMusicPlaylist {
    musicId: string
    playlistId: string
}
export interface IDatasReturnAddMusicPlaylist {
    musicPlaylist: {
        musicId: string
        playlistId: string
        playlist: Playlist
    }
    message: string
}

export const addMusicPlaylist = createAsyncThunk(
    'musicPlaylist/add',
    async (datas: IDatasOperationMusicPlaylist, thunkAPI) => {
        resetStates()
        const response = await addMusicPlaylistFetch(datas)
        if('errors' in response) {
            return thunkAPI.rejectWithValue(response.errors)
        }
        console.log('response', response)
        return response
    }
)

export const musicSlice = createSlice({
    initialState,
    name: 'slice',
    reducers: {
        resetStates(state) {
            state.error = null
            state.success = ''
            state.loading = false
            state.playlistName = ''
        }
    },
    extraReducers (builder) {
        builder
        .addCase(addMusicPlaylist.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(addMusicPlaylist.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(addMusicPlaylist.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as IDatasReturnAddMusicPlaylist
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                console.log('msg:', payloadDatas.message)
                state.success = payloadDatas.message
                state.playlistName = payloadDatas.musicPlaylist.playlist.name
            }
        })
    }
})

export const { resetStates } = musicSlice.actions
export default musicSlice.reducer