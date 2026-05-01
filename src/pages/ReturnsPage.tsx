import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RotateCcw, 
  ChevronRight, 
  Package, 
  AlertCircle,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import { cn } from '../lib/utils';
import PageNav from '../components/PageNav';

const mockOrdersForReturn = [
  {
    id: 'ORD-88291',
    date: '18 Mart 2026',
    total: 458.00,
    status: 'Delivered',
    items: [
      { id: 1, title: 'Gece Yarısı Kütüphanesi', author: 'Matt Haig', price: 185.00, image: 'https://picsum.photos/seed/book1/200/300' },
      { id: 2, title: 'Atomik Alışkanlıklar', author: 'James Clear', price: 273.00, image: 'https://picsum.photos/seed/book2/200/300' }
    ]
  }
];

export default function ReturnsPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Order, 2: Select Items, 3: Reason, 4: Success
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [reason, setReason] = useState('');

  const handleReturnSubmit = () => {
    setStep(4);
  };

  return (
    <ProfileLayout>
      <div className="space-y-12">
        <PageNav crumbs={[{ label: 'Hesabım', href: '/profile' }, { label: 'Siparişlerim', href: '/profile/orders' }, { label: 'İade & İptal' }]} />
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
              İade ve İptal İşlemleri
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Kolay iade sürecimizle işlemlerinizi hızlıca tamamlayın.
            </p>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-3xl text-amber-700 dark:text-amber-400">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="text-sm font-bold">İade etmek istediğiniz ürünü içeren siparişi seçerek başlayın. İade süresi teslimattan itibaren 14 gündür.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockOrdersForReturn.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setStep(2);
                  }}
                  className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary dark:text-white">
                        <Package className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Sipariş No</p>
                        <p className="text-xl font-black text-primary dark:text-white tracking-tight">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tarih</p>
                        <p className="text-sm font-bold text-primary dark:text-white">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tutar</p>
                        <p className="text-sm font-bold text-primary dark:text-white">{order.total.toFixed(2)} TL</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedOrder && (
          <div className="space-y-10">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Sipariş Seçimine Dön
            </button>
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
              <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight mb-8">İade Edilecek Ürünleri Seçin</h3>
              <div className="space-y-6">
                {selectedOrder.items.map((item: any) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedItems(prev => 
                        prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
                      );
                    }}
                    className={cn(
                      "flex items-center gap-6 p-6 rounded-3xl border transition-all cursor-pointer group",
                      selectedItems.includes(item.id) 
                        ? "bg-accent/5 border-accent" 
                        : "bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                      selectedItems.includes(item.id) ? "bg-accent border-accent" : "border-slate-200 dark:border-slate-700"
                    )}>
                      {selectedItems.includes(item.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded-xl shadow-sm" />
                    <div className="flex-1">
                      <p className="text-lg font-black text-primary dark:text-white tracking-tight">{item.title}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.author}</p>
                    </div>
                    <p className="text-lg font-black text-primary dark:text-white">{item.price.toFixed(2)} TL</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-end">
                <button 
                  disabled={selectedItems.length === 0}
                  onClick={() => setStep(3)}
                  className="px-12 py-5 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Devam Et
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Ürün Seçimine Dön
            </button>
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
              <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight mb-8">İade Nedeni</h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Vazgeçtim', 'Ürün hasarlı geldi', 'Yanlış ürün gönderildi', 'Beklediğim gibi değil', 'Diğer'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={cn(
                        "p-6 rounded-2xl border text-left font-bold transition-all",
                        reason === r 
                          ? "bg-accent text-white border-accent shadow-xl shadow-accent/20" 
                          : "bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ek Açıklama (Opsiyonel)</label>
                  <textarea 
                    placeholder="Lütfen iade nedeninizi detaylandırın..."
                    className="w-full p-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none transition-all min-h-[150px]"
                  />
                </div>
              </div>
              <div className="mt-12 flex justify-end">
                <button 
                  disabled={!reason}
                  onClick={handleReturnSubmit}
                  className="px-12 py-5 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  İade Talebi Oluştur
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] p-20 text-center border border-slate-100 dark:border-slate-800 shadow-2xl shadow-primary/5"
          >
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-6">İade Talebiniz Alındı!</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto mb-12">
              İade talebiniz başarıyla oluşturuldu. İade kargo kodunuz en kısa sürede e-posta adresinize gönderilecektir.
            </p>
            <button 
              onClick={() => navigate('/profile/orders')}
              className="px-12 py-5 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-95"
            >
              Siparişlerime Dön
            </button>
          </motion.div>
        )}
      </div>
    </ProfileLayout>
  );
}
