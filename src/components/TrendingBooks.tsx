import React from 'react';
import BookSection from './BookSection';

const books = [
  {
    id: 1,
    title: "Gece Yarısı Kütüphanesi",
    author: "Matt Haig",
    price: "145.00",
    oldPrice: "190.00",
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=1200",
    badge: "En Çok Satan",
    sellers: 12,
    isFastShipping: true
  },
  {
    id: 2,
    title: "Atomik Alışkanlıklar",
    author: "James Clear",
    price: "210.00",
    oldPrice: "280.00",
    rating: 4.9,
    reviews: 3500,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=100&w=1200",
    badge: "Editörün Seçimi",
    sellers: 8,
    isFastShipping: true
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    price: "185.00",
    oldPrice: "220.00",
    rating: 4.7,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1543004218-ee141104638e?auto=format&fit=crop&q=100&w=1200",
    badge: "Yeni Sezon",
    sellers: 15,
    isFastShipping: false
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: "165.00",
    oldPrice: "210.00",
    rating: 4.9,
    reviews: 4200,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=100&w=1200",
    badge: "Yayınevinden",
    sellers: 5,
    isFastShipping: true
  },
  {
    id: 5,
    title: "Körlük",
    author: "Jose Saramago",
    price: "130.00",
    oldPrice: "175.00",
    rating: 4.6,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=100&w=1200",
    badge: "İndirim",
    sellers: 10,
    isFastShipping: false
  }
];

export default function TrendingBooks() {
  return (
    <BookSection 
      title="Trend Olanlar" 
      subtitle="Şu an herkes bu kitapları konuşuyor." 
      books={books} 
      darkBg 
    />
  );
}
