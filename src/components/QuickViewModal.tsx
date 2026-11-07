import React, { useState } from 'react';
import { X, Heart, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    openProductDetail,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const product = quickViewProduct;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];
  const activeSize = selectedSize || product.sizes[0];
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, activeSize, activeColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    openProductDetail(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-[#171717]/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFFFF] max-w-4xl w-full border border-[#171717] shadow-2xl z-10 overflow-hidden text-[#171717] animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FFFFFF] border border-[#171717]/20 hover:border-[#171717] transition text-[#171717]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Preview */}
          <div className="bg-[#EAE5DC] relative flex flex-col justify-between p-6">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#FFFFFF] border border-[#8B8176]/20 relative">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Thumbnail navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 aspect-[3/4] border transition overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === idx
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

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-[#FFFFFF]">
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#B49A78] font-semibold mb-2">
                <span>{product.culturalCategory}</span>
                <span>{product.category}</span>
              </div>

              <h2 className="font-serif text-2xl font-normal text-[#171717] leading-tight">
                {product.name}
              </h2>

              <p className="font-serif italic text-sm text-[#8B8176] mt-1.5">
                {product.fabricTag}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline space-x-3">
                <span className="font-sans text-2xl font-semibold text-[#171717]">
                  {formatPrice(product.priceINR)}
                </span>
                {product.originalPriceINR && (
                  <span className="text-sm text-[#8B8176] line-through font-sans">
                    {formatPrice(product.originalPriceINR)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-medium">
                  Taxes Included
                </span>
              </div>

              <p className="text-xs text-[#171717]/80 leading-relaxed mt-4 line-clamp-3">
                {product.description}
              </p>

              {/* Color Swatches */}
              <div className="mt-6">
                <label className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-semibold block mb-2">
                  Select Shade: <span className="text-[#171717]">{activeColor.name}</span>
                </label>
                <div className="flex items-center space-x-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 p-0.5 border transition ${
                        activeColor.name === c.name ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-transparent'
                      }`}
                      title={c.name}
                    >
                      <span className="w-full h-full block border border-[#171717]/20" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-semibold">
                    Select Size: <span className="text-[#171717]">{activeSize}</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-3 text-[11px] font-medium border text-center transition ${
                        activeSize === s
                          ? 'bg-[#171717] text-[#FFFFFF] border-[#171717]'
                          : 'bg-[#FFFFFF] text-[#171717] border-[#8B8176]/30 hover:border-[#171717]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-[#8B8176]/20 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.22em] font-medium py-3.5 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition"
                >
                  Add to Atelier Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 border flex items-center justify-center transition ${
                    isFavorited
                      ? 'border-[#171717] bg-[#171717] text-[#FFFFFF]'
                      : 'border-[#8B8176]/30 text-[#171717] hover:border-[#171717]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullPage}
                className="w-full text-center text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#171717] hover:text-[#B49A78] underline underline-offset-4 py-1.5 transition flex items-center justify-center space-x-1"
              >
                <span>View Full Garment Dossier & Provenance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
