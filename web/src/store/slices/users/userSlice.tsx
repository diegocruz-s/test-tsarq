import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialStates } from "../../../interfaces/context/initialStates";
import { IDatasEditPlaylist, createPlaylistFetch, deletePlaylistFetch, editPlaylistFetch, readPlaylistFetch, readPlaylistsFetch, removeMusicPlaylistFetch } from '../../services/playlist/playlist'
import { Playlist } from "../../../interfaces/playlist/playlist";
import { Music } from "../../../interfaces/musics/musics";
import { IDatasOperationMusicPlaylist } from "../music_playlist/musicPlaylistSlice";
import { IUser } from '../../../interfaces/user/user'
import { IUpdateUserDatas, deleteUserFetch, readUserFetch, updateUserFetch } from "../../services/user/user";
import { api } from "../../../utils/api";
import { logoutFecth } from "../../services/auth/auth";

const initialState: IInitialStates = {
    error: null,
    success: '',
    loading: false,
    user: undefined
}

export const readUser = createAsyncThunk(
    'user/read',
    async (_, thunkAPI) => {
        resetStates()
        const response = await readUserFetch()
        if('errros' in response) {
            return thunkAPI.rejectWithValue(response.errors)
        }

        return response
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (datas: IUpdateUserDatas, thunkAPI) => {
        resetStates()
        const response = await updateUserFetch(datas)
        if('errors' in response) {
            return thunkAPI.rejectWithValue(response.errors)
        }

        return response
    }
)

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (userId: string, thunkAPI) => {
        const response = await deleteUserFetch(userId)
        if('errors' in response) {
            return thunkAPI.rejectWithValue(response.errors)
        }

        return response
    }
)

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        resetStates(state) {
            state.error = null
            state.success = ''
            state.loading = false
        }
    },
    extraReducers (builder) {
        builder
        .addCase(readUser.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(readUser.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(readUser.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { user: IUser }
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                state.user = payloadDatas.user
            }
        })
        .addCase(updateUser.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(updateUser.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(updateUser.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { user: IUser, message: string }
            state.error = null,
            state.loading = false
            console.log('PD:', payloadDatas)
            if(payloadDatas) {
                if(state.user) {
                    state.user!.bios = payloadDatas.user.bios
                    state.success = payloadDatas.message
                }
            }
        })
        .addCase(deleteUser.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(deleteUser.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(deleteUser.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { message: string }
            state.error = null,
            state.loading = false
            console.log('PD:', payloadDatas)
            if(payloadDatas) {
                state.user = undefined
                state.success = payloadDatas.message
            }
        })
    }
})

export const { resetStates } = userSlice.actions
export default userSlice.reducer