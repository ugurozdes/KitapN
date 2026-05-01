import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Star, Zap, Grid, List as ListIcon } from 'lucide-react';
import { allBooks } from '../data';
import BookCard from '../components/BookCard';
import { cn } from '../lib/utils';
import PageNav from '../components/PageNav';

const categories = ['Tümü', 'Roman', 'Edebiyat', 'Kişisel Gelişim', 'Psikoloji', 'Tarih', 'Felsefe', 'Bilim'];
const publishers = ['Tümü', 'Can Yayınları', 'Yapı Kredi Yayınları', 'Doğan Kitap', 'Alfa Yayınları', 'Pegasus Yayınları'];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedPublisher, setSelectedPublisher] = useState('Tümü');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBooks = useMemo(() => {
    return allBooks
      .filter(book => {
        const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) || 
                           book.author.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory === 'Tümü' || book.category === selectedCategory;
        const matchesPublisher = selectedPublisher === 'Tümü' || book.publisher === selectedPublisher;
        const matchesPrice = parseFloat(book.price) >= priceRange[0] && parseFloat(book.price) <= priceRange[1];
        return matchesQuery && matchesCategory && matchesPublisher && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
        if (sortBy === 'newest') return b.id - a.id;
        return b.rating - a.rating; // popular
      });
  }, [query, selectedCategory, selectedPublisher, priceRange, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-background min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <PageNav crumbs={[{ label: query ? `"${query}" Sonuçları` : 'Tüm Kitaplar' }]} backHref="/" />
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-2">
              {query ? `"${query}" için sonuçlar` : 'Tüm Kitaplar'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {filteredBooks.length} kitap bulundu
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'grid' ? "bg-white dark:bg-slate-700 shadow-sm text-accent" : "text-slate-400"
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'list' ? "bg-white dark:bg-slate-700 shadow-sm text-accent" : "text-slate-400"
                )}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 font-bold text-sm outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="popular">En Popüler</option>
              <option value="price-low">En Düşük Fiyat</option>
              <option value="price-high">En Yüksek Fiyat</option>
              <option value="newest">En Yeniler</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-10">
            <div>
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent" />
                Filtreler
              </h3>
              
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Kategoriler</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="category" 
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="w-4 h-4 border-2 border-slate-300 rounded-full checked:bg-accent checked:border-accent transition-all"
                        />
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          selectedCategory === cat ? "text-primary dark:text-white" : "text-slate-500 group-hover:text-primary"
                        )}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Fiyat Aralığı</h4>
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-accent"
                    />
                    <div className="flex items-center justify-between text-sm font-black">
                      <span>0 TL</span>
                      <span className="text-accent">{priceRange[1]} TL</span>
                    </div>
                  </div>
                </div>

                {/* Publishers */}
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Yayınevleri</h4>
                  <div className="space-y-2">
                    {publishers.map(pub => (
                      <label key={pub} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="publisher" 
                          checked={selectedPublisher === pub}
                          onChange={() => setSelectedPublisher(pub)}
                          className="w-4 h-4 border-2 border-slate-300 rounded-full checked:bg-accent checked:border-accent transition-all"
                        />
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          selectedPublisher === pub ? "text-primary dark:text-white" : "text-slate-500 group-hover:text-primary"
                        )}>{pub}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filteredBooks.length > 0 ? (
                <motion.div 
                  layout
                  className={cn(
                    "grid gap-8",
                    viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  )}
                >
                  {filteredBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookCard book={book} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <Filter className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Sonuç Bulunamadı</h3>
                  <p className="text-slate-500 max-w-xs">Arama kriterlerinize uygun kitap bulamadık. Lütfen filtreleri temizleyip tekrar deneyin.</p>
                  <button 
                    onClick={() => {
                      setSelectedCategory('Tümü');
                      setSelectedPublisher('Tümü');
                      setPriceRange([0, 500]);
                    }}
                    className="mt-8 text-accent font-black uppercase tracking-widest text-sm hover:underline"
                  >
                    Filtreleri Temizle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
