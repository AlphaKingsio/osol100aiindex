import { apiClient } from './client';
import { ENDPOINTS, COIN_LIST } from './endpoints';
import type { Coin, CoinDetail } from '../../types';
import { serializeError } from '../../utils/errors';

const DEFAULT_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  sparkline: true,
  price_change_percentage: '7d',
  per_page: 100,
  locale: 'en',
};

const sanitizeCoinData = (coin: any): Coin => ({
  id: String(coin.id || ''),
  symbol: String(coin.symbol || ''),
  name: String(coin.name || ''),
  image: String(coin.image || ''),
  current_price: Number(coin.current_price || 0),
  market_cap: Number(coin.market_cap || 0),
  market_cap_rank: Number(coin.market_cap_rank || 0),
  fully_diluted_valuation: Number(coin.fully_diluted_valuation || 0),
  total_volume: Number(coin.total_volume || 0),
  price_change_percentage_24h: Number(coin.price_change_percentage_24h || 0),
  price_change_percentage_7d_in_currency: Number(coin.price_change_percentage_7d_in_currency || 0),
  circulating_supply: Number(coin.circulating_supply || 0),
  total_supply: Number(coin.total_supply || 0),
  sparkline_in_7d: {
    price: Array.isArray(coin.sparkline_in_7d?.price) ? coin.sparkline_in_7d.price.map(Number) : [],
  },
});

const sanitizeCoinDetails = (data: any): CoinDetail => ({
  ...sanitizeCoinData(data),
  description: {
    en: String(data.description?.en || ''),
  },
  links: {
    homepage: Array.isArray(data.links?.homepage) ? data.links.homepage.map(String) : [],
    blockchain_site: Array.isArray(data.links?.blockchain_site) ? data.links.blockchain_site.map(String) : [],
    official_forum_url: Array.isArray(data.links?.official_forum_url) ? data.links.official_forum_url.map(String) : [],
    chat_url: Array.isArray(data.links?.chat_url) ? data.links.chat_url.map(String) : [],
    announcement_url: Array.isArray(data.links?.announcement_url) ? data.links.announcement_url.map(String) : [],
    twitter_screen_name: String(data.links?.twitter_screen_name || ''),
    telegram_channel_identifier: String(data.links?.telegram_channel_identifier || ''),
    subreddit_url: String(data.links?.subreddit_url || ''),
  },
});

export const getCoins = async (): Promise<Coin[]> => {
  try {
    const { data } = await apiClient.get(ENDPOINTS.MARKETS, {
      params: {
        ...DEFAULT_PARAMS,
        ids: COIN_LIST.join(','),
      },
    });
    
    return Array.isArray(data) ? data.map(sanitizeCoinData) : [];
  } catch (error) {
    console.error('Error fetching coins:', serializeError(error));
    return [];
  }
};

export const getCoinDetails = async (coinId: string): Promise<CoinDetail | null> => {
  try {
    const { data } = await apiClient.get(`${ENDPOINTS.COIN_DETAILS}/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true
      }
    });

    return sanitizeCoinDetails({
      ...data,
      current_price: data.market_data?.current_price?.usd,
      market_cap: data.market_data?.market_cap?.usd,
      fully_diluted_valuation: data.market_data?.fully_diluted_valuation?.usd,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h,
      price_change_percentage_7d_in_currency: data.market_data?.price_change_percentage_7d,
      sparkline_in_7d: {
        price: data.market_data?.sparkline_7d?.price
      }
    });
  } catch (error) {
    console.error('Error fetching coin details:', serializeError(error));
    return null;
  }
};