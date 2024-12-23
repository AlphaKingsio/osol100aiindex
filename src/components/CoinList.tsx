import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getCoins, getCoinDetails } from '../services/api';
import { CoinTableHeader } from './CoinTableHeader';
import { CoinTableRow } from './CoinTableRow';
import { CoinGrid } from './CoinGrid';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { ViewSwitcher } from './ViewSwitcher';
import { TrendingCoins } from './TrendingCoins';
import { Pagination } from './Pagination';
import { CoinModal } from './CoinModal/CoinModal';
import type { Coin, CoinDetail } from '../types';

const ITEMS_PER_PAGE = 25;

export const CoinList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const { data: coins, isLoading, error } = useQuery('coins', getCoins, {
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const { data: coinDetails, isLoading: isLoadingDetails } = useQuery(
    ['coin', selectedCoin],
    () => selectedCoin ? getCoinDetails(selectedCoin) : null,
    {
      enabled: !!selectedCoin,
      staleTime: 60000,
    }
  );

  const filteredCoins = useMemo(() => {
    if (!coins) return [];

    let filtered = coins.filter(coin => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (filterBy) {
      case 'marketCap':
        return filtered.sort((a, b) => b.market_cap - a.market_cap);
      case 'price':
        return filtered.sort((a, b) => b.current_price - a.current_price);
      case 'priceAsc':
        return filtered.sort((a, b) => a.current_price - b.current_price);
      case 'gainers':
        return filtered.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      case 'losers':
        return filtered.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
      default:
        return filtered;
    }
  }, [coins, searchQuery, filterBy]);

  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCoins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCoins, currentPage]);

  const totalPages = Math.ceil(filteredCoins.length / ITEMS_PER_PAGE);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading coins" />;

  const handleCoinClick = (coin: Coin) => {
    setSelectedCoin(coin.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {coins && <TrendingCoins coins={coins} />}
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterDropdown value={filterBy} onChange={setFilterBy} />
        <div className="flex justify-end">
          <ViewSwitcher view={view} onViewChange={setView} />
        </div>
      </div>

      <div className="mb-6">
        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <CoinTableHeader />
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedCoins.map((coin) => (
                  <CoinTableRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <CoinGrid coins={paginatedCoins} onCoinClick={handleCoinClick} />
        )}
        
        {filteredCoins.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No coins found matching your search criteria
          </div>
        )}
      </div>

      {selectedCoin && !isLoadingDetails && coinDetails && (
        <CoinModal
          coin={coinDetails}
          onClose={() => setSelectedCoin(null)}
          isOpen={!!selectedCoin}
        />
      )}

      {filteredCoins.length > ITEMS_PER_PAGE && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};