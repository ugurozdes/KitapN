import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ChevronRight, Github, Chrome, ShieldCheck, UserPlus, LogIn, UserCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, continueAsGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'guest'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate(from, { replace: true });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      register(email, name);
      navigate(from, { replace: true });
    }
  };

  const handleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      continueAsGuest(email);
      navigate(from, { replace: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-background min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Branding & Info */}
        <div className="hidden lg:block space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl font-black text-primary dark:text-white tracking-tighter leading-tight">
              Kitapn Dünyasına <br /> <span className="text-accent">Hoş Geldin.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
              Milyonlarca kitap, binlerce yazar ve en iyi fiyatlar seni bekliyor.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-black text-primary dark:text-white mb-1 tracking-tight">Güvenli Alışveriş</p>
                <p className="text-sm text-slate-500 font-medium">Tüm ödemeleriniz 256-bit SSL ile korunur.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-black text-primary dark:text-white mb-1 tracking-tight">Kişiselleştirilmiş Deneyim</p>
                <p className="text-sm text-slate-500 font-medium">Sana özel öneriler ve indirimleri kaçırma.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-primary/5 border border-slate-100 dark:border-slate-800 space-y-12">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab('login')}
              className={cn(
                "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === 'login' ? "bg-white dark:bg-slate-700 text-accent shadow-xl" : "text-slate-400 hover:text-primary"
              )}
            >
              <LogIn className="w-4 h-4" /> Giriş
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={cn(
                "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === 'register' ? "bg-white dark:bg-slate-700 text-accent shadow-xl" : "text-slate-400 hover:text-primary"
              )}
            >
              <UserPlus className="w-4 h-4" /> Kayıt
            </button>
            <button 
              onClick={() => setActiveTab('guest')}
              className={cn(
                "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === 'guest' ? "bg-white dark:bg-slate-700 text-accent shadow-xl" : "text-slate-400 hover:text-primary"
              )}
            >
              <User className="w-4 h-4" /> Misafir
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-posta Adresi"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Şifre"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-2 border-slate-300 accent-accent" />
                    <span className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">Beni Hatırla</span>
                  </label>
                  <button type="button" className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Şifremi Unuttum</button>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
                >
                  Giriş Yap
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.form>
            )}

            {activeTab === 'register' && (
              <motion.form
                key="register"
                onSubmit={handleRegister}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ad Soyad"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-posta Adresi"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Şifre"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
                >
                  Kayıt Ol
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.form>
            )}

            {activeTab === 'guest' && (
              <motion.form
                key="guest"
                onSubmit={handleGuest}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-4">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-black tracking-tight">Üye Olmadan Devam Et</h3>
                  <p className="text-sm text-slate-500 font-medium">Siparişini üye olmadan hızlıca tamamlayabilirsin. Sipariş takibi için e-posta adresini kullanacağız.</p>
                </div>

                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta Adresi"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-accent/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-5 pl-16 pr-6 outline-none font-bold text-sm transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary dark:bg-white dark:text-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/20 dark:shadow-white/10 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
                >
                  Misafir Olarak Devam Et
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
