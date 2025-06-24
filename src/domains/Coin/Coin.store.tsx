import { createSlice } from '@reduxjs/toolkit';
import { fetchCoins, searchCoins } from './Coin.api';
import { CoinsState } from './Coin.types';

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
  searchQuery: undefined,
  filteredCoins: [],
  searchResults: [],
  searchLoading: false,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch coins';
      })
      .addCase(searchCoins.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchCoins.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCoins.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Failed to search coins';
      });
  },
});

export default coinsSlice.reducer;
