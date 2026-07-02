"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building, DollarSign, Users, ShieldAlert, Award, FileText, CheckCircle2,
  Megaphone, Plus, ArrowRight, Settings, AlertTriangle, KeyRound, Clock, Download
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member, Coach, AuditLog, FeeRecord } from "@/lib/db/mockData";

export default function OwnerDashboardPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);

  useEffect(() => {
    setMembers(dbService.getMembers());
    setCoaches(dbService.getCoaches());
    setAuditLogs(dbService.getAuditLogs());
    
    // Sum total paid amount for mock revenue
    // In mock data, active members paid (durationMonths * 2000)
    const allMembers = dbService.getMembers();
    const mockFees: FeeRecord[] = allMembers.map((m) => ({
      id: `fee_${m.code}`,
      memberCode: m.code,
      paymentDate: m.joiningDate,
      amount: m.durationMonths * 2000,
      durationMonths: m.durationMonths,
      expiryDate: m.expiryDate,
      remarks: "Fee paid",
      status: m.status === "Active" ? "Paid" : m.status === "Fee Due" ? "Pending" : "Overdue"
    }));
    setFees(mockFees);
  }, []);

  const totalPaidRevenue = fees
    .filter(f => f.status === "Paid")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalPendingRevenue = fees
    .filter(f => f.status === "Pending")
    .reduce((sum, current) => sum + current.amount, 0);

  const handleExportBackup = () => {
    if (typeof window === "undefined") return;
    
    // Collate local state
    const backupData = {
      members: dbService.getMembers(),
      coaches: dbService.getCoaches(),
      auditLogs: dbService.getAuditLogs(),
      announcements: dbService.getAnnouncements(),
      joinRequests: dbService.getJoinRequests(),
      brandSettings: dbService.getBrandSettings(),
      timestamp: new Date().toISOString()
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupData, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `fcg_database_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    dbService.addAuditLog("Owner", "Downloaded system database backup", "JSON Export");
    setAuditLogs(dbService.getAuditLogs());
  };

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* Welcome bar */}
      <div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Executive Panel</span>
        <h2 className="text-xl font-bold mt-0.5">Welcome Back, Owner 👋</h2>
        <p className="text-xs text-text-secondary mt-0.5">Enterprise overview & financial logs terminal.</p>
      </div>

      {/* REVENUE METRICS CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-bg-card border border-gold/15 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent">
          <DollarSign className="w-5 h-5 text-gold" />
          <div className="text-xl font-black mt-3 leading-none text-white">
            ₹{totalPaidRevenue.toLocaleString("en-IN")}
          </div>
          <span className="text-[9px] text-text-secondary uppercase block mt-1">Total Paid Revenue</span>
        </div>

        <div className="p-4 bg-bg-card border border-white/[0.04] rounded-2xl">
          <ShieldAlert className="w-5 h-5 text-warning" />
          <div className="text-xl font-black mt-3 leading-none text-white">
            ₹{totalPendingRevenue.toLocaleString("en-IN")}
          </div>
          <span className="text-[9px] text-text-secondary uppercase block mt-1">Overdue Receivables</span>
        </div>
      </div>

      {/* STAFF & COUNTERS */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Members</span>
          <span className="text-sm font-bold text-white block mt-0.5">{members.length}</span>
        </div>
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Coaches</span>
          <span className="text-sm font-bold text-gold block mt-0.5">{coaches.length}</span>
        </div>
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Active</span>
          <span className="text-sm font-bold text-white block mt-0.5">
            {members.filter(m => m.status === "Active").length}
          </span>
        </div>
      </div>

      {/* REVENUE TREND MINI SPARKLINE */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Monthly Revenue growth</h3>
        {/* Simple Sparkline Bars */}
        <div className="h-24 w-full bg-black/40 rounded-xl border border-white/[0.03] p-3 flex items-end justify-around">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[8px] text-text-secondary">Mar</span>
            <div className="w-8 bg-gold/15 border border-gold/30 rounded-t-md h-12" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[8px] text-text-secondary">Apr</span>
            <div className="w-8 bg-gold/15 border border-gold/30 rounded-t-md h-16" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[8px] text-text-secondary">May</span>
            <div className="w-8 bg-gold/15 border border-gold/30 rounded-t-md h-20" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[8px] text-text-secondary">Jun</span>
            <div className="w-8 bg-gold border border-gold rounded-t-md h-[84px] relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] text-gold font-bold">Peak</span>
            </div>
          </div>
        </div>
      </div>

      {/* GYM MANAGEMENT CONFIGURATOR CARD */}
      <div className="glass-card p-4 rounded-2xl border border-gold/15 bg-white/[0.01] flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Gym Configurator</h4>
          <p className="text-[9.5px] text-text-secondary mt-0.5">Configure available machines and workout schedules.</p>
        </div>
        <button
          onClick={() => router.push("/owner/workouts")}
          className="p-2.5 bg-gold text-black rounded-xl hover:bg-gold-hover active:scale-95 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          Manage
        </button>
      </div>

      {/* SYSTEM BACKUP ACTION CARD */}
      <div className="glass-card p-4 rounded-2xl border border-gold/15 bg-white/[0.01] flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Database Maintenance</h4>
          <p className="text-[9.5px] text-text-secondary mt-0.5">Download full local JSON backup of gym GMS.</p>
        </div>
        <button
          onClick={handleExportBackup}
          className="p-2.5 bg-gold text-black rounded-xl hover:bg-gold-hover active:scale-95 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <Download className="w-4 h-4" /> Backup
        </button>
      </div>

      {/* SYSTEM AUDIT LOG TERMINAL */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <div className="flex items-center justify-between mb-4 border-b border-white/[0.03] pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-gold" /> System Audit logs
          </h3>
          <span className="text-[8px] text-text-secondary uppercase">Streaming Live</span>
        </div>

        <div className="flex flex-col gap-3 max-h-56 overflow-y-auto scrollbar-none font-mono">
          {auditLogs.map((log) => (
            <div key={log.id} className="text-[10px] text-text-secondary bg-black/60 border border-white/[0.02] p-2.5 rounded-lg flex flex-col gap-1">
              <div className="flex justify-between items-center text-[9px]">
                <strong className="text-gold font-bold">{log.actor}</strong>
                <span>{log.timestamp}</span>
              </div>
              <p className="text-white mt-0.5">{log.action}: <strong className="text-gold/80 font-normal">{log.target}</strong></p>
              <span className="text-[8px] opacity-40 uppercase mt-0.5">Device: {log.device}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
