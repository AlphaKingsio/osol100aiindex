import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-3 text-base border-2 border-indigo-100 dark:border-indigo-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 ease-in-out appearance-none"
      >
        <option value="">All Coins</option>
        <option value="marketCap">Highest Market Cap</option>
        <option value="price">Highest Price</option>
        <option value="priceAsc">Lowest Price</option>
        <option value="gainers">Top Gainers (24h)</option>
        <option value="losers">Top Losers (24h)</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-5 w-5 text-indigo-500" />
      </div>
    </div>
  );
};