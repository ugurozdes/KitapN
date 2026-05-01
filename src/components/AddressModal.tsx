import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, User, Home, Briefcase, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { Address } from '../context/AddressContext';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Omit<Address, 'id'>) => void;
  initialData?: Address | null;
}

export default function AddressModal({ isOpen, onClose, onSave, initialData }: AddressModalProps) {
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    title: '',
    fullName: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    fullAddress: '',
    isDefault: false,
    type: 'home'
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        title: '',
        fullName: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        fullAddress: '',
        isDefault: false,
        type: 'home'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black tracking-tighter">
                  {initialData ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                </h2>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary dark:hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Adres Başlığı</label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Örn: Evim, İş Yerim"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ad Soyad</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Adınız Soyadınız"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Telefon</label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05XX XXX XX XX"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">İl</label>
                    <input 
                      type="text" 
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Şehir"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 px-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">İlçe</label>
                    <input 
                      type="text" 
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="İlçe"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 px-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mahalle / Semt</label>
                    <input 
                      type="text" 
                      required
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      placeholder="Mahalle"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 px-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Açık Adres</label>
                  <textarea 
                    required
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    placeholder="Cadde, sokak, bina no, daire no..."
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 px-6 outline-none font-bold text-sm transition-all min-h-[120px] resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex gap-3">
                    {[
                      { id: 'home', icon: Home, label: 'Ev' },
                      { id: 'work', icon: Briefcase, label: 'İş' },
                      { id: 'other', icon: MoreHorizontal, label: 'Diğer' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.id as any })}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          formData.type === type.id 
                            ? "bg-accent text-white shadow-lg shadow-accent/20" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary"
                        )}
                      >
                        <type.icon className="w-3 h-3" />
                        {type.label}
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                      className="w-5 h-5 rounded border-2 border-slate-300 accent-accent" 
                    />
                    <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">Varsayılan adres yap</span>
                  </label>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    İptal
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-accent hover:bg-accent/90 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
