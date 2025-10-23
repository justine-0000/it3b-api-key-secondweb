"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Package, Home, Info, Mail, Sparkles, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function TopNav() {
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateCartCount = () => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const items = JSON.parse(stored);
      const total = items.reduce((acc: any, item: any) => acc + item.quantity, 0);

      // Trigger bounce if cartCount increases
      if (total > cartCount) {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
      }

      setCartCount(total);
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    const handleStorage = () => updateCartCount();

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/10"
          : "bg-slate-900/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              MuseoLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <SignedIn>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <Home size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <Package size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Orders</span>
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <Info size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">About</span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Contact</span>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 text-white hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 group ${
                  bounce ? "animate-bounce" : ""
                }`}
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Button */}
              <div className="ml-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-purple-400/50 ring-offset-2 ring-offset-slate-900"
                    }
                  }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <SignedIn>
              <Link
                href="/cart"
                className={`relative p-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 ${
                  bounce ? "animate-bounce" : ""
                }`}
              >
                <ShoppingCart size={20} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
            <SignedIn>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Home size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Package size={20} />
                <span className="font-medium">Orders</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Info size={20} />
                <span className="font-medium">About</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Mail size={20} />
                <span className="font-medium">Contact</span>
              </Link>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3 px-4">
                <span className="text-white/60 text-sm">Account:</span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-purple-400/50"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}