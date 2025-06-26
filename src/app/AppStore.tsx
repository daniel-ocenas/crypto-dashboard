import coinReducer from '@/domains/Coin/Coin.store';
import portfolioReducer from '@/domains/Portfolio/Portfolio.store';
import tradesReducer from '@/domains/Trade/Trade.store';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('trades');
    if (serialized === null) return undefined;
    return { trades: { trades: JSON.parse(serialized) } };
  } catch {
    return undefined;
  }
};

export const globalStore = configureStore({
  reducer: {
    coins: coinReducer,
    portfolio: portfolioReducer,
    trades: tradesReducer,
  },
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV !== 'production',
});

// temporarily persist store data in local storage
globalStore.subscribe(() => {
  try {
    const state = globalStore.getState();
    const serialized = JSON.stringify(state.trades.trades);
    localStorage.setItem('trades', serialized);
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
