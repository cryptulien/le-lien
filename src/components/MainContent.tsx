import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthButton } from './AuthButton';
import PrefaceContent from './PrefaceContent';
import PreambuleContent from './PreambuleContent';
import OathContent from './OathContent';
import RecentCards from './RecentCards';
import CategoryGrid from './CategoryGrid';
import CardList from './CardList';
import ScoresGrid from './ScoresGrid';
import EquivalencesGrid from './EquivalencesGrid';
import AuthStatus from './AuthStatus';
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
  const { currentUser } = useAuth();
  const getFavoriteCards = (): Card[] => {
    return categories
      .flatMap(category => category.cards)
      .filter(card => favorites.has(card.id));
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8">
        {currentView === 'favorites' ? (
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Favoris</h2>
            </div>

            <AuthStatus />

            {!currentUser && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                  Connectez-vous pour sauvegarder vos favoris et les retrouver sur tous vos appareils.
                </p>
                <AuthButton className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" />
              </div>
            )}

            {getFavoriteCards().length > 0 ? (
              <CardList
                cards={getFavoriteCards()}
                onCardClick={() => {}}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Aucun favori pour le moment</p>
            )}
          </section>
        ) : (
          <section className="space-y-6">
            {currentView === 'category' && selectedCategory && (
              <div className="flex items-center gap-4 mb-8">
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
            )}
            {currentView === 'category' && selectedCategory && (
              <CardList
                cards={selectedCategory.cards}
                onCardClick={() => {}}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            )}
            {currentView !== 'category' && (
              <>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Fiches favorites
                  </h2>
                  <RecentCards
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                  />
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Scores
                  </h2>
                  <ScoresGrid />
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Catégories
                  </h2>
                  <CategoryGrid onCategoryClick={onCategoryClick} />
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Équivalences
                  </h2>
                  <EquivalencesGrid />
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default MainContent;