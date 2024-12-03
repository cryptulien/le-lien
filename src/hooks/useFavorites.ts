import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFavorites = (initialFavorites: Set<string>) => {
  const [favorites, setFavorites] = useState<Set<string>>(initialFavorites);
  const { currentUser } = useAuth();

  // Charger les favoris depuis Firebase quand l'utilisateur se connecte
  useEffect(() => {
    const loadFavorites = async () => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFavorites(new Set(data.favorites));
        } else {
          // Si c'est un nouvel utilisateur, sauvegarder les favoris locaux
          await setDoc(userDoc, { favorites: Array.from(favorites) });
        }
      }
    };

    loadFavorites();
  }, [currentUser]);

  // Sauvegarder les favoris dans Firebase quand ils changent
  useEffect(() => {
    const saveFavorites = async () => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        await setDoc(userDoc, { favorites: Array.from(favorites) });
      }
    };

    saveFavorites();
  }, [favorites, currentUser]);

  const toggleFavorite = (cardId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(cardId)) {
        newFavorites.delete(cardId);
      } else {
        newFavorites.add(cardId);
      }
      return newFavorites;
    });
  };

  return {
    favorites,
    toggleFavorite
  };
};
