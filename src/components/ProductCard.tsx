import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    openProductDetail,
    setQuickViewProduct,
    toggleWishlist,
    isInWishlist,
    addToCart
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick add default size and default color
    const defaultColor = product.colors[0];
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#8B8176]/20 transition-all duration-300 hover:border-[#171717] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProductDetail(product.id)}
    >
      {/* Visual Showcase (3:4 Ratio) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE5DC] select-none">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out ${
            isHovered && product.images.length > 1 ? 'opacity-0 scale-102' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image for crossfade hover */}
        {product.images.length > 1 && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate angle`}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isLimitedEdition && (
            <span className="bg-[#171717] text-[#FFFFFF] text-[9px] uppercase font-semibold tracking-[0.25em] px-2 py-1">
              Atelier Edition
            </span>
          )}
          {product.isNewArrival && !product.isLimitedEdition && (
            <span className="bg-[#FFFFFF]/90 backdrop-blur-xs text-[#171717] text-[9px] uppercase font-semibold tracking-[0.22em] px-2 py-0.5 border border-[#171717]/20">
              New Arrival
            </span>
          )}
          {product.stockCount <= 5 && (
            <span className="bg-[#B49A78] text-[#171717] text-[8.5px] uppercase font-bold tracking-[0.2em] px-2 py-0.5">
              Only {product.stockCount} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#171717]/15 transition-transform duration-200 z-10 ${
            isFavorited ? 'text-[#171717]' : 'text-[#8B8176] hover:text-[#171717]'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${isFavorited ? 'fill-[#171717] text-[#171717]' : ''}`}
          />
        </button>

        {/* Quick View & Quick Bag buttons on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-[#171717] text-[#F4F0E8] transition-transform duration-300 z-10 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex items-center justify-center space-x-1.5 py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-medium hover:bg-[#B49A78] hover:text-[#171717] transition-colors border-r border-white/20"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="flex items-center justify-center space-x-1.5 py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-medium hover:bg-[#B49A78] hover:text-[#171717] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Meta Block */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#FFFFFF]">
        <div>
          {/* Cultural Tag */}
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[#8B8176] mb-1 font-medium">
            <span>{product.culturalCategory}</span>
            <span>{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-[15px] font-normal text-[#171717] leading-snug line-clamp-1 group-hover:text-[#B49A78] transition-colors">
            {product.name}
          </h3>

          {/* Fabric Subtitle */}
          <p className="text-[11.5px] italic text-[#8B8176] font-serif mt-1 line-clamp-1">
            {product.fabricTag}
          </p>
        </div>

        {/* Color Swatches and Price */}
        <div className="mt-4 pt-3 border-t border-[#8B8176]/15 flex items-center justify-between">
          {/* Swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colors.map((c, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 border border-[#171717]/30 inline-block transition-transform hover:scale-125"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-[#8B8176] font-mono">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-sans text-[14px] font-semibold text-[#171717] tracking-tight">
              {formatPrice(product.priceINR)}
            </span>
            {product.originalPriceINR && (
              <span className="block text-[10.5px] text-[#8B8176] line-through -mt-0.5">
                {formatPrice(product.originalPriceINR)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
