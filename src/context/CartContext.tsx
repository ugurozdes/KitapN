/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { cartService } from '../services/cartService';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  oldPrice: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  sellers: number;
  isFastShipping?: boolean;
  publisher?: string;
  description?: string;
  category?: string;
}

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => cartService.getCart());

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...book, quantity: 1 } as CartItem];
      }
      cartService.saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== bookId);
      cartService.saveCart(newCart);
      return newCart;
    });
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => {
      const newCart = prev.map(item => (item.id === bookId ? { ...item, quantity } : item));
      cartService.saveCart(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    cartService.clearCart();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
