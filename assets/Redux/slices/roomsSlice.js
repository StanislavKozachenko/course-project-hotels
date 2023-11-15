import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRooms = createAsyncThunk(
    'room/fetchRoomsStatus',
    async (params, thunkAPI) => {
        const { data } = await axios.get(`//localhost:8000/api/room`);
        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Издательств нет');
        }
        return thunkAPI.fulfillWithValue(data);
    },
);

const initialState = {
    rooms: [],
    roomsStatus: 'loading',
};

const roomsSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setItems(state, action) {
            state.rooms = action.payload;
        },
    },
    extraReducers: {
        [fetchRooms.pending]: (state) => {
            state.roomsStatus = 'loading';
            state.rooms = [];
        },
        [fetchRooms.fulfilled]: (state, action) => {
            state.roomsStatus = 'success';
            state.rooms = action.payload;
        },
        [fetchRooms.rejected]: (state) => {
            state.roomsStatus = 'error';
            state.rooms = [];
        },
    },
});

export const { setItems } = roomsSlice.actions;

export default roomsSlice.reducer;
