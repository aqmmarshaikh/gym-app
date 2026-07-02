"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Info, UserPlus, UserCheck, Settings } from "lucide-react";
import { dbService } from "@/lib/db/service";

export default function EntryPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [demoMode, setDemoMode] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if session already exists and is valid
    const session = dbService.getCurrentSession();
    
    const timer = setTimeout(() => {
      if (session) {
        // Automatically route to appropriate dashboard if session is remembered
        if (session.type === "member") {
          router.push("/member/dashboard");
          return;
        } else if (session.type === "coach") {
          router.push("/coach/dashboard");
          return;
        } else if (session.type === "owner") {
          router.push("/owner/dashboard");
          return;
        }
      }
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  const toggleDemoMode = () => {
    const nextMode = !demoMode;
    setDemoMode(nextMode);
    dbService.setDemoMode(nextMode);
  };

  const handleSeedFirestore = async () => {
    setSeeding(true);
    setSeedMsg("");
    const res = await dbService.seedFirestoreDatabase();
    setSeeding(false);
    setSeedMsg(res.message);
    setTimeout(() => setSeedMsg(""), 4000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-black relative select-none overflow-hidden h-full min-h-screen">
      <AnimatePresence mode="wait">
        {showSplash ? (
          /* CINEMATIC SPLASH SCREEN */
          <motion.div
            key="splash"
            className="absolute inset-0 flex flex-col justify-center items-center bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            {/* Ambient Background Gold Glow */}
            <div className="absolute w-[200px] h-[200px] bg-gold/15 rounded-full blur-[80px]" />
            
            {/* Cinematic Slow Zoom on Logo */}
            <motion.div
              className="relative w-64 h-64 flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            >
              <Image
                src="/logo.png"
                alt="Fitness Corner Gym Logo"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.45)] animate-glow"
              />
            </motion.div>

            {/* Particle Glow Lights */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
          </motion.div>
        ) : (
          /* HOME SELECTION SCREEN */
          <motion.div
            key="home-selection"
            className="flex-1 flex flex-col justify-between px-6 py-10 z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Top Bar / Logo */}
            <div className="flex flex-col items-center mt-6">
              <div className="relative w-20 h-20 mb-2">
                <Image
                  src="/logo.png"
                  alt="Fitness Corner Gym"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold tracking-widest text-white uppercase">
                Fitness Corner Gym
              </h1>
              <p className="text-xs text-gold tracking-widest uppercase mt-1">
                Luxury Fitness Club
              </p>
            </div>

            {/* Selection Options - 4 Premium Cards */}
            <div className="grid grid-cols-1 gap-4 my-8">
              {/* Member Card */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/member")}
                className="glass-card flex items-center p-5 rounded-2xl border border-gold/15 bg-white/[0.03] text-left relative overflow-hidden transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
              >
                <div className="p-3 bg-gold/10 rounded-xl text-gold border border-gold/20 mr-4">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">Gym Member</h3>
                  <p className="text-text-secondary text-xs mt-0.5">Access your workouts, diets & digital card</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full absolute right-4 top-1/2 -translate-y-1/2" />
              </motion.button>

              {/* Gym Information Card */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/about")}
                className="glass-card flex items-center p-5 rounded-2xl border border-gold/15 bg-white/[0.03] text-left relative overflow-hidden transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
              >
                <div className="p-3 bg-gold/10 rounded-xl text-gold border border-gold/20 mr-4">
                  <Info className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">Gym Information</h3>
                  <p className="text-text-secondary text-xs mt-0.5">Explore our premium facilities & equipment</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full absolute right-4 top-1/2 -translate-y-1/2" />
              </motion.button>

              {/* Become a Member Card */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/become-member")}
                className="glass-card flex items-center p-5 rounded-2xl border border-gold/15 bg-white/[0.03] text-left relative overflow-hidden transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
              >
                <div className="p-3 bg-gold/10 rounded-xl text-gold border border-gold/20 mr-4">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">Become a Member</h3>
                  <p className="text-text-secondary text-xs mt-0.5">Join the community & start your journey</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full absolute right-4 top-1/2 -translate-y-1/2" />
              </motion.button>

              {/* Coach Login Card */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/coach")}
                className="glass-card flex items-center p-5 rounded-2xl border border-gold/15 bg-white/[0.03] text-left relative overflow-hidden transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
              >
                <div className="p-3 bg-gold/10 rounded-xl text-gold border border-gold/20 mr-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">Coach Login</h3>
                  <p className="text-text-secondary text-xs mt-0.5">Manage members, builds plans & scans QR</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full absolute right-4 top-1/2 -translate-y-1/2" />
              </motion.button>
            </div>

             {/* Footer & Demo Mode Control */}
            <div className="flex flex-col items-center gap-3">
              <div 
                onClick={toggleDemoMode}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-gold/20 text-xs cursor-pointer select-none transition-all active:scale-95 bg-gold/5"
              >
                <Settings className={`w-3.5 h-3.5 text-gold ${demoMode ? 'animate-spin' : ''}`} />
                <span className="text-text-secondary">Demo Database Mode:</span>
                <span className={`font-semibold ${demoMode ? 'text-green' : 'text-danger'}`}>
                  {demoMode ? "ACTIVE (Offline Mode)" : "FIREBASE"}
                </span>
              </div>
              
              {!demoMode && (
                <button
                  onClick={handleSeedFirestore}
                  disabled={seeding}
                  className="px-4 py-2 rounded-full border border-gold/30 bg-gold/10 hover:bg-gold/20 text-[10px] font-bold text-gold active:scale-95 transition-all disabled:opacity-50"
                >
                  {seeding ? "Seeding Cloud..." : "Seed Firebase Firestore"}
                </button>
              )}

              {seedMsg && (
                <p className="text-[9px] text-gold font-bold tracking-wide text-center">{seedMsg}</p>
              )}

              <p className="text-[10px] text-text-secondary/50 tracking-wider mt-1">
                Fitness Corner Gym GMS v1.0.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
