import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import books from './slices/booksSlice';
import users from './slices/usersSlice';
import authors from './slices/authorsSlice';
import publishers from './slices/publishersSlice';
import transactions from './slices/transactionsSlice';
import orders from './slices/ordersSlice';

import hotels from './slices/hotelsSlice';
import rooms from './slices/roomsSlice';
import reviews from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    books,
    users,
    authors,
    publishers,
    transactions,
    orders,
    hotels,
    rooms,
    reviews
  },
});
