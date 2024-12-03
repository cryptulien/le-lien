import React from 'react';
import { Menu } from 'lucide-react';
import { AuthButton } from './AuthButton';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden">
      <button
        onClick={onMenuClick}
        className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
        Le Lien
      </h1>

      <div className="flex items-center">
        <AuthButton className="py-2 px-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" />
      </div>
    </header>
  );
};
