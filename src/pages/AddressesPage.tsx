import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2, 
  Check,
  Home,
  Briefcase,
  Phone
} from 'lucide-react';
import ProfileLayout from '../components/ProfileLayout';
import { cn } from '../lib/utils';
import { useAddresses } from '../context/AddressContext';
import AddressModal from '../components/AddressModal';
import PageNav from '../components/PageNav';

export default function AddressesPage() {
  const { addresses, deleteAddress, setDefaultAddress, addAddress, updateAddress } = useAddresses();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const handleEdit = (address: any) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (addressData: any) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
    } else {
      addAddress(addressData);
    }
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <ProfileLayout>
      <div className="space-y-12">
        <PageNav crumbs={[{ label: 'Hesabım', href: '/profile' }, { label: 'Adreslerim' }]} />
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Adreslerim
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Siparişleriniz için kayıtlı teslimat adreslerinizi yönetin.
            </p>
          </div>
          <button 
            onClick={() => {
              setEditingAddress(null);
              setIsAddressModalOpen(true);
            }}
            className="px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Yeni Adres Ekle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {addresses.map((addr) => (
              <motion.div
                key={addr.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "bg-white dark:bg-slate-900 rounded-[2.5rem] border p-10 shadow-sm transition-all relative group",
                  addr.isDefault 
                    ? "border-accent ring-4 ring-accent/5" 
                    : "border-slate-100 dark:border-slate-800 hover:border-accent/20"
                )}
              >
                {addr.isDefault && (
                  <div className="absolute -top-4 left-10 bg-accent text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/20 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5" />
                    Varsayılan
                  </div>
                )}

                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-accent">
                      {addr.title.toLowerCase().includes('iş') ? <Briefcase className="w-6 h-6" /> : <Home className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-primary dark:text-white tracking-tight">{addr.title}</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{addr.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(addr)}
                      className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-accent rounded-xl transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteAddress(addr.id)}
                      className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-slate-300 mt-1 flex-shrink-0" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {addr.fullAddress}, {addr.district}/{addr.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-slate-300 flex-shrink-0" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {addr.phone}
                    </p>
                  </div>
                </div>

                {!addr.isDefault && (
                  <button 
                    onClick={() => setDefaultAddress(addr.id)}
                    className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-accent hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    Varsayılan Olarak Ayarla
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add New Card Placeholder */}
          <button 
            onClick={() => {
              setEditingAddress(null);
              setIsAddressModalOpen(true);
            }}
            className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-10 flex flex-col items-center justify-center text-slate-400 hover:border-accent hover:text-accent transition-all group"
          >
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <p className="font-black uppercase tracking-widest text-xs">Yeni Adres Ekle</p>
          </button>
        </div>
      </div>

      <AddressModal 
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </ProfileLayout>
  );
}
