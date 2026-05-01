import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, Share2, Download, ShoppingBag } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 90000000) + 10000000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 pb-24 bg-background min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-3xl w-full text-center space-y-12">
        {/* Success Animation */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 relative z-10"
          >
            <CheckCircle className="w-16 h-16" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] -z-10"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl font-black text-primary dark:text-white tracking-tighter">
            Siparişin <span className="text-emerald-500">Alındı!</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg mx-auto">
            Harika bir seçim yaptın. Kitapların en kısa sürede hazırlanıp yola çıkacak.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-primary/5 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-400">
              <Package className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sipariş No</span>
            </div>
            <p className="text-xl font-black text-primary dark:text-white">#{orderNumber}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-400">
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tarih</span>
            </div>
            <p className="text-xl font-black text-primary dark:text-white">24 Mart 2026</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-400">
              <Truck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tahmini Teslimat</span>
            </div>
            <p className="text-xl font-black text-emerald-500">Yarın Kapında</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
          >
            <ShoppingBag className="w-5 h-5" />
            Alışverişe Devam Et
          </button>
          <button className="w-full sm:w-auto bg-white dark:bg-slate-800 text-primary dark:text-white border-2 border-slate-200 dark:border-slate-700 px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 flex items-center justify-center gap-4">
            <Download className="w-5 h-5" />
            Faturayı İndir
          </button>
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-8">
          <p className="text-xs font-bold text-slate-400">Sipariş detayları e-posta adresine gönderildi.</p>
          <button className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-[10px] hover:underline">
            <Share2 className="w-4 h-4" /> Siparişi Paylaş
          </button>
        </div>
      </div>
    </motion.div>
  );
}
