import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="https://yellow-total-guanaco-389.mypinata.cloud/ipfs/QmQ9wHkApZ8r2FKXAYA6CCCeuYFrsVyHZkfHjKaFSsmv1F" 
              alt="Logo" 
              className="h-10 w-10 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-bold text-white group-hover:text-indigo-100 transition-colors">
              OSOL100 AI INDEX
            </span>
          </Link>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-100" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}