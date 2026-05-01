import React from 'react';
import { User, Lock, Bell, Mail, ShieldCheck } from 'lucide-react';
import SupportFaqPage, { FaqGroup } from '../../components/SupportFaqPage';

const groups: FaqGroup[] = [
  {
    title: 'Üyelik & Giriş',
    icon: User,
    items: [
      {
        question: 'Nasıl üye olabilirim?',
        answer: 'Sağ üstteki "Giriş Yap" butonuna tıklayarak "Kayıt Ol" formuna ulaşabilirsiniz. Ad, soyad, e-posta ve şifrenizi girerek birkaç saniyede üyelik oluşturabilirsiniz.',
      },
      {
        question: 'Üye olmadan alışveriş yapabilir miyim?',
        answer: 'Ürünleri inceleyebilir, arama yapabilir ve sepete ekleyebilirsiniz. Ancak sipariş tamamlamak için üyelik gerekmektedir. Üyelik ve alışveriş tamamen ücretsizdir.',
      },
      {
        question: 'Hesabıma giriş yapamıyorum, ne yapmalıyım?',
        answer: 'E-posta adresinizi ve şifrenizi doğru girdiğinizden emin olun. Caps Lock tuşunun kapalı olduğunu kontrol edin. Sorun devam ediyorsa "Şifremi Unuttum" seçeneğiyle yeni şifre oluşturabilirsiniz.',
      },
    ],
  },
  {
    title: 'Şifre İşlemleri',
    icon: Lock,
    items: [
      {
        question: 'Şifremi nasıl sıfırlayabilirim?',
        answer: 'Giriş sayfasındaki "Şifremi Unuttum" bağlantısına tıklayın, e-posta adresinizi girin. E-posta adresinize şifre sıfırlama bağlantısı gönderilecektir. Bağlantı 30 dakika geçerlidir.',
      },
      {
        question: 'Şifremi değiştirmek istiyorum, nasıl yapabilirim?',
        answer: '"Hesabım" > "Hesap Bilgileri" > "Şifre Değiştir" bölümünden mevcut şifrenizi ve yeni şifrenizi girerek değiştirebilirsiniz. Güçlü şifre için büyük-küçük harf ve rakam kombinasyonu önerilir.',
      },
    ],
  },
  {
    title: 'Hesap Güvenliği',
    icon: ShieldCheck,
    items: [
      {
        question: 'Hesabım güvende mi?',
        answer: 'KitapN, güvenli HTTPS bağlantısı ve şifreli veri saklama yöntemiyle verilerinizi korumaktadır. Şifrenizi kimseyle paylaşmayın ve ortak cihazlarda oturum açma seçeneğini kapatın.',
      },
      {
        question: 'Hesabımın ele geçirildiğini düşünüyorum, ne yapmalıyım?',
        answer: 'Hemen şifrenizi değiştirin ve farklı bir şifre belirleyin. Daha sonra destek ekibimizle iletişime geçerek hesabınızdaki şüpheli işlemleri bildirin. En kısa sürede gerekli güvenlik adımları atılır.',
      },
    ],
  },
  {
    title: 'Profil Güncelleme',
    icon: Bell,
    items: [
      {
        question: 'Adımı veya doğum tarihimi güncelleyebilir miyim?',
        answer: '"Hesabım" > "Hesap Bilgileri" sayfasından kişisel bilgilerinizi güncelleyebilirsiniz. Değişiklikleri kaydettikten sonra sayfa hemen güncellenir.',
      },
      {
        question: 'E-posta veya telefon numaramı nasıl değiştiririm?',
        answer: '"Hesap Bilgileri" sayfasından yeni e-posta veya telefon numaranızı girebilirsiniz. Güvenlik nedeniyle değişiklik doğrulama kodu ile onaylanır.',
      },
    ],
  },
  {
    title: 'Bildirim Tercihleri',
    icon: Mail,
    items: [
      {
        question: 'E-posta bülteninden nasıl çıkabilirim?',
        answer: 'Hesap Bilgileri sayfasındaki "İletişim Tercihleri" bölümünden e-posta bildirimlerini kapatabilirsiniz. Ya da gelen e-postanın altındaki "Abonelikten Çık" bağlantısını kullanabilirsiniz.',
      },
    ],
  },
];

export default function SupportAccountPage() {
  return (
    <SupportFaqPage
      categoryId="account"
      categoryTitle="Hesap İşlemleri"
      categoryDescription="Üyelik, şifre, güvenlik, profil ve bildirim tercihlerine dair tüm yardım konuları."
      icon={User}
      groups={groups}
    />
  );
}
