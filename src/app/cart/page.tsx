"use client";

import { useEffect, useState } from "react";
import { Trash2, ArrowLeft, Loader2, ShoppingCart, Package, Sparkles, CreditCard, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  period: string;
  origin: string;
  value: number;
  imageUrl?: string;
  cartId: string;
  quantity: number;
}

interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping">("cart");
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    email: "",
    firstName: "",
    lastName: "",
    barangay: "",
    city: "",
    province: "",
    zipCode: "",
    country: "Philippines"
  });

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          setCartItems([]);
          sessionStorage.removeItem("cart");
        }
      } catch {
        setCartItems([]);
        sessionStorage.removeItem("cart");
      }
    }
    setLoading(false);
  }, []);

  const removeFromCart = (cartId: string) => {
    const updatedCart = cartItems.filter(item => item.cartId !== cartId);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    const updatedCart = cartItems.map(item =>
      item.cartId === cartId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.value * item.quantity, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isShippingValid = () => {
    return (
      checkoutData.firstName &&
      checkoutData.lastName &&
      checkoutData.email &&
      checkoutData.barangay &&
      checkoutData.city &&
      checkoutData.province &&
      checkoutData.zipCode
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 animate-pulse"></div>
          <Loader2 className="animate-spin text-purple-400 relative z-10" size={64} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {checkoutStep !== "cart" && (
          <button
            onClick={() => setCheckoutStep("cart")}
            className="group flex items-center gap-2 px-6 py-3 mb-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            <ArrowLeft className="text-purple-300 group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-white font-medium">Back to Cart</span>
          </button>
        )}

        {/* Cart Step */}
        {checkoutStep === "cart" && (
          <>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-purple-500/30">
                <ShoppingCart className="text-purple-300" size={28} />
                <span className="text-white font-semibold text-lg">Your Shopping Cart</span>
              </div>
              <h1 className="text-7xl sm:text-8xl font-black mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent tracking-tight">
                Cart
              </h1>
              <p className="text-purple-300/70 text-lg">Review your selected artifacts</p>
            </div>

            {cartItems.length === 0 ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/10 text-center group hover:border-purple-500/30 transition-all duration-500">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <ShoppingCart className="text-purple-400/50 relative z-10 group-hover:scale-110 transition-transform" size={80} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Your cart is empty</h3>
                  <p className="text-purple-300/70 text-lg mb-8">Start adding amazing artifacts to your collection</p>
                  <div className="inline-flex items-center gap-2 text-purple-400">
                    <Sparkles size={20} />
                    <span>Browse our collection</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.cartId}
                      className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 group"
                      style={{animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`}}
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative flex-shrink-0">
                          {item.imageUrl ? (
                            <div className="relative overflow-hidden rounded-2xl w-32 h-32 mx-auto sm:mx-0">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                            </div>
                          ) : (
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30 mx-auto sm:mx-0">
                              <Package className="text-purple-400/50" size={40} />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                          <div className="flex flex-wrap gap-3 mb-3 justify-center sm:justify-start">
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-200 text-sm rounded-full border border-purple-500/30">
                              {item.period}
                            </span>
                            <span className="px-3 py-1 bg-pink-500/20 text-pink-200 text-sm rounded-full border border-pink-500/30">
                              {item.origin}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-end justify-between gap-4">
                          <div className="text-center sm:text-right">
                            <p className="text-purple-300/60 text-sm mb-1">Price</p>
                            <p className="text-3xl font-black bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                              ${item.value.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-1 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-purple-500/30 transition-all"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="text-white font-bold w-12 text-center text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-purple-500/30 transition-all"
                            >
                              <Plus size={18} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="group/btn w-full sm:w-auto px-4 py-2 bg-red-500/10 text-red-300 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/50"
                          >
                            <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                        <CreditCard className="text-purple-300" size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Summary</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-purple-300/80">Subtotal ({cartItems.length} items)</span>
                        <span className="text-white font-semibold">${getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-purple-300/80">Shipping</span>
                        <span className="text-green-400 font-semibold flex items-center gap-1">
                          <Sparkles size={16} />
                          FREE
                        </span>
                      </div>
                    </div>

                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-20"></div>
                      <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-white">Total</span>
                          <span className="text-4xl font-black bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                            ${getTotalPrice().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep("shipping")}
                      className="group relative w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Proceed to Checkout
                        <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Shipping Step */}
        {checkoutStep === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                    <Package className="text-purple-300" size={32} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white">Shipping Details</h1>
                    <p className="text-purple-300/70 mt-1">Where should we send your artifacts?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-white font-semibold text-sm uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-white font-semibold text-sm uppercase tracking-wider">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={checkoutData.firstName}
                        onChange={handleInputChange}
                        placeholder="Juan"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-white font-semibold text-sm uppercase tracking-wider">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={checkoutData.lastName}
                        onChange={handleInputChange}
                        placeholder="Dela Cruz"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white font-semibold text-sm uppercase tracking-wider">Street / Barangay *</label>
                    <input
                      type="text"
                      name="barangay"
                      value={checkoutData.barangay}
                      onChange={handleInputChange}
                      placeholder="Barangay 1"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-white font-semibold text-sm uppercase tracking-wider">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={checkoutData.city}
                        onChange={handleInputChange}
                        placeholder="Sta. Ana"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-white font-semibold text-sm uppercase tracking-wider">Province *</label>
                      <input
                        type="text"
                        name="province"
                        value={checkoutData.province}
                        onChange={handleInputChange}
                        placeholder="Pampanga"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white font-semibold text-sm uppercase tracking-wider">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={checkoutData.zipCode}
                      onChange={handleInputChange}
                      placeholder="2001"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!isShippingValid()}
                    onClick={() => {
                      sessionStorage.setItem("shippingData", JSON.stringify(checkoutData));
                      window.location.href = "/payment";
                    }}
                    className="group relative w-full py-5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 overflow-hidden mt-8"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Continue to Payment
                      <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-8">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-purple-300/80">Subtotal ({cartItems.length} items)</span>
                    <span className="text-white font-semibold">${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-purple-300/80">Shipping</span>
                    <span className="text-green-400 font-semibold">FREE</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        ${getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}