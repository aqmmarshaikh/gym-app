"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Home, Dumbbell, Apple, LineChart, User, LogOut, ShieldAlert
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member } from "@/lib/db/mockData";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);
  const [errorStatus, setErrorStatus] = useState<Member["status"] | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Session check
      const session = dbService.getCurrentSession();
      
      // Login page bypass
      if (pathname === "/member") {
        if (session && session.type === "member") {
          router.push("/member/dashboard");
        } else {
          setLoading(false);
        }
        return;
      }

      if (!session || session.type !== "member") {
        router.push("/member");
        return;
      }

      const currentMember = dbService.getMemberByCode(session.id);
      if (!currentMember) {
        dbService.logout();
        router.push("/member");
        return;
      }

      if (currentMember.status === "Blocked" || currentMember.status === "Expired") {
        setErrorStatus(currentMember.status);
        setLoading(false);
        return;
      }

      setMember(currentMember);
      setLoading(false);
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    dbService.logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center bg-black min-h-screen">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-text-secondary mt-3">Loading member portal...</span>
      </div>
    );
  }

  // Handle Expired / Blocked screens
  if (errorStatus && pathname !== "/member") {
    const settings = dbService.getBrandSettings();
    return (
      <div className="flex-1 flex flex-col justify-center items-center bg-black px-6 text-center min-h-screen">
        <div className="p-4 bg-danger/10 text-danger border border-danger/20 rounded-full mb-4">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">
          {errorStatus === "Blocked" ? "Account Disabled" : "Membership Expired"}
        </h2>
        <p className="text-xs text-text-secondary mt-2 max-w-xs">
          {errorStatus === "Blocked" 
            ? "Your membership has been temporarily disabled. Please contact your coach."
            : "Your membership has expired. Please renew to access your workout and diet plans."}
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs mt-8">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello Fitness Corner Gym, I need help with my membership status.`}
            className="w-full bg-green/10 text-success border border-green/20 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            WhatsApp Coach
          </a>
          <a
            href={`tel:${settings.phone}`}
            className="w-full bg-gold/15 text-gold border border-gold/30 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            Call Head Office
          </a>
          <button
            onClick={handleLogout}
            className="w-full bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all mt-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Login page layout
  if (pathname === "/member") {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  const navItems = [
    { label: "Home", path: "/member/dashboard", icon: Home },
    { label: "Workout", path: "/member/workout", icon: Dumbbell },
    { label: "Diet", path: "/member/diet", icon: Apple },
    { label: "Progress", path: "/member/progress", icon: LineChart },
    { label: "Card", path: "/member/profile", icon: User }
  ];

  return (
    <div className="flex-grow flex flex-col min-h-screen bg-black pb-24 relative">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-card border-b border-white/[0.05] bg-black/85 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/30">
            {member && (
              <Image
                src={member.photoUrl}
                alt={member.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h4 className="text-white text-xs font-bold leading-none">{member?.name}</h4>
            <span className="text-[9px] text-gold font-bold tracking-widest">{member?.code}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 bg-white/5 rounded-xl text-text-secondary hover:text-white border border-white/5 flex items-center justify-center active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4 text-gold" />
        </button>
      </header>

      {/* Portal Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Bottom Tabs */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-black/90 backdrop-blur-md border-t border-white/[0.05] py-2 px-2 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "text-gold font-semibold scale-105" 
                  : "text-text-secondary opacity-65 hover:opacity-100"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-gold" : "text-text-secondary"}`} />
              <span className="text-[10px] tracking-wider uppercase">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
