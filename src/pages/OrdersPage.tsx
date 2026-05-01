/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronRight, 
  ExternalLink,
  Truck,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import ProfileLayout from '../components/ProfileLayout';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useOrders } from '../context/OrderContext';
import PageNav from '../components/PageNav';

const statusConfig = {
  preparing: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  shipped: { icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  delivered: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10' }
};

export default function OrdersPage() {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || order.statusType === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ProfileLayout>
      <div className="space-y-12">
        <PageNav crumbs={[{ label: 'Hesabım', href: '/profile' }, { label: 'Siparişlerim' }]} />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Siparişlerim
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Tüm siparişlerinizin durumunu buradan takip edebilirsiniz.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Sipariş No ile Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none transition-all w-full md:w-64"
              />
            </div>
            <button className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-accent transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['all', 'preparing', 'shipped', 'delivered', 'cancelled'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                activeFilter === filter
                  ? "bg-primary dark:bg-white text-white dark:text-primary border-primary dark:border-white shadow-lg shadow-primary/20"
                  : "bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 hover:border-accent hover:text-accent"
              )}
            >
              {filter === 'all' ? 'Tüm Siparişler' : 
               filter === 'preparing' ? 'Hazırlanıyor' :
               filter === 'shipped' ? 'Kargoda' :
               filter === 'delivered' ? 'Teslim Edildi' : 'İptal Edildi'}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const config = statusConfig[order.statusType as keyof typeof statusConfig];
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                      <div className="flex items-center gap-6">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", config.bg)}>
                          <config.icon className={cn("w-7 h-7", config.color)} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-primary dark:text-white tracking-tight">{order.id}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{order.date}</span>
                            <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                            <span className={cn("text-[10px] font-black uppercase tracking-widest", config.color)}>{order.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right mr-4">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Toplam Tutar</p>
                          <p className="text-2xl font-black text-primary dark:text-white">{order.total} TL</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/profile/orders/${order.id}`)}
                          className="px-8 py-4 bg-slate-50 dark:bg-slate-800 text-primary dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all flex items-center gap-3"
                        >
                          Detaylar
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 relative group/item">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                            <ExternalLink className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6">
                  <Package className="w-10 h-10 text-slate-200 dark:text-slate-800" />
                </div>
                <h3 className="text-2xl font-black text-primary dark:text-white mb-2">Sipariş Bulunamadı</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Aradığınız kriterlere uygun bir siparişiniz bulunmamaktadır.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ProfileLayout>
  );
}
