import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialStates } from "../../../interfaces/context/initialStates";
import { IDatasEditPlaylist, createPlaylistFetch, deletePlaylistFetch, editPlaylistFetch, readPlaylistFetch, readPlaylistsFetch } from '../../services/playlist/playlist'
import { Playlist } from "../../../interfaces/playlist/playlist";
import { Music } from "../../../interfaces/musics/musics";

const initialState: IInitialStates = {
    error: null,
    success: '',
    loading: false,
    datasPlay: undefined,
    playlists: undefined,
}

export interface IDatasReadPlaylist {
    skip?: number
    take?: number
}

export const createPlaylist = createAsyncThunk(
    'playlist/create', 
    async (datas: FormData, thunkAPI) => {
        resetStates()
        const newPlaylist = await createPlaylistFetch(datas)
        if ('errors' in newPlaylist) {
            return thunkAPI.rejectWithValue(newPlaylist.errors)
        }

        return newPlaylist
    }
)

export const readPlaylists = createAsyncThunk(
    'playlist/readMany',
    async (datas: IDatasReadPlaylist, thunkAPI) => {
        resetStates()
        const playlists = await readPlaylistsFetch(datas)
        if ('errors' in playlists) {
            return thunkAPI.rejectWithValue(playlists.errors)
        }

        return playlists
    }
)

export const deletePlaylist = createAsyncThunk(
    'playlist/delete',
    async (id: string, thunkAPI) => {
        resetStates()
        const deleted = await deletePlaylistFetch(id)
        if('errors' in deleted) {
            return thunkAPI.rejectWithValue(deleted.errors)
        }

        return {
            deleted,
            id
        }
    }
)

export const editPlaylist = createAsyncThunk(
    'playlist/edit',
    async (datas: IDatasEditPlaylist, thunkAPI) => {
        resetStates()
        const edited = await editPlaylistFetch(datas)
        if('errors' in edited) {
            return thunkAPI.rejectWithValue(edited.errors)
        }

        return edited
    }
)

export const readPlaylist = createAsyncThunk(
    'playlist/readOne',
    async (id: string, thunkAPI) => {
        resetStates()
        console.log('ok')
        const datas = await readPlaylistFetch(id)
        if('errors' in datas) {
            return thunkAPI.rejectWithValue(datas.errors)
        }

        return datas
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
        .addCase(deletePlaylist.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(deletePlaylist.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(deletePlaylist.fulfilled, (state, { payload }) => {
            const payloadDatas = payload.deleted as { message: string }
            state.error = null,
            state.loading = false
            if(payloadDatas && state.playlists) {
                const newPlaylists = state.playlists.filter(playlist => playlist.id != payload.id)
                state.playlists = newPlaylists
                state.success = payloadDatas.message
            }
        })
        .addCase(editPlaylist.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(editPlaylist.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(editPlaylist.fulfilled, (state, { payload }) => {
            const payloadDatas = payload.playlist as Playlist
            state.error = null,
            state.loading = false
            console.log('payloadDatas', payloadDatas)
            if(payloadDatas && state.playlists) {
                state.playlists.map(playlist => {
                    if (playlist.id === payloadDatas.id) {
                        console.log('Foi')
                        playlist.name = payloadDatas.name
                    }
                })
                state.success = payload.message
            }
        })
        .addCase(readPlaylist.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(readPlaylist.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(readPlaylist.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { playlist: Playlist, musics: Music[] }
            state.error = null,
            state.loading = false
            console.log('payloadDatas', payloadDatas)
            if(payloadDatas) {
                state.datasPlay = payloadDatas
            }
        })
        .addCase(createPlaylist.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(createPlaylist.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(createPlaylist.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { playlist: Playlist, message: string }
            console.log('payload:', payloadDatas.playlist)
            state.error = null,
            state.loading = false
            console.log('payloadDatas', payloadDatas)
            if(payloadDatas && payloadDatas.playlist) {
                state.playlists?.unshift(payloadDatas.playlist)
                state.success = payloadDatas.message
            }
        })
    }
})

export const { resetStates } = playlistSlice.actions
export default playlistSlice.reducer