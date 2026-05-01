import React from 'react';
import { Truck, Search, Clock, AlertCircle, Banknote } from 'lucide-react';
import SupportFaqPage, { FaqGroup } from '../../components/SupportFaqPage';

const groups: FaqGroup[] = [
  {
    title: 'Teslimat Süreleri',
    icon: Clock,
    items: [
      {
        question: 'Siparişim ne zaman kargoya verilir?',
        answer: 'Stokta bulunan ürünler genellikle aynı gün (saat 14:00\'e kadar verilen siparişler) veya ertesi iş günü kargoya verilir. Hafta sonu ve resmi tatillerde kargo kabul edilmeyebilir.',
      },
      {
        question: 'Siparişim ne zaman elime ulaşır?',
        answer: 'Kargo teslim süreleri bölgenize göre değişmektedir. İstanbul ve büyük şehirlerde 1-2 iş günü, diğer illerde 2-3 iş günü içinde teslimat gerçekleşmektedir. Uzak bölgeler için bu süre 4-5 iş gününe kadar uzayabilir.',
      },
      {
        question: 'Saat kaça kadar sipariş verirsem aynı gün kargoya gider?',
        answer: 'Hafta içi saat 14:00\'e kadar verilen siparişler genellikle aynı gün kargoya teslim edilir. Bu saatten sonra verilen siparişler ertesi iş günü kargoya gönderilir.',
      },
    ],
  },
  {
    title: 'Kargo Firmaları',
    icon: Truck,
    items: [
      {
        question: 'Hangi kargo firmaları ile çalışıyorsunuz?',
        answer: 'KitapN olarak; Yurtiçi Kargo, Aras Kargo ve PTT Kargo ile çalışmaktayız. Kargo şirketi tercihi stok durumuna ve bölgenize göre otomatik belirlenir.',
      },
      {
        question: 'Kargo firmasını kendim seçebilir miyim?',
        answer: 'Şu an için kargo firması seçimi otomatik yapılmaktadır. Özel kargo talepleriniz için sipariş notuna belirtebilir ya da destek ekibimizle iletişime geçebilirsiniz.',
      },
    ],
  },
  {
    title: 'Kargo Takibi',
    icon: Search,
    items: [
      {
        question: 'Kargomun takip numarasına nasıl ulaşırım?',
        answer: 'Siparişiniz kargoya verildiğinde, hesabınıza tanımlı e-posta adresine kargo takip numarası gönderilir. Ayrıca "Siparişlerim" sayfasından ilgili siparişin detaylarına girerek takip numarasına ulaşabilirsiniz.',
      },
      {
        question: 'Kargo takip sayfasında bilgi güncellenmiyor, normal mi?',
        answer: 'Kargo firmalarının takip sistemleri zaman zaman gecikmeli güncellenebilir. Kargoya verildikten sonra 4-6 saat içinde takip bilgilerinin güncellenmesi normaldir. 24 saat sonra hâlâ güncelleme yoksa destek ekibimizle iletişime geçin.',
      },
    ],
  },
  {
    title: 'Kargo Ücretleri',
    icon: Banknote,
    items: [
      {
        question: 'Kargo ücreti ne kadardır?',
        answer: 'KitapN üzerinden yapılan tüm siparişler için 150 TL ve üzeri alışverişlerde kargo ücretsizdir. 150 TL altındaki siparişlerde ise 29,90 TL standart kargo ücreti uygulanır.',
      },
      {
        question: 'Ücretsiz kargo kampanyası geçerli mi?',
        answer: 'Aktif kampanyalar ve ücretsiz kargo eşiği için kampanya sayfamızı inceleyebilirsiniz. Özel günlerde farklı kampanyalar düzenlenebilir.',
      },
    ],
  },
  {
    title: 'Gecikmeler ve Sorunlar',
    icon: AlertCircle,
    items: [
      {
        question: 'Kargo neden gecikmeli?',
        answer: 'Kargo gecikmeleri; yoğun dönemler (kampanya, bayram vb.), hava koşulları veya kargo firmasının yük kapasitesi nedeniyle yaşanabilir. Tahmini teslimat tarihinin 2 iş günü geçmesi halinde destek ekibimizle iletişime geçin.',
      },
      {
        question: 'Kargom kayboldu, ne yapmalıyım?',
        answer: 'Kargo takip bilgileri 5 iş günü boyunca güncellenmiyorsa veya ürünü almadığınız hâlde "Teslim Edildi" yazıyorsa, lütfen destek ekibimizle iletişime geçin. Kargo firması ile birlikte soruşturma başlatılır.',
      },
    ],
  },
];

export default function SupportShippingPage() {
  return (
    <SupportFaqPage
      categoryId="shipping"
      categoryTitle="Kargo & Teslimat"
      categoryDescription="Teslimat süreleri, kargo firmaları, takip ve ücretler hakkında tüm bilgiler."
      icon={Truck}
      groups={groups}
    />
  );
}
