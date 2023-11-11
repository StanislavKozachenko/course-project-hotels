import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  category: 'All',
  currentPage: 1,
  sort: {
    name: 'популярности',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortProperty(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.category = action.payload.category;
    },
  },
});

export const { setCategory, setSortProperty, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
