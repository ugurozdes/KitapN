import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Zap, ShoppingCart, Heart, Share2, ShieldCheck, Truck, Store, ChevronRight, MessageCircle, Check, BookOpen, X, ChevronLeft, Plus, Send, User } from 'lucide-react';
import { allBooks } from '../data';
import { useCart, Book } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';
import { cn } from '../lib/utils';
import BookCard from '../components/BookCard';
import { Skeleton } from '../components/ui/Skeleton';
import PageNav from '../components/PageNav';

const mockReviews = [
  { id: 1, user: "Ahmet Y.", rating: 5, comment: "Harika bir kitap, herkese tavsiye ederim. Baskı kalitesi de çok iyi. KitapN hızıyla 1 günde elimdeydi.", date: "2 gün önce" },
  { id: 2, user: "Elif S.", rating: 4, comment: "Hikaye çok sürükleyiciydi ama sonu biraz aceleye getirilmiş gibi geldi. Yine de okunması gereken bir eser.", date: "1 hafta önce" },
  { id: 3, user: "Mehmet K.", rating: 5, comment: "Kütüphanemin en değerli parçalarından biri oldu. Ciltli edisyonu gerçekten muazzam.", date: "2 hafta önce" },
];

const mockReaderPages = [
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=100&w=1200",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=100&w=1200",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=100&w=1200",
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedSeller, setSelectedSeller] = useState('Kitapn Resmi Satıcı');
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [readerPageIndex, setReaderPageIndex] = useState(0);
  const [newReviewRating, setNewReviewRating] = useState(5);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isReaderOpen) return;
      if (e.key === 'ArrowRight') setReaderPageIndex(prev => Math.min(prev + 1, mockReaderPages.length - 1));
      if (e.key === 'ArrowLeft') setReaderPageIndex(prev => Math.max(prev - 1, 0));
      if (e.key === 'Escape') setIsReaderOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReaderOpen]);

  const book = useMemo(() => allBooks.find(b => b.id === parseInt(id || '0')), [id]);
  
  const similarBooks = useMemo(() => 
    allBooks.filter(b => b.category === book?.category && b.id !== book?.id).slice(0, 4), 
  [book]);
  
  const authorBooks = useMemo(() => 
    allBooks.filter(b => b.author === book?.author && b.id !== book?.id).slice(0, 4), 
  [book]);

  const seriesBooks = useMemo(() => 
    allBooks.filter(b => b.publisher === book?.publisher && b.id !== book?.id).slice(0, 4), 
  [book]);

  const handleAddToCart = () => {
    if (!book) return;
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

  if (!book) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h1 className="text-4xl font-black mb-6">Kitap Bulunamadı</h1>
        <button 
          onClick={() => navigate('/')}
          className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-accent/20"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const sellers = [
    { name: 'Kitapn Resmi Satıcı', price: book.price, rating: 4.9, shipping: 'Ücretsiz Kargo', delivery: 'Yarın Kapında' },
    { name: 'Sahaf Dünyası', price: (parseFloat(book.price) - 5).toFixed(2), rating: 4.7, shipping: '15 TL Kargo', delivery: '2-3 Gün' },
    { name: 'Kitap Kurdu', price: (parseFloat(book.price) + 2).toFixed(2), rating: 4.8, shipping: 'Ücretsiz Kargo', delivery: 'Yarın Kapında' },
  ];

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <Skeleton className="aspect-[3/4] w-full rounded-[3rem]" />
              <div className="grid grid-cols-4 gap-4 mt-8">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-square rounded-2xl" />)}
              </div>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4 rounded-xl" />
                <Skeleton className="h-6 w-1/4 rounded-lg" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-32 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-16 w-48 rounded-2xl" />
              <div className="space-y-4 pt-8">
                <Skeleton className="h-24 w-full rounded-3xl" />
                <Skeleton className="h-24 w-full rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-background min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <PageNav
          crumbs={[
            { label: 'Kitaplar', href: '/search' },
            { label: book.category, href: `/category/${book.category?.toLowerCase()}` },
            { label: book.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Image & Gallery */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 group"
            >
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {book.badge && (
                <div className="absolute top-8 left-8 bg-accent text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-accent/30">
                  {book.badge}
                </div>
              )}
              <div className="absolute top-8 right-8 flex flex-col gap-4">
                <button 
                  onClick={() => toggleFavorite(book)}
                  className={cn(
                    "w-14 h-14 backdrop-blur-xl border rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl active:scale-90",
                    isFavorite(book.id) 
                      ? "bg-red-500 text-white border-red-500 shadow-red-500/20" 
                      : "bg-white/10 dark:bg-slate-900/40 text-white hover:bg-white hover:text-red-500 border-white/20 dark:border-slate-800/50"
                  )}
                >
                  <Heart className={cn("w-6 h-6", isFavorite(book.id) && "fill-current")} />
                </button>
                <button 
                  onClick={() => setIsReaderOpen(true)}
                  className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-500 shadow-xl shadow-accent/30 group/reader"
                >
                  <BookOpen className="w-6 h-6 group-hover/reader:animate-pulse" />
                  <div className="absolute right-full mr-4 bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/reader:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    İçine Bak
                  </div>
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-accent transition-all cursor-pointer opacity-60 hover:opacity-100">
                  <img src={book.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Header Info - Simplified & Elegant */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                  {book.category}
                </span>
                <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1.5 text-orange-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-black">{book.rating}</span>
                </div>
                <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{book.reviews} Değerlendirme</span>
              </div>

              <h1 className="text-6xl font-black text-primary dark:text-white tracking-tighter leading-[0.9] mb-4">
                {book.title}
              </h1>
              
              <div className="flex items-center gap-2 group cursor-pointer w-fit">
                <p className="text-sm font-bold text-slate-400">Yazar:</p>
                <p className="font-black text-xl text-primary dark:text-white group-hover:text-accent transition-colors tracking-tight">{book.author}</p>
              </div>
            </div>

            {/* Main Purchase Section - Focused & High Conversion */}
            <div className="pt-6 md:pt-10 space-y-8 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                {/* Price Area: Large and Dominant (Hidden on mobile due to sticky bar) */}
                <div className="hidden md:flex items-end gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Peşin Fiyat</span>
                    <span className="text-7xl font-black text-primary dark:text-white tracking-tighter leading-none">
                      ₺{book.price}
                    </span>
                  </div>
                  <div className="flex flex-col pb-1">
                    <span className="text-2xl text-slate-300 dark:text-slate-600 font-bold line-through">₺{book.oldPrice}</span>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1">
                      %{Math.round((1 - parseFloat(book.price) / parseFloat(book.oldPrice)) * 100)} İNDİRİM
                    </span>
                  </div>
                </div>

                {/* Subtle Info Row */}
                <div className="flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                   <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    Stokta Var
                  </div>
                  <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="flex items-center gap-2.5 hover:text-accent cursor-pointer transition-colors">
                    <Store className="w-4 h-4" />
                    {book.sellers} Satıcı Teklifi
                  </div>
                  <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                   <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4" />
                    Ücretsiz Kargo
                  </div>
                </div>

                {/* CTA Area */}
                <div className="space-y-6">
                   <div className="hidden md:flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className={cn(
                        "flex-1 px-10 py-7 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 overflow-hidden relative",
                        isAdded 
                          ? "bg-emerald-500 text-white shadow-emerald-500/30" 
                          : "bg-primary dark:bg-white text-white dark:text-primary shadow-primary/40 dark:shadow-white/10"
                      )}
                    >
                      <AnimatePresence mode="wait">
                        {isAdded ? (
                          <motion.div key="check" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-3">
                            <Check className="w-6 h-6" /> Eklendi
                          </motion.div>
                        ) : (
                          <motion.div key="cart" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-3">
                            <ShoppingCart className="w-6 h-6" /> Sepete Ekle
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    
                    <button className="px-10 py-7 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
                      Hemen Al
                    </button>
                  </div>

                  {/* \"İçine Bak\" Integration - Minimal & Clean */}
                  <div className="flex items-center justify-center pt-2">
                    <button 
                      onClick={() => setIsReaderOpen(true)}
                      className="group flex items-center gap-3 text-slate-400 hover:text-accent transition-all duration-500"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-500 underline decoration-slate-200 dark:decoration-slate-800 underline-offset-8">İçine Göz At</span>
                    </button>
                  </div>
                </div>

                {/* Trust Signals - Subtle & Premium */}
                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-slate-50 dark:border-slate-800">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-primary dark:text-white uppercase tracking-widest mb-1">Güvenli Alışveriş</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">KitapN Güvencesi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-accent shadow-sm border border-slate-50 dark:border-slate-800">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-primary dark:text-white uppercase tracking-widest mb-1">Hızlı Teslimat</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">24 Saatte Kargoda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Offers */}
            <div className="space-y-6 pt-12 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Store className="w-6 h-6 text-accent" />
                Diğer Satıcılar
              </h3>
              <div className="space-y-4">
                {sellers.map((seller, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6",
                      selectedSeller === seller.name 
                        ? "border-accent bg-accent/5" 
                        : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                        <Store className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-black text-primary dark:text-white">{seller.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-orange-500">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-black">{seller.rating}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">• {seller.delivery}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-8">
                      <div className="text-right">
                        <p className="text-2xl font-black text-primary dark:text-white">{seller.price} TL</p>
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{seller.shipping}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedSeller(seller.name)}
                        className={cn(
                          "px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                          selectedSeller === seller.name
                            ? "bg-accent text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        {selectedSeller === seller.name ? 'Seçildi' : 'Seç'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description - Focused & Clean */}
            <div className="space-y-6 pt-12 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black tracking-tight">Kitap Açıklaması</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {book.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 pt-32 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8">
              <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Ortalama Puan</p>
                <div className="text-7xl font-black text-primary dark:text-white tracking-tighter mb-4">{book.rating}</div>
                <div className="flex justify-center gap-1 text-orange-500 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={cn("w-6 h-6", s <= Math.floor(book.rating) ? "fill-current" : "text-slate-300")} />
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-500 mb-8">{book.reviews} Değerlendirme</p>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full py-4 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                >
                  Yorum Yap
                </button>
              </div>

              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-xs font-black text-slate-400 w-4">{star}</span>
                    <Star className="w-3 h-3 text-orange-500 fill-current" />
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%` }}
                        className="h-full bg-orange-500 rounded-full"
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 w-8">%{star === 5 ? 85 : star === 4 ? 10 : 5}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-3xl font-black tracking-tight">Müşteri Yorumları</h3>
              <div className="space-y-6">
                {mockReviews.map((review, i) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-sm">{review.user}</p>
                          <div className="flex items-center gap-1 text-orange-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={cn("w-3 h-3", s <= review.rating ? "fill-current" : "text-slate-200")} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
              <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 font-black uppercase tracking-widest text-xs hover:border-accent hover:text-accent transition-all">
                Daha Fazla Yorum Yükle
              </button>
            </div>
          </div>
        </div>

        {/* Discovery Sections */}
        <div className="mt-48 space-y-32">
          {/* Similar Books */}
          <section className="space-y-12">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tighter">Benzer Kitaplar</h2>
                <p className="text-slate-500 font-medium mt-2">Bu kitabı sevenler bunları da inceledi.</p>
              </div>
              <button onClick={() => navigate('/search')} className="text-accent font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
                Tümünü Gör <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>

          {/* Same Author */}
          <section className="space-y-12">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tighter">{book.author} Eserleri</h2>
                <p className="text-slate-500 font-medium mt-2">Yazarın diğer popüler kitaplarını keşfedin.</p>
              </div>
              <button onClick={() => navigate('/search')} className="text-accent font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
                Tümünü Gör <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {authorBooks.length > 0 ? authorBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              )) : allBooks.slice(4, 8).map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>

          {/* Series / Publisher */}
          <section className="space-y-12">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tighter">{book.publisher} Koleksiyonu</h2>
                <p className="text-slate-500 font-medium mt-2">Yayınevinin en çok tercih edilen diğer kitapları.</p>
              </div>
              <button onClick={() => navigate('/search')} className="text-accent font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
                Tümünü Gör <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {seriesBooks.length > 0 ? seriesBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              )) : allBooks.slice(0, 4).map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <div className="flex flex-col flex-shrink-0 min-w-[80px]">
            <span className="text-2xl font-black text-primary dark:text-white leading-none tracking-tighter">₺{book.price}</span>
            <span className="text-xs text-slate-400 line-through font-bold">₺{book.oldPrice}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className={cn(
              "flex-1 h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden",
              isAdded 
                ? "bg-emerald-500 text-white shadow-emerald-500/30" 
                : "bg-primary dark:bg-white text-white dark:text-primary shadow-primary/30"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div key="check-mobile" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                  <Check className="w-5 h-5" /> Eklendi
                </motion.div>
              ) : (
                <motion.div key="cart-mobile" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                  <ShoppingCart className="w-5 h-5" /> Sepete Ekle
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {isReaderOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-2xl p-4 md:p-12 overflow-hidden"
          >
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div 
              initial={{ scale: 0.8, y: 100, rotateX: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 100, rotateX: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-6xl aspect-[3/4] md:aspect-[16/10] bg-[#fdfaf6] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
              style={{ perspective: "2000px" }}
            >
              {/* Page Stack Effect (Left) */}
              <div className="absolute inset-y-0 left-0 w-4 bg-slate-200/50 border-r border-slate-300/50 hidden md:block" />
              <div className="absolute inset-y-0 left-4 w-1 bg-slate-100/30 hidden md:block" />

              {/* Reader Header */}
              <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-30">
                <div className="flex items-center gap-6">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-accent"
                  >
                    <BookOpen className="w-6 h-6" />
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Önizleme Modu</p>
                    <p className="text-lg font-black text-primary tracking-tight">{book.title}</p>
                  </motion.div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Canlı Önizleme
                  </div>
                  <button 
                    onClick={() => setIsReaderOpen(false)}
                    className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-300"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
              </div>

              {/* Reader Content Area */}
              <div className="flex-1 relative flex items-center justify-center p-6 md:p-24 overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 z-40">
                  <motion.div 
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${((readerPageIndex + 1) / mockReaderPages.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={readerPageIndex}
                    initial={{ rotateY: 90, opacity: 0, x: 50 }}
                    animate={{ rotateY: 0, opacity: 1, x: 0 }}
                    exit={{ rotateY: -90, opacity: 0, x: -50 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="relative w-full h-full bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden flex flex-col p-10 md:p-20 origin-left"
                  >
                    {/* Realistic Paper Texture */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/5 to-transparent" />
                    
                    <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar relative z-10">
                      <div className="space-y-4">
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-accent font-black uppercase tracking-[0.4em] text-[10px]"
                        >
                          Bölüm {readerPageIndex + 1}
                        </motion.span>
                        <motion.h2 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-4xl md:text-5xl font-serif italic text-slate-900 leading-tight"
                        >
                          {readerPageIndex === 0 ? 'Giriş ve Keşif' : readerPageIndex === 1 ? 'Derinleşen Hikaye' : 'Dönüm Noktası'}
                        </motion.h2>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 text-xl md:text-2xl leading-[1.8] text-slate-700 font-serif"
                      >
                        <p className="first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-accent first-letter:leading-none">
                          Bu eserin sayfaları arasında kaybolurken, yazarın her bir kelimeyi nasıl bir kuyumcu titizliğiyle işlediğine şahit olacaksınız. Hikaye, sadece bir anlatı değil, aynı zamanda ruhun derinliklerine yapılan bir yolculuktur.
                        </p>
                        <p>
                          Zamanın ötesinde bir mekanda geçen bu olaylar silsilesi, okuyucuyu kendi gerçekliğiyle yüzleşmeye davet ediyor. Her satırda yeni bir anlam, her paragrafta farklı bir perspektif gizli.
                        </p>
                        <p className="italic text-slate-400 border-l-4 border-accent/20 pl-8 py-2">
                          \"Hayat, bazen en beklemediğimiz anlarda bize en büyük dersleri verir. Önemli olan o dersi alacak kadar açık bir zihne sahip olmaktır.\"
                        </p>
                        <p>
                          Karakterlerin iç dünyasındaki fırtınalar, dış dünyadaki sessizlikle tezat oluştururken, okuyucu kendini bu karmaşanın tam ortasında buluyor.
                        </p>
                      </motion.div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        KitapN Premium Reader
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-primary">Sayfa {readerPageIndex + 1}</span>
                        <span className="opacity-30">/</span>
                        <span>{mockReaderPages.length}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 pointer-events-none z-50">
                  <motion.button 
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={readerPageIndex === 0}
                    onClick={() => setReaderPageIndex(prev => prev - 1)}
                    className="w-16 h-16 rounded-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center text-primary disabled:opacity-0 pointer-events-auto transition-all duration-300 group"
                  >
                    <ChevronLeft className="w-8 h-8 group-hover:text-accent transition-colors" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={readerPageIndex === mockReaderPages.length - 1}
                    onClick={() => setReaderPageIndex(prev => prev + 1)}
                    className="w-16 h-16 rounded-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center text-primary disabled:opacity-0 pointer-events-auto transition-all duration-300 group"
                  >
                    <ChevronRight className="w-8 h-8 group-hover:text-accent transition-colors" />
                  </motion.button>
                </div>
              </div>

              {/* Reader Sidebar (Desktop) */}
              <div className="hidden lg:flex w-96 bg-slate-50/50 border-l border-slate-200 p-12 flex-col gap-12 relative z-20">
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">İçindekiler</p>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <button 
                        key={i}
                        onClick={() => setReaderPageIndex(i-1)}
                        className={cn(
                          "w-full p-5 rounded-2xl text-left transition-all duration-500 flex items-center justify-between group",
                          readerPageIndex === i-1 
                            ? "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-accent" 
                            : "hover:bg-white/60 text-slate-500"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center transition-colors",
                            readerPageIndex === i-1 ? "bg-accent text-white" : "bg-slate-200 text-slate-400"
                          )}>
                            0{i}
                          </span>
                          <span className="text-sm font-bold">
                            {i === 1 ? 'Başlangıç' : i === 2 ? 'Gelişme' : 'Sonuç'}
                          </span>
                        </div>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform duration-500",
                          readerPageIndex === i-1 ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        )} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  <div className="p-8 bg-white rounded-[2rem] shadow-xl shadow-primary/5 border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150"></div>
                    <p className="text-sm font-bold text-slate-800 leading-relaxed relative z-10">
                      Bu önizleme, kitabın ruhunu anlamanız için özenle seçilmiştir.
                    </p>
                    <button 
                      onClick={() => {
                        setIsReaderOpen(false);
                        handleAddToCart();
                      }}
                      className="mt-6 w-full py-4 bg-accent text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-accent/20 hover:scale-[1.05] transition-all active:scale-95"
                    >
                      Tamamını Oku
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-2xl font-black tracking-tight">Yorum Yap</h3>
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4 text-center">
                  <p className="text-sm font-bold text-slate-500">Bu kitabı nasıl buldunuz?</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button 
                        key={s}
                        onMouseEnter={() => setNewReviewRating(s)}
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                          s <= newReviewRating ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-300"
                        )}
                      >
                        <Star className={cn("w-6 h-6", s <= newReviewRating && "fill-current")} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-500">Yorumunuz</p>
                  <textarea 
                    placeholder="Kitap hakkındaki düşüncelerinizi paylaşın..."
                    className="w-full h-40 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/20 transition-all font-medium text-slate-600 dark:text-slate-300"
                  />
                </div>
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="w-full py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Yorumu Gönder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Buy Box (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between gap-6">
        <div>
          <p className="text-2xl font-black text-primary dark:text-white">{book.price} TL</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ücretsiz Kargo</p>
        </div>
        <button 
          onClick={handleAddToCart}
          className={cn(
            "flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center gap-2",
            isAdded 
              ? "bg-emerald-500 text-white shadow-emerald-500/30" 
              : "bg-accent text-white shadow-accent/30"
          )}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              Eklendi
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Sepete Ekle
            </>
          )}
        </button>
      </div>
    </div>
  </motion.div>
);
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
