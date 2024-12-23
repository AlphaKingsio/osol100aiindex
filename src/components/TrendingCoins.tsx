import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Coin } from '../types';
import { formatUSD, formatPercentage } from '../utils/formatters';

interface TrendingCoinsProps {
  coins: Coin[];
}

export const TrendingCoins: React.FC<TrendingCoinsProps> = ({ coins }) => {
  const topCoins = coins
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  return (
    <div className="py-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl mb-8">
      <div className="px-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Trending Coins</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topCoins.map((coin) => (
            <div key={coin.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-indigo-100 dark:border-indigo-900">
              <div className="flex items-center space-x-3 mb-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{coin.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatUSD(coin.current_price)}
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  coin.price_change_percentage_24h > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {coin.price_change_percentage_24h > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {formatPercentage(coin.price_change_percentage_24h)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};