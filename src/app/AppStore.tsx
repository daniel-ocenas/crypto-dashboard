import coinReducer from '@/domains/Coin/Coin.store';
import portfolioReducer from '@/domains/Portfolio/Portfolio.store';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const globalStore = configureStore({
  reducer: {
    coins: coinReducer,
    portfolio: portfolioReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
