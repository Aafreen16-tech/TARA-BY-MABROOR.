export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'AED' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstINR: number; // 1 INR in target currency
  name: string;
}

export type Gender = 'women' | 'men' | 'unisex';

export type CulturalCategory = 
  | 'Indian Heritage'
  | 'Middle Eastern Elegance'
  | 'European Contemporary'
  | 'African Expressions'
  | 'East Asian Aesthetics'
  | 'International Streetwear';

export type SubCategory =
  // Women's Indian
  | 'Sarees'
  | 'Banarasi Sarees'
  | 'Kanchipuram Sarees'
  | 'Kurtis'
  | 'Lehengas'
  | 'Salwar Suits'
  // Women's Western & Global
  | 'Dresses'
  | 'Blazers & Outerwear'
  | 'Kimonos & Silk Jackets'
  | 'African Print Ensembles'
  // Women's Middle Eastern
  | 'Abayas'
  | 'Kaftans'
  // Men's Indian
  | 'Kurtas'
  | 'Sherwanis'
  // Men's Western & Global
  | 'Suits'
  | 'Shirts'
  | 'Jackets'
  | 'Streetwear'
  | 'Trousers'
  // Men's Middle Eastern
  | 'Thobes & Kanduras'
  | 'African-Inspired';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  fabricTag: string; // e.g. "Pure Katan Silk & Zari", "Double-Faced Cashmere"
  priceINR: number;
  originalPriceINR?: number;
  gender: Gender;
  culturalCategory: CulturalCategory;
  category: SubCategory;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  fabricCare: string[];
  artisanStory: string;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isLimitedEdition?: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: 'standard' | 'express' | 'concierge';
  paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking' | 'cod';
  currency: CurrencyCode;
  subtotalINR: number;
  discountINR: number;
  shippingINR: number;
  totalINR: number;
  status: 'Order Placed' | 'In Tailoring' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimatedDelivery: string;
  trackingNumber: string;
}

export interface FilterState {
  gender?: Gender | 'all';
  category?: string;
  culturalCategory?: CulturalCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minOrderINR: number;
  description: string;
}
