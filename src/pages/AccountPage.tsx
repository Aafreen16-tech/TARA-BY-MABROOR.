import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';

export const AccountPage: React.FC = () => {
  const {
    user,
    setUser,
    orders,
    wishlist,
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    openProductDetail,
    addToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  // Address add form modal / toggle
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  // Profile Edit
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({
        ...user,
        name: profileName,
        email: profileEmail,
        phone: profilePhone
      });
      setIsEditingProfile(false);
      addToast('Client profile updated successfully', 'success');
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.addressLine1 || !newAddress.city || !newAddress.postalCode) {
      addToast('Please complete all required address fields', 'info');
      return;
    }
    if (user) {
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress]
      });
      setShowAddressForm(false);
      addToast('New delivery address registered', 'success');
      setNewAddress({
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India'
      });
    }
  };

  const handleDeleteAddress = (index: number) => {
    if (user) {
      const updated = user.addresses.filter((_, i) => i !== index);
      setUser({ ...user, addresses: updated });
      addToast('Address removed', 'info');
    }
  };

  // Get wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F4F0E8] text-[#171717] min-h-screen py-12 px-6 sm:px-12">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[#8B8176]/20 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block mb-1">
              Privilege Patron Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              Welcome, {user?.name || 'Valued Patron'}
            </h1>
            <p className="text-xs text-[#8B8176] mt-1">
              Member ID: TBM-VIP-7704 • Tier: Private Client Circle
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 border border-[#171717]/20 bg-[#FFFFFF] p-1 text-[11px] uppercase tracking-[0.18em] font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 transition flex items-center space-x-1.5 flex-shrink-0 ${
                activeTab === 'orders' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2 transition flex items-center space-x-1.5 flex-shrink-0 ${
                activeTab === 'wishlist' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2 transition flex items-center space-x-1.5 flex-shrink-0 ${
                activeTab === 'addresses' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Addresses ({user?.addresses.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 transition flex items-center space-x-1.5 flex-shrink-0 ${
                activeTab === 'profile' ? 'bg-[#171717] text-[#FFFFFF]' : 'text-[#171717] hover:text-[#B49A78]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Orders with live tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {orders.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-12 text-center">
                <Package className="w-10 h-10 text-[#8B8176] mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#171717] mb-2">No Historical Orders Found</h3>
                <p className="text-xs text-[#8B8176] mb-6">Explore our global archives and place your first reservation.</p>
              </div>
            ) : (
              orders.map((order) => {
                const statuses = ['Order Placed', 'In Tailoring', 'Dispatched', 'Delivered'];
                const currentIdx = statuses.indexOf(order.status);

                return (
                  <div key={order.id} className="bg-[#FFFFFF] border border-[#171717] p-6 sm:p-8 shadow-sm space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#8B8176]/20 gap-3">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-base text-[#171717]">{order.id}</span>
                          <span className={`text-[9.5px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 border ${
                            order.status === 'Delivered'
                              ? 'bg-[#171717] text-[#FFFFFF] border-[#171717]'
                              : 'bg-[#B49A78] text-[#171717] border-[#B49A78]'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8176] mt-1">
                          Placed on {order.date} • Courier Waybill: <span className="font-mono font-semibold text-[#171717]">{order.trackingNumber}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B8176] block">Order Total</span>
                        <span className="font-sans font-bold text-lg text-[#171717]">{formatPrice(order.totalINR)}</span>
                      </div>
                    </div>

                    {/* Tracking Timeline Progress */}
                    <div className="py-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B8176] font-bold block mb-3">
                        Consignment Trajectory
                      </span>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        {statuses.map((st, i) => {
                          const isDone = currentIdx >= i || order.status === 'Delivered';
                          return (
                            <div key={st} className="space-y-1.5">
                              <div className={`h-1.5 w-full ${isDone ? 'bg-[#171717]' : 'bg-[#EAE5DC]'}`} />
                              <span className={`text-[10px] uppercase tracking-wider block font-semibold ${
                                isDone ? 'text-[#171717]' : 'text-[#8B8176]'
                              }`}>
                                {st}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-[#8B8176] bg-[#FDF9F1] p-3 border border-[#8B8176]/15">
                        <span className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-[#B49A78]" />
                          <span>Estimated Arrival: <strong className="text-[#171717]">{order.estimatedDelivery}</strong></span>
                        </span>
                        <span>Courier: DHL Express Global</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 pt-2 border-t border-[#8B8176]/15">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center space-x-4">
                            <img src={item.product.images[0]} alt="" className="w-12 aspect-[3/4] object-cover border border-[#8B8176]/20" />
                            <div>
                              <h5 className="font-serif font-medium text-sm text-[#171717]">{item.product.name}</h5>
                              <p className="text-[#8B8176]">
                                Shade: {item.selectedColor.name} • Size: {item.selectedSize} • Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono font-semibold text-sm">{formatPrice(item.product.priceINR * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Destination */}
                    <div className="pt-3 border-t border-[#8B8176]/15 text-xs text-[#8B8176]">
                      <span className="uppercase tracking-wider font-semibold text-[10px] text-[#171717] block mb-0.5">
                        Destination Address:
                      </span>
                      <p>
                        {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#8B8176]/20 p-12 text-center">
                <Heart className="w-10 h-10 text-[#8B8176] mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#171717] mb-2">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#8B8176] mb-6">Save your admired couture pieces by clicking the heart icon on any product.</p>
                <button
                  onClick={() => openProductDetail(products[0].id)}
                  className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] py-3 px-6 hover:bg-[#B49A78] hover:text-[#171717] transition"
                >
                  Explore Highlights
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-[#FFFFFF] border border-[#171717] p-4 flex flex-col justify-between">
                    <div className="aspect-[3/4] bg-[#EAE5DC] overflow-hidden mb-3 relative">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover object-top" />
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute top-2 right-2 bg-white/90 p-1.5 border border-black/10 text-red-600 hover:text-black"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#B49A78] font-bold block">{p.culturalCategory}</span>
                      <h4 className="font-serif text-base font-medium text-[#171717] line-clamp-1">{p.name}</h4>
                      <span className="font-sans font-semibold text-sm text-[#171717] mt-1 block">{formatPrice(p.priceINR)}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#8B8176]/20 flex gap-2">
                      <button
                        onClick={() => addToCart(p, p.sizes[0], p.colors[0], 1)}
                        className="flex-1 bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-wider font-semibold py-2.5 hover:bg-[#B49A78] hover:text-[#171717] transition"
                      >
                        Add to Bag
                      </button>
                      <button
                        onClick={() => openProductDetail(p.id)}
                        className="border border-[#171717] px-3 py-2.5 text-[10px] uppercase tracking-wider font-semibold hover:bg-[#171717] hover:text-[#FFFFFF] transition"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl">Registered Consignment Locations</h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] font-semibold py-2 px-4 hover:bg-[#B49A78] hover:text-[#171717] transition flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Destination</span>
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="bg-[#FFFFFF] border border-[#171717] p-6 space-y-4 max-w-xl">
                <h4 className="font-serif text-base">New Address Dossier</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="col-span-2">
                    <label className="text-[10px] uppercase block font-bold text-[#8B8176] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] uppercase block font-bold text-[#8B8176] mb-1">Address Line 1</label>
                    <input
                      type="text"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase block font-bold text-[#8B8176] mb-1">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase block font-bold text-[#8B8176] mb-1">Postal PIN Code</label>
                    <input
                      type="text"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase block font-bold text-[#8B8176] mb-1">State</label>
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase block font-bold text-[#8B8176] mb-1">Country</label>
                    <input
                      type="text"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-wider font-bold px-4 py-2 hover:bg-[#B49A78] hover:text-[#171717]">
                    Save Address
                  </button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="border border-[#171717] text-[10px] uppercase tracking-wider font-bold px-4 py-2">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user?.addresses.map((addr, idx) => (
                <div key={idx} className="bg-[#FFFFFF] border border-[#8B8176]/25 p-6 flex justify-between items-start">
                  <div className="space-y-1.5 text-xs text-[#171717]">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-serif font-bold text-sm">{addr.fullName}</h5>
                      {idx === 0 && (
                        <span className="bg-[#B49A78] text-[#171717] text-[9px] uppercase tracking-wider px-1.5 py-0.5 font-bold">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-[#8B8176]">{addr.addressLine1}</p>
                    {addr.addressLine2 && <p className="text-[#8B8176]">{addr.addressLine2}</p>}
                    <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                    <p className="font-semibold">{addr.country}</p>
                    <p className="text-[#8B8176] pt-1">Phone: {addr.phone}</p>
                  </div>

                  {idx > 0 && (
                    <button
                      onClick={() => handleDeleteAddress(idx)}
                      className="text-[#8B8176] hover:text-[#ba1a1a] p-1"
                      title="Remove address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#FFFFFF] border border-[#171717] p-8 shadow-sm">
            <h3 className="font-serif text-xl pb-4 border-b border-[#8B8176]/20 mb-6">
              Patron Profile Dossier
            </h3>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider block font-bold text-[#8B8176] mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-[#FDF9F1] border border-[#8B8176]/30 p-2.5"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <button type="submit" className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-wider font-bold py-2.5 px-6 hover:bg-[#B49A78] hover:text-[#171717]">
                    Save Profile
                  </button>
                  <button type="button" onClick={() => setIsEditingProfile(false)} className="border border-[#171717] text-[10px] uppercase tracking-wider font-bold py-2.5 px-6">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#8B8176]/15">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8B8176] block">Full Name</span>
                    <span className="font-serif font-medium text-base text-[#171717]">{user?.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8B8176] block">Atelier Tier</span>
                    <span className="font-bold text-[#B49A78]">Private Client Circle (VIP)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#8B8176]/15">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8B8176] block">Email</span>
                    <span className="font-mono text-[#171717]">{user?.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8B8176] block">Phone</span>
                    <span className="font-mono text-[#171717]">{user?.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="border border-[#171717] text-[#171717] text-[10px] uppercase tracking-[0.2em] font-semibold py-2.5 px-6 hover:bg-[#171717] hover:text-[#FFFFFF] transition"
                  >
                    Edit Profile
                  </button>
                  <span className="text-[11px] text-[#8B8176] italic">Authentication: 2FA Active</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
