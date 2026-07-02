"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Search, AlertTriangle, CheckCircle, Clock 
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member } from "@/lib/db/mockData";

export default function CoachAttendancePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [manualCode, setManualCode] = useState("");
  
  // Scanner simulator states
  const [selectedMockMember, setSelectedMockMember] = useState("");
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; time?: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      setMembers(dbService.getMembers().filter(m => m.status !== "Left"));
    };
    load();
  }, []);

  const handleScanSimulation = () => {
    if (!selectedMockMember) return;
    const res = dbService.markAttendance(selectedMockMember);
    setScanResult({
      success: res.success,
      message: res.message,
      time: res.time
    });

    // Auto-clear result after 3 seconds
    setTimeout(() => {
      setScanResult(null);
    }, 3000);
  };

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode) return;

    const formattedCode = manualCode.trim().toUpperCase();
    const res = dbService.markAttendance(formattedCode);
    
    setScanResult({
      success: res.success,
      message: res.message,
      time: res.time
    });

    setManualCode("");

    setTimeout(() => {
      setScanResult(null);
    }, 4000);
  };

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* Header */}
      <div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Terminal</span>
        <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Attendance Desk</h2>
        <p className="text-xs text-text-secondary mt-1">Scan member digital card QR code or execute manual backup check-in.</p>
      </div>

      {/* SUCCESS/ERROR OVERLAYS */}
      <AnimatePresence>
        {scanResult && (
          <motion.div 
            className={`p-4 rounded-xl border flex items-start gap-3 z-30 relative ${
              scanResult.success 
                ? "bg-green/10 border-success/30 text-success" 
                : "bg-warning/10 border-warning/30 text-warning"
            }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {scanResult.success ? (
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-grow">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {scanResult.success ? "Check-in Successful" : "Check-in Alert"}
              </h4>
              <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{scanResult.message}</p>
              {scanResult.time && (
                <div className="flex items-center gap-1 mt-2 text-[9px] font-bold text-gold">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>Time Logged: {scanResult.time}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR SCANNER SIMULATOR CAM BOX */}
      <div className="glass-card p-5 rounded-3xl border border-gold/15 bg-white/[0.01] flex flex-col items-center gap-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Camera Check-in Terminal</h3>

        {/* Camera simulation box */}
        <div className="relative w-full aspect-square max-w-[280px] bg-neutral-950 rounded-2xl border border-gold/30 overflow-hidden flex items-center justify-center">
          {/* Laser scanning line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gold/75 shadow-[0_0_10px_rgba(212,175,55,0.7)] top-1/2 -translate-y-1/2 animate-pulse" />
          
          {/* Border targets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold rounded-tl" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold rounded-tr" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold rounded-bl" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold rounded-br" />

          {/* Scanner Central Icon */}
          <div className="flex flex-col items-center gap-1.5 opacity-40">
            <Camera className="w-10 h-10 text-gold" />
            <span className="text-[9px] uppercase tracking-wider text-text-secondary">Scanning Active...</span>
          </div>
        </div>

        {/* Target simulator dropdown selection */}
        <div className="w-full mt-2">
          <label className="block text-[9px] text-text-secondary uppercase mb-1">Select Member (Mock Scan)</label>
          <div className="flex gap-2">
            <select
              value={selectedMockMember}
              onChange={(e) => setSelectedMockMember(e.target.value)}
              className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-gold"
            >
              <option value="">-- Choose Member Code --</option>
              {members.map((m) => (
                <option key={m.code} value={m.code}>
                  {m.code} - {m.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleScanSimulation}
              disabled={!selectedMockMember}
              className="px-4 py-2.5 bg-gold text-black rounded-xl text-xs font-bold active:scale-95 transition-all disabled:opacity-50"
            >
              Scan
            </button>
          </div>
        </div>
      </div>

      {/* MANUAL BACKUP CHECK-IN */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Search className="w-4 h-4 text-gold" /> Manual Check-in Override
        </h3>

        <form onSubmit={handleManualCheckIn} className="flex gap-2">
          <input
            type="text"
            required
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="e.g. FCG1001"
            className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none uppercase placeholder:text-neutral-700"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-white/5 border border-white/5 text-gold hover:border-gold/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            Check-in
          </button>
        </form>
      </div>
    </div>
  );
}
