"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Mail, User, MessageSquare, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [messageText, setMessageText] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setMessageText("");

    const form = e.target as HTMLFormElement;
    const timeInput = document.createElement("input");
    timeInput.type = "hidden";
    timeInput.name = "time";
    timeInput.value = new Date().toLocaleString();
    form.appendChild(timeInput);

    emailjs
      .sendForm(
        "service_4bhjhuc",
        "template_f6wp1jt",
        form,
        "U3YQDtmFa0nEKjdGg"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          setMessageText("✅ Message sent successfully!");
          setLoading(false);
          form.reset();
          form.removeChild(timeInput);

          // Hide the status message after 2 seconds
          setTimeout(() => {
            setStatus(null);
            setMessageText("");
          }, 1000);
        },
        (error) => {
          console.error(error.text);
          setStatus("error");
          setMessageText("❌ Failed to send. Please try again.");
          setLoading(false);
          form.removeChild(timeInput);

          // Hide the status message after 2 seconds
          setTimeout(() => {
            setStatus(null);
            setMessageText("");
          }, 2000);
        }
      );
  };

  return (
    <>
      <SignedIn>
        <div 
          className="min-h-screen relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #be185d 30%, #881337 70%, #4c1d95 100%)',
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
                    <span className="text-white font-medium">Contact Us</span>
                  </div>
                  <CardTitle className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent">
                    Concern / Feedback
                  </CardTitle>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Share your thoughts and help us improve MuseoLink
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={sendEmail} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-3 bg-rose-500/20 backdrop-blur-sm rounded-xl border border-rose-300/20">
                      <User className="w-6 h-6 text-rose-200" />
                    </div>
                    <Input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      required 
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-rose-300/40 transition-all duration-200"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-3 bg-rose-500/20 backdrop-blur-sm rounded-xl border border-rose-300/20">
                      <Mail className="w-6 h-6 text-rose-200" />
                    </div>
                    <Input 
                      type="email" 
                      name="user_email" 
                      placeholder="Your Email" 
                      required 
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-rose-300/40 transition-all duration-200"
                    />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-rose-500/20 backdrop-blur-sm rounded-xl border border-rose-300/20 mt-2">
                      <MessageSquare className="w-6 h-6 text-rose-200" />
                    </div>
                    <Textarea 
                      name="message" 
                      placeholder="Your Message" 
                      required 
                      className="min-h-[140px] bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-rose-300/40 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Status message */}
                  {status && (
                    <div className="text-center">
                      <p
                        className={`font-semibold text-lg px-4 py-2 rounded-lg backdrop-blur-sm ${
                          status === "success" 
                            ? "text-green-200 bg-green-500/20 border border-green-300/20" 
                            : "text-red-200 bg-red-500/20 border border-red-300/20"
                        }`}
                      >
                        {messageText}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-700 text-white hover:from-rose-700 hover:to-pink-800 border-none shadow-lg backdrop-blur-sm py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
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