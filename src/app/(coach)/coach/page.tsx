"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, User } from "lucide-react";
import { dbService } from "@/lib/db/service";

export default function CoachLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill out all credentials.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(async () => {
      const res = await dbService.validateCoachLogin(username, password);
      setLoading(false);

      if (res.success) {
        router.push("/coach/dashboard");
      } else {
        setError(res.message);
      }
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-black min-h-screen text-white">
      {/* Gym Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-20 h-20 mb-3">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-widest text-white">Coach Portal</h2>
        <p className="text-xs text-text-secondary mt-1">Manage schedules, attendance & memberships</p>
      </div>

      {/* Form */}
      <motion.form 
        onSubmit={handleLogin}
        className="glass-card p-6 rounded-2xl border border-gold/15 bg-white/[0.02]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. strength_coach"
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white focus:border-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white focus:border-gold outline-none"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              className="p-3 bg-danger/10 border border-danger/20 rounded-xl flex items-start gap-2.5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ShieldAlert className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
              <span className="text-xs text-danger leading-relaxed">{error}</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="mt-2 w-full bg-gold text-black text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-hover transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              "Login to Dashboard"
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
