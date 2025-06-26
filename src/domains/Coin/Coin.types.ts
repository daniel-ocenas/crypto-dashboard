export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  image: string;
  price_change_percentage_24h: number;
}

export interface CoinsState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  searchQuery?: string;
  filteredCoins?: [];
  searchResults: CoinSearchResult[];
  searchLoading: boolean;
}

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}
