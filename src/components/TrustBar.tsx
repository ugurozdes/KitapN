import React from 'react';
import { motion } from 'motion/react';
import { Store, Zap, Truck, ShieldCheck } from 'lucide-react';

const trustItems = [
  {
    icon: Store,
    label: "Doğrudan",
    value: "Yayınevi Satışı",
    accent: "group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(234,88,12,0.4)] group-hover:border-transparent"
  },
  {
    icon: Zap,
    label: "En İyi Fiyat",
    value: "Avantajlı",
    accent: "group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(245,158,11,0.4)] group-hover:border-transparent"
  },
  {
    icon: Truck,
    label: "Hızlı Kargo",
    value: "Aynı Gün Teslimat",
    accent: "group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] group-hover:border-transparent"
  },
  {
    icon: ShieldCheck,
    label: "Garanti",
    value: "%100 Orijinal",
    accent: "group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(5,150,105,0.4)] group-hover:border-transparent"
  }
];

export default function TrustBar() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 -mt-8 md:-mt-20 relative z-40 mb-12 md:mb-16">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative group/bar overflow-hidden rounded-[2.8rem] border border-white/20 dark:border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] bg-black/30 dark:bg-white/5 backdrop-blur-2xl"
      >
        <div className="absolute inset-0 rounded-[2.8rem] border border-white/5 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
        
        <div className="relative p-4 lg:p-7 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center justify-start lg:justify-between gap-4 lg:gap-0 lg:overflow-visible">
          {trustItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-4 px-2 lg:px-10 group min-w-[200px] flex-none lg:flex-auto snap-center justify-start cursor-pointer select-none">
                {/* Transparent Squircles from Reference */}
                <div 
                  className={`w-12 h-12 lg:w-14 lg:h-14 bg-black/20 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl lg:rounded-[1.5rem] flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.accent} backdrop-blur-md shrink-0`}
                >
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.5]" />
                </div>
                
                <div className="flex flex-col">
                  {/* Clean White Typography */}
                  <span className="text-[10px] md:text-[11px] font-black text-white/70 dark:text-white/50 uppercase tracking-[0.22em] leading-tight mb-1.5 transition-colors duration-500 group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="text-[14px] lg:text-[16px] font-black text-white tracking-tight whitespace-nowrap transition-all duration-700 group-hover:translate-x-1">
                    {item.value}
                  </span>
                </div>
              </div>
              
              {index < trustItems.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-white/[0.08] self-center mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
