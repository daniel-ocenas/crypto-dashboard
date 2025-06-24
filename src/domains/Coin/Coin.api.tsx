import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COIN_GECKO_V3 = 'https://api.coingecko.com/api/v3/';

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const res = await axios.get(
    `${COIN_GECKO_V3}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1`,
  );
  return res.data;
});

export const searchCoins = createAsyncThunk('coins/searchCoins', async (query: string) => {
  const res = await axios.get(`${COIN_GECKO_V3}search?query=${query}`);
  return res.data.coins;
});
