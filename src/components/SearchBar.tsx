import React from 'react';
import { Search, X } from 'lucide-react';
import type { Card } from '../types';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCardSelect?: (card: Card) => void;
  searchResults: Card[];
  showResults: boolean;
  onCloseResults: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onCardSelect,
  searchResults,
  showResults,
  onCloseResults,
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Recherchez une fiche, un mot-clé, ou un protocole..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => {
              onSearchChange('');
              onCloseResults();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
          </button>
        )}
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {searchResults.map((card) => (
            <button
              key={card.id}
              onClick={() => {
                if (onCardSelect) {
                  onCardSelect(card);
                }
                onCloseResults();
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {card.title}
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {card.category}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;