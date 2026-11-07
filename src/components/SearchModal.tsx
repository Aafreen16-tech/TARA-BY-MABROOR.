import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    openProductDetail,
    formatPrice
  } = useShop();

  const [query, setQuery] = useState('');

  const trendingTags = [
    'Banarasi Silk Saree',
    'Royal Sherwani',
    'French Crepe Abaya',
    'Cashmere Blazer',
    'Moroccan Kaftan',
    'Lagos Agbada',
    'Double-Breasted Suit',
    'Kyoto Haori'
  ];

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.culturalCategory.toLowerCase().includes(q) ||
        p.fabricTag.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFFFFF] animate-in fade-in duration-200 text-[#171717]">
      <div className="max-w-[1200px] mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-8 border-b border-[#8B8176]/20">
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-[#171717]" />
            <span className="font-serif text-lg tracking-wider uppercase text-[#171717]">
              Search Global Archives
            </span>
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 border border-[#171717]/20 hover:border-[#171717] transition"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Search Input */}
        <div className="py-10 border-b border-[#8B8176]/20">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search by garment, weave, culture (e.g. Saree, Sherwani, Abaya, Cashmere)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full font-serif text-2xl sm:text-3xl md:text-4xl text-[#171717] placeholder:text-[#8B8176]/50 bg-transparent border-none focus:outline-none focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-[#8B8176] hover:text-[#171717]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Trending suggestions */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8B8176] font-semibold mr-2">
              Trending Searches:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 border border-[#8B8176]/30 bg-[#FDF9F1] hover:border-[#171717] hover:bg-[#FFFFFF] transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 py-10">
          {query.trim() === '' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#171717]">
              <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1]/50">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#B49A78] font-bold block mb-2">
                  Heritage Category
                </span>
                <h4 className="font-serif text-xl mb-2">Indian Handlooms</h4>
                <p className="text-xs text-[#8B8176] leading-relaxed">
                  Pure Katan Banarasi weaves, Kanchipuram mulberry silks, and royal bridal Lehengas.
                </p>
                <button
                  onClick={() => setQuery('Banarasi')}
                  className="mt-4 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 hover:text-[#B49A78]"
                >
                  Explore Sarees <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1]/50">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#B49A78] font-bold block mb-2">
                  Gulf & Maghreb
                </span>
                <h4 className="font-serif text-xl mb-2">Modest Architecture</h4>
                <p className="text-xs text-[#8B8176] leading-relaxed">
                  Bisht-inspired Abayas in French crepe, Moroccan sfifa kaftans, and pristine Emirati Kanduras.
                </p>
                <button
                  onClick={() => setQuery('Abaya')}
                  className="mt-4 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 hover:text-[#B49A78]"
                >
                  Explore Modest Wear <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1]/50">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#B49A78] font-bold block mb-2">
                  Sartorial Craft
                </span>
                <h4 className="font-serif text-xl mb-2">European & Street</h4>
                <p className="text-xs text-[#8B8176] leading-relaxed">
                  Super 150s double-breasted suits, double-faced cashmere blazers, and Japanese loopwheel terry.
                </p>
                <button
                  onClick={() => setQuery('Suit')}
                  className="mt-4 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 hover:text-[#B49A78]"
                >
                  Explore Tailoring <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B8176] block mb-2 font-semibold">
                No Results Found
              </span>
              <h3 className="font-serif text-2xl text-[#171717] mb-3">
                No garments found matching "{query}"
              </h3>
              <p className="text-xs text-[#8B8176] max-w-md mx-auto mb-6">
                Please refine your keywords or explore our curated regional archives from the main navigation.
              </p>
              <button
                onClick={() => setQuery('')}
                className="bg-[#171717] text-[#F4F0E8] text-[10px] uppercase tracking-[0.22em] px-6 py-3 hover:bg-[#B49A78] hover:text-[#171717] transition"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs uppercase tracking-widest text-[#8B8176]">
                  Found {searchResults.length} {searchResults.length === 1 ? 'Garment' : 'Garments'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openProductDetail(prod.id);
                    }}
                    className="group cursor-pointer border border-[#8B8176]/20 bg-[#FFFFFF] p-3 hover:border-[#171717] transition"
                  >
                    <div className="aspect-[3/4] bg-[#EAE5DC] overflow-hidden mb-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#B49A78] font-semibold block">
                      {prod.culturalCategory}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#171717] line-clamp-1 group-hover:text-[#B49A78] transition">
                      {prod.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#171717] mt-1 block">
                      {formatPrice(prod.priceINR)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
