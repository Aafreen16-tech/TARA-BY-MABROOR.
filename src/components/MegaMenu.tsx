import React from 'react';
import { useShop } from '../context/ShopContext';
import { CulturalCategory } from '../types';

interface MegaMenuProps {
  type: 'men' | 'women' | 'collections';
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  const { navigateTo } = useShop();

  if (type === 'women') {
    return (
      <div 
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#171717]/15 shadow-xl transition-all duration-200 z-50 text-[#171717]"
      >
        <div className="max-w-[1500px] mx-auto px-8 py-10 grid grid-cols-5 gap-8">
          {/* Column 1: Indian Heritage */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B49A78] pb-3 border-b border-[#8B8176]/20 mb-4">
              Indian Heritage
            </h4>
            <ul className="space-y-2.5 text-xs text-[#171717]/80">
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Banarasi Sarees' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Banarasi Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Kanchipuram Sarees' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Kanchipuram Temple Silks
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Lehengas' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Bridal & Royal Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Kurtis' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Anarkalis & Designer Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Salwar Suits' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Awadh Angrakha & Salwars
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Middle Eastern Modesty */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B49A78] pb-3 border-b border-[#8B8176]/20 mb-4">
              Middle Eastern Modesty
            </h4>
            <ul className="space-y-2.5 text-xs text-[#171717]/80">
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Abayas' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  French Crepe & Nida Abayas
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Kaftans' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Moroccan Silk Velvet Kaftans
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { culture: 'Middle Eastern Elegance' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Embroidered Bisht Capes
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { culture: 'Middle Eastern Elegance' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Silk Chiffon Sheilas & Wraps
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: European & Global Fashion */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B49A78] pb-3 border-b border-[#8B8176]/20 mb-4">
              European & Global Couture
            </h4>
            <ul className="space-y-2.5 text-xs text-[#171717]/80">
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Dresses' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Bias-Cut Silk Crepe Gowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Blazers & Outerwear' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Double-Faced Cashmere Blazers
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'Kimonos & Silk Jackets' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Kyoto Chirimen Silk Haori
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('women', { category: 'African Print Ensembles' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Asante Kente Trench Gowns
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 & 5: Lookbook Highlights */}
          <div className="col-span-2 grid grid-cols-2 gap-4 border-l border-[#8B8176]/20 pl-6">
            <div 
              onClick={() => { navigateTo('women', { culture: 'Indian Heritage' }); onClose(); }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                  alt="Varanasi Loom"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#171717]/10 group-hover:bg-transparent transition" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B49A78] font-semibold">Couture Campaign</span>
              <p className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#B49A78] transition">
                Varanasi Kadwa Masterpieces
              </p>
            </div>

            <div 
              onClick={() => { navigateTo('women', { culture: 'Middle Eastern Elegance' }); onClose(); }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80"
                  alt="Modest Haute"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#171717]/10 group-hover:bg-transparent transition" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B49A78] font-semibold">Editorial</span>
              <p className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#B49A78] transition">
                The Dubai Modest Edit
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'men') {
    return (
      <div 
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#171717]/15 shadow-xl transition-all duration-200 z-50 text-[#171717]"
      >
        <div className="max-w-[1500px] mx-auto px-8 py-10 grid grid-cols-5 gap-8">
          {/* Column 1: Indian Festive Menswear */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B49A78] pb-3 border-b border-[#8B8176]/20 mb-4">
              Indian Heritage
            </h4>
            <ul className="space-y-2.5 text-xs text-[#171717]/80">
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Sherwanis' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Raw Silk & Zardozi Sherwanis
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Kurtas' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Tussar & Chanderi Kurta Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { culture: 'Indian Heritage' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Nehru Jackets & Bandhgalas
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Sherwanis' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Groom & Regal Celebration Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Middle Eastern & African */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B49A78] pb-3 border-b border-[#8B8176]/20 mb-4">
              Middle Eastern & African
            </h4>
            <ul className="space-y-2.5 text-xs text-[#171717]/80">
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Thobes & Kanduras' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Emirati Royal Kanduras
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Thobes & Kanduras' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Saudi High-Collar Thobes
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'African-Inspired' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Lagos Grand Agbada Robes
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'African-Inspired' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Egyptian Giza Cotton Tunics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: European Sartorial & Streetwear */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B49A78] pb-3 border-b border-[#8B8176]/20 mb-4">
              European & Streetwear
            </h4>
            <ul className="space-y-2.5 text-xs text-[#171717]/80">
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Suits' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Super 150s Double-Breasted Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Shirts' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Capri Washed Flax Linen Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Trousers' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  Double-Pleated Gurkha Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigateTo('men', { category: 'Streetwear' }); onClose(); }}
                  className="hover:text-[#171717] hover:underline underline-offset-4 transition"
                >
                  500 GSM Heavyweight Terry Hoodies
                </button>
              </li>
            </ul>
          </div>

          {/* Lookbook Highlights */}
          <div className="col-span-2 grid grid-cols-2 gap-4 border-l border-[#8B8176]/20 pl-6">
            <div 
              onClick={() => { navigateTo('men', { category: 'Sherwanis' }); onClose(); }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80"
                  alt="Sherwani"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B49A78] font-semibold">Festive Campaign</span>
              <p className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#B49A78] transition">
                The Royal Achkan Sherwani
              </p>
            </div>

            <div 
              onClick={() => { navigateTo('men', { category: 'Suits' }); onClose(); }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE5DC] mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80"
                  alt="Milano Suit"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B49A78] font-semibold">Sartoriale</span>
              <p className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#B49A78] transition">
                Milano Double-Breasted Cut
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Collections Mega Menu
  const cultures: { name: CulturalCategory; label: string; count: number }[] = [
    { name: 'Indian Heritage', label: 'Indian Heritage & Silks', count: 7 },
    { name: 'Middle Eastern Elegance', label: 'Middle Eastern & Gulf Modesty', count: 4 },
    { name: 'European Contemporary', label: 'European Sartorial Luxury', count: 5 },
    { name: 'African Expressions', label: 'African Geometric Couture', count: 2 },
    { name: 'East Asian Aesthetics', label: 'East Asian Zen Craft', count: 1 },
    { name: 'International Streetwear', label: 'International Streetwear', count: 2 },
  ];

  return (
    <div 
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#171717]/15 shadow-xl transition-all duration-200 z-50 text-[#171717]"
    >
      <div className="max-w-[1500px] mx-auto px-8 py-10">
        <div className="flex items-center justify-between pb-4 border-b border-[#8B8176]/20 mb-6">
          <div>
            <h3 className="font-serif text-xl tracking-tight text-[#171717]">A World of Style</h3>
            <p className="text-xs text-[#8B8176] tracking-wide mt-0.5">Explore six distinct cultural design traditions woven under one roof.</p>
          </div>
          <button
            onClick={() => { navigateTo('collections', { culture: 'all' }); onClose(); }}
            className="text-[10px] uppercase font-semibold tracking-[0.22em] text-[#171717] hover:text-[#B49A78] underline underline-offset-4 transition"
          >
            View All Global Editions →
          </button>
        </div>

        <div className="grid grid-cols-6 gap-5">
          {cultures.map((c) => (
            <div
              key={c.name}
              onClick={() => { navigateTo('collections', { culture: c.name }); onClose(); }}
              className="group cursor-pointer border border-[#8B8176]/20 p-4 hover:border-[#171717] transition-colors bg-[#FDF9F1]/50"
            >
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#B49A78] font-medium block mb-1">
                Curated Guild
              </span>
              <h4 className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#B49A78] transition">
                {c.name}
              </h4>
              <p className="text-[11px] text-[#8B8176] mt-2 line-clamp-2">
                {c.label}
              </p>
              <div className="mt-4 pt-3 border-t border-[#8B8176]/15 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#171717]/70 font-medium">
                <span>{c.count} Garments</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
