import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Moon, Sun, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoriteContext';
import { cn } from '../lib/utils';
import { allBooks } from '../data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kitapn-theme');
    return saved === 'dark';
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allBooks.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kitapn-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kitapn-theme', 'light');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isSolid = isScrolled || !isHomePage;

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 md:px-4 md:py-4 px-3 py-3',
          isSolid 
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-b border-slate-100/20 dark:border-slate-800/30' 
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">
          
          {/* Top Row for Mobile: Logo & Cart */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center shrink-0 cursor-pointer group"
              >
                <span className={cn(
                  "text-xl md:text-3xl font-black tracking-tighter transition-all duration-700",
                  isSolid ? "text-primary dark:text-white" : "text-white"
                )}>
                  Kitap<span className="text-accent">N</span>
                </span>
              </motion.div>
            </Link>

            {/* Mobile Cart */}
            <button 
              onClick={() => navigate('/cart')}
              className={cn(
                "md:hidden p-2 rounded-xl backdrop-blur-xl border transition-all duration-500 active:scale-95 relative",
                isSolid
                  ? "bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300"
                  : "bg-black/20 dark:bg-white/5 border-white/20 dark:border-white/10 text-white"
              )}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 min-w-[1.1rem] h-4.5 bg-accent text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-lg px-0.5"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 w-full relative group order-last md:order-none">
            <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 md:w-5 md:h-5 text-slate-400 group-focus-within:text-accent transition-colors duration-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kitap, yazar veya yayınevi ara..."
              className={cn(
                "w-full backdrop-blur-xl border border-transparent md:border-2 md:rounded-[1.5rem] rounded-xl py-2.5 md:py-4 pl-10 md:pl-16 pr-4 focus:ring-4 focus:ring-accent/10 focus:bg-white dark:focus:bg-slate-800 focus:border-accent/20 transition-all duration-500 outline-none font-bold text-[10px] md:text-sm shadow-sm md:shadow-none",
                isSolid 
                  ? "bg-slate-100/80 dark:bg-slate-800/60 text-slate-900 dark:text-white" 
                  : "bg-white/90 md:bg-black/20 dark:md:bg-white/5 text-slate-900 md:text-white placeholder:text-slate-500 md:placeholder:text-white/80 border-slate-200 md:border-white/20 dark:border-white/10"
              )}
            />
            <div className="absolute inset-y-0 right-2 md:right-3 flex items-center">
              <kbd className={cn(
                "hidden lg:inline-flex h-7 select-none items-center gap-1 rounded-lg border px-2 font-mono text-[10px] font-black mr-3 transition-all duration-700",
                isSolid 
                  ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400" 
                  : "border-white/30 dark:border-white/20 bg-black/30 dark:bg-white/10 text-white/90"
              )}>
                <span className="text-xs">⌘</span>K
              </kbd>
              <button type="submit" className="hidden md:block bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-accent/20 active:scale-95">
                Ara
              </button>
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 md:mt-4 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden z-[110]"
                >
                  <div className="p-3 md:p-4 border-b border-slate-50 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Önerilen Kitaplar</p>
                  </div>
                  <div className="p-2">
                    {suggestions.map((book) => (
                      <button
                        key={book.id}
                        type="button"
                        onClick={() => {
                          navigate(`/product/${book.id}`);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-xl md:rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
                      >
                        <div className="w-10 h-14 md:w-12 md:h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800">
                          <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-black text-primary dark:text-white group-hover:text-accent transition-colors line-clamp-1">{book.title}</p>
                          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{book.author}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      navigate(`/search?q=${searchQuery}`);
                      setSearchQuery('');
                    }}
                    className="w-full p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 text-center text-[10px] md:text-xs font-black text-primary dark:text-white uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
                  >
                    Tüm Sonuçları Gör
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 sm:gap-5">
            <button 
              onClick={toggleDarkMode}
              className={cn(
                "p-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:text-accent active:scale-95 group relative shadow-lg dark:shadow-none",
                isSolid
                  ? "bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 shadow-none"
                  : "bg-black/20 dark:bg-white/5 border-white/20 dark:border-white/10 text-white"
              )}
            >
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => navigate('/favorites')}
              className={cn(
                "p-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:text-accent active:scale-95 group relative shadow-lg dark:shadow-none",
                isSolid
                  ? "bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 shadow-none"
                  : "bg-black/20 dark:bg-white/5 border-white/20 dark:border-white/10 text-white"
              )}
            >
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
              <Heart className={cn("w-5 h-5", favorites.length > 0 && "fill-accent text-accent")} />
              <AnimatePresence>
                {favorites.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 min-w-[1.5rem] h-6 bg-accent text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-xl shadow-accent/40 px-1"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button 
              onClick={() => navigate('/cart')}
              className={cn(
                "p-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:text-accent active:scale-95 group relative shadow-lg dark:shadow-none",
                isSolid
                  ? "bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 shadow-none"
                  : "bg-black/20 dark:bg-white/5 border-white/20 dark:border-white/10 text-white"
              )}
            >
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 min-w-[1.5rem] h-6 bg-accent text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-xl shadow-accent/40 animate-bounce-subtle px-1"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/profile')}
                  className={cn(
                    "hidden sm:flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl dark:shadow-none",
                    isSolid
                      ? "bg-slate-100 dark:bg-slate-800 text-primary dark:text-white border border-slate-200 dark:border-slate-700 shadow-none"
                      : "bg-black/20 dark:bg-white/5 text-white backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white hover:text-slate-900"
                  )}
                >
                  <User className="w-5 h-5" />
                  <span>{user.name || 'Hesabım'}</span>
                </button>
                <button 
                  onClick={logout}
                  className={cn(
                    "p-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:text-red-500 active:scale-95 group relative shadow-lg dark:shadow-none",
                    isSolid
                      ? "bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 shadow-none"
                      : "bg-black/20 dark:bg-white/5 border-white/20 dark:border-white/10 text-white"
                  )}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/auth')}
                className={cn(
                  "hidden sm:flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl dark:shadow-none",
                  isSolid
                    ? "bg-primary dark:bg-white dark:text-primary text-white shadow-primary/20 dark:shadow-none"
                    : "bg-black/20 dark:bg-white/5 text-white backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white hover:text-slate-900"
                )}
              >
                <User className="w-5 h-5" />
                <span>Giriş Yap</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
