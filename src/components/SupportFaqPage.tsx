import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, MessageCircle, Phone, Mail, LucideIcon } from 'lucide-react';
import PageNav from './PageNav';
import { cn } from '../lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}
export interface FaqGroup {
  title: string;
  icon: LucideIcon;
  items: FaqItem[];
}

interface SupportFaqPageProps {
  categoryId: string;
  categoryTitle: string;
  categoryDescription: string;
  icon: LucideIcon;
  groups: FaqGroup[];
}

export default function SupportFaqPage({
  categoryId,
  categoryTitle,
  categoryDescription,
  icon: CategoryIcon,
  groups,
}: SupportFaqPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    const q = searchQuery.toLowerCase();
    return groups
      .map(g => ({
        ...g,
        items: g.items.filter(
          i =>
            i.question.toLowerCase().includes(q) ||
            i.answer.toLowerCase().includes(q)
        ),
      }))
      .filter(g => g.items.length > 0);
  }, [searchQuery, groups]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/4 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PageNav
          crumbs={[
            { label: 'Destek Merkezi', href: '/support' },
            { label: categoryTitle },
          ]}
          backHref="/support"
        />

        {/* Hero */}
        <div className="mb-16">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent/15 to-accent/5 dark:from-accent/25 dark:to-accent/5 rounded-full border border-accent/10 flex items-center justify-center text-accent shadow-inner">
              <CategoryIcon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {categoryTitle}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                {categoryDescription}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative group max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-indigo-500/20 rounded-full blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm group-focus-within:shadow-md group-focus-within:border-accent/40 transition-all duration-500 pl-6 pr-3 py-3">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors duration-500 shrink-0" />
              <input
                type="text"
                placeholder={`${categoryTitle} konusunda arayın…`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-base font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal focus:ring-0 outline-none ml-3"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-black text-slate-400 hover:text-slate-600 px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2 shrink-0"
                >
                  Temizle
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Groups */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Sonuç Bulunamadı</h3>
              <p className="text-slate-500">Farklı anahtar kelimelerle tekrar deneyin.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 text-accent font-black text-sm uppercase tracking-widest hover:underline"
              >
                Aramayı Temizle
              </button>
            </div>
          ) : (
            filtered.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: gi * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                {/* Group Header */}
                <div className="flex items-center gap-4 px-10 py-7 border-b border-slate-50 dark:border-slate-800/60">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-accent">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    {group.title}
                  </h2>
                  <span className="ml-auto text-xs font-black text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-full px-3 py-1">
                    {group.items.length} soru
                  </span>
                </div>

                {/* Accordion Items */}
                <div className="divide-y divide-slate-50 dark:divide-slate-800/60">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = openItem === key;
                    return (
                      <div key={ii}>
                        <button
                          className="w-full flex items-center justify-between gap-6 px-10 py-6 text-left group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                          onClick={() => setOpenItem(isOpen ? null : key)}
                        >
                          <span className={cn(
                            'text-base font-bold leading-snug transition-colors',
                            isOpen
                              ? 'text-accent'
                              : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'
                          )}>
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                              'shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
                              isOpen
                                ? 'bg-accent/10 text-accent'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            )}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-10 pb-8 pt-2">
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-l-4 border-accent/40">
                                  <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                    {item.answer}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-screen" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h3 className="text-3xl font-black tracking-tight mb-3">Aradığınızı Bulamadınız mı?</h3>
              <p className="text-slate-400 font-medium max-w-lg">
                Destek ekibimiz haftanın 7 günü 09:00 – 22:00 saatleri arasında size özel yardımcı olmaya hazır.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="tel:08500000000"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-4 rounded-2xl font-bold text-sm transition-all"
              >
                <Phone className="w-5 h-5" />
                0850 000 00 00
              </a>
              <a
                href="mailto:destek@kitapn.com"
                className="flex items-center gap-3 bg-accent hover:bg-accent/90 px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-accent/20 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Canlı Destek
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
