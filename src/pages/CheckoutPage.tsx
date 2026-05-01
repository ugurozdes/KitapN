import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, CreditCard, CheckCircle, ChevronRight, ChevronLeft, ShieldCheck, Lock, Plus, Trash2, Edit2, Store, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAddresses, Address } from '../context/AddressContext';
import { cn } from '../lib/utils';
import AddressModal from '../components/AddressModal';
import PageNav from '../components/PageNav';

const steps = [
  { id: 1, name: 'Adres', icon: MapPin },
  { id: 2, name: 'Kargo', icon: Truck },
  { id: 3, name: 'Ödeme', icon: CreditCard },
  { id: 4, name: 'Onay', icon: CheckCircle },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddresses();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses.find(a => a.isDefault)?.id || addresses[0]?.id || '');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleNext = () => {
    if (currentStep === 1 && !selectedAddressId) {
      alert('Lütfen bir teslimat adresi seçin.');
      return;
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else {
      clearCart();
      navigate('/success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate('/cart');
  };

  const handleSaveAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
    } else {
      addAddress(addressData);
    }
    setEditingAddress(null);
  };

  const handleEditAddress = (e: React.MouseEvent, address: Address) => {
    e.stopPropagation();
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      deleteAddress(id);
      if (selectedAddressId === id) {
        setSelectedAddressId('');
      }
    }
  };

  if (cart.length === 0 && currentStep !== 4) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h1 className="text-4xl font-black mb-6">Sepetiniz Boş</h1>
        <button onClick={() => navigate('/')} className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">Ana Sayfaya Dön</button>
      </div>
    );
  }

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-background min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <PageNav crumbs={[{ label: 'Sepetim', href: '/cart' }, { label: 'Siparişi Tamamla' }]} />
        {/* Progress Stepper */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-16">
          <div className="flex items-center justify-between relative px-2">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-10" />
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                    isActive ? "bg-accent text-white scale-110 shadow-accent/30" : 
                    isCompleted ? "bg-emerald-500 text-white shadow-emerald-500/20" : 
                    "bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700"
                  )}>
                    {isCompleted ? <CheckCircle className="w-5 h-5 md:w-6 md:h-6" /> : <Icon className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                  <span className={cn(
                    "text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-500",
                    isActive ? "text-accent" : isCompleted ? "text-emerald-500" : "text-slate-400"
                  )}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12">
          {/* Sidebar Summary - Moved to top on mobile */}
          <div className="lg:col-span-4 order-first lg:order-last">
            <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-primary/10 space-y-6 md:space-y-8 lg:sticky lg:top-32">
              <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center justify-between">
                Sipariş Özeti
                <span className="lg:hidden text-xs text-slate-400 font-bold">{cart.length} Ürün</span>
              </h3>
              
              <div className="hidden md:block max-h-60 overflow-y-auto pr-2 no-scrollbar space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 shrink-0 rounded-xl overflow-hidden">
                      <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.quantity} Adet</p>
                      <p className="text-sm font-black text-accent mt-1">{item.price} TL</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 md:space-y-4 md:pt-8 md:border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-slate-500 font-bold text-xs md:text-sm">
                  <span>Ara Toplam</span>
                  <span>{totalPrice.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-xs md:text-sm">
                  <span>Kargo</span>
                  <span className="text-emerald-500">Ücretsiz</span>
                </div>
                <div className="pt-2 md:pt-4 flex justify-between items-end">
                  <span className="text-base md:text-lg font-black">Toplam</span>
                  <span className="text-2xl md:text-3xl font-black text-accent tracking-tighter">{totalPrice.toFixed(2)} TL</span>
                </div>
              </div>

              <div className="hidden md:flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Lock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Güvenli Ödeme SSL</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Kitapn Güvencesi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8 pb-32 lg:pb-0">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Teslimat Adresi</h2>
                    <button 
                      onClick={() => {
                        setEditingAddress(null);
                        setIsAddressModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 md:gap-2 text-accent font-black uppercase tracking-widest text-[10px] md:text-xs hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" /> Yeni Adres
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {addresses.map((address) => (
                      <div 
                        key={address.id}
                        onClick={() => setSelectedAddressId(address.id)}
                        className={cn(
                          "p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all cursor-pointer group relative",
                          selectedAddressId === address.id 
                            ? "bg-accent/5 border-accent shadow-xl shadow-accent/5" 
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <div className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors",
                            selectedAddressId === address.id ? "bg-accent/10 text-accent" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          )}>
                            {address.type === 'home' ? <MapPin className="w-5 h-5 md:w-6 md:h-6" /> : <Store className="w-5 h-5 md:w-6 md:h-6" />}
                          </div>
                          <div className="flex items-center gap-1 md:gap-2">
                            <button 
                              onClick={(e) => handleEditAddress(e, address)}
                              className="p-2 text-slate-400 hover:text-accent transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button 
                              onClick={(e) => handleDeleteAddress(e, address.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-base md:text-lg font-black mb-1 md:mb-2">{address.title}</h3>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          {address.neighborhood} {address.fullAddress} <br />
                          {address.district} / {address.city}
                        </p>
                        {address.isDefault && (
                          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-accent">
                            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Varsayılan</span>
                          </div>
                        )}
                        {selectedAddressId === address.id && !address.isDefault && (
                          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-accent/10 flex items-center gap-2 text-accent">
                            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Seçili</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Kargo Seçeneği</h2>
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { name: 'Aras Kargo', price: 'Ücretsiz', time: 'Yarın Kapında', icon: Truck },
                      { name: 'Yurtiçi Kargo', price: 'Ücretsiz', time: '1-2 İş Günü', icon: Truck },
                      { name: 'Kitapn Express', price: '9.90 TL', time: 'Bugün Kapında', icon: Zap },
                    ].map((kargo, i) => (
                      <label key={i} className="flex items-center justify-between p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-accent transition-all cursor-pointer group">
                        <div className="flex items-center gap-4 md:gap-6">
                          <input type="radio" name="kargo" defaultChecked={i === 0} className="w-4 h-4 md:w-5 md:h-5 accent-accent" />
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors">
                              <kargo.icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                              <p className="text-sm md:text-base font-black text-primary dark:text-white">{kargo.name}</p>
                              <p className="text-[10px] md:text-xs text-slate-400 font-bold">{kargo.time}</p>
                            </div>
                          </div>
                        </div>
                        <span className={cn(
                          "text-sm md:text-base font-black",
                          kargo.price === 'Ücretsiz' ? "text-emerald-500" : "text-primary dark:text-white"
                        )}>{kargo.price}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Ödeme Yöntemi</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-accent/5 border-2 border-accent shadow-xl shadow-accent/5">
                      <div className="flex items-center justify-between mb-4 md:mb-8">
                        <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                        <div className="flex gap-1.5 md:gap-2">
                          <div className="w-8 h-5 md:w-10 md:h-6 bg-white rounded border border-slate-100" />
                          <div className="w-8 h-5 md:w-10 md:h-6 bg-white rounded border border-slate-100" />
                        </div>
                      </div>
                      <h3 className="text-base md:text-lg font-black mb-1">Kartla Öde</h3>
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium">Güvenli ödeme altyapısı.</p>
                    </div>

                    <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-4 md:mb-8">
                        <Store className="w-6 h-6 md:w-8 md:h-8 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-base md:text-lg font-black mb-1">Kapıda Ödeme</h3>
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium">Teslimatta öde.</p>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6 bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5">
                    <div className="space-y-3 md:space-y-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Kart Numarası</label>
                      <input type="text" placeholder="**** **** **** ****" className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 rounded-xl py-3.5 md:py-4 px-5 md:px-6 outline-none font-bold text-sm md:text-base" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-3 md:space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Son Kullanma</label>
                        <input type="text" placeholder="AA / YY" className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 rounded-xl py-3.5 md:py-4 px-5 md:px-6 outline-none font-bold text-sm md:text-base" />
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">CVV</label>
                        <input type="text" placeholder="***" className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 rounded-xl py-3.5 md:py-4 px-5 md:px-6 outline-none font-bold text-sm md:text-base" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Onay</h2>
                  <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-500/5 border-2 border-emerald-500/20 space-y-4 md:space-y-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-emerald-600 dark:text-emerald-400">Hazırız!</h3>
                        <p className="text-[10px] md:text-sm text-emerald-600/70 dark:text-emerald-400/70 font-medium">Siparişi onaylayabilirsiniz.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation Buttons */}
            <div className="hidden lg:flex items-center justify-between pt-12">
              <button 
                onClick={handleBack}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-400 hover:text-primary transition-all"
              >
                <ChevronLeft className="w-5 h-5" /> Geri Dön
              </button>
              <button 
                onClick={handleNext}
                className="bg-accent hover:bg-accent/90 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-4"
              >
                {currentStep === 4 ? 'Siparişi Tamamla' : 'Devam Et'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="flex-1 h-14 bg-accent text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-accent/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            >
              {currentStep === 4 ? 'Siparişi Tamamla' : 'Devam Et'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
