/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book } from '../context/CartContext';

class FavoriteService {
  private FAVORITE_KEY = 'kitapn_favorites';

  getFavorites(): Book[] {
    const saved = localStorage.getItem(this.FAVORITE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  saveFavorites(favorites: Book[]): void {
    localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(favorites));
  }

  toggleFavorite(book: Book): Book[] {
    const favorites = this.getFavorites();
    const isExist = favorites.find(b => b.id === book.id);
    let newFavorites;
    if (isExist) {
       newFavorites = favorites.filter(b => b.id !== book.id);
    } else {
       newFavorites = [...favorites, book];
    }
    this.saveFavorites(newFavorites);
    return newFavorites;
  }
}

export const favoriteService = new FavoriteService();
