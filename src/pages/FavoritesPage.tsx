import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoriteContext';
import { useCart } from '../context/CartContext';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import PageNav from '../components/PageNav';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-6">
        <PageNav crumbs={[{ label: 'Favorilerim' }]} backHref="/" />
        <div className="flex items-end justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Favorilerim
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Beğendiğiniz ve daha sonra incelemek istediğiniz kitaplar.
            </p>
          </div>
          {favorites.length > 0 && (
            <span className="bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest">
              {favorites.length} Kitap
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {favorites.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-32 h-32 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center mb-8">
                <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700" />
              </div>
              <h2 className="text-3xl font-black text-primary dark:text-white mb-4">Favori Listeniz Boş</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-12 font-medium">
                Henüz favorilerinize bir kitap eklemediniz. Keşfetmeye başlayın ve beğendiğiniz kitapları buraya kaydedin.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="bg-primary dark:bg-white dark:text-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-4"
              >
                Kitapları Keşfet
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {favorites.map((book) => (
                <div key={book.id} className="relative group">
                  <BookCard book={book} />
                  <div className="absolute top-6 right-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(book.id);
                      }}
                      className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xl border border-slate-100 dark:border-slate-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
