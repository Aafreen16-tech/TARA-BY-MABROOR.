/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F0E8] text-[#171717] selection:bg-[#B49A78] selection:text-[#171717]">
      <Header />

      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'women' && <ShopPage genderTarget="women" />}
        {activePage === 'men' && <ShopPage genderTarget="men" />}
        {activePage === 'collections' && <ShopPage genderTarget="all" />}
        {activePage === 'story' && <OurStoryPage />}
        {activePage === 'product' && <ProductDetailPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'account' && <AccountPage />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Floating Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
