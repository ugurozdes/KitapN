import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Package, 
  Truck, 
  RotateCcw, 
  User, 
  CreditCard, 
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import PageNav from '../components/PageNav';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'orders', icon: Package, title: 'Siparişler', description: 'Sipariş takibi, iptal ve değişiklik işlemleri.' },
  { id: 'shipping', icon: Truck, title: 'Kargo & Teslimat', description: 'Teslimat süreleri, kargo takibi ve ücretler.' },
  { id: 'returns', icon: RotateCcw, title: 'İade & Değişim', description: 'İade süreci, geri ödeme ve değişim şartları.' },
  { id: 'account', icon: User, title: 'Hesap İşlemleri', description: 'Üyelik, şifre işlemleri ve hesap güvenliği.' },
  { id: 'payment', icon: CreditCard, title: 'Ödeme & Fatura', description: 'Ödeme yöntemleri, taksit ve fatura talepleri.' },
  { id: 'general', icon: HelpCircle, title: 'Genel Sorular', description: 'Ürünler, stoklar ve diğer merak edilenler.' },
];

const faqs = [
  { category: 'orders', question: 'Siparişimi nasıl iptal edebilirim?', answer: 'Siparişiniz henüz kargoya verilmediyse "Siparişlerim" sayfasından iptal talebi oluşturabilirsiniz.' },
  { category: 'shipping', question: 'Kargom ne zaman ulaşır?', answer: 'Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya teslim edilir. Teslimat süresi bulunduğunuz bölgeye göre değişiklik gösterebilir.' },
  { category: 'returns', question: 'İade süresi kaç gündür?', answer: 'Ürünlerinizi teslim aldığınız tarihten itibaren 14 gün içerisinde iade edebilirsiniz.' },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden selection:bg-accent/30"
    >
      {/* Subtle Premium Background Glows */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-white dark:from-slate-900/40 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none -z-10" />
      <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <PageNav crumbs={[{ label: 'Destek Merkezi' }]} backHref="/" />
        {/* Support Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-32 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-[64px] font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[1.1]">
              Size Nasıl Yardımcı Olabiliriz?
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 leading-relaxed">
              Siparişlerinizden iade süreçlerine kadar her konuda anında destek alın.
            </p>
          </motion.div>

          {/* Premium Search Bar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group max-w-2xl mx-auto"
          >
            {/* Ambient Focus Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-indigo-500/20 to-accent/30 rounded-full blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 ease-out" />
            
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] group-focus-within:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:group-focus-within:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-focus-within:border-accent/40 transition-all duration-500 pl-8 pr-3 py-3">
              <Search className="w-6 h-6 text-slate-400 group-focus-within:text-accent transition-colors duration-500 shrink-0" />
              <input 
                type="text"
                placeholder="Örn: Siparişimi nasıl iade edebilirim?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-lg font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-medium focus:ring-0 outline-none ml-4"
              />
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl ml-2 shrink-0">
                Ara
              </button>
            </div>
          </motion.div>
        </div>

        {/* Categories Grid - Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-32">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(`/support/${cat.id}`)}
              className={cn(
                "group relative bg-white dark:bg-slate-900 p-10 lg:p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer overflow-hidden",
                activeCategory === cat.id && "ring-2 ring-accent/30 border-accent/50 shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
              )}
            >
              {activeCategory === cat.id && (
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
              )}
              
              <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/5 backdrop-blur-md rounded-full border border-accent/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 shadow-inner">
                <cat.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3 transition-colors">
                {cat.title}
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                {cat.description}
              </p>
              
              <div className="absolute bottom-10 left-10 lg:left-12 flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-accent uppercase tracking-widest group-hover:gap-3 transition-all duration-500">
                Tüm Sorular <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Contact Section */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900 dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Abstract Dark Theme Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none mix-blend-screen" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">Hala Yardıma mı <br/>İhtiyacınız Var?</h2>
              <p className="text-slate-400 text-lg font-medium mb-14 max-w-lg leading-relaxed">
                Destek ekibimiz haftanın her günü 09:00 - 22:00 saatleri arasında kesintisiz olarak size yardımcı olmaya hazır.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/5 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-500">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1.5">Müşteri Hizmetleri</p>
                    <p className="text-lg font-black tracking-tight">0850 000 00 00</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/5 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-500">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1.5">E-Posta Desteği</p>
                    <p className="text-lg font-black tracking-tight">destek@kitapn.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="bg-white/5 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-12 border border-white/10 relative z-10 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:-translate-y-2">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Canlı Destek</h3>
                </div>
                <p className="text-slate-300 font-medium mb-12 leading-relaxed">
                   Satış temsilcilerimizle anlık olarak mesajlaşarak tüm sorularınıza saniyeler içinde doğrudan yanıt alabilirsiniz.
                </p>
                <button className="w-full bg-white hover:bg-slate-50 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:-translate-y-1 transition-transform active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]">
                   Hemen Sohbete Başla
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
