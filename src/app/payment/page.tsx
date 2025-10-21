"use client";

import { useEffect, useState } from "react";
import { Loader2, CreditCard, Smartphone, Wallet, CheckCircle2, Package, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  period: string;
  origin: string;
  value: number;
  imageUrl?: string;
  quantity: number;
  cartId: string;
}

interface ShippingData {
  email: string;
  firstName: string;
  lastName: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
}

interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  shipping: ShippingData;
  timestamp: string;
  paymentMethod: string;
  estimatedDelivery: string;
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    const savedShipping = sessionStorage.getItem("shippingData");
    if(savedCart) setCartItems(JSON.parse(savedCart));
    if(savedShipping) setShippingData(JSON.parse(savedShipping));
    setLoading(false);
  }, []);

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.value*item.quantity, 0);

  const handlePlaceOrder = () => {
    if(!selectedMethod) { 
      alert("Please select a payment method"); 
      return; 
    }
    setProcessing(true);

    setTimeout(() => {
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate()+5);

      const newOrderId = `PH-${Date.now()}`;
      const order: OrderData = {
        orderId: newOrderId,
        items: cartItems,
        total: getTotalPrice(),
        shipping: shippingData!,
        timestamp: new Date().toISOString(),
        paymentMethod: selectedMethod,
        estimatedDelivery: estimatedDelivery.toLocaleDateString("en-PH",{dateStyle:"long"})
      };

      const savedOrders = localStorage.getItem("orders");
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      const remainingCart = sessionStorage.getItem("remainingCart");
      if(remainingCart) sessionStorage.setItem("cart", remainingCart);

      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("shippingData");
      sessionStorage.removeItem("remainingCart");

      setOrderId(newOrderId);
      setOrderConfirmed(true);
      setProcessing(false);

      setTimeout(() => {
        window.location.href = "/orders";
      }, 3000);
    }, 1500);
  };

  if(loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 animate-pulse"></div>
          <Loader2 className="animate-spin text-purple-400 relative z-10" size={64}/>
        </div>
      </div>
    );
  }

  if(orderConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl w-full text-center animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/10">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-green-500 blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="text-white animate-scaleIn" size={64} />
                </div>
              </div>

              <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-green-200 via-emerald-200 to-green-200 bg-clip-text text-transparent tracking-tight">
                Order Confirmed!
              </h1>

              <p className="text-2xl text-white font-semibold mb-4">
                Thank you for your purchase!
              </p>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8 max-w-md mx-auto">
                <p className="text-green-300/70 text-sm mb-2">Order ID</p>
                <p className="text-white font-mono font-bold text-xl">#{orderId}</p>
              </div>

              <p className="text-purple-300/70 text-lg mb-8">
                Your order has been placed successfully.<br />
                Redirecting to your orders...
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(!shippingData || cartItems.length===0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div className="text-center bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 max-w-md">
            <Package className="text-purple-400/50 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">No Cart Data</h2>
            <p className="text-purple-300/70">Please add items to cart and complete shipping info.</p>
          </div>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { 
      id: "GCash", 
      name: "GCash", 
      icon: Smartphone, 
      gradient: "from-blue-500 to-cyan-500", 
      desc: "Fast and secure mobile payment",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-400/30"
    },
    { 
      id: "Maya", 
      name: "Maya", 
      icon: CreditCard, 
      gradient: "from-green-500 to-emerald-500", 
      desc: "Digital wallet payments",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-400/30"
    },
    { 
      id: "Cash on Delivery", 
      name: "Cash on Delivery", 
      icon: Wallet, 
      gradient: "from-orange-500 to-amber-500", 
      desc: "Pay when you receive your order",
      bgGradient: "from-orange-500/10 to-amber-500/10",
      borderColor: "border-orange-400/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-purple-500/30">
            <CreditCard className="text-purple-300" size={28} />
            <span className="text-white font-semibold text-lg">Secure Payment</span>
          </div>
          <h1 className="text-7xl sm:text-8xl font-black mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent tracking-tight">
            Payment
          </h1>
          <p className="text-purple-300/70 text-lg">Choose your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                  <ShieldCheck className="text-purple-300" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Select Payment Method</h2>
                  <p className="text-purple-300/70 text-sm mt-1">All transactions are secure and encrypted</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {paymentMethods.map(method => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                        isSelected
                          ? `bg-gradient-to-r ${method.bgGradient} ${method.borderColor} scale-[1.02] shadow-lg`
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`p-4 rounded-2xl border ${
                          isSelected 
                            ? `bg-gradient-to-br ${method.gradient} border-white/20` 
                            : 'bg-white/5 border-white/10 group-hover:border-white/20'
                        }`}>
                          <Icon className={isSelected ? 'text-white' : 'text-purple-300'} size={32} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{method.name}</h3>
                          <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-purple-300/70'}`}>
                            {method.desc}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-2">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                              <CheckCircle2 className="text-white" size={20} />
                            </div>
                          </div>
                        )}
                      </div>

                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="text-purple-300" size={20} />
                  <h4 className="text-white font-semibold">Secure Transaction</h4>
                </div>
                <p className="text-purple-200/70 text-sm">
                  Your payment information is encrypted and secure. We never store your sensitive payment details.
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing || !selectedMethod}
                className="group relative w-full py-5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 overflow-hidden"
              >
                {processing ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={24} />
                    Processing Order...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Place Order - ${getTotalPrice().toLocaleString()}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                  </span>
                )}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                  <Package className="text-purple-300" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.cartId} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    {item.imageUrl ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="text-purple-400/50" size={20} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-purple-300/70 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">${(item.value * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-6 border-t border-white/10">
                <div className="flex justify-between text-purple-300/80">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-white font-semibold">${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-purple-300/80">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold flex items-center gap-1">
                    <Sparkles size={14} />
                    FREE
                  </span>
                </div>
              </div>

              <div className="relative mb-6">
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

              {shippingData && (
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-purple-300/60 text-xs mb-2">Shipping to:</p>
                  <p className="text-white font-semibold text-sm">
                    {shippingData.firstName} {shippingData.lastName}
                  </p>
                  <p className="text-purple-300/70 text-xs mt-1">
                    {shippingData.city}, {shippingData.province}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}