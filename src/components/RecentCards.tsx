import React from 'react';
import { Star } from 'lucide-react';
import { categories } from '../data/categories';

interface RecentCardsProps {
  favorites: Set<string>;
  onToggleFavorite: (cardId: string) => void;
}

const RecentCards: React.FC<RecentCardsProps> = ({ favorites, onToggleFavorite }) => {
  const getFavoriteCards = () => {
    return categories
      .flatMap(category => category.cards)
      .filter(card => favorites.has(card.id))
      .slice(0, 3);
  };

  const favoriteCards = getFavoriteCards();

  if (favoriteCards.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Aucune fiche favorite pour le moment. Ajoutez des fiches à vos favoris pour les retrouver rapidement ici.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {favoriteCards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
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

export default RecentCards;