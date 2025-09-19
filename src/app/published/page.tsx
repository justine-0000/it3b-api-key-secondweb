"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Camera, MapPin, Calendar, DollarSign, Shield, ShieldCheck, Loader2, Lock, Users } from "lucide-react";

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

export default function PublishedPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const SignedOutView = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mx-auto w-32 h-32 flex items-center justify-center">
            <Lock className="text-white" size={48} />
          </div>
          <div className="absolute -top-2 -right-2 p-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-300/30">
            <Shield className="text-red-200" size={20} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Authentication Required</h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Please sign in to view published artifacts
          </p>
          <RedirectToSignIn />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SignedIn>
        <div 
          className="min-h-screen relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

          <div className="relative z-10 max-w-7xl mx-auto p-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Users className="text-white" size={24} />
                <span className="text-white font-medium">Public Gallery</span>
              </div>
              <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Published Artifacts
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                All artifacts registered in Web A are shown here
              </p>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-4">
                    <Loader2 className="animate-spin text-white" size={32} />
                    <span className="text-white text-xl">Loading artifacts...</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-8 p-6 bg-red-500/10 backdrop-blur-md text-red-200 rounded-2xl border border-red-400/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <Shield className="text-red-300" size={24} />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artifacts.map((artifact, index) => (
                <div
                  key={artifact.id}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-500 group"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    {artifact.imageUrl ? (
                      <img
                        src={artifact.imageUrl}
                        alt={artifact.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-48 bg-white/10 flex items-center justify-center rounded-2xl border-2 border-dashed border-white/20">
                        <Camera className="text-white/50" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        artifact.revoked 
                          ? 'bg-red-500/20 text-red-200 border border-red-400/30' 
                          : 'bg-green-500/20 text-green-200 border border-green-400/30'
                      } backdrop-blur-sm`}>
                        {artifact.revoked ? 'Revoked' : 'Active'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                      {artifact.name}
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/80">
                        <Calendar className="text-blue-300" size={16} />
                        <span className="text-sm">{artifact.period}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="text-green-300" size={16} />
                        <span className="text-sm">{artifact.origin}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <DollarSign className="text-yellow-300" size={16} />
                        <span className="text-sm font-semibold">${artifact.value}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="text-blue-300" size={14} />
                          <span className="text-xs text-white/60">
                            Created {new Date(artifact.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${artifact.revoked ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {artifacts.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
                  <Camera className="text-white/50 mx-auto mb-6" size={64} />
                  <h3 className="text-2xl font-bold text-white mb-4">No Artifacts Found</h3>
                  <p className="text-white/70">
                    No artifacts found.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <SignedOutView />
      </SignedOut>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
