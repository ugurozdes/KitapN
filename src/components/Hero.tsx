import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, Zap, Store, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TrustBar from './TrustBar';

const slides = [
  {
    id: 1,
    title: "Edebiyatın En Seçkin Eserleri",
    subtitle: "Küratörlerimizin titizlikle seçtiği, ruhu besleyen başyapıtlar.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=100&w=3840",
    cta: "Hemen Keşfet",
  },
  {
    id: 2,
    title: "Kadim Bilgeliğin İzinde",
    subtitle: "İnsanlık tarihine yön veren düşüncelerin zamansız yankıları.",
    image: "/images/hero/bgt2.jpg",
    cta: "Eserleri İncele",
  },
  {
    id: 3,
    title: "Zamanın Ötesindeki Klasikler",
    subtitle: "Estetik ve içeriğin mükemmel uyumuyla hazırlanan prestijli edisyonlar.",
    image: "/images/hero/bgt3.jpg",
    cta: "Koleksiyonu Gör",
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isMobile]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const activeSlideIndex = isMobile ? 0 : current;
  const activeSlide = slides[activeSlideIndex];

  return (
    <section className="relative w-full bg-background overflow-visible selection:bg-orange-500/30">
      <div className="relative h-[35vh] min-h-[300px] md:h-[85vh] md:min-h-[700px] lg:min-h-[900px] w-full overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[4rem] shadow-xl dark:shadow-2xl">
        <div className="absolute inset-0 bg-background" />
        
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlideIndex}
            initial={isMobile ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={isMobile ? false : { opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10"
          >
            {/* Background Image with Slow Cinematic Pan on Desktop, Static on Mobile */}
            <motion.div 
              initial={isMobile ? false : { scale: 1.05, y: 0 }}
              animate={isMobile ? false : { scale: 1, y: -20 }}
              transition={{ duration: 15, ease: "linear" }}
              className="absolute inset-0"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading={isMobile ? "eager" : "lazy"}
              />
            </motion.div>

            {/* Overlays */}
            {/* Mobile Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90 md:hidden" />
            
            {/* Dark Mode Overlay for Desktop (Soft dark premium) */}
            <div className="absolute inset-0 hidden md:dark:block bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.5)]" />
            
            {/* Content Container */}
            <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end md:justify-center pb-8 md:pb-20 text-center md:text-left">
              <div className="max-w-4xl mx-auto md:mx-0 flex flex-col items-center md:items-start">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2.5 bg-black/40 md:bg-black/30 dark:bg-white/5 backdrop-blur-xl text-white rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-2 md:mb-8 border border-white/20 dark:border-white/10 shadow-xl"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Küratörlerin Seçimi
                </motion.div>
                
                <motion.h1 
                  key={`title-${activeSlideIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl leading-[1.1] sm:text-5xl md:text-7xl lg:text-[100px] font-black text-white md:leading-[1] mb-2 md:mb-8 tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] md:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] break-words hyphens-auto"
                >
                  {activeSlide.title.split(' ')[0]} <br className="hidden md:block" /> 
                  <span className="text-orange-400 md:text-orange-500 italic font-serif font-light">{activeSlide.title.split(' ').slice(1).join(' ')}</span>
                </motion.h1>

                <motion.p 
                  key={`sub-${activeSlideIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xs sm:text-lg md:text-2xl text-white/90 mb-4 md:mb-12 leading-relaxed font-medium max-w-2xl tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] dark:drop-shadow-sm"
                >
                  {activeSlide.subtitle}
                </motion.p>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto"
                >
                  <button 
                    onClick={() => navigate('/search')}
                    className="w-full sm:w-auto justify-center group relative bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-xl font-black text-xs md:text-base transition-all flex items-center gap-2 md:gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.2)] md:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95"
                  >
                    Eserleri İncele
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('/search')}
                    className="hidden md:flex w-full sm:w-auto justify-center bg-black/20 dark:bg-white/5 hover:bg-black/40 dark:hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 dark:border-white/10 px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all active:scale-95 shadow-lg dark:shadow-none"
                  >
                    Tüm Koleksiyonu İncele
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Navigation Controls */}
        <div className="absolute bottom-24 right-6 lg:right-12 hidden md:flex items-center gap-4 z-20">
          <button
            onClick={prev}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/20 dark:bg-white/5 hover:bg-black/40 dark:hover:bg-white/20 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-white transition-all group active:scale-90 shadow-lg dark:shadow-none"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/20 dark:bg-white/5 hover:bg-black/40 dark:hover:bg-white/20 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-white transition-all group active:scale-90 shadow-lg dark:shadow-none"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Elegant Slide Indicators */}
        <div className="absolute bottom-[2rem] md:bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 hidden md:flex gap-2 md:gap-3 z-20 items-center h-14">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group relative h-1.5 transition-all duration-500 rounded-full bg-white/30 dark:bg-white/20 overflow-hidden shadow-sm"
              style={{ width: current === i ? '48px' : '16px' }}
            >
              <div 
                className="absolute inset-y-0 left-0 bg-white transition-all duration-1000 ease-in-out" 
                style={{ width: current === i ? '100%' : '0%' }}
              />
            </button>
          ))}
        </div>
      </div>

      <TrustBar />
    </section>
  );
}
