import React from 'react';
import { CreditCard, Landmark, FileText, ShieldCheck, AlertCircle } from 'lucide-react';
import SupportFaqPage, { FaqGroup } from '../../components/SupportFaqPage';

const groups: FaqGroup[] = [
  {
    title: 'Ödeme Yöntemleri',
    icon: CreditCard,
    items: [
      {
        question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        answer: 'KitapN\'de kredi kartı (Visa, Mastercard, AmEx), banka kartı, havale/EFT ve kapıda ödeme (nakit veya kartlı) seçenekleri mevcuttur. Ödeme tamamlanmadan sipariş kesinleşmez.',
      },
      {
        question: 'Kapıda ödeme seçeneği var mı?',
        answer: 'Evet, kapıda ödeme seçeneğimiz mevcuttur. Nakit veya banka/kredi kartıyla ödeme yapabilirsiniz. Kapıda ödeme için ek 5 TL hizmet bedeli uygulanmaktadır.',
      },
    ],
  },
  {
    title: 'Taksit Seçenekleri',
    icon: Landmark,
    items: [
      {
        question: 'Taksitle alışveriş yapabilir miyim?',
        answer: 'Evet, anlaşmalı bankalarımızın kredi kartlarıyla 3, 6, 9 veya 12 taksit seçeneği kullanabilirsiniz. Taksit seçenekleri ödeme sayfasında kartınıza ve sipariş tutarına göre otomatik listelenir.',
      },
      {
        question: 'Taksit faizi var mı?',
        answer: 'KitapN\'in uyguladığı faizsiz taksit kampanyaları mevcuttur. Faizsiz taksit seçenekleri belirli kampanya dönemlerinde aktif olur. Banka tarafından uygulanan faizler için bankanızla iletişime geçebilirsiniz.',
      },
    ],
  },
  {
    title: 'Fatura & Belge',
    icon: FileText,
    items: [
      {
        question: 'Faturamı nasıl alabilirim?',
        answer: 'Sipariş teslim edildikten sonra faturanız e-posta adresinize PDF olarak gönderilir. Ayrıca "Siparişlerim" sayfasından ilgili siparişin detaylarına girerek "Faturayı İndir" seçeneğiyle indirebilirsiniz.',
      },
      {
        question: 'Kurumsal fatura alabilir miyim?',
        answer: 'Evet, kurumsal fatura (e-fatura) talebi oluşturabilirsiniz. Sipariş esnasında fatura bilgileri bölümünde vergi numaranızı ve şirket bilgilerinizi girmeniz yeterlidir.',
      },
    ],
  },
  {
    title: 'Kart Güvenliği',
    icon: ShieldCheck,
    items: [
      {
        question: 'Kart bilgilerimi kaydedebilir miyim?',
        answer: 'Evet, ödeme sayfasında "Kartımı Kaydet" seçeneğiyle kart bilgilerinizi güvenle saklayabilirsiniz. Kart bilgileri PCI-DSS sertifikalı altyapı üzerinde şifreli olarak saklanır; kart numarasına KitapN erişemez.',
      },
      {
        question: 'Kayıtlı kartımı silebilir miyim?',
        answer: '"Hesabım" > "Ödeme Yöntemlerim" bölümünden kayıtlı kartlarınızı görüntüleyebilir ve silebilirsiniz.',
      },
    ],
  },
  {
    title: 'Ödeme Sorunları',
    icon: AlertCircle,
    items: [
      {
        question: 'Ödeme neden başarısız oldu?',
        answer: 'Başarısız ödemelerin yaygın nedenleri: yanlış kart bilgisi, yetersiz bakiye, bankanın 3D Secure doğrulamasının tamamlanmaması veya internet bağlantısı sorunu. Farklı bir kart veya ödeme yöntemi deneyebilirsiniz.',
      },
      {
        question: 'Param çekildi ama sipariş oluşmadı, ne yapmalıyım?',
        answer: 'Bu durumda para gerçek anlamda çekilmemiş, bloke edilmiş olabilir. Banka blokesi genellikle 3-7 iş günü içinde otomatik kaldırılır. Sorunun devam etmesi halinde destek ekibimizle iletişime geçin.',
      },
    ],
  },
];

export default function SupportPaymentPage() {
  return (
    <SupportFaqPage
      categoryId="payment"
      categoryTitle="Ödeme & Fatura"
      categoryDescription="Ödeme yöntemleri, taksit seçenekleri, fatura talepleri ve kart güvenliği."
      icon={CreditCard}
      groups={groups}
    />
  );
}
