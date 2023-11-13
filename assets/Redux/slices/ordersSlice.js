import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchDateOrders = createAsyncThunk(
  'book/fetchDateOrdersStatus',
  async (params, thunkAPI) => {
    const { dateFrom, dateTo } = params;
    const { data } = await axios.get(
      `http://localhost:8080/orders/report?from=${dateFrom}&to=${dateTo}`,
    );
    console.log(`http://localhost:8080/orders/report?from=${dateFrom}&to=${dateTo}`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Заказов нет');
    }

    return thunkAPI.fulfillWithValue(data);
  },
);
export const fetchPartOrders = createAsyncThunk(
  'book/fetchPartOrdersStatus',
  async (params, thunkAPI) => {
    const { userId } = params;
    const { data } = await axios.get(`//localhost:8000/api/reservation/user/${userId}`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Заказов нет');
    }

    return thunkAPI.fulfillWithValue(data);
  },
);
export const fetchOrders = createAsyncThunk(
  'author/fetchOrdersStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`//localhost:8000/api/reservation`);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Заказов нет');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);
const initialState = {
  orders: [],
  reportOrders: [],
  ordersStatus: 'loading',
  reportOrdersStatus: 'loading',
};

const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setItems(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.ordersStatus = 'loading';
      state.orders = [];
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.ordersStatus = 'success';
      state.orders = action.payload;
    },
    [fetchOrders.rejected]: (state) => {
      state.ordersStatus = 'error';
      state.orders = [];
    },
    [fetchPartOrders.pending]: (state) => {
      state.ordersStatus = 'loading';
      state.orders = [];
    },
    [fetchPartOrders.fulfilled]: (state, action) => {
      state.ordersStatus = 'success';
      state.orders = action.payload;
    },
    [fetchPartOrders.rejected]: (state) => {
      state.ordersStatus = 'error';
      state.orders = [];
    },
    [fetchDateOrders.pending]: (state) => {
      state.reportOrdersStatus = 'loading';
      state.reportOrders = [];
    },
    [fetchDateOrders.fulfilled]: (state, action) => {
      state.reportOrdersStatus = 'success';
      state.reportOrders = action.payload;
    },
    [fetchDateOrders.rejected]: (state) => {
      state.reportOrdersStatus = 'error';
      state.reportOrders = [];
    },
  },
});

export const { setItems } = ordersSlice.actions;

export default ordersSlice.reducer;
