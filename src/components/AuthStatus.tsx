import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const AuthStatus = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <div className="flex items-center gap-3">
        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span className="text-gray-700 dark:text-gray-200">
          {currentUser.email}
        </span>
      </div>
      <button
        onClick={() => logout()}
        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        <LogOut className="w-4 h-4" />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default AuthStatus;
