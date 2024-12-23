import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Coin, CoinDetail } from '../types';
import { CoinModal } from './CoinModal/CoinModal';
import { useQuery } from 'react-query';
import { getCoinDetails } from '../services/api';
import { formatUSD, formatPercentage } from '../utils/formatters';

interface CoinTableRowProps {
  coin: Coin;
}

export const CoinTableRow: React.FC<CoinTableRowProps> = ({ coin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coinDetails, isLoading } = useQuery<CoinDetail | null>(
    ['coin', coin.id],
    () => getCoinDetails(coin.id),
    {
      enabled: isModalOpen,
      staleTime: 60000,
      cacheTime: 3600000,
      retry: 2,
    }
  );

  const getPriceChangeColor = (value: number) => {
    if (value > 0) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (value < 0) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <>
      <tr 
        className="hover:bg-indigo-50 dark:hover:bg-indigo-900/10 cursor-pointer transition-colors" 
        onClick={() => setIsModalOpen(true)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img 
              src={coin.image} 
              alt={coin.name} 
              className="h-10 w-10 rounded-full shadow-md"
            />
            <div className="ml-4">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {coin.name}
              </div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                {coin.symbol.toUpperCase()}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {formatUSD(coin.current_price)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getPriceChangeColor(coin.price_change_percentage_24h)}`}>
            {coin.price_change_percentage_24h > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {formatPercentage(coin.price_change_percentage_24h)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getPriceChangeColor(coin.price_change_percentage_7d_in_currency)}`}>
            {coin.price_change_percentage_7d_in_currency > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {formatPercentage(coin.price_change_percentage_7d_in_currency)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 dark:text-white font-medium">
            {formatUSD(coin.market_cap)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 dark:text-white font-medium">
            {formatUSD(coin.fully_diluted_valuation)}
          </div>
        </td>
      </tr>
      {isModalOpen && !isLoading && coinDetails && (
        <CoinModal 
          coin={coinDetails} 
          onClose={() => setIsModalOpen(false)} 
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};