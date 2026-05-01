import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ChevronRight, ShieldCheck, Truck, Zap, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import PageNav from '../components/PageNav';

export default function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/auth', { state: { from: { pathname: '/checkout' } } });
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-48 pb-24 text-center max-w-7xl mx-auto px-6"
      >
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingCart className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tighter">Sepetin Boş</h1>
        <p className="text-slate-500 font-medium max-w-xs mx-auto mb-12">
          Görünüşe göre henüz sepetine kitap eklememişsin. Hemen keşfetmeye başla!
        </p>
        <button 
          onClick={() => navigate('/search')}
          className="bg-accent text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-105 active:scale-95"
        >
          Alışverişe Başla
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-background min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <PageNav crumbs={[{ label: 'Sepetim' }]} backHref="/search" />
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-2">Sepetim</h1>
            <p className="text-slate-500 font-medium">{totalItems} ürün sepetinizde bekliyor.</p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Alışverişe Devam Et
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 flex flex-col sm:flex-row items-center gap-8 relative group"
                >
                  <div 
                    className="w-32 h-44 shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex-1 space-y-4 text-center sm:text-left">
                    <div>
                      <h3 
                        className="text-xl font-black text-primary dark:text-white tracking-tight hover:text-accent cursor-pointer transition-colors"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-slate-400 font-bold text-sm">{item.author}</p>
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                      <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-lg">
                        <Zap className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Hızlı Kargo</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-500 bg-blue-500/5 px-3 py-1 rounded-lg">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Orijinal</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-6">
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:text-accent transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:text-accent transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-primary dark:text-white">{(parseFloat(item.price) * item.quantity).toFixed(2)} TL</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.price} TL / adet</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-primary/10 space-y-8 sticky top-32">
              <h3 className="text-2xl font-black tracking-tight">Sipariş Özeti</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Ürün Toplamı</span>
                  <span>{totalPrice.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Kargo Toplamı</span>
                  <span className="text-emerald-500">Ücretsiz</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>İndirimler</span>
                  <span>-0.00 TL</span>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                  <span className="text-lg font-black">Toplam</span>
                  <span className="text-3xl font-black text-accent tracking-tighter">{totalPrice.toFixed(2)} TL</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
              >
                Ödemeye Geç
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Truck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">24 Saatte Kargo</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Güvenli Ödeme</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
