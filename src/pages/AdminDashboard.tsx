import React, { useState } from 'react';
import {
  Shield,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Tag,
  AlertTriangle,
  Lock,
  ArrowRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Coupon, Order, CulturalCategory, SubCategory } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    coupons,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminAddCoupon,
    adminDeleteCoupon,
    updateOrderStatus,
    formatPrice,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    navigateTo,
    addToast
  } = useShop();

  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');

  // Product CRUD modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    subtitle: '',
    fabricTag: '',
    priceINR: 25000,
    gender: 'women',
    culturalCategory: 'Indian Heritage',
    category: 'Banarasi Sarees',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'],
    colors: [{ name: 'Crimson Gold', hex: '#8B1E2D' }],
    sizes: ['Free Size (Includes Blouse)'],
    description: '',
    details: ['Handcrafted by master guild artisans', 'Silk Mark Certified'],
    fabricCare: ['Dry clean only by luxury textile specialists'],
    artisanStory: 'Crafted in our generational partner looms.',
    stockCount: 10,
    rating: 5.0,
    reviewCount: 1
  });

  // New Coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(10000);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Handle Admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'mabroor2026' || adminPassword === 'admin' || adminPassword === 'atelier') {
      setIsAdminAuthenticated(true);
      setAuthError(null);
      addToast('Welcome to Tara by Mabroor Brand Atelier Studio', 'success');
    } else {
      setAuthError('Incorrect Atelier credentials. (Hint: enter "atelier" or "admin")');
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      subtitle: '',
      fabricTag: '',
      priceINR: 25000,
      gender: 'women',
      culturalCategory: 'Indian Heritage',
      category: 'Banarasi Sarees',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'],
      colors: [{ name: 'Imperial Crimson', hex: '#8B1E2D' }],
      sizes: ['S', 'M', 'L'],
      description: 'Crafted using centuries-old techniques with opulent silk threads.',
      details: ['Handloom certified', 'Origin: Varanasi, India'],
      fabricCare: ['Dry clean only'],
      artisanStory: 'Preserved by fourth-generation weavers.',
      stockCount: 8,
      rating: 5.0,
      reviewCount: 0
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.priceINR) {
      addToast('Please complete required garment fields', 'info');
      return;
    }

    if (editingProductId) {
      adminUpdateProduct({
        ...productForm,
        id: editingProductId
      } as Product);
    } else {
      const newProd: Product = {
        ...productForm,
        id: `tara-custom-${Date.now()}`,
        images: productForm.images?.length ? productForm.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'],
        colors: productForm.colors?.length ? productForm.colors : [{ name: 'Signature Gold', hex: '#C5A059' }],
        sizes: productForm.sizes?.length ? productForm.sizes : ['Standard Size']
      } as Product;
      adminAddProduct(newProd);
    }
    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const coup: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercentage: Number(newCouponDiscount),
      minOrderINR: Number(newCouponMinOrder),
      description: newCouponDesc || `${newCouponDiscount}% privilege discount on qualifying orders`
    };
    adminAddCoupon(coup);
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  // Metrics
  const totalRevenueINR = orders.reduce((acc, o) => acc + o.totalINR, 0);
  const totalItemsSold = orders.reduce((acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0), 0);
  const totalActiveProducts = products.length;
  const lowStockCount = products.filter((p) => p.stockCount <= 5).length;

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F0E8] px-6 py-16 text-[#171717]">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#171717] p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#171717] text-[#B49A78] flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block">
              Atelier Security Protocol
            </span>
            <h2 className="font-serif text-2xl text-[#171717]">
              Brand Owner Authentication
            </h2>
            <p className="text-xs text-[#8B8176]">
              Enter your master administrative key to access the TARA BY MABROOR flagship control center.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                Atelier Master Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8176]" />
                <input
                  type="password"
                  placeholder="Enter key (Try: atelier or admin)"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-[#171717]"
                  autoFocus
                />
              </div>
              {authError && <p className="text-[11px] text-[#ba1a1a] mt-1.5 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.25em] font-semibold py-3 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition"
            >
              Authenticate & Enter Studio
            </button>
          </form>

          <div className="pt-4 border-t border-[#8B8176]/20 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-[10px] uppercase tracking-wider text-[#8B8176] hover:text-[#171717] underline"
            >
              Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F0E8] text-[#171717] min-h-screen py-10 px-6 sm:px-12">
      <div className="max-w-[1500px] mx-auto space-y-10">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#8B8176]/20 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Owner Operating System • Flagship Control</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              TARA BY MABROOR Atelier Management
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('home')}
              className="border border-[#171717] bg-[#FFFFFF] px-4 py-2 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#171717] hover:text-[#FFFFFF] transition"
            >
              Live Storefront Preview
            </button>
            <button
              onClick={() => {
                setIsAdminAuthenticated(false);
                addToast('Signed out from Admin Studio', 'info');
              }}
              className="bg-[#171717] text-[#FFFFFF] px-4 py-2 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#ba1a1a] transition"
            >
              Lock Terminal
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border border-[#171717]/20 bg-[#FFFFFF] p-1 text-xs uppercase tracking-[0.2em] font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 transition flex-shrink-0 ${
              activeTab === 'overview' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 transition flex-shrink-0 ${
              activeTab === 'products' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
            }`}
          >
            Garments Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 transition flex-shrink-0 ${
              activeTab === 'orders' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
            }`}
          >
            Orders & Consignments ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-5 py-2.5 transition flex-shrink-0 ${
              activeTab === 'coupons' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
            }`}
          >
            Privilege Codes ({coupons.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-6 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-bold block">Gross Revenue</span>
                <span className="font-sans font-bold text-3xl text-[#171717] block">
                  {formatPrice(totalRevenueINR)}
                </span>
                <span className="text-[11px] text-[#B49A78] font-medium">From domestic & international orders</span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-6 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-bold block">Consignments Handled</span>
                <span className="font-mono font-bold text-3xl text-[#171717] block">
                  {orders.length} Orders
                </span>
                <span className="text-[11px] text-[#8B8176]">{totalItemsSold} high-value garments</span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-6 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-bold block">Average Order Value</span>
                <span className="font-sans font-bold text-3xl text-[#171717] block">
                  {orders.length > 0 ? formatPrice(Math.round(totalRevenueINR / orders.length)) : '₹0'}
                </span>
                <span className="text-[11px] text-[#8B8176]">Premium luxury tier benchmark</span>
              </div>

              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-6 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B8176] font-bold block">Atelier Stock Health</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-3xl text-[#171717]">{lowStockCount}</span>
                  <span className="text-xs text-[#ba1a1a] font-bold">Limited Archive</span>
                </div>
                <span className="text-[11px] text-[#8B8176]">{totalActiveProducts} active silhouettes</span>
              </div>
            </div>

            {/* Regional Cultural Performance & Sales breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#FFFFFF] border border-[#171717] p-6 space-y-4">
                <h3 className="font-serif text-xl">Cultural Tradition Sales Distribution</h3>
                <div className="space-y-3 pt-2 text-xs">
                  {[
                    { name: 'Indian Heritage', share: 44, amount: '₹1,42,000' },
                    { name: 'Middle Eastern Elegance', share: 26, amount: '₹84,500' },
                    { name: 'European Contemporary', share: 18, amount: '₹58,000' },
                    { name: 'African Expressions & East Asian', share: 12, amount: '₹38,500' }
                  ].map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span>{cat.name}</span>
                        <span className="font-mono">{cat.share}% ({cat.amount})</span>
                      </div>
                      <div className="w-full bg-[#EAE5DC] h-2">
                        <div className="bg-[#171717] h-full" style={{ width: `${cat.share}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Low stock alerts */}
              <div className="bg-[#FFFFFF] border border-[#171717] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl">Critical Archive Stock Notices</h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#ba1a1a] font-bold">Restock Required</span>
                </div>

                <div className="space-y-3 pt-2 text-xs divide-y divide-[#8B8176]/15">
                  {products.filter(p => p.stockCount <= 5).map(p => (
                    <div key={p.id} className="pt-2 flex items-center justify-between">
                      <div>
                        <h5 className="font-serif font-medium text-[#171717]">{p.name}</h5>
                        <p className="text-[11px] text-[#8B8176]">{p.culturalCategory} • {p.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-[#ba1a1a]/10 text-[#ba1a1a] px-2 py-0.5 font-bold font-mono text-[11px]">
                          {p.stockCount} Pieces Remaining
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT (CRUD) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl">Atelier Garment Catalog</h3>
                <p className="text-xs text-[#8B8176]">Manage prices, silk mark verifications, colorways, and sizes.</p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] font-semibold py-2.5 px-5 hover:bg-[#B49A78] hover:text-[#171717] transition flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Garment</span>
              </button>
            </div>

            <div className="bg-[#FFFFFF] border border-[#171717] overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FDF9F1] border-b border-[#171717] text-[10px] uppercase tracking-wider text-[#8B8176]">
                    <th className="py-3 px-4">Garment</th>
                    <th className="py-3 px-4">Cultural Guild</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B8176]/15">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FDF9F1]/50">
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <img src={p.images[0]} alt="" className="w-10 aspect-[3/4] object-cover border border-[#8B8176]/20" />
                        <div>
                          <span className="font-serif font-medium text-sm text-[#171717] block">{p.name}</span>
                          <span className="text-[11px] text-[#8B8176] italic">{p.fabricTag}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{p.culturalCategory}</td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4 font-mono font-semibold">{formatPrice(p.priceINR)}</td>
                      <td className="py-3 px-4">
                        <span className={`font-mono font-bold ${p.stockCount <= 5 ? 'text-[#ba1a1a]' : 'text-[#171717]'}`}>
                          {p.stockCount} pcs
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1 text-[#171717] hover:text-[#B49A78] inline-block"
                          title="Edit Garment"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => adminDeleteProduct(p.id)}
                          className="p-1 text-[#8B8176] hover:text-[#ba1a1a] inline-block"
                          title="Delete Garment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl">Client Consignment Pipeline</h3>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-[#FFFFFF] border border-[#171717] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#8B8176]/20 gap-3">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-base">{ord.id}</span>
                        <span className="text-xs text-[#8B8176]">• {ord.date}</span>
                        <span className="text-xs font-semibold text-[#171717]">By {ord.shippingAddress.fullName} ({ord.shippingAddress.email})</span>
                      </div>
                      <p className="text-[11px] text-[#8B8176] mt-0.5">
                        Destination: {ord.shippingAddress.city}, {ord.shippingAddress.country} • Payment: {ord.paymentMethod.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="font-sans font-bold text-base text-[#171717]">
                        {formatPrice(ord.totalINR)}
                      </span>
                      {/* Status Changer */}
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="bg-[#FDF9F1] border border-[#171717] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#171717] focus:outline-none"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="In Tailoring">In Tailoring</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#171717]/80">
                        <span>{it.quantity}x {it.product.name} ({it.selectedSize}, {it.selectedColor.name})</span>
                        <span className="font-mono font-semibold">{formatPrice(it.product.priceINR * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COUPON PRIVILEGES */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#171717] p-6 space-y-4">
              <h3 className="font-serif text-xl">Issue Privilege Voucher</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g. DUBAI25"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 uppercase font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Minimum Order Amount (INR)</label>
                  <input
                    type="number"
                    step="1000"
                    value={newCouponMinOrder}
                    onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Seasonal festive trunk show privilege"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-wider font-bold py-2.5 hover:bg-[#B49A78] hover:text-[#171717] transition"
                >
                  Activate Privilege Code
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#171717] p-6 space-y-4">
              <h3 className="font-serif text-xl">Active Privilege Registry</h3>
              <div className="divide-y divide-[#8B8176]/20">
                {coupons.map((c) => (
                  <div key={c.code} className="py-4 flex justify-between items-center text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-sm text-[#171717] bg-[#FDF9F1] border border-[#8B8176]/30 px-2 py-0.5">
                          {c.code}
                        </span>
                        <span className="font-bold text-[#B49A78]">{c.discountPercentage}% OFF</span>
                      </div>
                      <p className="text-[#8B8176] mt-1">{c.description}</p>
                      <span className="text-[10px] text-[#8B8176] font-mono">Min Order: {formatPrice(c.minOrderINR)}</span>
                    </div>

                    <button
                      onClick={() => adminDeleteCoupon(c.code)}
                      className="text-[#8B8176] hover:text-[#ba1a1a] p-1"
                      title="Revoke code"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Product Edit / Create Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsProductModalOpen(false)} className="fixed inset-0 bg-[#171717]/70" />
          <div className="relative bg-[#FFFFFF] max-w-2xl w-full border border-[#171717] p-8 z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl mb-4">
              {editingProductId ? 'Edit Garment Specifications' : 'Publish New Atelier Garment'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Garment Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Gender Silhouette</label>
                  <select
                    value={productForm.gender}
                    onChange={(e) => setProductForm({ ...productForm, gender: e.target.value as any })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Cultural Tradition</label>
                  <select
                    value={productForm.culturalCategory}
                    onChange={(e) => setProductForm({ ...productForm, culturalCategory: e.target.value as any })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                  >
                    <option value="Indian Heritage">Indian Heritage</option>
                    <option value="Middle Eastern Elegance">Middle Eastern Elegance</option>
                    <option value="European Contemporary">European Contemporary</option>
                    <option value="African Expressions">African Expressions</option>
                    <option value="East Asian Aesthetics">East Asian Aesthetics</option>
                    <option value="International Streetwear">International Streetwear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Price (INR)</label>
                  <input
                    type="number"
                    value={productForm.priceINR}
                    onChange={(e) => setProductForm({ ...productForm, priceINR: Number(e.target.value) })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Fabric & Weave Label</label>
                <input
                  type="text"
                  placeholder="e.g. Pure Katan Silk & Tested Gold Zari"
                  value={productForm.fabricTag}
                  onChange={(e) => setProductForm({ ...productForm, fabricTag: e.target.value })}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  value={productForm.images?.[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Editorial Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#8B8176] block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2 text-xs font-mono"
                    required
                  />
                </div>

                <div className="flex items-center pt-5 space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.isLimitedEdition || false}
                    onChange={(e) => setProductForm({ ...productForm, isLimitedEdition: e.target.checked })}
                    className="accent-[#171717]"
                  />
                  <span className="text-xs uppercase tracking-wider font-bold">Limited Atelier Edition</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-wider font-bold py-2.5 px-6 hover:bg-[#B49A78] hover:text-[#171717]"
                >
                  Save Garment
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="border border-[#171717] text-[10px] uppercase tracking-wider font-bold py-2.5 px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
