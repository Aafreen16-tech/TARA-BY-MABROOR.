import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotalINR,
    formatPrice,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    placeOrder,
    navigateTo,
    user
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    user?.addresses[0] || {
      fullName: 'Aafreen Mabroor',
      email: 'aafreen.mabroor@example.com',
      phone: '+91 98450 12345',
      addressLine1: 'Villa 14, Royal Palm Residences, Road No. 12, Banjara Hills',
      addressLine2: '',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500034',
      country: 'India'
    }
  );

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'concierge'>('express');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<
    'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking' | 'cod'
  >('razorpay_upi');

  // Coupon input
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Placed order confirmation
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F4F0E8] px-6 text-center">
        <ShoppingBag className="w-12 h-12 text-[#8B8176] mb-4" />
        <h2 className="font-serif text-3xl text-[#171717] mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-[#8B8176] max-w-sm mb-6">
          Please select your desired garments from our global collections before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('women')}
          className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.25em] font-medium py-3 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  const shippingCost = deliveryMethod === 'concierge' ? 2500 : deliveryMethod === 'express' ? 1200 : 0;
  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotalINR * appliedCoupon.discountPercentage) / 100)
    : 0;
  const grandTotal = cartSubtotalINR - discountAmount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponCodeInput.trim()) return;
    const res = applyCouponCode(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput('');
    }
  };

  const handleFinalOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const ord = placeOrder({
        address: shippingAddress,
        deliveryMethod,
        paymentMethod
      });
      setCompletedOrder(ord);
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div className="bg-[#F4F0E8] py-16 px-6 sm:px-12 min-h-screen text-[#171717]">
        <div className="max-w-3xl mx-auto bg-[#FFFFFF] border border-[#171717] p-8 sm:p-12 shadow-2xl">
          <div className="text-center space-y-3 pb-8 border-b border-[#8B8176]/20">
            <div className="w-16 h-16 bg-[#171717] text-[#B49A78] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block">
              Atelier Consignment Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              Thank You for Your Order
            </h1>
            <p className="text-xs text-[#8B8176] max-w-md mx-auto">
              Your garments have entered our private tailoring schedule. A bespoke confirmation dossier has been dispatched to {completedOrder.shippingAddress.email}.
            </p>
          </div>

          <div className="py-6 space-y-4 border-b border-[#8B8176]/20 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FDF9F1] border border-[#8B8176]/20">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8B8176] block">Order Number</span>
                <span className="font-mono font-bold text-sm text-[#171717]">{completedOrder.id}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8B8176] block">Date</span>
                <span className="font-medium text-[#171717]">{completedOrder.date}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8B8176] block">Total Amount</span>
                <span className="font-bold text-[#171717]">{formatPrice(completedOrder.totalINR)}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8B8176] block">Estimated Delivery</span>
                <span className="font-semibold text-[#B49A78]">{completedOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-serif text-base mb-3">Reserved Garments</h4>
              <div className="space-y-3">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-[#8B8176]/10">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.images[0]} alt="" className="w-12 aspect-[3/4] object-cover" />
                      <div>
                        <span className="font-serif font-medium text-sm text-[#171717]">{item.product.name}</span>
                        <p className="text-[11px] text-[#8B8176]">
                          Size: {item.selectedSize} • Shade: {item.selectedColor.name} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-sm">{formatPrice(item.product.priceINR * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#8B8176] block mb-1">
                Shipping Destination:
              </span>
              <p className="font-medium text-[#171717]">
                {completedOrder.shippingAddress.fullName} — {completedOrder.shippingAddress.addressLine1}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.postalCode}, {completedOrder.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={() => navigateTo('account')}
              className="w-full sm:w-auto bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.22em] font-semibold py-3.5 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition text-center"
            >
              Track Order in Customer Portal
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto text-[10px] uppercase tracking-[0.22em] font-semibold text-[#171717] hover:text-[#B49A78] underline text-center"
            >
              Return to Flagship Boutique
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F0E8] py-12 px-6 sm:px-12 min-h-screen text-[#171717]">
      <div className="max-w-[1300px] mx-auto">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-8 mb-10 border-b border-[#8B8176]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block mb-1">
              Atelier Checkout Experience
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              Reserve Your Garments
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-xs text-[#8B8176] font-medium">
            <Lock className="w-3.5 h-3.5 text-[#B49A78]" />
            <span className="uppercase tracking-widest text-[10px]">256-Bit Encrypted Atelier Vault</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form: Steps 1, 2, 3 (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Shipping Details */}
            <div className="bg-[#FFFFFF] border border-[#8B8176]/25 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#8B8176]/20 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-[#171717] text-[#FFFFFF] text-xs font-mono font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-xl font-normal text-[#171717]">
                    Client Information & Shipping Address
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Email Address (For Invoicing) *
                  </label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Country *
                  </label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    <option value="India">India (Domestic Atelier Express)</option>
                    <option value="United Arab Emirates">United Arab Emirates (Dubai Atelier)</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Address Line 1 (Villa / Flat / Street) *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine1}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Postal PIN Code *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Speed */}
            <div className="bg-[#FFFFFF] border border-[#8B8176]/25 p-6 sm:p-8">
              <div className="flex items-center space-x-3 pb-4 border-b border-[#8B8176]/20 mb-6">
                <span className="w-6 h-6 bg-[#171717] text-[#FFFFFF] text-xs font-mono font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-xl font-normal text-[#171717]">
                  Delivery Method & Packaging
                </h2>
              </div>

              <div className="space-y-3">
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  deliveryMethod === 'express' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="accent-[#171717]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">DHL Express Courier (Recommended)</h4>
                      <p className="text-[11px] text-[#8B8176]">Delivered in 2-4 business days in protective rigid garment box</p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-xs text-[#171717]">{formatPrice(1200)}</span>
                </label>

                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  deliveryMethod === 'concierge' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'concierge'}
                      onChange={() => setDeliveryMethod('concierge')}
                      className="accent-[#171717]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">White-Glove Atelier Concierge</h4>
                      <p className="text-[11px] text-[#8B8176]">Personal hand delivery on wooden hangers with steam finish & muslin bag</p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-xs text-[#171717]">{formatPrice(2500)}</span>
                </label>

                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  deliveryMethod === 'standard' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="accent-[#171717]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">Complimentary Standard Delivery</h4>
                      <p className="text-[11px] text-[#8B8176]">Delivered in 5-7 business days across India and key global hubs</p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-xs text-[#B49A78]">FREE</span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method (Razorpay & Indian Payment Providers) */}
            <div className="bg-[#FFFFFF] border border-[#8B8176]/25 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#8B8176]/20 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-[#171717] text-[#FFFFFF] text-xs font-mono font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-serif text-xl font-normal text-[#171717]">
                    Select Payment Gateway
                  </h2>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold">
                  Razorpay Secure
                </span>
              </div>

              <div className="space-y-3">
                {/* Razorpay UPI */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'razorpay_upi' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay_upi'}
                      onChange={() => setPaymentMethod('razorpay_upi')}
                      className="accent-[#171717]"
                    />
                    <QrCode className="w-5 h-5 text-[#B49A78]" />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">Razorpay Instant UPI</h4>
                      <p className="text-[11px] text-[#8B8176]">Pay seamlessly via Google Pay, PhonePe, Paytm, or any UPI App</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#171717]">Instant</span>
                </label>

                {/* Cards */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'razorpay_card' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay_card'}
                      onChange={() => setPaymentMethod('razorpay_card')}
                      className="accent-[#171717]"
                    />
                    <CreditCard className="w-5 h-5 text-[#B49A78]" />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">Credit / Debit Card</h4>
                      <p className="text-[11px] text-[#8B8176]">Visa, MasterCard, American Express, RuPay & International Cards</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#171717]">Protected</span>
                </label>

                {/* Net Banking */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'razorpay_netbanking' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay_netbanking'}
                      onChange={() => setPaymentMethod('razorpay_netbanking')}
                      className="accent-[#171717]"
                    />
                    <Building className="w-5 h-5 text-[#B49A78]" />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">Indian Net Banking</h4>
                      <p className="text-[11px] text-[#8B8176]">All 50+ Major Indian Banks Supported (HDFC, ICICI, SBI, Axis)</p>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'cod' ? 'border-[#171717] bg-[#FDF9F1]' : 'border-[#8B8176]/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#171717]"
                    />
                    <ShieldCheck className="w-5 h-5 text-[#B49A78]" />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">Cash On Delivery (India Only)</h4>
                      <p className="text-[11px] text-[#8B8176]">Pay in cash or UPI upon courier arrival at your doorstep</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#171717] p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl pb-4 border-b border-[#8B8176]/20 mb-6">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
              </h3>

              {/* Items preview */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2 divide-y divide-[#8B8176]/15">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-3 flex gap-3 text-xs">
                    <img src={item.product.images[0]} alt="" className="w-14 aspect-[3/4] object-cover flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-serif font-medium text-sm text-[#171717] line-clamp-1">{item.product.name}</h5>
                        <p className="text-[11px] text-[#8B8176]">{item.selectedSize} • {item.selectedColor.name} • Qty {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-[#171717] font-mono">{formatPrice(item.product.priceINR * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Privilege Code Box */}
              <div className="pt-6 border-t border-[#8B8176]/20 mt-6">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#FDF9F1] border border-[#B49A78] p-3 text-xs">
                    <span className="font-mono font-bold text-[#171717]">{appliedCoupon.code} ({appliedCoupon.discountPercentage}% OFF)</span>
                    <button onClick={removeCouponCode} className="text-xs text-[#ba1a1a] font-semibold underline">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. GLOBAL15)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 bg-[#FDF9F1] border border-[#8B8176]/30 px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-wider px-4 font-bold hover:bg-[#B49A78] hover:text-[#171717] transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-[#ba1a1a] mt-1">{couponError}</p>}
              </div>

              {/* Price Details */}
              <div className="pt-6 space-y-2 text-xs border-t border-[#8B8176]/20 mt-6">
                <div className="flex justify-between">
                  <span className="text-[#8B8176]">Garments Subtotal</span>
                  <span className="font-mono font-medium">{formatPrice(cartSubtotalINR)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#B49A78] font-bold">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8B8176]">Shipping & Handling</span>
                  <span className="font-mono">{shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8B8176]">
                  <span>Estimated Taxes & Duties</span>
                  <span>Included</span>
                </div>

                <div className="pt-4 border-t border-[#171717] flex justify-between items-baseline font-serif text-lg text-[#171717]">
                  <span className="font-normal">Total Payable</span>
                  <span className="font-sans font-bold text-2xl text-[#171717]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Complete Order Trigger */}
              <div className="pt-6">
                <button
                  onClick={handleFinalOrder}
                  disabled={isProcessing}
                  className="w-full bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.25em] font-semibold py-4 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isProcessing ? (
                    <span>Securing Atelier Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-[#8B8176]/15 flex items-center justify-center space-x-2 text-[10px] text-[#8B8176] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#B49A78]" />
                <span>Complimentary 14-Day Global Return Privileges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
