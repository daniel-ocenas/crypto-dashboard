import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface PortfolioStore {
  id: string
  name: string
  symbol: string
  current_price: number
  image: string
  price_change_percentage_24h: number
}

interface CoinsState {
  coins: PortfolioStore[]
  loading: boolean
  error: string | null
}

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
}

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
  )
  return res.data
})

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCoins.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchCoins.fulfilled, (state, action) => {
      state.loading = false
      state.coins = action.payload
    })
    .addCase(fetchCoins.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch coins'
    })
  },
})

export default coinsSlice.reducer
