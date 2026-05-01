import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Roman', subtitle: 'En çok okunan hikayeler', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Edebiyat', subtitle: 'Klasiklerden modern eserlere', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Kişisel Gelişim', subtitle: 'Hayatını değiştiren kitaplar', image: 'https://images.unsplash.com/photo-1491843351663-f95982f9b68c?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Psikoloji', subtitle: 'Zihnin derinliklerine yolculuk', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Tarih', subtitle: 'Geçmişi yeniden keşfet', image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Felsefe', subtitle: 'Düşüncenin sınırlarını zorla', image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Bilim', subtitle: 'Evrenin sırlarını anla', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Biyografi', subtitle: 'Gerçek hayat hikayeleri', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Sanat', subtitle: 'Yaratıcılığın izinde', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=100&w=1200' },
  { name: 'Çocuk Kitapları', subtitle: 'Küçük okurlar için büyük dünyalar', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=100&w=1200' },
];

export default function CategoryGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-12 flex items-end justify-between">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-5xl font-black text-primary dark:text-white tracking-tighter mb-2 md:mb-4">
            Kategorileri Keşfet
          </h2>
          <p className="text-sm md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed hidden md:block">
            İlgi alanına göre özenle seçilmiş koleksiyonlar ile yeni dünyalar keşfedin.
          </p>
        </motion.div>
        <div className="hidden sm:flex gap-4">
           <button 
             onClick={() => scroll('left')}
             className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass-premium flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-500 shadow-xl active:scale-95 group"
           >
             <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
           </button>
           <button 
             onClick={() => scroll('right')}
             className="w-12 h-12 md:w-14 md:h-14 rounded-2xl glass-premium flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-500 shadow-xl active:scale-95 group"
           >
             <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto px-4 sm:px-6 lg:px-[max(32px,calc((100vw-1440px)/2+32px))] no-scrollbar snap-x snap-mandatory pb-4 md:pb-12"
      >
        {/* Mobile View: Small Circular Icons (max 8) */}
        {categories.slice(0, 8).map((cat, i) => (
          <motion.div
            key={`mobile-${cat.name}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            onClick={() => navigate(`/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
            className="md:hidden flex flex-col items-center gap-2 min-w-[72px] snap-start cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-colors shadow-sm relative">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=100&w=400'}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=100&w=400'; }}
                alt={cat.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight text-slate-700 dark:text-slate-300">
              {cat.name.replace(' Kitapları', '')}
            </span>
          </motion.div>
        ))}

        {/* Desktop View: Large Cards */}
        {categories.map((cat, i) => (
          <motion.div
            key={`desktop-${cat.name}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => navigate(`/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
            className="hidden md:flex min-w-[320px] h-[240px] flex-shrink-0 relative rounded-[2rem] overflow-hidden group cursor-pointer snap-start shadow-xl shadow-primary/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white/10 transition-shadow duration-500"
          >
             <img
               src={cat.image || 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=100&w=1200'}
               onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=100&w=1200'; }}
               alt={cat.name}
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
             
             <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center z-10">
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:-translate-y-1 transition-transform duration-500">
                  {cat.name}
                </h3>
                <p className="text-white/90 text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 text-shadow-sm">
                  {cat.subtitle}
                </p>
             </div>

             <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 z-10">
                <ChevronRight className="w-5 h-5" />
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
