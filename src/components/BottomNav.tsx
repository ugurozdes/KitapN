import React, { useState } from 'react';
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: 'Ana Sayfa', path: '/' },
    { icon: Search, label: 'Ara', path: '/search' },
    { icon: Heart, label: 'Favori', path: '/favorites' },
    { icon: ShoppingCart, label: 'Sepet', path: '/cart', badge: totalItems },
    { icon: User, label: 'Profil', path: '/profile' },
  ];

  if (currentPath.startsWith('/product') || currentPath.startsWith('/checkout') || currentPath.startsWith('/cart')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-16 h-12 active:scale-95 transition-transform"
            >
              <div className={cn(
                "relative flex items-center justify-center transition-colors duration-300",
                isActive ? "text-accent" : "text-slate-400 dark:text-slate-500"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "fill-accent/10 stroke-2")} />
                
                {item.badge !== undefined && item.badge > 0 && (
                  <AnimatePresence>
                    <motion.span 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1.5 -right-2 min-w-[1.25rem] h-5 bg-accent text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm px-1"
                    >
                      {item.badge}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              
              <span className={cn(
                "text-[10px] font-bold mt-1 tracking-wide transition-colors duration-300",
                isActive ? "text-accent" : "text-slate-400 dark:text-slate-500"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
