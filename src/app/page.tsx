"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Camera, MapPin, Calendar, DollarSign, Shield, ShieldCheck, Loader2, Lock, Users, ShoppingCart, Search, Star, Sparkles, Heart, TrendingUp, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Artifact {
  id: string;
  name: string;
  period: string;
  origin: string;
  value: number;
  imageUrl?: string;
  createdAt: string;
  revoked: boolean;
}

interface CartItem extends Artifact {
  cartId: string;
  quantity: number;
}

export default function PublishedPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const router = useRouter();

  const fetchArtifacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/published");
      const data = await res.json();

      setArtifacts(data.items ?? []);
      setError(data.error ?? "");
    } catch (err) {
      setArtifacts([]);
      setError("Error fetching artifacts: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchArtifacts();
  }, []);

  const addToCart = (artifact: Artifact) => {
    const cartId = `${artifact.id}-${Date.now()}`;
    const cartItem: CartItem = {
      ...artifact,
      cartId,
      quantity: 1
    };
    
    setCart([...cart, cartItem]);
    setAddedItems(new Set([...addedItems, artifact.id]));
    
    const currentCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    currentCart.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(currentCart));
  };

  const toggleFavorite = (artifactId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(artifactId)) {
      newFavorites.delete(artifactId);
    } else {
      newFavorites.add(artifactId);
    }
    setFavorites(newFavorites);
  };

  const viewCart = () => {
    router.push("/cart");
  };

  const openImageModal = (imageUrl: string, name: string) => {
    setSelectedImage({ url: imageUrl, name });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const filteredArtifacts = artifacts.filter(artifact =>
    artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artifact.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artifact.period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SignedOutView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '700ms'}}></div>
      </div>
      <div className="relative text-center space-y-8 p-8">
        <div className="relative inline-block">
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <Lock className="text-purple-300" size={64} />
          </div>
          <div className="absolute -top-3 -right-3 p-3 bg-purple-500/20 backdrop-blur-sm rounded-2xl border border-purple-300/30">
            <Shield className="text-purple-200 animate-pulse" size={24} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            Authentication Required
          </h2>
          <p className="text-white/70 text-xl max-w-md mx-auto">
            Please sign in to explore our exclusive artifact collection
          </p>
          <RedirectToSignIn />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-24">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '700ms'}}></div>
            <div className="absolute -bottom-48 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1000ms'}}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                <Sparkles className="text-purple-300" size={28} />
                <span className="text-white font-bold text-lg">Artifact Marketplace</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <div className="text-2xl font-bold text-white">{artifacts.length}</div>
                  <div className="text-xs text-white/60">Total Items</div>
                </div>
                <button
                  onClick={viewCart}
                  className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl border border-purple-400/30 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50 group"
                >
                  <ShoppingCart className="text-white group-hover:animate-bounce" size={24} />
                  <span className="text-white font-semibold text-lg">Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-400/30 mb-6">
                <Star className="text-yellow-400" size={16} />
                <span className="text-purple-200 text-sm font-semibold">Premium Collection</span>
                <Star className="text-yellow-400" size={16} />
              </div>
              <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                Published Artifacts
              </h1>
              <p className="text-2xl text-white/70 max-w-3xl mx-auto mb-8">
                Discover rare and authentic artifacts from around the world
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-200 transition-colors" size={24} />
                  <input
                    type="text"
                    placeholder="Search by name, origin, or period..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-16 py-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 rounded-full p-2 hover:bg-white/20"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-4 text-white/60">
                    Found <span className="text-purple-300 font-semibold">{filteredArtifacts.length}</span> artifact{filteredArtifacts.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-32">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
                  <div className="flex flex-col items-center gap-6">
                    <Loader2 className="animate-spin text-purple-300" size={48} />
                    <span className="text-white text-2xl font-semibold">Loading artifacts...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mb-8 p-6 bg-red-500/10 backdrop-blur-xl text-red-200 rounded-2xl border border-red-400/30 shadow-lg">
                <div className="flex items-center gap-4">
                  <Shield className="text-red-300" size={28} />
                  <span className="font-medium text-lg">{error}</span>
                </div>
              </div>
            )}

            {/* Artifacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredArtifacts.map((artifact, index) => (
                <div
                  key={artifact.id}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 100}ms forwards`,
                    opacity: 0
                  }}
                >
                  {/* Image Section */}
                  <div 
                    className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 cursor-pointer"
                    onClick={() => artifact.imageUrl && openImageModal(artifact.imageUrl, artifact.name)}
                  >
                    {artifact.imageUrl ? (
                      <img
                        src={artifact.imageUrl}
                        alt={artifact.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="text-white/30" size={64} />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md ${
                        artifact.revoked 
                          ? 'bg-red-500/30 text-red-100 border border-red-400/50' 
                          : 'bg-green-500/30 text-green-100 border border-green-400/50'
                      } shadow-lg`}>
                        {artifact.revoked ? '⛔ Revoked' : '✓ Active'}
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(artifact.id);
                      }}
                      className="absolute top-4 left-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      <Heart 
                        className={`transition-all duration-300 ${favorites.has(artifact.id) ? 'text-red-400 fill-red-400' : 'text-white'}`} 
                        size={20} 
                      />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-yellow-500/20 backdrop-blur-md rounded-xl border border-yellow-400/30">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-yellow-300" size={20} />
                        <span className="text-white font-bold text-xl">{artifact.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                      {artifact.name}
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/70">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Calendar className="text-blue-300" size={16} />
                        </div>
                        <span className="text-sm font-medium">{artifact.period}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <MapPin className="text-green-300" size={16} />
                        </div>
                        <span className="text-sm font-medium">{artifact.origin}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="text-purple-300" size={16} />
                          <span className="text-xs text-white/50">
                            {new Date(artifact.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${artifact.revoked ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
                      </div>

                      <button
                        onClick={() => addToCart(artifact)}
                        disabled={artifact.revoked || addedItems.has(artifact.id)}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                          artifact.revoked
                            ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-600/30'
                            : addedItems.has(artifact.id)
                            ? 'bg-green-500/20 text-green-200 border-2 border-green-400/50 shadow-lg shadow-green-500/20'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400/30 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50'
                        }`}
                      >
                        <ShoppingCart size={20} />
                        {artifact.revoked ? 'Unavailable' : addedItems.has(artifact.id) ? '✓ In Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredArtifacts.length === 0 && !loading && (
              <div className="text-center py-32">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/10 max-w-2xl mx-auto shadow-2xl">
                  <div className="bg-purple-500/10 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                    <Camera className="text-purple-300" size={64} />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4">
                    {searchQuery ? 'No Matches Found' : 'No Artifacts Available'}
                  </h3>
                  <p className="text-white/60 text-xl mb-8">
                    {searchQuery 
                      ? `We couldn't find any artifacts matching "${searchQuery}"`
                      : 'Check back soon for new additions to our collection'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Stats Footer */}
            {filteredArtifacts.length > 0 && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
                  <TrendingUp className="text-green-400 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">{artifacts.filter(a => !a.revoked).length}</div>
                  <div className="text-white/60">Active Listings</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
                  <Star className="text-yellow-400 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">{favorites.size}</div>
                  <div className="text-white/60">Favorited Items</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center">
                  <ShoppingCart className="text-purple-400 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">{cart.length}</div>
                  <div className="text-white/60">Items in Cart</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
            onClick={closeImageModal}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-90 z-50"
            >
              <X className="text-white" size={32} />
            </button>
            
            <div 
              className="relative max-w-7xl max-h-[90vh] mx-8 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-2xl font-bold text-white text-center">{selectedImage.name}</h3>
                </div>
                <div className="p-8">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <SignedOutView />
      </SignedOut>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}