import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  LayoutDashboard,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Panel', path: '/profile' },
    { icon: Package, label: 'Siparişlerim', path: '/profile/orders' },
    { icon: RotateCcw, label: 'İade ve İptaller', path: '/profile/returns' },
    { icon: Heart, label: 'Favorilerim', path: '/favorites' },
    { icon: MapPin, label: 'Adreslerim', path: '/profile/addresses' },
    { icon: User, label: 'Hesap Bilgileri', path: '/profile/info' },
    { icon: HelpCircle, label: 'Yardım & Destek', path: '/support' },
  ];

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-accent/20">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-black text-primary dark:text-white tracking-tight">{user.name}</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Üye</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                        isActive 
                          ? "bg-accent text-white shadow-lg shadow-accent/20" 
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-accent")} />
                        <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
                      </div>
                      <ChevronRight className={cn("w-4 h-4 transition-transform", isActive ? "rotate-90" : "group-hover:translate-x-1")} />
                    </Link>
                  );
                })}
                
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 group"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-black text-sm uppercase tracking-widest">Çıkış Yap</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
