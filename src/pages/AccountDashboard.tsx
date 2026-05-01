import React from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  MapPin, 
  Heart, 
  Settings, 
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoriteContext';
import { useCart } from '../context/CartContext';
import { useAddresses } from '../context/AddressContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate, Link } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import PageNav from '../components/PageNav';

export default function AccountDashboard() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { addresses } = useAddresses();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const stats = [
    { label: 'Siparişlerim', value: orders.length.toString(), icon: Package, color: 'bg-blue-500', path: '/profile/orders' },
    { label: 'Favorilerim', value: favorites.length.toString(), icon: Heart, color: 'bg-red-500', path: '/favorites' },
    { label: 'Adreslerim', value: addresses.length.toString(), icon: MapPin, color: 'bg-emerald-500', path: '/profile/addresses' },
    { label: 'Puanlarım', value: '120', icon: TrendingUp, color: 'bg-accent', path: '/profile' },
  ];

  const recentOrders = orders.slice(0, 2).map(order => ({
    id: order.id,
    date: order.date,
    total: order.total,
    status: order.status,
    statusColor: order.statusType === 'delivered' ? 'text-emerald-500 bg-emerald-50' : 
                 order.statusType === 'cancelled' ? 'text-red-500 bg-red-50' : 
                 'text-blue-500 bg-blue-50'
  }));

  return (
    <ProfileLayout>
      <div className="space-y-12">
        <PageNav crumbs={[{ label: 'Hesabım' }]} backHref="/" />
        {/* Welcome Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Merhaba, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Hesabınızdaki son gelişmelere ve siparişlerinize göz atın.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Son Giriş: Bugün, 14:20
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.path)}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group"
            >
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-primary dark:text-white tracking-tighter mb-1">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight">Son Siparişlerim</h2>
              <Link to="/profile/orders" className="text-xs font-black text-accent uppercase tracking-widest hover:underline">Tümünü Gör</Link>
            </div>
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-accent/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-primary dark:text-white text-sm">{order.id}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-primary dark:text-white">{order.total} TL</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mt-2 ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Info */}
          <div className="space-y-8">
            <div className="bg-accent text-white rounded-[2.5rem] p-10 shadow-2xl shadow-accent/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Güvenli Alışveriş</h3>
                <p className="text-white/80 font-medium mb-8">Tüm siparişleriniz Kitapn güvencesi altındadır. 14 gün içinde ücretsiz iade hakkınız bulunmaktadır.</p>
                <button className="bg-white text-accent px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all active:scale-95">
                  Detaylı Bilgi
                </button>
              </div>
            </div>

            <div className="bg-primary dark:bg-slate-800 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20 relative overflow-hidden group">
               <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Hızlı Teslimat</h3>
                <p className="text-white/60 font-medium">Seçili kitaplarda yarın kapında fırsatını kaçırmayın.</p>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
