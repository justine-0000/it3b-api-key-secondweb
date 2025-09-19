"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
     
      <div className="text-2xl font-bold text-blue-600">MuseoLink</div>

      <div className="flex items-center gap-10 text-base font-medium">
        <SignedIn>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/published" className="hover:text-blue-600 transition-colors">
            Published
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <div className="cursor-pointer">
            <SignInButton>Sign In</SignInButton>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
