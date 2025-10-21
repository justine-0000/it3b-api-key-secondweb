"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Package } from "lucide-react";
import { useEffect, useState } from "react";

export function TopNav() {
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);

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

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold bg-white/5 backdrop-blur-md">
      <div className="text-2xl font-bold text-blue-600">MuseoLink</div>

      <div className="flex items-center gap-6 text-base font-medium">
        <SignedIn>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/orders" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Package size={18} />
            Orders
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link
            href="/cart"
            className={`relative flex items-center transition-colors hover:text-blue-600 ${
              bounce ? "animate-bounce" : ""
            }`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 text-xs rounded-full bg-red-500 text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
