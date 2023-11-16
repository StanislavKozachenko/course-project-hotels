import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk('review/fetchReviewsStatus', async (params, thunkAPI) => {
    const { id } = params;
    const { data } = await axios.get(`//localhost:8000/api/review/hotel/${id}`);
    if (data.length === 0) {
        return thunkAPI.rejectWithValue('Отзывов нет');
    }

    return thunkAPI.fulfillWithValue(data);
});
export const fetchAllReviews = createAsyncThunk(
    'review/fetchAllReviewsStatus',
    async (params, thunkAPI) => {
        const { data } = await axios.get(`//localhost:8000/api/review`);
        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Отзывов нет');
        }

        return thunkAPI.fulfillWithValue(data);
    },
);
const initialState = {
    reviews: [],
    reviewsStatus: 'loading',
};

const reviewsSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setItems(state, action) {
            state.reviews = action.payload;
        },
    },
    extraReducers: {
        [fetchReviews.pending]: (state) => {
            state.reviewsStatus = 'loading';
            state.reviews = [];
        },
        [fetchReviews.fulfilled]: (state, action) => {
            state.reviewsStatus = 'success';
            state.reviews = action.payload;
        },
        [fetchReviews.rejected]: (state) => {
            state.reviewsStatus = 'error';
            state.reviews = [];
        },
        [fetchAllReviews.pending]: (state) => {
            state.reviewsStatus = 'loading';
            state.reviews = [];
        },
        [fetchAllReviews.fulfilled]: (state, action) => {
            state.reviewsStatus = 'success';
            state.reviews = action.payload;
        },
        [fetchAllReviews.rejected]: (state) => {
            state.reviewsStatus = 'error';
            state.reviews = [];
        },
    },
});

export const { setItems } = reviewsSlice.actions;

export default reviewsSlice.reducer;
