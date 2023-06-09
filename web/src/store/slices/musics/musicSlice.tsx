import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialStates } from "../../../interfaces/context/initialStates";
import { Category, IDatasGetMusics, Music } from '../../../interfaces/musics/musics'
import { countMusicsFetch, createMusicFetch, deleteMusicFetch, getCategoriesFetch, getMusicsFetch } from "../../services/music/music";

const initialState: IInitialStates = {
    error: null,
    success: '',
    loading: false,
    musics: undefined,
    music: undefined,
    count: undefined,
    categories: undefined
}

export const createMusic = createAsyncThunk(
    'music/createMusic',
    async (datas: Partial<Music>, thunkAPI) => {
        resetStates()
        const response = await createMusicFetch(datas)
        if('errors' in response) {
            thunkAPI.rejectWithValue(response.errors)
        }

        return response
    }
)

export const deleteMusic = createAsyncThunk(
    'music/deleteMusic',
    async (id: string, thunkAPI) => {
        resetStates()
        const response = await deleteMusicFetch(id)
        if ('errors' in response) {
            return thunkAPI.rejectWithValue(response.errors)
        }

        return {
            response,
            id
        }
    }
)

export const getMusics = createAsyncThunk(
    'music/getMusics',
    async (datas: IDatasGetMusics, thunkAPI) => {
        resetStates()
        const musics = await getMusicsFetch(datas)
        if('errors' in musics) {
            return thunkAPI.rejectWithValue(musics.errors)
        }

        return musics
    }
)

export const getCategories = createAsyncThunk(
    'music/categories',
    async (_, thunkAPI) => {
        resetStates()
        const categories = await getCategoriesFetch()
        if('errors' in categories) {
            return thunkAPI.rejectWithValue(categories.errors)
        }

        return categories
    }
)

export const countMusics = createAsyncThunk(
    'music/count',
    async (_, thunkAPI) => {
        resetStates()
        const musics = await countMusicsFetch()
        if('errors' in musics) {
            return thunkAPI.rejectWithValue(musics.errors)
        }
        return musics
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
        }
    },
    extraReducers (builder) {
        builder
        .addCase(getMusics.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(getMusics.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(getMusics.fulfilled, (state, { payload }) => {
            const payloadDatas = payload.musics as Music[]
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                state.musics = payloadDatas

            }
        })
        .addCase(countMusics.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(countMusics.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(countMusics.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { count: number }
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                state.count = payloadDatas.count
            }
        })
        .addCase(getCategories.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(getCategories.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(getCategories.fulfilled, (state, { payload }) => {
            const payloadDatas = payload as { categories: Category[] }
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                state.categories = payloadDatas.categories
            }
        })
        .addCase(deleteMusic.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(deleteMusic.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(deleteMusic.fulfilled, (state, { payload }) => {
            const payloadDatas = payload
            state.error = null,
            state.loading = false
            if(payloadDatas && state.musics) {
                const filterMusics = state.musics.filter(music => music.id !== payloadDatas.id)
                state.musics = filterMusics

                state.success = payloadDatas.response.message
            }
        })
        .addCase(createMusic.rejected, (state, { payload }) => {
            state.error = payload as string[]
            state.loading = false
            state.success = null
        })
        .addCase(createMusic.pending, (state) => {
            state.error = null
            state.loading = true
            state.success = null
        })
        .addCase(createMusic.fulfilled, (state, { payload }) => {
            const payloadDatas = payload
            state.error = null,
            state.loading = false
            if(payloadDatas) {
                state.musics?.unshift(payloadDatas.music)
                state.success = payloadDatas.message
            }
        })
    }
})

export const { resetStates } = musicSlice.actions
export default musicSlice.reducer