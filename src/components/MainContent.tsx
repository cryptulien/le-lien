import React from 'react';
import { ChevronLeft } from 'lucide-react';
import PrefaceContent from './PrefaceContent';
import PreambuleContent from './PreambuleContent';
import OathContent from './OathContent';
import HelpContent from './HelpContent';
import RecentCards from './RecentCards';
import CategoryGrid from './CategoryGrid';
import CardList from './CardList';
import ScoresGrid from './ScoresGrid';
import EquivalencesGrid from './EquivalencesGrid';
import { categories } from '../data/categories';
import type { Category, Card } from '../types';

interface MainContentProps {
  currentView: string;
  selectedCategory: Category | null;
  favorites: Set<string>;
  onToggleFavorite: (cardId: string) => void;
  onCategoryClick: (category: Category) => void;
  onBack: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  currentView,
  selectedCategory,
  favorites,
  onToggleFavorite,
  onCategoryClick,
  onBack,
}) => {
  const getFavoriteCards = (): Card[] => {
    return categories
      .flatMap(category => category.cards)
      .filter(card => favorites.has(card.id));
  };

  if (currentView === 'preface') return <PrefaceContent />;
  if (currentView === 'preamble') return <PreambuleContent />;
  if (currentView === 'oath') return <OathContent />;
  if (currentView === 'help') return <HelpContent />;

  if (currentView === 'favorites') {
    const favoriteCards = getFavoriteCards();
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Favoris</h2>
        </div>
        {favoriteCards.length > 0 ? (
          <CardList
            cards={favoriteCards}
            onCardClick={() => {}}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Aucun favori pour le moment</p>
        )}
      </section>
    );
  }

  if (currentView === 'category' && selectedCategory) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex items-center gap-3">
            <selectedCategory.icon className={`w-6 h-6 ${selectedCategory.color}`} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {selectedCategory.name}
            </h2>
          </div>
        </div>
        <CardList
          cards={selectedCategory.cards}
          onCardClick={() => {}}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Fiches favorites
        </h2>
        <RecentCards
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Scores
        </h2>
        <ScoresGrid />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Catégories
        </h2>
        <CategoryGrid onCategoryClick={onCategoryClick} />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Équivalences
        </h2>
        <EquivalencesGrid />
      </div>
    </section>
  );
};

export default MainContent;