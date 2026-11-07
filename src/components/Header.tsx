import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Shield,
  Menu,
  X,
  ChevronDown,
  Globe
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES } from '../data/products';
import { CurrencyCode } from '../types';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
    isAdminAuthenticated
  } = useShop();

  const [activeMegaMenu, setActiveMegaMenu] = useState<'men' | 'women' | 'collections' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'men' | 'women' | 'collections' | 'story' | 'account' | 'admin') => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    navigateTo(page);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#171717]/10 transition-colors">
      {/* Announcement Bar */}
      <div className="bg-[#171717] text-[#F4F0E8] text-[10px] md:text-[11px] font-medium tracking-[0.22em] uppercase py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-4 text-[#B49A78]">
            <span>HAUTE COUTURE & READY-TO-WEAR</span>
            <span className="opacity-40">•</span>
            <span>WORLDWIDE COURIER EXPRESS</span>
          </div>

          <div className="mx-auto sm:mx-0 text-center tracking-[0.24em] font-semibold text-[#F4F0E8]">
            DISCOVER GLOBAL FASHION — STYLE WITHOUT LIMITS
          </div>

          <div className="hidden sm:flex items-center space-x-5">
            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center space-x-1.5 hover:text-[#B49A78] transition cursor-pointer"
                title="Change Currency"
              >
                <Globe className="w-3 h-3 text-[#B49A78]" />
                <span>{currency} ({CURRENCIES[currency].symbol.trim()})</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-44 bg-[#FFFFFF] text-[#171717] border border-[#171717]/20 shadow-2xl py-1 z-50 rounded-none text-left"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#8B8176] border-b border-[#171717]/10 font-bold">
                    Select Currency
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => {
                        setCurrency(cCode);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs tracking-wider flex items-center justify-between hover:bg-[#F4F0E8] transition ${
                        currency === cCode ? 'bg-[#F4F0E8] font-bold text-[#171717]' : 'text-[#171717]/80'
                      }`}
                    >
                      <span>{CURRENCIES[cCode].name}</span>
                      <span className="text-[#B49A78] font-mono text-[11px]">{CURRENCIES[cCode].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center space-x-1 text-[#B49A78] hover:text-[#F4F0E8] transition text-[10px]"
              title="Brand Owner Atelier Dashboard"
            >
              <Shield className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Admin Studio' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between relative">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-[#171717] hover:text-[#B49A78] transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-center lg:text-left select-none group"
        >
          <span className="block font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.18em] font-normal text-[#171717] uppercase transition-colors group-hover:text-[#B49A78]">
            TARA BY MABROOR
          </span>
          <span className="block text-[8px] sm:text-[9.5px] uppercase tracking-[0.38em] text-[#8B8176] font-medium -mt-0.5">
            Fashion Without Borders
          </span>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[11.5px] font-medium tracking-[0.22em] uppercase">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-2 transition relative ${
              activePage === 'home' ? 'text-[#171717] font-semibold' : 'text-[#171717]/70 hover:text-[#171717]'
            }`}
          >
            Home
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#171717]" />
            )}
          </button>

          {/* Men with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('men')}
          >
            <button
              onClick={() => handleNavClick('men')}
              className={`py-2 flex items-center space-x-1 transition ${
                activePage === 'men' ? 'text-[#171717] font-semibold' : 'text-[#171717]/70 hover:text-[#171717]'
              }`}
            >
              <span>Men</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
              {activePage === 'men' && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#171717]" />
              )}
            </button>
          </div>

          {/* Women with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('women')}
          >
            <button
              onClick={() => handleNavClick('women')}
              className={`py-2 flex items-center space-x-1 transition ${
                activePage === 'women' ? 'text-[#171717] font-semibold' : 'text-[#171717]/70 hover:text-[#171717]'
              }`}
            >
              <span>Women</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
              {activePage === 'women' && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#171717]" />
              )}
            </button>
          </div>

          <button
            onClick={() => {
              navigateTo('women', { category: 'Banarasi Sarees' });
            }}
            className="py-2 text-[#171717]/70 hover:text-[#171717] transition"
          >
            New Arrivals
          </button>

          {/* Collections with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('collections')}
          >
            <button
              onClick={() => handleNavClick('collections')}
              className={`py-2 flex items-center space-x-1 transition ${
                activePage === 'collections' ? 'text-[#171717] font-semibold' : 'text-[#171717]/70 hover:text-[#171717]'
              }`}
            >
              <span>Collections</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
              {activePage === 'collections' && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#171717]" />
              )}
            </button>
          </div>

          <button
            onClick={() => handleNavClick('story')}
            className={`py-2 transition relative ${
              activePage === 'story' ? 'text-[#171717] font-semibold' : 'text-[#171717]/70 hover:text-[#171717]'
            }`}
          >
            Our Story
            {activePage === 'story' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#171717]" />
            )}
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-[#171717]">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1 hover:text-[#B49A78] transition"
            aria-label="Search collections"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Account Profile */}
          <button
            onClick={() => handleNavClick('account')}
            className={`p-1 hover:text-[#B49A78] transition ${
              activePage === 'account' ? 'text-[#B49A78]' : ''
            }`}
            aria-label="Customer account portal"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('account')}
            className="p-1 hover:text-[#B49A78] transition relative"
            aria-label="Saved wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#171717] text-[#FFFFFF] text-[9px] w-4 h-4 flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1 hover:text-[#B49A78] transition relative group"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B49A78] text-[#171717] text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Render Active Mega Menu on Desktop */}
      {activeMegaMenu && (
        <MegaMenu
          type={activeMegaMenu}
          onClose={() => setActiveMegaMenu(null)}
        />
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#171717]/20 px-6 py-6 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex justify-between items-center pb-4 border-b border-[#8B8176]/20">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B8176] font-semibold">
              Select Destination
            </span>
            <div className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-[#B49A78]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-xs font-semibold uppercase tracking-wider text-[#171717] focus:outline-none"
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c].symbol.trim()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#171717]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 hover:text-[#B49A78] border-b border-[#171717]/5 flex justify-between items-center"
            >
              <span>Home</span>
              <span className="text-[10px] text-[#8B8176]">01</span>
            </button>

            <button
              onClick={() => handleNavClick('women')}
              className="text-left py-2 hover:text-[#B49A78] border-b border-[#171717]/5 flex justify-between items-center"
            >
              <span>Women's Collection (Sarees, Abayas, Gowns)</span>
              <span className="text-[10px] text-[#8B8176]">02</span>
            </button>

            <button
              onClick={() => handleNavClick('men')}
              className="text-left py-2 hover:text-[#B49A78] border-b border-[#171717]/5 flex justify-between items-center"
            >
              <span>Men's Collection (Sherwanis, Suits, Thobes)</span>
              <span className="text-[10px] text-[#8B8176]">03</span>
            </button>

            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 hover:text-[#B49A78] border-b border-[#171717]/5 flex justify-between items-center"
            >
              <span>Global Collections (A World of Style)</span>
              <span className="text-[10px] text-[#8B8176]">04</span>
            </button>

            <button
              onClick={() => handleNavClick('story')}
              className="text-left py-2 hover:text-[#B49A78] border-b border-[#171717]/5 flex justify-between items-center"
            >
              <span>Our Story & Philosophy</span>
              <span className="text-[10px] text-[#8B8176]">05</span>
            </button>

            <button
              onClick={() => handleNavClick('account')}
              className="text-left py-2 hover:text-[#B49A78] border-b border-[#171717]/5 flex justify-between items-center"
            >
              <span>Customer Account & Orders</span>
              <span className="text-[10px] text-[#8B8176]">06</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 text-[#B49A78] hover:text-[#171717] border-b border-[#171717]/5 flex justify-between items-center font-semibold"
            >
              <span>Brand Owner Admin Dashboard</span>
              <span className="text-[10px]">Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
