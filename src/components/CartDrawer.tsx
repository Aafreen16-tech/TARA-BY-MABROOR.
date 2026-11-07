import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotalINR,
    formatPrice,
    navigateTo,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_INR = 25000;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotalINR / FREE_SHIPPING_THRESHOLD_INR) * 100)
  );
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD_INR - cartSubtotalINR);

  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotalINR * appliedCoupon.discountPercentage) / 100)
    : 0;
  const finalTotal = cartSubtotalINR - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Scrim Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#171717]/65 transition-opacity duration-300 backdrop-blur-xs"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#171717] shadow-2xl flex flex-col justify-between text-[#171717] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#8B8176]/20 flex items-center justify-between bg-[#FDF9F1]">
            <div>
              <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#B49A78] font-semibold block">
                Your Atelier Selection
              </span>
              <h2 className="font-serif text-xl tracking-tight text-[#171717]">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#171717] hover:text-[#B49A78] transition border border-[#171717]/10 hover:border-[#171717]"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="bg-[#FFFFFF] px-6 py-3 border-b border-[#8B8176]/15">
            <div className="flex justify-between items-center text-[11px] mb-1.5">
              <span className="text-[#171717] font-medium tracking-wide">
                {progressToFreeShipping >= 100
                  ? '✨ You have unlocked Complimentary Worldwide Delivery'
                  : `Add ${formatPrice(remainingForFree)} more for Complimentary Express Courier`}
              </span>
              <span className="font-mono text-[10px] text-[#8B8176]">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full bg-[#EAE5DC] h-1 overflow-hidden">
              <div
                className="bg-[#171717] h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 divide-y divide-[#8B8176]/15">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B8176] font-semibold block mb-2">
                  Bag is Empty
                </span>
                <p className="font-serif text-lg text-[#171717] mb-6">
                  No garments currently reserved in your bag.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('women');
                  }}
                  className="bg-[#171717] text-[#F4F0E8] text-[10px] uppercase tracking-[0.25em] font-medium py-3 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition"
                >
                  Explore New Arrivals
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`} className="py-5 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 aspect-[3/4] bg-[#EAE5DC] flex-shrink-0 overflow-hidden border border-[#8B8176]/20">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#171717] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)}
                          className="text-[#8B8176] hover:text-[#ba1a1a] p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8B8176] space-y-0.5 mt-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 border border-[#171717]/30 inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                          <span>{item.selectedColor.name}</span>
                          <span>•</span>
                          <span className="font-medium text-[#171717]">{item.selectedSize}</span>
                        </div>
                        <p className="italic font-serif text-[11px]">{item.product.fabricTag}</p>
                      </div>
                    </div>

                    {/* Quantity controls and price */}
                    <div className="flex items-center justify-between pt-3">
                      <div className="inline-flex items-center border border-[#171717]/30 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, -1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#F4F0E8] transition text-[#171717]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono font-medium text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#F4F0E8] transition text-[#171717]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-[#171717] font-sans">
                        {formatPrice(item.product.priceINR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#171717]/15 bg-[#FDF9F1]/80 space-y-4">
              {/* Promo code input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#B49A78] px-3 py-2 text-xs">
                    <div className="flex items-center space-x-2 text-[#171717]">
                      <Tag className="w-3.5 h-3.5 text-[#B49A78]" />
                      <span className="font-mono font-bold tracking-wider">{appliedCoupon.code}</span>
                      <span className="text-[#B49A78]">({appliedCoupon.discountPercentage}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCouponCode}
                      className="text-[10px] text-[#ba1a1a] hover:underline uppercase tracking-wider font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Privilege Code (e.g. GLOBAL15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#FFFFFF] border border-[#8B8176]/40 px-3 py-2 text-xs uppercase tracking-wider placeholder:normal-case placeholder:italic placeholder:text-[#8B8176] focus:outline-none focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] px-4 font-semibold hover:bg-[#B49A78] hover:text-[#171717] transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#ba1a1a] mt-1 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#171717]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">{formatPrice(cartSubtotalINR)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#B49A78] font-medium">
                    <span>Privilege Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Courier</span>
                  <span className="text-[#171717] font-medium">
                    {progressToFreeShipping >= 100 ? 'Complimentary' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#8B8176]/20 font-serif text-base text-[#171717] font-bold">
                  <span>Estimated Total</span>
                  <span className="font-sans font-bold text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.25em] font-medium py-4 px-6 flex items-center justify-center space-x-2 hover:bg-[#B49A78] hover:text-[#171717] transition duration-250 cursor-pointer shadow-md"
              >
                <span>Proceed to Atelier Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#8B8176] tracking-wider uppercase font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B49A78]" />
                <span>Encrypted Transaction • Authenticity Guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
