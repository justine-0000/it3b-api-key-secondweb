"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Image, BookOpen, Server, Sparkles } from "lucide-react";

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

          <main className="relative z-10 flex min-h-screen items-center justify-center p-8">
            {/* Card with glassmorphism effect */}
            <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-300">
              
              <CardHeader>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Sparkles className="text-white" size={24} />
                    <span className="text-white font-medium">About Platform</span>
                  </div>
                  <CardTitle className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent">
                    About MuseoLink
                  </CardTitle>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Bridging the gap between cultural heritage and modern technology
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-300/20">
                    <BookOpen className="w-7 h-7 text-blue-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Smart Platform Design</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      <span className="font-semibold text-blue-200">MuseoLink</span> is a platform
                      designed to make working with museum data{" "}
                      <span className="font-semibold text-blue-200">simple, secure, and efficient</span>.
                      It allows developers and researchers to easily{" "}
                      <span className="font-semibold text-white">create, organize, and access APIs</span>{" "}
                      for cultural and historical content.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-emerald-500/20 backdrop-blur-sm rounded-xl border border-emerald-300/20">
                    <Image className="w-7 h-7 text-emerald-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Seamless Integration</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      Through{" "}
                      <a
                        href="https://it3b-api-key-act6.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-lg font-medium hover:bg-emerald-500/30 transition-all duration-200 hover:underline border border-emerald-300/20"
                      >
                        it3b-api-key-act6.vercel.app
                      </a>
                      , users can upload{" "}
                      <span className="font-semibold text-emerald-200">images and descriptions</span> of artifacts
                      or exhibits. Once uploaded, these entries are automatically
                      converted into API data that can be fetched and displayed on
                      this website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-indigo-500/20 backdrop-blur-sm rounded-xl border border-indigo-300/20">
                    <Server className="w-7 h-7 text-indigo-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Enterprise Ready</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      With a clean dashboard, secure authentication powered by{" "}
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded-lg font-semibold border border-indigo-300/20">Clerk</span>, and the
                      performance of <span className="px-2 py-1 bg-indigo-500/20 text-indigo-200 rounded-lg font-semibold border border-indigo-300/20">Next.js</span>,
                      MuseoLink ensures a seamless experience for developers while
                      preserving the{" "}
                      <span className="italic font-medium text-indigo-200">richness of cultural collections</span>.
                    </p>
                  </div>
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