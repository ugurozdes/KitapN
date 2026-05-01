import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  ShieldCheck,
  Check,
  Save
} from 'lucide-react';
import ProfileLayout from '../components/ProfileLayout';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import PageNav from '../components/PageNav';

export default function AccountInfoPage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <ProfileLayout>
      <div className="space-y-12">
        <PageNav crumbs={[{ label: 'Hesabım', href: '/profile' }, { label: 'Hesap Bilgileri' }]} />
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Hesap Bilgileri
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Kişisel bilgilerinizi ve iletişim tercihlerinizi buradan güncelleyin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ad Soyad</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="text"
                      defaultValue={user?.name}
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">E-posta Adresi</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="email"
                      defaultValue={user?.email}
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Telefon Numarası</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Doğum Tarihi</label>
                  <div className="relative">
                    <Bell className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input 
                      type="date"
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 dark:border-slate-800/50">
                <h3 className="text-xl font-black text-primary dark:text-white tracking-tight mb-8">İletişim Tercihleri</h3>
                <div className="space-y-6">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="w-6 h-6 border-2 border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-accent peer-checked:border-accent transition-all" />
                      <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">Kampanya ve duyurulardan e-posta ile haberdar olmak istiyorum.</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-6 h-6 border-2 border-slate-200 dark:border-slate-700 rounded-lg peer-checked:bg-accent peer-checked:border-accent transition-all" />
                      <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-white transition-colors">SMS ile bilgilendirme almak istiyorum.</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 pt-10">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className={cn(
                    "px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl",
                    showSuccess 
                      ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                      : "bg-primary dark:bg-white text-white dark:text-primary shadow-primary/20"
                  )}
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : showSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Güncellendi
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Değişiklikleri Kaydet
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Security Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-accent">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-primary dark:text-white tracking-tight">Güvenlik</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                Şifrenizi düzenli aralıklarla değiştirmeniz hesabınızın güvenliği için önemlidir.
              </p>
              <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-primary dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
                Şifre Değiştir
              </button>
            </div>

            <div className="bg-emerald-500 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-2">Hesap Doğrulandı</h3>
                <p className="text-white/80 text-sm font-medium">E-posta adresiniz başarıyla doğrulandı.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
