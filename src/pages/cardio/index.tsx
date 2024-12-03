import React from 'react';
import { Heart } from 'lucide-react';
import CardList from '../../components/CardList';
import { categories } from '../../data/categories';

interface CardioPageProps {
  favorites: Set<string>;
  onToggleFavorite: (cardId: string) => void;
}

const CardioPage: React.FC<CardioPageProps> = ({ favorites, onToggleFavorite }) => {
  const category = categories.find(cat => cat.id === 'cardio');

  if (!category) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className={category.color} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {category.name}
        </h1>
      </div>

      <CardList
        cards={category.cards}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default CardioPage;