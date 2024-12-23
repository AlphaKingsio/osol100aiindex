import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-indigo-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 text-base border-2 border-indigo-100 dark:border-indigo-900 rounded-xl leading-5 bg-white dark:bg-gray-800 placeholder-indigo-400 dark:placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out"
        placeholder="Search coins..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};