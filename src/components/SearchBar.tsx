import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { Card } from '../types';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  searchResults: Card[];
  showResults: boolean;
  onCloseResults: () => void;
  onCardSelect: (card: Card) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onFocus,
  searchResults,
  showResults,
  onCloseResults,
  onCardSelect,
}) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onCloseResults();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCloseResults]);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Rechercher..."
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              onCloseResults();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showResults && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60"
        >
          {searchResults.map((card) => (
            <button
              key={card.id}
              onClick={() => {
                onCardSelect(card);
                onCloseResults();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-medium">{card.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{card.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;