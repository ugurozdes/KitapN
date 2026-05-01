import React from 'react';
import { Package, Search, RotateCcw, AlertCircle, Truck } from 'lucide-react';
import SupportFaqPage, { FaqGroup } from '../../components/SupportFaqPage';

const groups: FaqGroup[] = [
  {
    title: 'Sipariş Takibi',
    icon: Search,
    items: [
      {
        question: 'Siparişimin durumunu nasıl takip edebilirim?',
        answer: 'Hesabınıza giriş yaparak "Siparişlerim" sayfasına gidebilir, ilgili siparişin yanındaki "Detaylar" butonuna tıklayarak anlık durumu görebilirsiniz. Ayrıca sipariş onay e-postanızdaki takip bağlantısına tıklayarak kargo durumunu doğrudan takip edebilirsiniz.',
      },
      {
        question: 'Sipariş onay e-postası gelmedi, ne yapmalıyım?',
        answer: 'Sipariş onay e-postası genellikle birkaç dakika içinde ulaşır. Spam veya gereksiz posta klasörünüzü kontrol edin. E-posta hâlâ gelmemişse hesabınızdaki e-posta adresinin doğru olduğundan emin olun veya destek ekibimizle iletişime geçin.',
      },
    ],
  },
  {
    title: 'Sipariş İptali',
    icon: RotateCcw,
    items: [
      {
        question: 'Siparişimi nasıl iptal edebilirim?',
        answer: 'Siparişiniz henüz kargoya verilmemişse "Siparişlerim" sayfasından "İptal Et" butonuna tıklayarak iptal talebinde bulunabilirsiniz. Kargoya verilmiş siparişler için destek ekibimizle iletişime geçmeniz gerekir.',
      },
      {
        question: 'İptal ettiğim siparişin ödemesi ne zaman iade edilir?',
        answer: 'İptal işlemi onaylandıktan sonra ödeme iadeniz 3-7 iş günü içinde kredi kartınıza veya banka hesabınıza yansır. Bankanıza göre bu süre farklılık gösterebilir.',
      },
      {
        question: 'Kargodaki siparişimi iptal edebilir miyim?',
        answer: 'Kargoya verilmiş siparişleri doğrudan iptal etmek mümkün değildir. Ancak teslimatı reddederek kargo görevlisine iade edebilirsiniz. Ürün depomuzda ulaştıktan sonra iade süreciniz başlatılır.',
      },
    ],
  },
  {
    title: 'Sipariş Değişikliği',
    icon: Package,
    items: [
      {
        question: 'Adres, ürün ya da adet değişikliği yapabilir miyim?',
        answer: 'Sipariş, "Hazırlanıyor" aşamasında iken bazı değişiklikler yapılabilir. Siparişiniz kargoya verilmeden destek ekibimizle iletişime geçerek talebinizi iletebilirsiniz. Kargoya verilen siparişlerde değişiklik yapılamamaktadır.',
      },
    ],
  },
  {
    title: 'Teslimat Sorunları',
    icon: AlertCircle,
    items: [
      {
        question: 'Siparişim teslim edildi ama ben almadım, ne yapmalıyım?',
        answer: 'Kargo görevlisi kapıda sizi bulamazsa ürünü komşunuza teslim edebilir ya da posta kutusuna not bırakabilir. Kargo şirketinin takip sayfasından teslim bilgilerini kontrol edin. Sorun devam ediyorsa lütfen destek ekibimizle iletişime geçin.',
      },
      {
        question: 'Siparişim farklı kolilerde mi gönderilecek?',
        answer: 'Birden fazla ürün içeren siparişlerde ürünler stok durumu ve kargo kapasitesi nedeniyle ayrı kolilerde gönderilebilir. Her koli için ayrı takip numarası size e-posta ile iletilir.',
      },
      {
        question: 'Hasarlı ürün teslim aldım, ne yapmalıyım?',
        answer: 'Hasarlı ürünü teslim alırken kargo tutanağı tutturmanızı tavsiye ederiz. Ürünü kabul etmeyebilir ya da tutanak tutarak iade başlatabilirsiniz. Destek ekibimizle fotoğraf göndererek de talebinizi iletebilirsiniz.',
      },
    ],
  },
];

export default function SupportOrdersPage() {
  return (
    <SupportFaqPage
      categoryId="orders"
      categoryTitle="Siparişler"
      categoryDescription="Sipariş takibi, iptal, değişiklik ve teslimat sorunlarına dair tüm sorularınız."
      icon={Package}
      groups={groups}
    />
  );
}
