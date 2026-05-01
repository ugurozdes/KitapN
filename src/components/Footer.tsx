import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-primary dark:bg-slate-950 text-white pt-24 pb-12 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center">
              <span className="text-3xl font-black tracking-tighter text-white">
                Kitap<span className="text-accent">N</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed text-lg">
              Türkiye'nin yeni nesil kitap pazaryeri. Yayınevinden doğrudan okura, en iyi fiyat ve güvenle.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button 
                  key={i} 
                  className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-accent hover:text-white transition-all duration-500 flex items-center justify-center text-slate-400 hover:scale-110 hover:-translate-y-1 border border-white/5 hover:border-accent/20 shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Kurumsal</h4>
            <ul className="space-y-5 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Yayınevi Başvurusu</a></li>
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Kariyer</a></li>
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">İletişim</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Yardım</h4>
            <ul className="space-y-5 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Kargo Takip</a></li>
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">İade Koşulları</a></li>
              <li><a href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Güvenli Alışveriş</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-black mb-8 tracking-tight">Bize Ulaşın</h4>
            <ul className="space-y-6 text-slate-400 font-bold">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="group-hover:text-white transition-colors">0850 123 45 67</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="group-hover:text-white transition-colors">destek@kitapn.com</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="group-hover:text-white transition-colors">Levent, İstanbul, TR</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-500 text-sm font-bold tracking-tight">
            © 2024 KitapN. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-8 px-8 py-4 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
