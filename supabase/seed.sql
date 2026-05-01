-- Seed data for KitapN Marketplace

-- 1. Insert Categories
INSERT INTO categories (name, slug) VALUES
('Roman', 'roman'),
('Edebiyat', 'edebiyat'),
('Psikoloji', 'psikoloji'),
('Tarih', 'tarih'),
('Bilim', 'bilim'),
('Felsefe', 'felsefe');

-- 2. Insert Publishers
INSERT INTO publishers (name, logo_url, description) VALUES
('Can Yayınları', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=10&w=100', 'Türkiye''nin en köklü yayınevlerinden biri.'),
('İş Bankası Kültür Yayınları', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=10&w=100', 'Klasik eserlerin adresi.'),
('Metis Yayınları', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=10&w=100', 'Nitelikli edebiyat ve kuram kitapları.');

-- 3. Insert Books
INSERT INTO books (title, author, publisher_id, isbn, description, image_url) VALUES
('Tutunamayanlar', 'Oğuz Atay', (SELECT id FROM publishers WHERE name = 'İletişim Yayınları' OR name LIKE 'İletişim%' LIMIT 1), '9789754700114', 'Türk edebiyatının en önemli eserlerinden biri.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=800'),
('Suç ve Ceza', 'Fyodor Dostoyevski', (SELECT id FROM publishers WHERE name = 'İş Bankası Kültür Yayınları' LIMIT 1), '9789754589023', 'Dünya klasiği bir başyapıt.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=800'),
('Körlük', 'José Saramago', (SELECT id FROM publishers WHERE name = 'Can Yayınları' LIMIT 1), '9789750739170', 'İnsan doğasına dair sarsıcı bir roman.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=100&w=800');

-- Add Communication and fallback for the first book if Iletisim wasn't there
INSERT INTO publishers (name) SELECT 'İletişim Yayınları' WHERE NOT EXISTS (SELECT 1 FROM publishers WHERE name = 'İletişim Yayınları');
UPDATE books SET publisher_id = (SELECT id FROM publishers WHERE name = 'İletişim Yayınları' LIMIT 1) WHERE title = 'Tutunamayanlar';

-- 4. Associate Books with Categories
INSERT INTO book_categories (book_id, category_id)
SELECT b.id, c.id FROM books b, categories c WHERE b.title = 'Tutunamayanlar' AND c.name = 'Roman';
INSERT INTO book_categories (book_id, category_id)
SELECT b.id, c.id FROM books b, categories c WHERE b.title = 'Suç ve Ceza' AND c.name = 'Edebiyat';
INSERT INTO book_categories (book_id, category_id)
SELECT b.id, c.id FROM books b, categories c WHERE b.title = 'Körlük' AND c.name = 'Roman';

-- 5. Insert Sellers
INSERT INTO sellers (name, rating, logo_url) VALUES
('KitapN Resmi Satıcı', 4.9, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=10&w=100'),
('Sahaf Dünyası', 4.7, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=10&w=100'),
('Kitap Kurdu', 4.8, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=10&w=100');

-- 6. Insert Seller Books (Listings with Price and Stock)
INSERT INTO seller_books (seller_id, book_id, price, stock)
SELECT s.id, b.id, 120.00, 50 FROM sellers s, books b WHERE s.name = 'KitapN Resmi Satıcı' AND b.title = 'Tutunamayanlar';
INSERT INTO seller_books (seller_id, book_id, price, stock)
SELECT s.id, b.id, 95.00, 30 FROM sellers s, books b WHERE s.name = 'KitapN Resmi Satıcı' AND b.title = 'Suç ve Ceza';
INSERT INTO seller_books (seller_id, book_id, price, stock)
SELECT s.id, b.id, 110.00, 20 FROM sellers s, books b WHERE s.name = 'KitapN Resmi Satıcı' AND b.title = 'Körlük';

INSERT INTO seller_books (seller_id, book_id, price, stock)
SELECT s.id, b.id, 115.00, 10 FROM sellers s, books b WHERE s.name = 'Sahaf Dünyası' AND b.title = 'Tutunamayanlar';
INSERT INTO seller_books (seller_id, book_id, price, stock)
SELECT s.id, b.id, 90.00, 15 FROM sellers s, books b WHERE s.name = 'Sahaf Dünyası' AND b.title = 'Suç ve Ceza';
