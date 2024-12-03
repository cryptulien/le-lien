import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isSignUp ? 'Créer un compte' : 'Se connecter'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
          >
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </button>
        </form>
        <button
          onClick={() => signInWithGoogle()}
          className="w-full mt-4 bg-white border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-50 flex items-center justify-center"
        >
          <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          Continuer avec Google
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export const AuthButton: React.FC<{ className?: string }> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, logOut } = useAuth();

  return (
    <>
      {currentUser ? (
        <button
          onClick={logOut}
          className={`flex items-center space-x-2 ${className}`}
        >
          <img
            src={currentUser.photoURL || '/default-avatar.png'}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span>Se déconnecter</span>
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center space-x-2 ${className}`}
        >
          <span>Se connecter</span>
        </button>
      )}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
