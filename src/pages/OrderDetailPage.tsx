/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Truck, 
  ChevronLeft,
  Download,
  RotateCcw,
  HelpCircle,
  Clock,
  CheckCircle2,
  Store
} from 'lucide-react';
import ProfileLayout from '../components/ProfileLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { cn } from '../lib/utils';
import PageNav from '../components/PageNav';

const orderData = {
  id: 'ORD-2024-001',
  date: '24 Mart 2026',
  status: 'Hazırlanıyor',
  statusType: 'preparing',
  shippingAddress: {
    title: 'Ev Adresim',
    name: 'Can Özdemir',
    address: 'Barbaros Mah. Begonya Sok. No:7 D:12 Nida Kule Ataşehir/İstanbul',
    phone: '0532 000 00 00'
  },
  payment: {
    method: 'Kredi Kartı',
    card: '**** **** **** 4242',
    subtotal: '225.00',
    shipping: '20.00',
    total: '245.00'
  },
  timeline: [
    { status: 'Sipariş Alındı', date: '24 Mart, 14:20', completed: true },
    { status: 'Ödeme Onaylandı', date: '24 Mart, 14:22', completed: true },
    { status: 'Hazırlanıyor', date: '24 Mart, 16:45', completed: true },
    { status: 'Kargoya Verildi', date: '-', completed: false },
    { status: 'Teslim Edildi', date: '-', completed: false }
  ],
  items: [
    { 
      id: 101, 
      title: 'İnsanlığımı Yitirirken', 
      author: 'Osamu Dazai', 
      price: '85.00', 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=1200',
      seller: 'Kitapn Resmi Satıcı'
    },
    { 
      id: 102, 
      title: '1984', 
      author: 'George Orwell', 
      price: '95.00', 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=100&w=1200',
      seller: 'Can Yayınları'
    }
  ]
};

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(id || '');

  // Use the context order if found, else fallback to mock for now
  const displayData = order ? {
    ...orderData,
    id: order.id,
    date: order.date,
    status: order.status,
    statusType: order.statusType,
    items: order.items.map((item, i) => ({
      ...orderData.items[0], // fallback for fields not in OrderItem
      ...item,
      price: (parseFloat(order.total) / order.items.length).toFixed(2) // mock per item price
    })),
    payment: {
      ...orderData.payment,
      total: order.total
    }
  } : orderData;

  return (
    <ProfileLayout>
      <div className="space-y-12">
        <PageNav
          crumbs={[
            { label: 'Hesabım', href: '/profile' },
            { label: 'Siparişlerim', href: '/profile/orders' },
            { label: id || 'Detay' },
          ]}
        />
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter mb-4">
              Sipariş Detayı
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-lg font-black text-primary dark:text-white">{id}</span>
              <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{displayData.date}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-accent font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3">
              <Download className="w-4 h-4" />
              Faturayı İndir
            </button>
            <button className="px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl shadow-primary/20">
              Tekrar Sipariş Et
            </button>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {displayData.timeline.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                    step.completed 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                      : "bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-700"
                  )}>
                    {step.completed ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", step.completed ? "text-primary dark:text-white" : "text-slate-400")}>
                    {step.status}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">{step.date}</p>
                </div>
                {i < displayData.timeline.length - 1 && (
                  <div className={cn(
                    "hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[2px] transition-all duration-1000",
                    step.completed && displayData.timeline[i+1].completed ? "bg-emerald-500" : "bg-slate-100 dark:bg-slate-800"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
              <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight mb-8">Ürünler</h2>
              <div className="space-y-8">
                {displayData.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-50 dark:border-slate-800/50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-primary dark:text-white tracking-tight mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">{item.author}</p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Store className="w-3.5 h-3.5" />
                          Satıcı: <span className="text-accent">{item.seller}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Adet</p>
                        <p className="font-black text-primary dark:text-white">{item.quantity || 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Birim Fiyat</p>
                        <p className="text-xl font-black text-primary dark:text-white">{item.price} TL</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 px-8 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-red-500 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 group">
                <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-45" />
                İptal / İade Talebi
              </button>
              <button className="flex-1 px-8 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3">
                <HelpCircle className="w-5 h-5" />
                Destek Al
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-primary dark:text-white tracking-tight">Teslimat Adresi</h3>
              </div>
              <p className="text-sm font-black text-primary dark:text-white mb-2">{displayData.shippingAddress.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
                {displayData.shippingAddress.name}<br />
                {displayData.shippingAddress.address}
              </p>
              <p className="text-xs text-slate-400 font-bold">{displayData.shippingAddress.phone}</p>
            </div>

            {/* Payment Info */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-accent">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-primary dark:text-white tracking-tight">Ödeme Bilgileri</h3>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">Ödeme Yöntemi</span>
                  <span className="font-black text-primary dark:text-white">{displayData.payment.method}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">Kart</span>
                  <span className="font-black text-primary dark:text-white">{displayData.payment.card}</span>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">Ara Toplam</span>
                  <span className="font-black text-primary dark:text-white">{displayData.payment.subtotal} TL</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">Kargo</span>
                  <span className="font-black text-primary dark:text-white">{displayData.payment.shipping} TL</span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-lg font-black text-primary dark:text-white tracking-tight">Toplam</span>
                  <span className="text-2xl font-black text-accent">{displayData.payment.total} TL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
