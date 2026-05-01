import React from 'react';
import { HelpCircle, Package, Megaphone, Gift, BookOpen } from 'lucide-react';
import SupportFaqPage, { FaqGroup } from '../../components/SupportFaqPage';

const groups: FaqGroup[] = [
  {
    title: 'Ürün Bilgileri',
    icon: BookOpen,
    items: [
      {
        question: 'Aradığım kitabı bulamıyorum, ne yapabilirim?',
        answer: 'Arama çubuğuna kitabın adını, yazarı veya ISBN numarasını girerek arama yapabilirsiniz. Eğer hâlâ bulamazsanız destek ekibimize bildirin; arama kategorimize eklenmiş olabilir veya temin için girişimde bulunabiliriz.',
      },
      {
        question: 'Kitabın baskı kalitesi veya içeriği hakkında bilgi alabilir miyim?',
        answer: 'Her ürün sayfasında yayınevi, ISBN, baskı bilgisi ve sayfa sayısı gibi detaylar yer almaktadır. Ayrıca "İçine Bak" özelliğiyle kitabın bir bölümünü okuyabilirsiniz. Daha fazla bilgi için destek ekibimizle iletişime geçebilirsiniz.',
      },
    ],
  },
  {
    title: 'Stok & Temin',
    icon: Package,
    items: [
      {
        question: 'Stokta olmayan ürün için ne yapabilirim?',
        answer: 'Ürün sayfasındaki "Beni Haber Et" butonuna tıklayarak stok bildirimi için kayıt oluşturabilirsiniz. Ürün stoğa girdiğinde e-posta ile bilgilendirilirsiniz.',
      },
      {
        question: 'Ürün ne zaman tekrar stoka girecek?',
        answer: 'Stok tarihleri kesin olarak tahmin edilememektedir. Bazı ürünler yayınevinin ikinci baskı planına bağlı olarak uzun süre stok dışı kalabilir. "Beni Haber Et" ile takip etmenizi öneririz.',
      },
    ],
  },
  {
    title: 'Kampanya & İndirimler',
    icon: Megaphone,
    items: [
      {
        question: 'Güncel kampanyaları nasıl takip edebilirim?',
        answer: 'Kampanyalar sayfamızdan ve ana sayfa banner\'larından güncel fırsatları takip edebilirsiniz. Bültenimize abone olarak kampanyalardan ilk haberdar olan siz olabilirsiniz.',
      },
      {
        question: 'Kampanya fiyatları ne kadar sürer?',
        answer: 'Kampanya ve indirim süreleri her kampanya için ayrı belirlenir. Ürün sayfasında kampanya bitiş tarihi ve saati görüntülenir.',
      },
      {
        question: 'Bir ürün kampanyaya girmeden önce aldım, indirimden yararlanabilir miyim?',
        answer: 'Maalesef daha önce yapılan siparişlere kampanya indirimleri sonradan uygulanamaz. Aktif kampanyaları düzenli takip etmenizi öneririz.',
      },
    ],
  },
  {
    title: 'Hediye Kartları & Kuponlar',
    icon: Gift,
    items: [
      {
        question: 'Hediye kartı satın alabilir miyim?',
        answer: 'Evet, farklı tutarlarda KitapN Hediye Kartları satın alabilirsiniz. Hediye kartları e-posta ile dijital olarak gönderilir ve alıcı dilediği kitabı seçebilir.',
      },
      {
        question: 'İndirim kodu kullanabilir miyim?',
        answer: 'Ödeme sayfasında "İndirim Kodu" alanına kodunuzu girebilirsiniz. İndirim kodu yalnızca tek kullanımlık olabilir ve belirli ürün/kategori kısıtlamaları içerebilir.',
      },
      {
        question: 'İndirim kodum çalışmıyor, ne yapmalıyım?',
        answer: 'Kodun geçerlilik tarihini ve büyük/küçük harf duyarlılığını kontrol edin. Bir koda birden fazla alışverişte kullanım hakkı yoksa birden fazla kodu aynı anda kullanamazsınız. Sorun devam ederse destek ekibimizle iletişime geçin.',
      },
    ],
  },
  {
    title: 'Genel Alışveriş',
    icon: HelpCircle,
    items: [
      {
        question: 'KitapN\'de sattığı ürünler orijinal mi?',
        answer: 'Evet, KitapN\'de satışa sunulan tüm ürünler orijinal olup doğrudan yayınevleri ve lisanslı distribütörlerden temin edilmektedir. Bandrolsüz ya da korsan ürün satılmamaktadır.',
      },
      {
        question: 'Yayınevine veya yazara nasıl ulaşabilirim?',
        answer: 'Yayınevleri ile doğrudan iletişim kurulmak istenirse ilgili yayınevinin resmi web sitesi veya iletişim kanalları aracılığıyla ulaşılabilir. KitapN, yayınevleri adına iletişim sağlamamaktadır.',
      },
    ],
  },
];

export default function SupportGeneralPage() {
  return (
    <SupportFaqPage
      categoryId="general"
      categoryTitle="Genel Sorular"
      categoryDescription="Ürün bilgileri, stok durumu, kampanyalar, hediye kartları ve genel alışveriş konuları."
      icon={HelpCircle}
      groups={groups}
    />
  );
}
