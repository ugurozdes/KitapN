import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import TrendingBooks from '../components/TrendingBooks';
import WhyKitapn from '../components/WhyKitapn';
import Campaigns from '../components/Campaigns';
import PublisherShowcase from '../components/PublisherShowcase';
import BookSection from '../components/BookSection';
import { motion } from 'motion/react';
import { allBooks } from '../data';

export default function HomePage() {
  const editorPicks = allBooks.slice(0, 4);
  const newReleases = allBooks.slice(4, 8);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <div className="space-y-0">
        <CategoryGrid />
        
        <BookSection 
          title="Editörün Seçkisi" 
          subtitle="Zihin dünyanızı zenginleştirecek, titizlikle küratörlüğü yapılmış eserler." 
          books={editorPicks} 
        />
        
        <TrendingBooks />
        
        <WhyKitapn />

        <BookSection 
          title="Yeni Ufuklar" 
          subtitle="Kütüphanenize taze bir soluk getirecek en yeni ve seçkin çalışmalar." 
          books={newReleases} 
          darkBg
        />
        
        <Campaigns />

        <BookSection 
          title="Zamansız Eserler" 
          subtitle="Kültür dünyamızın temel taşları olan, elden düşmeyen başyapıtlar." 
          books={[...editorPicks].reverse()} 
        />
        
        <PublisherShowcase />
      </div>
    </motion.div>
  );
}
