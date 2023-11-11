import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHotels = createAsyncThunk('hotel/fetchHotelsStatus', async (params, thunkAPI) => {
    const { currentPage, category, sort, search } = params;
    const { data } = await axios.get(`//localhost:8000/api/hotels/filter?page=${currentPage}&limit=4&category=${category}&sortType=${sort}${search}`
        //`https://63d554b90e7ae91a00ac4e8e.mockapi.io/items?page=${currentPage}&limit=4&${
        //   categoryId > 0 ? `category=${categoryId}` : ''
        //}&sortBy=${sortType.sort}&order=desc${search}`,
        // `http://localhost:8080/books/?category=${categoryId}&page=${currentPage}${search}&sortBy=${sortType.sort}`,
    );
    if (data.length === 0) {
        return thunkAPI.rejectWithValue('Отелей нет');
    }

    return thunkAPI.fulfillWithValue(data);
});
export const fetchAllHotels = createAsyncThunk(
    'hotel/fetchAllHotelsStatus',
    async (params, thunkAPI) => {
        const { data } = await axios.get(`//localhost:8000/api/hotel`);
        // https://63d554b90e7ae91a00ac4e8e.mockapi.io/items`);
        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Отелей нет');
        }

        return thunkAPI.fulfillWithValue(data);
    },
);
const initialState = {
    hotels: [],
    hotelsStatus: 'loading',
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        setItems(state, action) {
            state.hotels = action.payload;
        },
    },
    extraReducers: {
        [fetchHotels.pending]: (state) => {
            state.hotelsStatus = 'loading';
            state.hotels = [];
        },
        [fetchHotels.fulfilled]: (state, action) => {
            state.hotelsStatus = 'success';
            state.hotels = action.payload;
        },
        [fetchHotels.rejected]: (state) => {
            state.hotelsStatus = 'error';
            state.hotels = [];
        },
        [fetchAllHotels.pending]: (state) => {
            state.hotelsStatus = 'loading';
            state.hotels = [];
        },
        [fetchAllHotels.fulfilled]: (state, action) => {
            state.hotelsStatus = 'success';
            state.hotels = action.payload;
        },
        [fetchAllHotels.rejected]: (state) => {
            state.hotelsStatus = 'error';
            state.hotels = [];
        },
    },
});

export const { setItems } = hotelSlice.actions;

export default hotelSlice.reducer;
