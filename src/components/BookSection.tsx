import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '../context/CartContext';

interface BookSectionProps {
  title: string;
  subtitle: string;
  books: Book[];
  darkBg?: boolean;
}

export default function BookSection({ title, subtitle, books, darkBg }: BookSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Ensure at least 4 items for layout balance. Duplicate existing if necessary.
  let displayBooks = [...books];
  if (displayBooks.length > 0 && displayBooks.length < 4) {
    const missing = 4 - displayBooks.length;
    for (let i = 0; i < missing; i++) {
      displayBooks.push(books[i % books.length]);
    }
  }

  return (
    <section className={`py-12 md:py-32 ${darkBg ? 'bg-slate-50/50 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-800/50' : 'bg-white dark:bg-slate-950'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 md:mb-16 gap-6">
          <div>
            <h2 className="text-2xl md:text-5xl font-black text-primary dark:text-white tracking-tight mb-2 md:mb-4">
              {title}
            </h2>
            <p className="text-sm md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl hidden md:block">
              {subtitle}
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] active:scale-95 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] active:scale-95 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 md:gap-6 overflow-x-auto pb-6 md:pb-10 no-scrollbar snap-x snap-mandatory"
        >
          {displayBooks.map((book, index) => (
            <div key={`${book.id}-${index}`} className="w-[240px] sm:w-[280px] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start h-auto">
              <BookCard book={book} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
