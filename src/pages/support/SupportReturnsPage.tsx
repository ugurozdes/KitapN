import React from 'react';
import { RotateCcw, PackageCheck, Banknote, AlertCircle, RefreshCw } from 'lucide-react';
import SupportFaqPage, { FaqGroup } from '../../components/SupportFaqPage';

const groups: FaqGroup[] = [
  {
    title: 'İade Koşulları',
    icon: PackageCheck,
    items: [
      {
        question: 'Ürünü kaç günde iade edebilirim?',
        answer: 'Teslim aldığınız tarihten itibaren 14 gün içerisinde iade talebinde bulunabilirsiniz. İade talebinin yapılması için ürünün kullanılmamış, orijinal ambalajında ve tüm aksesuarlarıyla eksiksiz olması gerekmektedir.',
      },
      {
        question: 'Hangi ürünleri iade edemem?',
        answer: 'Kişisel hijyen ürünleri, indirimlerde özel olarak işaretlenen ürünler, dijital içerikler (e-kitap, kod vb.) ve özel sipariş üzerine üretilen ürünler iade kapsamı dışındadır.',
      },
      {
        question: 'Ambalajını açtığım kitabı iade edebilir miyim?',
        answer: 'Normal şartlar altında iade edilebilir. Ancak orijinal bandrollü veya folyosu açılmış özel edisyonlarda iade mümkün olmayabilir. Ürün sayfasındaki iade koşullarını mutlaka incelemenizi öneririz.',
      },
    ],
  },
  {
    title: 'İade Süreci',
    icon: RotateCcw,
    items: [
      {
        question: 'İade talebini nasıl oluştururum?',
        answer: '"Siparişlerim" > "Sipariş Detayı" > "İade & İptal Talebi" yolunu izleyerek ilgili ürün için iade talebinizi oluşturabilirsiniz. Talebiniz onaylandıktan sonra size kargo kodu/etiketi e-posta ile gönderilir.',
      },
      {
        question: 'İade kargosunu ben mi öderim?',
        answer: 'Hasarlı, hatalı veya anlaşmazlık durumlarında kargo ücreti KitapN tarafından karşılanır. Vazgeçme ve beğenmeme gibi müşteri kaynaklı iadelerde kargo ücreti müşteriye aittir.',
      },
      {
        question: 'İade ettiğim ürün depoya ulaştıktan sonra ne olur?',
        answer: 'Ürün depomuzda incelendikten ve iade uygunluğu onaylandıktan sonra ödeme iadeniz başlatılır. Bu süreç genellikle 1-3 iş günü sürer.',
      },
    ],
  },
  {
    title: 'Değişim',
    icon: RefreshCw,
    items: [
      {
        question: 'Ürün değişimi yapabilir miyim?',
        answer: 'Evet, farklı baskı, edition veya ürünle değişim yapabilirsiniz. "İade" talebi oluştururken talep türü olarak "Değişim" seçeneğini işaretlemeniz yeterlidir. Stok durumuna göre değişim gerçekleştirilir.',
      },
    ],
  },
  {
    title: 'Para İadesi',
    icon: Banknote,
    items: [
      {
        question: 'İade ettiğim ürünün parası ne zaman hesabıma geçer?',
        answer: 'İade onaylandıktan sonra kredi kartı ödemelerinde 3-10 iş günü, havale/EFT ödemelerinde ise 1-3 iş günü içinde paranız iade edilir. Bu süre bankanıza göre değişebilir.',
      },
      {
        question: 'Kısmi iade yapılabilir mi?',
        answer: 'Evet, birden fazla ürün içeren siparişlerde yalnızca belirli ürünleri iade edebilirsiniz. Her ürün için ayrı ayrı iade talebi oluşturmanız yeterlidir.',
      },
    ],
  },
  {
    title: 'Hasarlı & Hatalı Ürün',
    icon: AlertCircle,
    items: [
      {
        question: 'Hasarlı ürün geldi, ne yapmalıyım?',
        answer: 'Teslimat sırasında hasarı fark ederseniz kargo tutanağı tutturun ve ürünü kabul etmeyin. Teslimat sonrası fark ettiyseniz ürünün fotoğrafını çekerek destek ekibimize gönderin; sorunsuz iade veya değişim sağlanır.',
      },
      {
        question: 'Yanlış ürün gönderildi, ne yapmalıyım?',
        answer: 'Sipariş ettiğinizden farklı bir ürün gönderdilmişse destek ekibimizle iletişime geçin. Ücretsiz kargo ile ürünü geri gönderebilir; doğru ürünün yeniden gönderilmesini ya da tam iade talebinde bulunabilirsiniz.',
      },
    ],
  },
];

export default function SupportReturnsPage() {
  return (
    <SupportFaqPage
      categoryId="returns"
      categoryTitle="İade & Değişim"
      categoryDescription="İade süreçleri, değişim adımları, geri ödeme ve hasarlı ürün bildirimleri."
      icon={RotateCcw}
      groups={groups}
    />
  );
}
