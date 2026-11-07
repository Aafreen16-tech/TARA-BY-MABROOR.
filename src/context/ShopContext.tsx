import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  ProductColor,
  CurrencyCode,
  Order,
  ShippingAddress,
  Coupon,
  CulturalCategory
} from '../types';
import { PRODUCTS, CURRENCIES, INITIAL_COUPONS } from '../data/products';

export type PageView =
  | 'home'
  | 'men'
  | 'women'
  | 'collections'
  | 'story'
  | 'product'
  | 'checkout'
  | 'account'
  | 'admin';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
}

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountINR: number) => string;
  activePage: PageView;
  selectedProductId: string | null;
  selectedCategoryFilter: string | null;
  selectedCultureFilter: CulturalCategory | 'all';
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toasts: ToastMessage[];
  addToast: (msg: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;

  // Navigation
  navigateTo: (page: PageView, options?: { productId?: string; category?: string; culture?: CulturalCategory | 'all' }) => void;
  openProductDetail: (productId: string) => void;

  // Cart operations
  addToCart: (product: Product, size: string, color: ProductColor, qty?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateCartQuantity: (productId: string, size: string, colorName: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalINR: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Orders
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  orders: Order[];
  placeOrder: (orderInfo: {
    address: ShippingAddress;
    deliveryMethod: 'standard' | 'express' | 'concierge';
    paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking' | 'cod';
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;

  // Admin operations
  adminAddProduct: (prod: Product) => void;
  adminUpdateProduct: (prod: Product) => void;
  adminDeleteProduct: (id: string) => void;
  adminAddCoupon: (coupon: Coupon) => void;
  adminDeleteCoupon: (code: string) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'TBM-94821',
    date: '2026-11-02',
    items: [
      {
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: PRODUCTS[0].sizes[0],
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Aafreen Mabroor',
      email: 'aafreen.mabroor@example.com',
      phone: '+91 98450 12345',
      addressLine1: 'Villa 14, Royal Palm Residences, Banjara Hills',
      addressLine2: 'Road No. 12',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500034',
      country: 'India'
    },
    deliveryMethod: 'concierge',
    paymentMethod: 'razorpay_upi',
    currency: 'INR',
    subtotalINR: 42500,
    discountINR: 4250,
    shippingINR: 0,
    totalINR: 38250,
    status: 'In Tailoring',
    estimatedDelivery: 'November 12, 2026',
    trackingNumber: 'TBM-EXP-889104'
  },
  {
    id: 'TBM-87102',
    date: '2026-10-18',
    items: [
      {
        product: PRODUCTS[9], // Sherwani
        selectedColor: PRODUCTS[9].colors[0],
        selectedSize: '40 Chest (M)',
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Aafreen Mabroor',
      email: 'aafreen.mabroor@example.com',
      phone: '+91 98450 12345',
      addressLine1: 'Villa 14, Royal Palm Residences, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500034',
      country: 'India'
    },
    deliveryMethod: 'express',
    paymentMethod: 'razorpay_card',
    currency: 'INR',
    subtotalINR: 68000,
    discountINR: 0,
    shippingINR: 0,
    totalINR: 68000,
    status: 'Delivered',
    estimatedDelivery: 'October 24, 2026',
    trackingNumber: 'TBM-DHL-302194'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('tara_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tara_wishlist');
      return saved ? JSON.parse(saved) : ['tara-w-001', 'tara-m-001'];
    } catch {
      return ['tara-w-001', 'tara-m-001'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tara_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('tara_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [selectedCultureFilter, setSelectedCultureFilter] = useState<CulturalCategory | 'all'>('all');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [user, setUser] = useState<UserProfile | null>({
    name: 'Aafreen Mabroor',
    email: 'aafreen.mabroor@example.com',
    phone: '+91 98450 12345',
    addresses: [
      {
        fullName: 'Aafreen Mabroor',
        email: 'aafreen.mabroor@example.com',
        phone: '+91 98450 12345',
        addressLine1: 'Villa 14, Royal Palm Residences, Banjara Hills',
        addressLine2: 'Road No. 12',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500034',
        country: 'India'
      },
      {
        fullName: 'Aafreen Mabroor',
        email: 'aafreen.mabroor@example.com',
        phone: '+971 50 123 4567',
        addressLine1: 'Apartment 3402, Address Downtown Residences',
        city: 'Dubai',
        state: 'Dubai',
        postalCode: '00000',
        country: 'United Arab Emirates'
      }
    ]
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tara_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tara_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('tara_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tara_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (amountINR: number) => {
    const cfg = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = amountINR * cfg.rateAgainstINR;
    if (currency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    } else if (currency === 'USD') {
      return `$${converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    } else if (currency === 'EUR') {
      return `€${converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    } else if (currency === 'AED') {
      return `AED ${converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    } else if (currency === 'GBP') {
      return `£${converted.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    return `₹${amountINR.toLocaleString('en-IN')}`;
  };

  const navigateTo = (
    page: PageView,
    options?: { productId?: string; category?: string; culture?: CulturalCategory | 'all' }
  ) => {
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.category !== undefined) {
      setSelectedCategoryFilter(options.category);
    }
    if (options?.culture !== undefined) {
      setSelectedCultureFilter(options.culture);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, color: ProductColor, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    addToast(`Added "${product.name}" (${size}) to your bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
    addToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (productId: string, size: string, colorName: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = products.find((p) => p.id === productId);
      if (exists) {
        addToast(`Removed ${prod?.name || 'garment'} from Wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Saved ${prod?.name || 'garment'} to Wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalINR = cart.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);

  const applyCouponCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try GLOBAL15 or FIRSTTARA.' };
    }
    if (cartSubtotalINR < found.minOrderINR) {
      return {
        success: false,
        message: `Minimum order of ₹${found.minOrderINR.toLocaleString('en-IN')} required for ${found.code}.`
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon ${found.code} applied: ${found.discountPercentage}% discount!`
    };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
  };

  const placeOrder = ({
    address,
    deliveryMethod,
    paymentMethod
  }: {
    address: ShippingAddress;
    deliveryMethod: 'standard' | 'express' | 'concierge';
    paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking' | 'cod';
  }): Order => {
    const discount = appliedCoupon
      ? Math.round((cartSubtotalINR * appliedCoupon.discountPercentage) / 100)
      : 0;
    const shipping = deliveryMethod === 'concierge' ? 2500 : deliveryMethod === 'express' ? 1200 : 0;
    const total = cartSubtotalINR - discount + shipping;

    const deliveryDays = deliveryMethod === 'express' ? 3 : deliveryMethod === 'concierge' ? 2 : 6;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);
    const dateFormatted = estDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: `TBM-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      shippingAddress: address,
      deliveryMethod,
      paymentMethod,
      currency,
      subtotalINR: cartSubtotalINR,
      discountINR: discount,
      shippingINR: shipping,
      totalINR: total,
      status: 'Order Placed',
      estimatedDelivery: dateFormatted,
      trackingNumber: `TBM-${paymentMethod.toUpperCase().slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    addToast(`Order ${orderId} status updated to: ${status}`, 'info');
  };

  const adminAddProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
    addToast(`New garment "${prod.name}" published to catalog`, 'success');
  };

  const adminUpdateProduct = (prod: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)));
    addToast(`Garment "${prod.name}" specifications updated`, 'success');
  };

  const adminDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast(`Garment archived and removed from store`, 'info');
  };

  const adminAddCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    addToast(`Coupon privilege ${coupon.code} created`, 'success');
  };

  const adminDeleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    addToast(`Coupon ${code} revoked`, 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        currency,
        setCurrency,
        formatPrice,
        activePage,
        selectedProductId,
        selectedCategoryFilter,
        selectedCultureFilter,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        addToast,
        removeToast,
        navigateTo,
        openProductDetail,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalINR,
        toggleWishlist,
        isInWishlist,
        user,
        setUser,
        orders,
        placeOrder,
        updateOrderStatus,
        coupons,
        appliedCoupon,
        applyCouponCode,
        removeCouponCode,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
        adminAddCoupon,
        adminDeleteCoupon,
        isAdminAuthenticated,
        setIsAdminAuthenticated
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
