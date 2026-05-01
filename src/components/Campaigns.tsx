import React from 'react';
import { motion } from 'motion/react';
import { Timer, ArrowRight } from 'lucide-react';

export default function Campaigns() {
  return (
    <section className="py-20 md:py-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Campaign 1 */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          className="relative h-[480px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-700"
        >
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=100&w=1600"
            alt="Zamansız Klasikler"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 group-hover:opacity-90" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start z-10 transition-transform duration-700 group-hover:-translate-y-2">
            <div className="flex items-center gap-2 bg-accent/90 backdrop-blur-md border border-accent/20 text-white px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 shadow-lg">
              <Timer className="w-4 h-4" />
              Sınırlı Seçki
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Zamansız Klasikler
            </h3>
            <p className="text-slate-200/90 font-medium mb-8 max-w-sm leading-relaxed">
              Dünya edebiyatına yön veren başyapıtlardan oluşan özel bir derleme.
            </p>
            <button className="bg-white text-primary px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.2)] active:scale-95">
              Koleksiyonu İncele <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Campaign 2 */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          className="relative h-[480px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-700"
        >
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=100&w=1600"
            alt="Seçkin Yayınevleri"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/20 transition-opacity duration-700 group-hover:opacity-90" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start z-10 transition-transform duration-700 group-hover:-translate-y-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 shadow-lg">
              Prestijli Edisyonlar
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Seçkin Yayınevleri
            </h3>
            <p className="text-slate-200/90 font-medium mb-8 max-w-sm leading-relaxed">
              Can, Yapı Kredi ve İletişim Yayınları'ndan kütüphanenize değer katacak eserler.
            </p>
            <button className="bg-accent text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/90 transition-all shadow-[0_10px_20px_rgba(var(--accent-rgb),0.3)] active:scale-95">
              Yayınevlerini Gör <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
