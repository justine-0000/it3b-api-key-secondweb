"use client";

import { useEffect, useState } from "react";
import { Truck, Trash2, Package, Calendar, CreditCard, MapPin, Mail, User, X, CheckCircle2, Clock } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  period: string;
  origin: string;
  value: number;
  quantity: number;
  cartId: string;
  imageUrl?: string;
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [cancelReceipt, setCancelReceipt] = useState<OrderData | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      const parsedOrders: OrderData[] = JSON.parse(savedOrders);
      parsedOrders.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setOrders(parsedOrders);
    }
  }, []);

  const cancelOrder = (orderId: string) => {
    const orderToCancel = orders.find((o) => o.orderId === orderId);
    if (!orderToCancel) return;
    
    setConfirmCancel(orderToCancel);
  };

  const confirmCancelOrder = () => {
    if (!confirmCancel) return;

    const updatedOrders = orders.filter((order) => order.orderId !== confirmCancel.orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setCancelReceipt(confirmCancel);
    setConfirmCancel(null);
  };

  if (orders.length === 0 && !cancelReceipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/10 text-center group hover:border-purple-500/30 transition-all duration-500">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Package className="text-purple-400/50 relative z-10 group-hover:scale-110 transition-transform" size={80} />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">No Orders Yet</h2>
              <p className="text-purple-300/70 text-lg">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-purple-500/30">
            <Package className="text-purple-300" size={28} />
            <span className="text-white font-semibold text-lg">Order History</span>
          </div>
          <h1 className="text-7xl sm:text-8xl font-black mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent tracking-tight">
            My Orders
          </h1>
          <p className="text-purple-300/70 text-lg">Track and manage your purchases</p>
        </div>

        {/* Cancelation Receipt Modal */}
        {cancelReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-red-900/90 to-red-950/90 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 max-w-md w-full shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-2xl border border-red-500/30">
                  <CheckCircle2 className="text-red-300" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white">Order Canceled</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-red-200/70 text-sm mb-1">Order ID</p>
                  <p className="text-white font-mono font-bold">#{cancelReceipt.orderId}</p>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-red-200/70 text-sm mb-1">Refund Amount</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                    ${cancelReceipt.total.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-red-200/70 text-sm mb-1">Canceled On</p>
                  <p className="text-white font-semibold">
                    {new Date().toLocaleString("en-PH", { dateStyle: "long", timeStyle: "short" })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCancelReceipt(null)}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Confirm Cancel Modal */}
        {confirmCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 max-w-lg w-full shadow-2xl animate-scaleIn">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-red-500 blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <X className="text-white" size={40} />
                  </div>
                </div>
                <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                  Cancel Order?
                </h2>
                <p className="text-purple-300/70 text-lg">
                  Are you sure you want to cancel this order?
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300/70">Order ID</span>
                  <span className="text-white font-mono font-bold">#{confirmCancel.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300/70">Items</span>
                  <span className="text-white font-semibold">{confirmCancel.items.length} {confirmCancel.items.length === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                    ${confirmCancel.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 mb-6">
                <p className="text-yellow-200/90 text-sm text-center">
                  ⚠️ This action cannot be undone. Your refund will be processed accordingly.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setConfirmCancel(null)}
                  className="py-3 px-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  Keep Order
                </button>
                <button
                  onClick={confirmCancelOrder}
                  className="py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.orderId}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              style={{animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`}}
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                    <Package className="text-purple-300" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Order #{order.orderId}</h2>
                    <div className="flex items-center gap-2 mt-1 text-purple-300/70">
                      <Calendar size={14} />
                      <p className="text-sm">
                        {new Date(order.timestamp).toLocaleString("en-PH", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-purple-300/60 text-sm mb-1">Total</p>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => cancelOrder(order.orderId)}
                    className="group/btn px-4 py-2 bg-red-500/10 text-red-300 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2 border border-red-500/30 hover:border-red-500/50"
                  >
                    <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Package size={18} />
                  Items in Order
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.cartId}
                      className="group/item bg-white/5 rounded-2xl p-3 border border-white/10 hover:border-purple-500/30 transition-all"
                    >
                      <div className="relative mb-3">
                        {item.imageUrl ? (
                          <div className="relative overflow-hidden rounded-xl aspect-square">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                          </div>
                        ) : (
                          <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                            <Package className="text-purple-400/50" size={24} />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                          x{item.quantity}
                        </div>
                      </div>
                      <p className="font-semibold text-sm text-white text-center truncate">{item.name}</p>
                      <p className="text-xs text-purple-300/60 text-center mt-1">${item.value.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Shipping Info */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Truck size={20} className="text-blue-300" />
                    Shipping Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User size={16} className="text-blue-300/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">
                          {order.shipping.firstName} {order.shipping.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail size={16} className="text-blue-300/70 mt-1 flex-shrink-0" />
                      <p className="text-blue-200/80 text-sm">{order.shipping.email}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-blue-300/70 mt-1 flex-shrink-0" />
                      <div className="text-blue-200/80 text-sm">
                        <p>{order.shipping.barangay}</p>
                        <p>
                          {order.shipping.city}, {order.shipping.province} {order.shipping.zipCode}
                        </p>
                        <p>{order.shipping.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment & Delivery Info */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-purple-300" />
                    Payment & Delivery
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-purple-300/60 text-xs mb-1">Payment Method</p>
                      <p className="text-white font-semibold">{order.paymentMethod}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-purple-300/60 text-xs mb-1 flex items-center gap-1">
                        <Clock size={12} />
                        Estimated Delivery
                      </p>
                      <p className="text-white font-semibold">{order.estimatedDelivery}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 rounded-xl border border-green-500/30">
                      <CheckCircle2 size={16} className="text-green-300" />
                      <span className="text-green-200 text-sm font-semibold">Order Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}