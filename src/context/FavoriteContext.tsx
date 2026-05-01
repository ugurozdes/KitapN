/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { Book } from './CartContext';
import { favoriteService } from '../services/favoriteService';

interface FavoriteContextType {
  favorites: Book[];
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: number) => void;
  isFavorite: (bookId: number) => boolean;
  toggleFavorite: (book: Book) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Book[]>(() => favoriteService.getFavorites());

  const addToFavorites = (book: Book) => {
    const newFavorites = [...favorites, book];
    setFavorites(newFavorites);
    favoriteService.saveFavorites(newFavorites);
  };

  const removeFromFavorites = (bookId: number) => {
    const newFavorites = favorites.filter((b) => b.id !== bookId);
    setFavorites(newFavorites);
    favoriteService.saveFavorites(newFavorites);
  };

  const isFavorite = (bookId: number) => {
    return favorites.some((b) => b.id === bookId);
  };

  const toggleFavorite = (book: Book) => {
    const newFavorites = favoriteService.toggleFavorite(book);
    setFavorites(newFavorites);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
}
