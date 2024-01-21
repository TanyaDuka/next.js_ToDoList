import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './slice/boardSlice';
import { cardsApi } from './slice/cardSlice';

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardsApi.middleware)
      .concat(cardsApi.middleware)
});

export default store;
