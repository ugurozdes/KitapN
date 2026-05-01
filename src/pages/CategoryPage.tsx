import React from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { allBooks } from '../data';
import { ChevronRight, ListFilter, ChevronDown } from 'lucide-react';
import PageNav from '../components/PageNav';

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Format the URL slug into a nice readable category name
  const categoryName = id 
    ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Kategori';
    
  // Display a stable subset of books for UI visualization
  const displayBooks = allBooks.slice(0, 16);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
           <PageNav
             crumbs={[
               { label: 'Kategoriler', href: '/search' },
               { label: categoryName },
             ]}
           />
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{categoryName}</h1>
           <p className="text-slate-500 font-medium mt-3">Bu kategoride {displayBooks.length} ürün listeleniyor.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
             <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-32">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                   <ListFilter className="w-5 h-5 text-accent" />
                   <h3 className="font-black text-lg">Filtreler</h3>
                </div>
                
                <div className="space-y-6">
                   <div>
                     <h4 className="font-bold mb-3 text-sm uppercase tracking-widest text-slate-500">Alt Kategoriler</h4>
                     <ul className="space-y-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        {['Yeni Çıkanlar', 'Çok Satanlar', 'Klasikler', 'Ödüllü Kitaplar'].map(sub => (
                           <li key={sub}>
                             <label className="flex items-center gap-3 cursor-pointer group">
                               <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-accent focus:ring-accent" />
                               <span className="group-hover:text-accent transition-colors">{sub}</span>
                             </label>
                           </li>
                        ))}
                     </ul>
                   </div>
                   
                   <div>
                     <h4 className="font-bold mb-3 text-sm uppercase tracking-widest text-slate-500">Fiyat</h4>
                     <ul className="space-y-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        {['0 - 100 ₺', '100 - 250 ₺', '250 - 500 ₺', '500+ ₺'].map(p => (
                           <li key={p}>
                             <label className="flex items-center gap-3 cursor-pointer group">
                               <input type="radio" name="price" className="w-5 h-5 text-accent focus:ring-accent" />
                               <span className="group-hover:text-accent transition-colors">{p}</span>
                             </label>
                           </li>
                        ))}
                     </ul>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
             <div className="flex items-center justify-between mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-500 hidden sm:block">Sıralama:</span>
                  <button className="flex items-center gap-2 text-sm font-bold bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
                     Önerilen
                     <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
                  </button>
                </div>
                <div className="flex gap-1 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                   {['En Yeniler', 'En Düşük Fiyat', 'Yüksek Puan'].map((sort, idx) => (
                     <button key={sort} className={`hidden md:block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${idx === 0 ? 'bg-white shadow-sm text-slate-900 dark:bg-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
                       {sort}
                     </button>
                   ))}
                </div>
             </div>
             
             {/* Using the full width to keep true exact matching 4 columns layout structure as the homepage BookSection width calculation logic allows grid to do equivalent natively */}
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {displayBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                 ))}
             </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
