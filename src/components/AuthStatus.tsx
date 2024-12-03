import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthStatus = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-800 dark:text-yellow-200">
        <Shield className="w-5 h-5" />
        <span>Connectez-vous pour accéder à vos favoris</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <User className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Connecté
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {currentUser.email}
          </span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-md shadow-sm hover:shadow transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default AuthStatus;
