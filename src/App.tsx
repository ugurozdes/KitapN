/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { AddressProvider } from './context/AddressContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import FavoritesPage from './pages/FavoritesPage';
import AccountDashboard from './pages/AccountDashboard';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AddressesPage from './pages/AddressesPage';
import AccountInfoPage from './pages/AccountInfoPage';
import SupportPage from './pages/SupportPage';
import ReturnsPage from './pages/ReturnsPage';
import SupportOrdersPage from './pages/support/SupportOrdersPage';
import SupportShippingPage from './pages/support/SupportShippingPage';
import SupportReturnsPage from './pages/support/SupportReturnsPage';
import SupportAccountPage from './pages/support/SupportAccountPage';
import SupportPaymentPage from './pages/support/SupportPaymentPage';
import SupportGeneralPage from './pages/support/SupportGeneralPage';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <AuthProvider>
      <FavoriteProvider>
        <OrderProvider>
          <AddressProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white flex flex-col">
                  {/* Progress Bar */}
                  <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
                    style={{ scaleX }}
                  />

                  <Navbar />
                  
                  <main className="flex-1 pb-16 md:pb-0">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/category/:id" element={<CategoryPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/profile" element={<AccountDashboard />} />
                        <Route path="/profile/orders" element={<OrdersPage />} />
                        <Route path="/profile/orders/:id" element={<OrderDetailPage />} />
                        <Route path="/profile/addresses" element={<AddressesPage />} />
                        <Route path="/profile/info" element={<AccountInfoPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/support/orders" element={<SupportOrdersPage />} />
                        <Route path="/support/shipping" element={<SupportShippingPage />} />
                        <Route path="/support/returns" element={<SupportReturnsPage />} />
                        <Route path="/support/account" element={<SupportAccountPage />} />
                        <Route path="/support/payment" element={<SupportPaymentPage />} />
                        <Route path="/support/general" element={<SupportGeneralPage />} />
                        <Route path="/profile/returns" element={<ReturnsPage />} />
                      </Routes>
                    </AnimatePresence>
                  </main>

                  <Footer />
                  <BottomNav />
                </div>
              </Router>
            </CartProvider>
          </AddressProvider>
        </OrderProvider>
      </FavoriteProvider>
    </AuthProvider>
  );
}
