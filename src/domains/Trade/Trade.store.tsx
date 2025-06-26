// store/tradesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { PositionType, Trade } from './Trade.types';

interface TradesState {
  trades: Trade[];
}

const initialState: TradesState = {
  trades: [],
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    addTrade: (state) => {
      state.trades.push({ id: uuidv4() });
    },
    updateCoin: (state, action: PayloadAction<{ id: string; coin?: string }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) {
        if(!action.payload.coin) {
          trade.coin = undefined;
        } else {
          trade.coin = action.payload.coin;
        }
      }
    },
    updateOpenPrice: (state, action: PayloadAction<{ id: string; openPrice: number }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) trade.openPrice = action.payload.openPrice;
    },
    updateDateTime: (state, action: PayloadAction<{ id: string; dateTime: string }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) trade.dateTime = action.payload.dateTime;
    },
    updateClosePrice: (state, action: PayloadAction<{ id: string; closePrice: number }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) trade.closePrice = action.payload.closePrice;
    },
    updateLeverage: (state, action: PayloadAction<{ id: string; leverage: number }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) trade.leverage = action.payload.leverage;
    },
    updatePositionSize: (state, action: PayloadAction<{ id: string; positionSize: number }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) trade.positionSize = action.payload.positionSize;
    },
    updatePositionType: (state, action: PayloadAction<{ id: string; type: PositionType }>) => {
      const trade = state.trades.find((t) => t.id === action.payload.id);
      if(trade) trade.type = action.payload.type;
    },
  },
});

export const {
  addTrade,
  updateCoin,
  updateOpenPrice,
  updateDateTime,
  updateLeverage,
  updateClosePrice,
  updatePositionSize,
  updatePositionType,
} = tradesSlice.actions;
export default tradesSlice.reducer;

// Selectors
