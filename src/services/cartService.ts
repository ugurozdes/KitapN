/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem } from '../context/CartContext';

class CartService {
  private CART_KEY = 'kitapn_cart';

  getCart(): CartItem[] {
    const saved = localStorage.getItem(this.CART_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }
}

export const cartService = new CartService();
