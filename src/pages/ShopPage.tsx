import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CulturalCategory, Gender } from '../types';

interface ShopPageProps {
  genderTarget?: Gender | 'all';
}

export const ShopPage: React.FC<ShopPageProps> = ({ genderTarget = 'all' }) => {
  const {
    products,
    selectedCategoryFilter,
    selectedCultureFilter,
    formatPrice,
    navigateTo
  } = useShop();

  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>(genderTarget);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter || 'all');
  const [activeCulture, setActiveCulture] = useState<CulturalCategory | 'all'>(selectedCultureFilter || 'all');
  const [priceMax, setPriceMax] = useState<number>(150000);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync prop changes
  useEffect(() => {
    setSelectedGender(genderTarget);
  }, [genderTarget]);

  useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  useEffect(() => {
    if (selectedCultureFilter) {
      setActiveCulture(selectedCultureFilter);
    }
  }, [selectedCultureFilter]);

  // Available subcategories based on gender
  const availableCategories = useMemo(() => {
    const list = products
      .filter((p) => selectedGender === 'all' || p.gender === selectedGender || p.gender === 'unisex')
      .map((p) => p.category);
    return Array.from(new Set(list));
  }, [products, selectedGender]);

  // Available sizes
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size', 'Unstitched'];

  // Available cultures
  const availableCultures: CulturalCategory[] = [
    'Indian Heritage',
    'Middle Eastern Elegance',
    'European Contemporary',
    'African Expressions',
    'East Asian Aesthetics',
    'International Streetwear'
  ];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Gender check
      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
        return false;
      }
      // Category check
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Culture check
      if (activeCulture !== 'all' && p.culturalCategory !== activeCulture) {
        return false;
      }
      // Price check
      if (p.priceINR > priceMax) {
        return false;
      }
      // Size check
      if (selectedSize !== 'all') {
        const matchesSize = p.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase()));
        if (!matchesSize) return false;
      }
      // Color check
      if (selectedColor !== 'all') {
        const matchesColor = p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!matchesColor) return false;
      }
      // Stock check
      if (inStockOnly && p.stockCount <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [
    products,
    selectedGender,
    activeCategory,
    activeCulture,
    priceMax,
    selectedSize,
    selectedColor,
    inStockOnly,
    sortBy
  ]);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveCulture('all');
    setPriceMax(150000);
    setSelectedSize('all');
    setSelectedColor('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeFiltersCount = 
    (activeCategory !== 'all' ? 1 : 0) +
    (activeCulture !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceMax < 150000 ? 1 : 0);

  // Dynamic editorial banner text
  const bannerTitle =
    selectedGender === 'women'
      ? "Women's Haute Couture & Prêt"
      : selectedGender === 'men'
      ? "Men's Sartorial & Festive Collection"
      : "A World of Style — Global Archive";

  const bannerDescription =
    selectedGender === 'women'
      ? "Heirloom Banarasi silk sarees, bridal zardozi lehengas, French crepe abayas, Moroccan sfifa kaftans, and architectural evening gowns."
      : selectedGender === 'men'
      ? "Raw Matka silk sherwanis, Tussar silk kurta sets, Super 150s double-breasted suits, Emirati thobes, and Japanese streetwear."
      : "Celebrating textile diversity, generational craft, and contemporary cuts across India, the Middle East, Europe, Africa, and East Asia.";

  return (
    <div className="bg-[#F4F0E8] text-[#171717] min-h-screen">
      {/* Editorial Banner */}
      <div className="bg-[#171717] text-[#FFFFFF] py-14 sm:py-20 px-6 sm:px-12 border-b border-[#8B8176]/30">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold">
              <span>Tara by Mabroor</span>
              <span>/</span>
              <span>{selectedGender.toUpperCase()}</span>
              {activeCulture !== 'all' && (
                <>
                  <span>/</span>
                  <span>{activeCulture}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              {bannerTitle}
            </h1>

            <p className="text-xs sm:text-sm text-[#8B8176] font-light leading-relaxed max-w-xl">
              {bannerDescription}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs tracking-widest text-[#B49A78] font-mono">
            <span>{filteredProducts.length} ATELIER GARMENTS DISPLAYED</span>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 py-10">
        {/* Top Control Bar: Category pills, Sort and Mobile Filter Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#8B8176]/20 gap-4">
          {/* Category Horizontal Quick Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition flex-shrink-0 font-medium ${
                activeCategory === 'all'
                  ? 'bg-[#171717] text-[#FFFFFF] border-[#171717]'
                  : 'bg-[#FFFFFF] text-[#171717] border-[#8B8176]/30 hover:border-[#171717]'
              }`}
            >
              All Categories
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition flex-shrink-0 font-medium ${
                  activeCategory === cat
                    ? 'bg-[#171717] text-[#FFFFFF] border-[#171717]'
                    : 'bg-[#FFFFFF] text-[#171717] border-[#8B8176]/30 hover:border-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls Right */}
          <div className="flex items-center space-x-4 self-end lg:self-auto">
            {/* Mobile Filter toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center space-x-2 border border-[#171717] bg-[#FFFFFF] px-4 py-2 text-xs uppercase tracking-wider font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#8B8176] uppercase tracking-wider text-[10px] font-semibold hidden sm:inline">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFFFF] border border-[#8B8176]/40 px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#171717]"
              >
                <option value="featured">Atelier Curated (Featured)</option>
                <option value="newest">Newest Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-4 border-b border-[#8B8176]/15 text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#8B8176] font-semibold mr-1">
              Active Filters:
            </span>
            {activeCulture !== 'all' && (
              <span className="bg-[#FFFFFF] border border-[#171717] px-2.5 py-1 flex items-center space-x-1.5 text-[11px]">
                <span>Culture: {activeCulture}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveCulture('all')} />
              </span>
            )}
            {activeCategory !== 'all' && (
              <span className="bg-[#FFFFFF] border border-[#171717] px-2.5 py-1 flex items-center space-x-1.5 text-[11px]">
                <span>Category: {activeCategory}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveCategory('all')} />
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="bg-[#FFFFFF] border border-[#171717] px-2.5 py-1 flex items-center space-x-1.5 text-[11px]">
                <span>Size: {selectedSize}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSize('all')} />
              </span>
            )}
            {selectedColor !== 'all' && (
              <span className="bg-[#FFFFFF] border border-[#171717] px-2.5 py-1 flex items-center space-x-1.5 text-[11px]">
                <span>Color: {selectedColor}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedColor('all')} />
              </span>
            )}
            {priceMax < 150000 && (
              <span className="bg-[#FFFFFF] border border-[#171717] px-2.5 py-1 flex items-center space-x-1.5 text-[11px]">
                <span>Under {formatPrice(priceMax)}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceMax(150000)} />
              </span>
            )}
            {inStockOnly && (
              <span className="bg-[#FFFFFF] border border-[#171717] px-2.5 py-1 flex items-center space-x-1.5 text-[11px]">
                <span>In Stock Only</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-[10px] uppercase tracking-wider text-[#B49A78] hover:text-[#171717] underline ml-2 font-bold"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Content Body: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 pt-8">
          {/* Desktop Sidebar Filters */}
          <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} space-y-8 bg-[#FFFFFF] lg:bg-transparent p-6 lg:p-0 border lg:border-none border-[#8B8176]/20`}>
            {/* Cultural Tradition Filter */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171717] pb-2 border-b border-[#8B8176]/20 mb-3">
                Cultural Guild & Region
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="culture"
                    checked={activeCulture === 'all'}
                    onChange={() => setActiveCulture('all')}
                    className="accent-[#171717]"
                  />
                  <span className={activeCulture === 'all' ? 'font-bold text-[#171717]' : 'text-[#171717]/80'}>
                    All Global Guilds
                  </span>
                </label>
                {availableCultures.map((cult) => (
                  <label key={cult} className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="culture"
                      checked={activeCulture === cult}
                      onChange={() => setActiveCulture(cult)}
                      className="accent-[#171717]"
                    />
                    <span className={activeCulture === cult ? 'font-bold text-[#171717]' : 'text-[#171717]/80'}>
                      {cult}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-[#8B8176]/20 mb-3">
                <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171717]">
                  Maximum Price
                </h3>
                <span className="font-mono text-xs font-semibold text-[#171717]">
                  {formatPrice(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="5000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#171717] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8B8176] font-mono mt-1">
                <span>{formatPrice(10000)}</span>
                <span>{formatPrice(150000)}</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171717] pb-2 border-b border-[#8B8176]/20 mb-3">
                Size
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`py-1.5 px-2 text-[10px] font-medium border text-center transition ${
                    selectedSize === 'all'
                      ? 'bg-[#171717] text-[#FFFFFF] border-[#171717]'
                      : 'bg-[#FFFFFF] text-[#171717] border-[#8B8176]/30 hover:border-[#171717]'
                  }`}
                >
                  All
                </button>
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 px-2 text-[10px] font-medium border text-center transition ${
                      selectedSize === s
                        ? 'bg-[#171717] text-[#FFFFFF] border-[#171717]'
                        : 'bg-[#FFFFFF] text-[#171717] border-[#8B8176]/30 hover:border-[#171717]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#171717] pb-2 border-b border-[#8B8176]/20 mb-3">
                Shade Palette
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'All', hex: '' },
                  { name: 'Gold', hex: '#C5A059' },
                  { name: 'Ivory', hex: '#FAF7F0' },
                  { name: 'Black', hex: '#111111' },
                  { name: 'Emerald', hex: '#0B4632' },
                  { name: 'Crimson', hex: '#8B1E2D' },
                  { name: 'Navy', hex: '#1B2433' }
                ].map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name === 'All' ? 'all' : col.name)}
                    className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border flex items-center space-x-1.5 transition ${
                      (selectedColor === 'all' && col.name === 'All') || selectedColor === col.name
                        ? 'border-[#171717] bg-[#171717] text-[#FFFFFF]'
                        : 'border-[#8B8176]/30 bg-[#FFFFFF] text-[#171717]'
                    }`}
                  >
                    {col.hex && (
                      <span className="w-2.5 h-2.5 inline-block border border-black/20" style={{ backgroundColor: col.hex }} />
                    )}
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-2">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#171717] w-4 h-4"
                />
                <span className="text-xs uppercase tracking-wider font-medium text-[#171717]">
                  Ready to Dispatch Only
                </span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-12 text-center my-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B8176] font-semibold block mb-2">
                  Catalog Filter Notice
                </span>
                <h3 className="font-serif text-2xl text-[#171717] mb-3">
                  No garments match your current selection criteria.
                </h3>
                <p className="text-xs text-[#8B8176] max-w-md mx-auto mb-6">
                  Try relaxing your price threshold, choosing another cultural guild, or clearing size selections.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#171717] text-[#F4F0E8] text-[10px] uppercase tracking-[0.25em] font-medium py-3 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
