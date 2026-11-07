import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  MapPin,
  Ruler,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    addToast
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<'details' | 'care' | 'artisan' | null>('details');

  // PIN Code Delivery checker
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [checkingPin, setCheckingPin] = useState(false);

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length < 3) {
      addToast('Please enter a valid postal code or PIN', 'info');
      return;
    }
    setCheckingPin(true);
    setTimeout(() => {
      setCheckingPin(false);
      const days = pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('50') ? 2 : 4;
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + days);
      const formatted = targetDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setDeliveryEstimate(`Express Courier Delivery by ${formatted} (Complimentary Insurance)`);
    }, 600);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    addToast('Review submitted for verification by the Atelier Concierge.', 'success');
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.gender === product.gender || p.culturalCategory === product.culturalCategory))
    .slice(0, 4);

  return (
    <div className="bg-[#F4F0E8] text-[#171717] min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 py-4 text-[10.5px] uppercase tracking-[0.24em] text-[#8B8176] flex items-center space-x-2 border-b border-[#8B8176]/20">
        <button onClick={() => navigateTo('home')} className="hover:text-[#171717]">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo(product.gender === 'men' ? 'men' : 'women')} className="hover:text-[#171717]">
          {product.gender.toUpperCase()}
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('collections', { culture: product.culturalCategory })} className="hover:text-[#171717]">
          {product.culturalCategory}
        </button>
        <span>/</span>
        <span className="text-[#171717] font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Gallery Spreads (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-[#EAE5DC] overflow-hidden border border-[#8B8176]/30">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110 cursor-crosshair"
              />

              {product.isLimitedEdition && (
                <div className="absolute top-4 left-4 bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.25em] px-3 py-1 font-semibold">
                  Atelier Limited Edition
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[3/4] bg-[#FFFFFF] border transition overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#171717] ring-1 ring-[#171717]'
                        : 'border-[#8B8176]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Specs & Purchase Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.28em] text-[#B49A78] font-bold mb-2">
                <span>{product.culturalCategory}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] leading-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-base text-[#8B8176] mt-2">
                {product.fabricTag}
              </p>

              {/* Price Block */}
              <div className="mt-4 flex items-baseline space-x-4 border-b border-[#8B8176]/20 pb-4">
                <span className="font-sans text-3xl font-semibold text-[#171717]">
                  {formatPrice(product.priceINR)}
                </span>
                {product.originalPriceINR && (
                  <span className="font-sans text-base text-[#8B8176] line-through">
                    {formatPrice(product.originalPriceINR)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold">
                  All Import Duties & Taxes Included
                </span>
              </div>
            </div>

            <p className="text-xs text-[#171717]/85 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-[0.2em] text-[#8B8176] text-[10px] font-bold">
                  Shade: <span className="text-[#171717]">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 p-0.5 border transition ${
                      selectedColor.name === c.name
                        ? 'border-[#171717] ring-1 ring-[#171717]'
                        : 'border-transparent'
                    }`}
                    title={c.name}
                  >
                    <span className="w-full h-full block border border-[#171717]/30" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-[0.2em] text-[#8B8176] text-[10px] font-bold">
                  Size: <span className="text-[#171717]">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] uppercase tracking-wider text-[#171717] hover:text-[#B49A78] underline flex items-center space-x-1"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Measurement Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 px-3 text-xs font-medium border text-center transition ${
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

            {/* Quantity Selector */}
            <div className="pt-2 flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B8176] font-bold">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-[#171717]/40 bg-[#FFFFFF]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#F4F0E8] text-[#171717]"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-medium text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#F4F0E8] text-[#171717]"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-[#8B8176]">
                ({product.stockCount} reserved pieces ready in archive)
              </span>
            </div>

            {/* Add to Bag and Buy Now */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                  className="flex-1 bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.24em] font-medium py-4 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Atelier Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 border flex items-center justify-center transition ${
                    isFavorited
                      ? 'border-[#171717] bg-[#171717] text-[#FFFFFF]'
                      : 'border-[#8B8176]/30 bg-[#FFFFFF] text-[#171717] hover:border-[#171717]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#B49A78] text-[#171717] text-[11px] uppercase tracking-[0.24em] font-bold py-3.5 px-6 hover:bg-[#171717] hover:text-[#FFFFFF] transition"
              >
                Instant Concierge Checkout
              </button>
            </div>

            {/* PIN Code / Delivery Estimator */}
            <div className="pt-4 border-t border-[#8B8176]/20">
              <label className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-bold block mb-2">
                Check Delivery & White-Glove Availability
              </label>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8176]" />
                  <input
                    type="text"
                    placeholder="Enter Postal Code (e.g. 500034, 110001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#8B8176]/40 pl-9 pr-3 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={checkingPin}
                  className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] font-semibold px-4 hover:bg-[#B49A78] hover:text-[#171717] transition disabled:opacity-50"
                >
                  {checkingPin ? 'Verifying...' : 'Check'}
                </button>
              </form>
              {deliveryEstimate && (
                <div className="mt-2.5 p-2.5 bg-[#FFFFFF] border border-[#B49A78]/50 flex items-center space-x-2 text-xs text-[#171717]">
                  <Truck className="w-4 h-4 text-[#B49A78] flex-shrink-0" />
                  <span>{deliveryEstimate}</span>
                </div>
              )}
            </div>

            {/* Luxury Editorial Accordions */}
            <div className="pt-4 border-t border-[#8B8176]/20 divide-y divide-[#8B8176]/20">
              {/* Accordion 1: Garment Dossier */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base font-medium text-[#171717] hover:text-[#B49A78] transition"
                >
                  <span>Garment Specifications & Provenance</span>
                  {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-4 text-xs text-[#171717]/85 space-y-2 animate-in fade-in">
                    <ul className="list-disc pl-5 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <p className="pt-2 text-[11px] text-[#8B8176] italic border-t border-[#8B8176]/10">
                      Crafted under strict fair-wage guild certifications.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base font-medium text-[#171717] hover:text-[#B49A78] transition"
                >
                  <span>Fabric Care & Archival Storage</span>
                  {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-[#171717]/85 space-y-2 animate-in fade-in">
                    <ul className="list-disc pl-5 space-y-1">
                      {product.fabricCare.map((fc, i) => (
                        <li key={i}>{fc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Artisan Guild Story */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'artisan' ? null : 'artisan')}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base font-medium text-[#171717] hover:text-[#B49A78] transition"
                >
                  <span>Atelier Guild Legacy</span>
                  {openAccordion === 'artisan' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'artisan' && (
                  <div className="pb-4 text-xs text-[#171717]/85 leading-relaxed animate-in fade-in">
                    <p>{product.artisanStory}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Customer Reviews & Verification */}
        <div className="mt-20 pt-12 border-t border-[#8B8176]/30">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#8B8176]/20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block mb-1">
                Patron Testimonials
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717]">
                Customer Reviews ({product.reviewCount || 34})
              </h3>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-[#B49A78]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-[#171717]">{product.rating.toFixed(2)} out of 5.0</span>
                <span className="text-xs text-[#8B8176]">• 100% Verified Patrons</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="mt-4 sm:mt-0 text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#171717] px-4 py-2 hover:bg-[#171717] hover:text-[#FFFFFF] transition"
            >
              {showReviewForm ? 'Cancel Review' : 'Write Patron Review'}
            </button>
          </div>

          {/* New Review Form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="bg-[#FFFFFF] p-6 border border-[#171717] mb-8 space-y-4 max-w-xl">
              <h4 className="font-serif text-lg text-[#171717]">Submit Your Atelier Review</h4>
              <div>
                <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                  Full Name & City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zara Qureshi, London"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs focus:outline-none focus:border-[#171717]"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                  Rating
                </label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs focus:outline-none"
                >
                  <option value={5}>5 Stars — Exquisite Masterpiece</option>
                  <option value={4}>4 Stars — Very Impressed</option>
                  <option value={3}>3 Stars — Satisfactory</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                  Garment Review & Draping Experience
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on texture, weight, sizing fit, and compliment reception..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs focus:outline-none focus:border-[#171717]"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] px-6 py-2.5 font-bold hover:bg-[#B49A78] hover:text-[#171717] transition"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(product.reviews && product.reviews.length > 0 ? product.reviews : [
              {
                id: 'default-1',
                author: 'Mahira Khan',
                location: 'Lahore & Dubai',
                rating: 5,
                date: 'October 19, 2026',
                comment: 'The weave density and finish on this garment are beyond comparison. You can feel the authenticity of the handloom.',
                verified: true
              },
              {
                id: 'default-2',
                author: 'Siddharth Varma',
                location: 'Bengaluru',
                rating: 5,
                date: 'September 22, 2026',
                comment: 'Impeccable cut and fabric weight. Truly luxury without borders.',
                verified: true
              }
            ]).map((rev) => (
              <div key={rev.id} className="bg-[#FFFFFF] p-6 border border-[#8B8176]/20 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-serif text-sm font-semibold text-[#171717]">{rev.author}</h5>
                    <span className="text-[10px] text-[#8B8176]">{rev.location} • {rev.date}</span>
                  </div>
                  <div className="flex text-[#B49A78]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#171717]/80 leading-relaxed pt-1">
                  "{rev.comment}"
                </p>
                {rev.verified && (
                  <div className="pt-2 flex items-center space-x-1 text-[9.5px] uppercase tracking-wider text-[#B49A78] font-bold">
                    <Check className="w-3 h-3" />
                    <span>Verified Atelier Purchase</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* You May Also Admire */}
        <div className="mt-20 pt-12 border-t border-[#8B8176]/30">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block mb-1">
                Atelier Recommendations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717]">
                You May Also Admire
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsSizeGuideOpen(false)}
            className="fixed inset-0 bg-[#171717]/70 backdrop-blur-xs"
          />
          <div className="relative bg-[#FFFFFF] max-w-2xl w-full border border-[#171717] p-8 z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-4 border-b border-[#8B8176]/20 mb-6">
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#B49A78] font-bold">
                  Tara Atelier Sizing Standards
                </span>
                <h3 className="font-serif text-xl text-[#171717]">International Garment Measurements</h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-xs uppercase tracking-widest font-bold border border-[#171717] p-1.5"
              >
                Close
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#171717] text-[10px] uppercase tracking-wider text-[#8B8176]">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest / Bust (Inches)</th>
                    <th className="py-2">Waist (Inches)</th>
                    <th className="py-2">Hip (Inches)</th>
                    <th className="py-2">UK / EU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B8176]/20 font-mono">
                  <tr>
                    <td className="py-2.5 font-bold">XS</td>
                    <td className="py-2.5">32 - 34"</td>
                    <td className="py-2.5">26 - 28"</td>
                    <td className="py-2.5">36 - 38"</td>
                    <td className="py-2.5">UK 6 / EU 34</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">S</td>
                    <td className="py-2.5">36 - 38"</td>
                    <td className="py-2.5">29 - 31"</td>
                    <td className="py-2.5">39 - 41"</td>
                    <td className="py-2.5">UK 8-10 / EU 36-38</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">M</td>
                    <td className="py-2.5">40 - 42"</td>
                    <td className="py-2.5">32 - 34"</td>
                    <td className="py-2.5">42 - 44"</td>
                    <td className="py-2.5">UK 12-14 / EU 40-42</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">L</td>
                    <td className="py-2.5">44 - 46"</td>
                    <td className="py-2.5">36 - 38"</td>
                    <td className="py-2.5">46 - 48"</td>
                    <td className="py-2.5">UK 16 / EU 44</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">XL</td>
                    <td className="py-2.5">48 - 50"</td>
                    <td className="py-2.5">40 - 42"</td>
                    <td className="py-2.5">50 - 52"</td>
                    <td className="py-2.5">UK 18 / EU 46</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#8B8176] mt-6 italic">
              * Note: Saree sets are unstitched by default with 1 meter blouse fabric suitable for custom tailoring up to size 48 bust.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
