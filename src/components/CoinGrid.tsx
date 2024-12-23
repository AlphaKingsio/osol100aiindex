import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Coin } from '../types';
import { formatUSD, formatPercentage } from '../utils/formatters';

interface CoinGridProps {
  coins: Coin[];
  onCoinClick: (coin: Coin) => void;
}

export const CoinGrid: React.FC<CoinGridProps> = ({ coins, onCoinClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {coins.map((coin) => (
        <div
          key={coin.id}
          onClick={() => onCoinClick(coin)}
          className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border border-indigo-100 dark:border-indigo-900"
        >
          <div className="flex items-center space-x-4 mb-4">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full shadow-md" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{coin.name}</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatUSD(coin.current_price)}
              </p>
            </div>
            
            <div className="flex justify-between gap-4">
              <div className="flex-1 bg-white/50 dark:bg-gray-900/50 rounded-lg p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
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
              
              <div className="flex-1 bg-white/50 dark:bg-gray-900/50 rounded-lg p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatUSD(coin.market_cap)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};