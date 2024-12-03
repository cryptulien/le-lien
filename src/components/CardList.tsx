import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Card } from '../types';

interface CardListProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  favorites: Set<string>;
  onToggleFavorite: (cardId: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onCardClick, favorites, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = (card: Card) => {
    if (onCardClick) {
      onCardClick(card);
    } else {
      const categoryId = card.id.split('-')[0];
      navigate(`/${categoryId}/${card.id}`);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => handleCardClick(card)}
            >
              <h3 className="text-sm sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mt-1">
                {card.category}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(card.id);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Star
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  favorites.has(card.id)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;