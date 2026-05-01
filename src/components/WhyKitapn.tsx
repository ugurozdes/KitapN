import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Zap, Store } from 'lucide-react';

const features = [
  {
    title: "Doğrudan Kaynağından",
    desc: "Eserler doğrudan yayınevinden, kütüphanenize giden en kısa yolla ulaşır.",
    icon: Store,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Şeffaf Fiyatlandırma",
    desc: "Seçkin satıcılar arasından en nitelikli teklifi şeffaf bir şekilde değerlendirin.",
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    title: "Öncelikli Gönderim",
    desc: "Koleksiyonunuzun yeni parçaları, büyük bir titizlik ve hızla adresinize ulaştırılır.",
    icon: Truck,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    title: "Küratör Güvencesi",
    desc: "Tüm eserler ve satıcılar, KitapN'ın yüksek kalite standartları çerçevesinde denetlenir.",
    icon: ShieldCheck,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  }
];

export default function WhyKitapn() {
  return (
    <section className="py-20 md:py-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight mb-5">
          Neden KitapN?
        </h2>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Kitap alışverişini daha şeffaf, daha hızlı ve daha ekonomik hale getirmek için buradayız. Üstelik sıfır komisyon.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group h-full"
          >
            <div className="h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-500 flex flex-col items-start">
              <div className={`w-14 h-14 ${f.bg} dark:bg-slate-800 rounded-2xl flex items-center justify-center ${f.color} mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 drop-shadow-sm`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-primary dark:text-white mb-3 tracking-tight">
                {f.title}
              </h3>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
