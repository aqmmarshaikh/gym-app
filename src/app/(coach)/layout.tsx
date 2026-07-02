"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, Users, QrCode, LogOut
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Coach } from "@/lib/db/mockData";

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = dbService.getCurrentSession();
      
      // Login page bypass
      if (pathname === "/coach") {
        if (session && session.type === "coach") {
          router.push("/coach/dashboard");
        } else {
          setLoading(false);
        }
        return;
      }

      if (!session || session.type !== "coach") {
        router.push("/coach");
        return;
      }

      const currentCoach = dbService.getCoachById(session.id);
      if (!currentCoach) {
        dbService.logout();
        router.push("/coach");
        return;
      }

      setCoach(currentCoach);
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
        <span className="text-xs text-text-secondary mt-3">Loading coach console...</span>
      </div>
    );
  }

  // Login page layout
  if (pathname === "/coach") {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  const navItems = [
    { label: "Dashboard", path: "/coach/dashboard", icon: LayoutDashboard },
    { label: "Members", path: "/coach/members", icon: Users },
    { label: "Scanner", path: "/coach/attendance", icon: QrCode }
  ];

  return (
    <div className="flex-grow flex flex-col min-h-screen bg-black pb-24 relative">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-card border-b border-white/[0.05] bg-black/85 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/30">
            {coach && (
              <Image
                src={coach.photoUrl}
                alt={coach.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h4 className="text-white text-xs font-bold leading-none">{coach?.name}</h4>
            <span className="text-[9px] text-gold font-bold tracking-widest">COACH PANEL</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 bg-white/5 rounded-xl text-text-secondary hover:text-white border border-white/5 flex items-center justify-center active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4 text-gold" />
        </button>
      </header>

      {/* Coach Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Bottom Tabs */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-black/90 backdrop-blur-md border-t border-white/[0.05] py-2 px-6 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-4 rounded-xl transition-all duration-300 ${
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
