import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, BadgeCheck, Zap, Heart, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart, Book } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  className?: string;
  key?: any;
}

export default function BookCard({ book, className }: BookCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(book);
  };

  const favorite = isFavorite(book.id);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => navigate(`/product/${book.id}`)}
      className={cn(
        "bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-500 group cursor-pointer flex flex-col h-full",
        className
      )}
    >
      <div className="relative h-[200px] md:h-[240px] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {/* Soft inner shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.05)] pointer-events-none z-10" />
        <img
          src={book.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=800'}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=800'; }}
          alt={book.title}
          className="w-full h-full object-cover object-center saturate-100 brightness-[0.98] contrast-[1.02] dark:brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1.5 z-10">
          {book.badge && (
            <span className="bg-accent text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/30 border border-white/20 backdrop-blur-md">
              {book.badge}
            </span>
          )}
          {book.isFastShipping && (
            <span className="bg-emerald-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/30 flex items-center gap-1 border border-white/20 backdrop-blur-md">
              <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
              Hızlı Teslimat
            </span>
          )}
        </div>

        <button 
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-9 md:h-9 rounded-full md:rounded-xl backdrop-blur-xl flex items-center justify-center transition-all shadow-lg active:scale-90 z-10 border",
            favorite 
              ? "bg-red-500 text-white border-red-400 shadow-red-500/20" 
              : "bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-red-500 border-white/20 dark:border-slate-800/50"
          )}
        >
          <Heart className={cn("w-3.5 h-3.5 md:w-4 md:h-4", favorite && "fill-current")} />
        </button>
        
        {/* Quick Add Button */}
        {/* Desktop: Full width bottom. Mobile: Circular right bottom */}
        <div className="absolute right-2 bottom-2 md:inset-x-4 md:bottom-4 translate-y-0 md:translate-y-16 md:group-hover:translate-y-0 transition-all duration-500 z-10">
          <button 
            onClick={handleAddToCart}
            className={cn(
              "md:w-full w-10 h-10 md:h-auto py-0 md:py-3 rounded-full md:rounded-xl font-black text-xs shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-95 group/btn overflow-hidden relative",
              isAdded 
                ? "bg-emerald-500 text-white shadow-emerald-500/40" 
                : "bg-primary dark:bg-white dark:text-primary text-white shadow-primary/40 hover:bg-primary/90"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 hidden md:block" />
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 md:w-4 md:h-4" />
                  <span className="hidden md:inline">Eklendi</span>
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4 md:w-4 md:h-4" />
                  <span className="hidden md:inline">Sepete Ekle</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Trust Signal Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-2 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1.5 md:mb-3">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-2.5 h-2.5 md:w-3.5 md:h-3.5", 
                    i < Math.floor(book.rating) ? "fill-secondary text-secondary" : "text-slate-200 dark:text-slate-700"
                  )} 
                />
              ))}
            </div>
            <span className="text-[8px] md:text-[11px] font-black text-slate-400 tracking-tighter">({book.reviews})</span>
          </div>
          {book.badge === "Yayınevinden" && (
            <div className="hidden md:flex items-center gap-1.5 text-[9px] font-black text-accent uppercase tracking-[0.2em]">
              <BadgeCheck className="w-3.5 h-3.5" />
              Onaylı
            </div>
          )}
        </div>

        <h3 className="text-[11px] md:text-lg font-black text-primary dark:text-white mb-0.5 md:mb-1 line-clamp-2 group-hover:text-accent transition-colors tracking-tight leading-tight">
          {book.title}
        </h3>
        <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-400 font-bold mb-1.5 md:mb-4 line-clamp-1">
          {book.author}
        </p>
        
        <div className="mt-auto pt-2 md:pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
          <div>
            <div className="flex items-baseline gap-1 md:gap-2">
              <span className="text-sm md:text-2xl font-black text-primary dark:text-white tracking-tighter">₺{book.price}</span>
              <span className="text-[9px] md:text-sm text-slate-400 line-through font-black">₺{book.oldPrice}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 md:mt-1">
              <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-blue-500/10 rounded flex items-center justify-center shrink-0">
                <BadgeCheck className="w-1.5 h-1.5 md:w-3 md:h-3 text-blue-500" />
              </div>
              <span className="text-[7px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.1em]">{book.sellers} Satıcı</span>
            </div>
          </div>
          
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 md:gap-1.5 shrink-0">
             <div className="bg-slate-100 dark:bg-slate-800 px-1 md:px-2.5 py-0.5 md:py-1 rounded md:rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hidden md:block">
                <span className="text-[7px] md:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">En İyi Fiyat</span>
             </div>
             <span className="text-[7px] md:text-[9px] font-black text-emerald-500 uppercase tracking-[0.15em] flex items-center gap-0.5">
               <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
               Stokta
             </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
