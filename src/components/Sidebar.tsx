import React from 'react';
import {
  Home,
  Star,
  HelpCircle,
  BookOpen,
  ScrollText,
  Scale,
  Moon,
  X,
} from 'lucide-react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  activeItem: string;
}

const menuGroups = [
  {
    title: null,
    items: [
      { icon: Home, label: 'Accueil', id: 'home', path: '/' },
      { icon: Star, label: 'Favoris', id: 'favorites', path: '/favorites' },
      { icon: HelpCircle, label: 'Aide', id: 'help', path: '/help' },
    ],
  },
  {
    title: null,
    items: [
      { icon: BookOpen, label: 'Préface', id: 'preface', path: '/preface' },
      { icon: ScrollText, label: 'Préambule', id: 'preambule', path: '/preambule' },
      { icon: Scale, label: 'Serment', id: 'serment', path: '/serment' },
    ],
  },
  {
    title: null,
    items: [
      { icon: Moon, label: 'Je suis de garde', id: 'dark-mode' },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, activeItem }) => {
  const navigate = useNavigate();
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  const handleItemClick = (item: any) => {
    if (item.id === 'dark-mode') {
      toggleDarkMode();
    } else {
      onNavigate(item.id);
      if (item.path) {
        navigate(item.path);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">LIEN</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6 last:mb-0">
              {group.title && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const isActive = item.id === activeItem;
                  if (item.id === 'help') {
                    return (
                      <li key={item.label}>
                        <Link
                          to="/help"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <HelpCircle className="w-5 h-5" />
                          <span>Aide</span>
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li key={item.label}>
                        <button
                          onClick={() => handleItemClick(item)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                          <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                        </button>
                      </li>
                    );
                  }
                })}
              </ul>
              {groupIndex < menuGroups.length - 1 && (
                <div className="my-4 border-b dark:border-gray-700" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <footer className="p-4 border-t dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-center space-x-4">
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
              CGU
            </Link>
            <Link to="/legal" className="hover:text-blue-600 dark:hover:text-blue-400">
              Mentions légales
            </Link>
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
