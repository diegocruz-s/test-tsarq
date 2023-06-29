import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialStates } from "../../../interfaces/context/initialStates";
import { readPlaylistsFetch } from '../../services/playlist/playlist'
import { Playlist } from "../../../interfaces/playlist/playlist";

const initialState: IInitialStates = {
    error: null,
    success: '',
    loading: false,
    playlist: undefined,
    playlists: undefined,
}

export interface IDatasReadPlaylist {
    skip?: number
    take?: number
}

export const readPlaylists = createAsyncThunk(
    'playlist/readMany',
    async (datas: IDatasReadPlaylist, thunkAPI) => {
        const playlists = await readPlaylistsFetch(datas)
        if ('errors' in playlists) {
            return thunkAPI.rejectWithValue(playlists.errors)
        }

        return playlists
    }
)

export const playlistSlice = createSlice({
    initialState,
    name: 'playlistSlice',
    reducers: {
        resetStates(state) {
            state.error = null
            state.success = ''
            state.loading = false
        }
    },
    extraReducers (builder) {
        builder
        .addCase(readPlaylists.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(readPlaylists.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(readPlaylists.fulfilled, (state, { payload }) => {
            const payloadDatas = payload.playlists as Playlist[]
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                state.playlists = payloadDatas
            }
        })
    }
})

export const { resetStates } = playlistSlice.actions
export default playlistSlice.reducer