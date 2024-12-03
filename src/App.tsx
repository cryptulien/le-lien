import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import MainContent from './components/MainContent';
import { categories } from './data/categories';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Category, Card } from './types';

// Import all category pages
import CardioPage from './pages/cardio';
import RespiratoryPage from './pages/respiratory';
import EchoPage from './pages/echo';
import GynecoPage from './pages/gyneco';
import MedsPage from './pages/meds';
import PediatricsPage from './pages/pediatrics';
import TraumaPage from './pages/trauma';
import IntoxPage from './pages/intox';
import SSEPage from './pages/sse';
import OtherPage from './pages/other';

// Import card pages
import TroublesConductionPage from './pages/cardio/troubles-conduction';
import ArretCardioRespiratoire from './pages/cardio/arret-cardio-respiratoire';
import GlasgowScore from './pages/scores/score-glasgow';
import GraceScore from './pages/scores/score-grace';
import WellsScore from './pages/scores/score-wells';
import SofaScore from './pages/scores/score-sofa';
import FineScore from './pages/scores/score-fine';

// Import static pages
import PrefaceContent from './components/PrefaceContent';
import PreambuleContent from './components/PreambuleContent';
import OathContent from './components/OathContent';
import HelpContent from './components/HelpContent';
import TermsContent from './pages/TermsContent';
import LegalContent from './pages/LegalContent';

const AppContent = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const favoritesSet = new Set(favorites);

  const handleToggleFavorite = (cardId: string) => {
    setFavorites(prev => {
      const set = new Set(prev);
      if (set.has(cardId)) {
        set.delete(cardId);
      } else {
        set.add(cardId);
      }
      return Array.from(set);
    });
  };

  const handleCategoryClick = (category: Category) => {
    navigate(`/${category.id}`);
    setIsSidebarOpen(false);
  };

  const handleCardClick = (card: Card) => {
    const categoryId = card.id.split('-')[0];
    navigate(`/${categoryId}/${card.id}`);
  };

  const handleNavigate = (view: string) => {
    if (view === 'home') {
      navigate('/');
    } else {
      navigate(`/${view}`);
    }
    setCurrentView(view);
    setSelectedCategory(null);
    setIsSidebarOpen(false);
  };

  const handleBack = () => {
    navigate('/');
    setCurrentView('home');
    setSelectedCategory(null);
  };

  const getAllCards = useCallback(() => {
    return categories.flatMap(category => category.cards);
  }, []);

  const getSearchResults = useCallback(() => {
    if (!searchTerm.trim()) return [];
    const allCards = getAllCards();
    const searchTermLower = searchTerm.toLowerCase();
    return allCards.filter(card =>
      card.title.toLowerCase().includes(searchTermLower) ||
      card.category.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm, getAllCards]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 z-30">
        <div className="h-full px-2 sm:px-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex-1 max-w-2xl mx-auto px-2">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchResults={getSearchResults()}
              showResults={showSearchResults}
              onCloseResults={() => setShowSearchResults(false)}
              onCardSelect={handleCardClick}
            />
          </div>
          <div className="w-8" />
        </div>
      </header>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        activeItem={currentView}
      />

      <main className="pt-20 pb-6 lg:pl-64">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <Routes>
            <Route path="/" element={
              <MainContent
                currentView={currentView}
                selectedCategory={selectedCategory}
                favorites={favoritesSet}
                onToggleFavorite={handleToggleFavorite}
                onCategoryClick={handleCategoryClick}
                onBack={handleBack}
              />
            } />
            <Route path="/favorites" element={
              <MainContent
                currentView="favorites"
                selectedCategory={null}
                favorites={favoritesSet}
                onToggleFavorite={handleToggleFavorite}
                onCategoryClick={handleCategoryClick}
                onBack={handleBack}
              />
            } />
            <Route path="/preface" element={<PrefaceContent />} />
            <Route path="/preambule" element={<PreambuleContent />} />
            <Route path="/oath" element={<OathContent />} />
            <Route path="/help" element={<HelpContent />} />
            <Route path="/terms" element={<TermsContent />} />
            <Route path="/legal" element={<LegalContent />} />
            <Route path="/scores/score-glasgow" element={<GlasgowScore />} />
            <Route path="/scores/score-grace" element={<GraceScore />} />
            <Route path="/scores/score-wells" element={<WellsScore />} />
            <Route path="/scores/score-sofa" element={<SofaScore />} />
            <Route path="/scores/score-fine" element={<FineScore />} />
            <Route path="/cardio" element={<CardioPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/respiratory" element={<RespiratoryPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/echo" element={<EchoPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/gyneco" element={<GynecoPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/meds" element={<MedsPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/pediatrics" element={<PediatricsPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/trauma" element={<TraumaPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/intox" element={<IntoxPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/sse" element={<SSEPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/other" element={<OtherPage favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} />

            {/* Card Routes */}
            <Route path="/cardio/cardio-1" element={<TroublesConductionPage />} />
            <Route path="/cardio/cardio-2" element={<ArretCardioRespiratoire />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;