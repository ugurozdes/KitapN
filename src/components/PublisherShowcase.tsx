import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const publishers = [
  { name: "Can Yayınları", logo: "C", color: "bg-red-500", books: "2.4k+ Kitap" },
  { name: "İş Bankası", logo: "İ", color: "bg-blue-600", books: "3.1k+ Kitap" },
  { name: "Yapı Kredi", logo: "Y", color: "bg-amber-500", books: "1.8k+ Kitap" },
  { name: "İletişim", logo: "İ", color: "bg-emerald-600", books: "1.2k+ Kitap" },
  { name: "Metis", logo: "M", color: "bg-indigo-600", books: "900+ Kitap" },
  { name: "Pegasus", logo: "P", color: "bg-cyan-600", books: "1.5k+ Kitap" },
  { name: "Doğan Kitap", logo: "D", color: "bg-orange-600", books: "2.1k+ Kitap" },
  { name: "Kronik", logo: "K", color: "bg-slate-800", books: "600+ Kitap" },
];

export default function PublisherShowcase() {
  return (
    <section className="py-20 md:py-32 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight mb-4">
              Öne Çıkan Yayınevleri
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
              En sevdiğin yayınevlerinden özenle derlenmiş koleksiyonları doğrudan keşfet.
            </p>
          </div>
          <button className="text-accent font-bold hover:text-accent/80 transition-colors flex items-center gap-1.5 hover:gap-2 bg-accent/5 px-6 py-3 rounded-xl border border-accent/10">
            Tümünü Gör <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {publishers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group cursor-pointer"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-slate-200 dark:hover:border-slate-700 h-full">
                <div className={`${p.color} w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white font-black text-2xl mb-5 shadow-lg shadow-current/20 group-hover:rotate-6 transition-transform duration-500 drop-shadow-sm`}>
                  {p.logo}
                </div>
                <h3 className="font-bold text-primary dark:text-white text-sm md:text-base mb-1.5 line-clamp-1 tracking-tight">{p.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">{p.books}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
