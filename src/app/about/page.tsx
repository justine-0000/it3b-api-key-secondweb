"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Image, BookOpen, Server, Sparkles, ShoppingCart, Shield, Database, Zap, Globe, Lock, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <SignedIn>
        <div 
          className="min-h-screen relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <main className="relative z-10 flex min-h-screen items-center justify-center p-8 pt-24">
            {/* Card with glassmorphism effect */}
            <Card className="w-full max-w-5xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-300">
              
              <CardHeader>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Sparkles className="text-white" size={24} />
                    <span className="text-white font-medium">About the Platform</span>
                  </div>
                  <CardTitle className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent">
                    MuseoLink ArtifactHub
                  </CardTitle>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                    A comprehensive digital marketplace connecting museums, collectors, and cultural institutions worldwide
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* System Overview */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-300/20">
                      <Database className="w-7 h-7 text-blue-200" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">What is ArtifactHub?</h3>
                      <p className="text-white/90 text-lg leading-relaxed">
                        <span className="font-semibold text-blue-200">ArtifactHub</span> is an advanced digital platform that bridges the gap between 
                        cultural heritage preservation and modern e-commerce. The system enables museums and cultural institutions to 
                        <span className="font-semibold text-white"> digitize, catalog, and publish</span> their artifact collections through a secure API infrastructure, 
                        while providing collectors and researchers with a <span className="font-semibold text-blue-200">premium marketplace experience</span>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dual System Architecture */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* API Management Side */}
                  <div className="flex items-start gap-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-300/20">
                    <div className="flex-shrink-0 p-3 bg-emerald-500/20 backdrop-blur-sm rounded-xl border border-emerald-300/20">
                      <Server className="w-7 h-7 text-emerald-200" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">API Management System</h3>
                      <p className="text-white/90 leading-relaxed">
                        Museums upload artifacts through our secure API platform at{" "}
                        <a
                          href="https://it3b-api-key-act6.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 bg-emerald-500/20 text-emerald-200 rounded-lg font-medium hover:bg-emerald-500/30 transition-all duration-200 hover:underline border border-emerald-300/20"
                        >
                          it3b-api-key-act6.vercel.app
                        </a>
                        . Each entry includes high-resolution images, detailed descriptions, historical period, origin, and valuation data.
                      </p>
                    </div>
                  </div>

                  {/* Marketplace Side */}
                  <div className="flex items-start gap-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/20">
                    <div className="flex-shrink-0 p-3 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-300/20">
                      <ShoppingCart className="w-7 h-7 text-purple-200" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">Public Marketplace</h3>
                      <p className="text-white/90 leading-relaxed">
                        Published artifacts are displayed on our <span className="font-semibold text-purple-200">premium marketplace</span>, where authenticated users can browse, search, favorite, and add items to their cart. The platform features advanced search capabilities and real-time inventory tracking.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Zap className="text-yellow-300" size={28} />
                    Core Features
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Secure Authentication</h4>
                        <p className="text-white/70 text-sm">Powered by Clerk for enterprise-grade user management and access control</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-semibold mb-1">RESTful API Integration</h4>
                        <p className="text-white/70 text-sm">Seamless data flow between API management system and marketplace</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Advanced Search & Filtering</h4>
                        <p className="text-white/70 text-sm">Search by name, origin, period, or value with real-time results</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Status Management</h4>
                        <p className="text-white/70 text-sm">Real-time tracking of artifact availability with revocation controls</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Shopping Cart System</h4>
                        <p className="text-white/70 text-sm">Session-based cart with quantity management and persistence</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Responsive Design</h4>
                        <p className="text-white/70 text-sm">Modern, mobile-first interface with glassmorphism effects</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="flex items-start gap-4 bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 backdrop-blur-sm rounded-2xl p-6 border border-indigo-300/20">
                  <div className="flex-shrink-0 p-3 bg-indigo-500/20 backdrop-blur-sm rounded-xl border border-indigo-300/20">
                    <Globe className="w-7 h-7 text-indigo-200" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-white">Built With Modern Technology</h3>
                    <p className="text-white/90 leading-relaxed">
                      The platform leverages <span className="px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded-lg font-semibold border border-indigo-300/20">Next.js</span> for 
                      server-side rendering and optimal performance, <span className="px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded-lg font-semibold border border-indigo-300/20">Clerk</span> for 
                      secure authentication, and integrates with external API services for real-time artifact data management.
                    </p>
                    <div className="flex gap-2 flex-wrap pt-2">
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium border border-indigo-300/20">Next.js</span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium border border-indigo-300/20">React</span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium border border-indigo-300/20">TypeScript</span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium border border-indigo-300/20">Clerk Auth</span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium border border-indigo-300/20">Tailwind CSS</span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium border border-indigo-300/20">RESTful API</span>
                    </div>
                  </div>
                </div>

                {/* User Experience */}
                <div className="flex items-start gap-4 bg-gradient-to-br from-pink-500/10 to-pink-500/5 backdrop-blur-sm rounded-2xl p-6 border border-pink-300/20">
                  <div className="flex-shrink-0 p-3 bg-pink-500/20 backdrop-blur-sm rounded-xl border border-pink-300/20">
                    <Image className="w-7 h-7 text-pink-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Seamless User Experience</h3>
                    <p className="text-white/90 leading-relaxed">
                      From browsing thousands of artifacts to managing favorites and cart items, every interaction is designed for 
                      <span className="font-semibold text-pink-200"> speed, clarity, and engagement</span>. High-resolution images, detailed metadata, 
                      and real-time status updates ensure users have all the information they need to make informed decisions.
                    </p>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="text-center p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Lock className="text-white/80 mx-auto mb-4" size={40} />
                  <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                  <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                    To preserve and democratize access to cultural heritage by providing museums and institutions with powerful digital tools, 
                    while creating a trusted marketplace that connects artifacts with collectors, researchers, and enthusiasts worldwide.
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}