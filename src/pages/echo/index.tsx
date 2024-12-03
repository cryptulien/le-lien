import React from 'react';
import { Activity } from 'lucide-react';
import CardList from '../../components/CardList';
import { categories } from '../../data/categories';

const EchoPage = () => {
  const category = categories.find(cat => cat.id === 'echo');

  if (!category) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className={category.color} />
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

export default EchoPage;