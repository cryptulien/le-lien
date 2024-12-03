import React from 'react';
import { Shield } from 'lucide-react';
import CardList from '../../components/CardList';
import { categories } from '../../data/categories';

const SSEPage = () => {
  const category = categories.find(cat => cat.id === 'sse');

  if (!category) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className={category.color} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {category.name}
        </h1>
      </div>

      <CardList
        cards={category.cards}
        onCardClick={() => {}}
        favorites={new Set()}
        onToggleFavorite={() => {}}
      />
    </div>
  );
};

export default SSEPage;