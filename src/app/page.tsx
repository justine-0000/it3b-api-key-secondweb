"use client";

import { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Camera, Key, Database, Eye, Plus } from "lucide-react";

interface Artifact {
  id: string;
  name: string;       // Artifact name
  period: string;     // Historical period
  origin: string;     // Country/region
  value: number;      // Estimated value
  imageUrl?: string;
  createdAt: string;
  revoked: boolean;
}

export default function ArtifactDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [postBody, setPostBody] = useState(
    '{"name":"Ancient Vase","period":"Ming Dynasty","origin":"China","value":10000,"imageUrl":"https://example.com/vase.jpg"}'
  );
  const [message, setMessage] = useState("");

  // GET → fetch single artifact
  async function runGET() {
    if (!apiKey) {
      setMessage("❌ Please enter your API Key");
      return;
    }
    try {
      const res = await fetch("/api/proxy", {
        headers: { "x-api-key": apiKey },
      });
      const data = await res.json();

      if (res.ok) {
        setArtifact(data);
        setMessage("✅ Artifact fetched successfully");
      } else {
        setArtifact(null);
        setMessage("❌ " + (data.error || "Failed to fetch artifact"));
      }
    } catch (err) {
      setArtifact(null);
      setMessage("❌ Error: " + (err as Error).message);
    }
  }

  // POST → add artifact
  async function runPOST() {
    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
        body: postBody,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Artifact added successfully!");
        runGET(); // fetch the new artifact
      } else {
        setMessage("❌ " + (data.error || "Failed to add artifact"));
      }
    } catch (err) {
      setMessage("❌ Error: " + (err as Error).message);
    }
  }

  return (
    <>
      {/* Only show dashboard if signed in */}
      <SignedIn>
        <div 
          className="min-h-screen relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

          <div className="relative z-10 p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Camera className="text-white" size={24} />
                <span className="text-white font-medium">Museum Collection</span>
              </div>
              <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-cyan-100 to-teal-200 bg-clip-text text-transparent">
                Artifact Dashboard
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Manage your museum's digital artifact collection with modern tools and intuitive interface
              </p>
            </div>

            {/* API Key + JSON Panel */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* API Key Input */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/20 rounded-xl">
                    <Key className="text-cyan-200" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">API Configuration</h2>
                </div>
                <div className="space-y-6">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your sk_live_xxx API key"
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={runGET}
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <Eye size={20} />
                      FETCH ARTIFACT
                    </button>
                    <button
                      onClick={runPOST}
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <Plus size={20} />
                      ADD ARTIFACT
                    </button>
                  </div>
                </div>
              </div>

              {/* JSON Payload Editor */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-teal-500/20 rounded-xl">
                    <Database className="text-teal-200" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">JSON Payload</h2>
                </div>
                <textarea
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-4 bg-black/20 border border-white/20 rounded-xl text-white font-mono text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder='{"name":"Ancient Vase","period":"Ming Dynasty","origin":"China","value":10000,"imageUrl":"https://..."}'
                />
              </div>
            </div>

            {/* Status Message */}
            {message && (
              <div className="mb-8 p-4 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${message.includes('✅') ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                  {message}
                </div>
              </div>
            )}

            {/* Artifact Display */}
            {artifact && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-xl">
                    <Camera className="text-cyan-200" size={28} />
                  </div>
                  Artifact Details
                </h2>
                
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Image */}
                  <div className="lg:col-span-1 flex justify-center">
                    <div className="relative group">
                      {artifact.imageUrl ? (
                        <img
                          src={artifact.imageUrl}
                          alt={artifact.name}
                          className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-80 h-80 bg-white/10 flex items-center justify-center rounded-3xl border-4 border-white/20 group-hover:scale-105 transition-transform duration-300">
                          <Camera className="text-white/50" size={80} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-sm text-white/60 mb-2">Name</div>
                        <div className="text-2xl font-bold text-white">{artifact.name}</div>
                      </div>
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-sm text-white/60 mb-2">Period</div>
                        <div className="text-2xl font-bold text-white">{artifact.period}</div>
                      </div>
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-sm text-white/60 mb-2">Origin</div>
                        <div className="text-2xl font-bold text-white">{artifact.origin}</div>
                      </div>
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-sm text-white/60 mb-2">Estimated Value</div>
                        <div className="text-2xl font-bold text-emerald-300">${artifact.value}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-sm text-white/60 mb-2">Status</div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${artifact.revoked ? "bg-red-400" : "bg-green-400"} animate-pulse`}></div>
                          <span className={`font-bold ${artifact.revoked ? "text-red-300" : "text-green-300"}`}>
                            {artifact.revoked ? "REVOKED" : "ACTIVE"}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-sm text-white/60 mb-2">Created At</div>
                        <div className="text-lg text-white">{new Date(artifact.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SignedIn>

      {/* Redirect to sign-in if not signed in */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}