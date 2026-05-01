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
import { supabase } from '../lib/supabase/client';
import { useEffect } from 'react';

export default function HomePage() {
  console.log('🚀 HomePage Component Rendered');

  const editorPicks = allBooks.slice(0, 4);
  const newReleases = allBooks.slice(4, 8);

  useEffect(() => {
    console.log('🎬 useEffect Triggered: Starting Supabase Test');
    
    const testSupabase = async () => {
      console.log('🔍 Executing Supabase Query: categories...');
      try {
        const { data, error } = await supabase.from('categories').select('*').limit(10);
        
        console.log('📡 Supabase Query Finished');
        
        if (error) {
          console.error('❌ Supabase Error:', error.message);
          console.error('Full Error Object:', error);
        } else {
          console.log('✅ Supabase Success!');
          console.log('Data count:', data?.length || 0);
          console.log('Data Content:', data);
          
          if (!data || data.length === 0) {
            console.warn('⚠️ categories tablosu boş dönüyor. SQL seed verilerini kontrol edin.');
          }
        }
      } catch (err) {
        console.error('💥 Critical Error:', err);
      }
      console.log('🏁 Supabase Test Completed');
    };

    testSupabase();
  }, []);

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
