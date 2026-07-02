"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Info, UserPlus, ArrowLeft, PhoneCall } from "lucide-react";
import { dbService } from "@/lib/db/service";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const settings = dbService.getBrandSettings();

  const navItems = [
    { label: "Gym Info", path: "/about", icon: Info },
    { label: "Join Gym", path: "/become-member", icon: UserPlus }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black pb-24 relative">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-card border-b border-white/[0.05] bg-black/85 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gold" />
          <span className="text-xs uppercase tracking-wider font-semibold">Exit</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-bold tracking-widest text-white uppercase">
            FCG
          </span>
        </div>

        <a 
          href={`tel:${settings.phone}`}
          className="p-2 bg-gold/10 rounded-xl text-gold border border-gold/20 flex items-center justify-center active:scale-95 transition-all"
        >
          <PhoneCall className="w-4 h-4" />
        </a>
      </header>

      {/* Main Public Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Bottom Guest Navigation */}
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
