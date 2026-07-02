"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, Calendar, Clock, Bell, UserPlus, ShieldAlert, Award, FileText, CheckCircle2,
  Megaphone, Plus, ArrowRight, Settings, AlertTriangle, KeyRound, QrCode, Dumbbell, ChevronRight
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member, Coach, Announcement } from "@/lib/db/mockData";

export default function CoachDashboardPage() {
  const router = useRouter();
  
  const [coach, setCoach] = useState<Coach | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  
  // Announcement form
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annPriority, setAnnPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const loadData = () => {
    const session = dbService.getCurrentSession();
    if (session && session.type === "coach") {
      const c = dbService.getCoachById(session.id);
      if (c) setCoach(c);
    }
    setMembers(dbService.getMembers());
    setRequests(dbService.getJoinRequests());
    setAnnouncements(dbService.getAnnouncements());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annMessage) return;

    dbService.addAnnouncement({
      title: annTitle,
      message: annMessage,
      priority: annPriority,
      target: "Everyone"
    });

    setAnnTitle("");
    setAnnMessage("");
    setShowAnnounceModal(false);
    loadData();
  };

  if (!coach) return null;

  // Analytics
  const activeCount = members.filter(m => m.status === "Active").length;
  const expiredCount = members.filter(m => m.status === "Expired").length;
  const blockedCount = members.filter(m => m.status === "Blocked").length;
  const dueCount = members.filter(m => m.status === "Fee Due").length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Admin Panel</span>
          <h2 className="text-xl font-bold mt-0.5">Good Morning, {coach.name.split(" ")[0]} 👋</h2>
          <div className="flex items-center gap-1.5 text-text-secondary text-[10px] mt-1">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* QUICK ANALYTICS CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-bg-card border border-white/[0.04] rounded-2xl">
          <div className="flex justify-between items-start">
            <Users className="w-5 h-5 text-gold" />
            <span className="text-[8.5px] text-green border border-green/20 bg-green/10 px-1.5 py-0.5 rounded font-bold uppercase">Active</span>
          </div>
          <div className="text-2xl font-black mt-3 leading-none text-white">{activeCount}</div>
          <span className="text-[9px] text-text-secondary uppercase block mt-1">Members Enrolled</span>
        </div>

        <div className="p-4 bg-bg-card border border-white/[0.04] rounded-2xl">
          <div className="flex justify-between items-start">
            <ShieldAlert className="w-5 h-5 text-danger" />
            <span className="text-[8.5px] text-danger border border-danger/20 bg-danger/10 px-1.5 py-0.5 rounded font-bold uppercase">FEE DUE</span>
          </div>
          <div className="text-2xl font-black mt-3 leading-none text-white">{dueCount}</div>
          <span className="text-[9px] text-text-secondary uppercase block mt-1">Pending Renewals</span>
        </div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Quick Commands</h3>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => router.push("/coach/members")} // leads to members list containing adding triggers
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 active:scale-95 transition-all text-center gap-1.5"
          >
            <UserPlus className="w-5 h-5 text-gold" />
            <span className="text-[9px] text-text-secondary uppercase font-bold">Add Member</span>
          </button>
          <button 
            onClick={() => router.push("/coach/attendance")}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 active:scale-95 transition-all text-center gap-1.5"
          >
            <QrCode className="w-5 h-5 text-gold" />
            <span className="text-[9px] text-text-secondary uppercase font-bold">Scan QR</span>
          </button>
          <button 
            onClick={() => setShowAnnounceModal(true)}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 active:scale-95 transition-all text-center gap-1.5"
          >
            <Megaphone className="w-5 h-5 text-gold" />
            <span className="text-[9px] text-text-secondary uppercase font-bold">Broadcast</span>
          </button>
        </div>
      </div>

      {/* GYM MANAGEMENT SECTION */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Gym Operations</h3>
        <button 
          onClick={() => router.push("/coach/workouts")}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gold/10 rounded-xl text-gold border border-gold/20">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Gym Configurator</h4>
              <p className="text-[10px] text-text-secondary mt-0.5 font-medium">Manage available machines & weekly plans</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gold" />
        </button>
      </div>

      {/* ANNOUNCEMENT BROADCAST MODAL */}
      {showAnnounceModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Send Announcement</h3>
            <form onSubmit={handleCreateAnnouncement} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Gym Maintenance Closed"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Message</label>
                <textarea
                  required
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  placeholder="Details of broadcast message..."
                  rows={3}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Priority</label>
                <select
                  value={annPriority}
                  onChange={(e: any) => setAnnPriority(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAnnounceModal(false)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TODAY'S TASKS & ALERTS */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gold" /> Critical Operations alerts
        </h3>
        
        <div className="flex flex-col gap-3">
          {dueCount > 0 && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-xl flex items-center justify-between text-xs">
              <span className="text-text-secondary font-medium">Members with fee due:</span>
              <span className="text-danger font-bold">{dueCount} Members</span>
            </div>
          )}
          {expiredCount > 0 && (
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-xl flex items-center justify-between text-xs">
              <span className="text-text-secondary font-medium">Expired memberships:</span>
              <span className="text-warning font-bold">{expiredCount} Members</span>
            </div>
          )}
          {requests.length > 0 && (
            <div className="p-3 bg-info/10 border border-info/20 rounded-xl flex items-center justify-between text-xs">
              <span className="text-text-secondary font-medium">Uncontacted Leads:</span>
              <span className="text-info font-bold">{requests.filter(r => r.status === "Pending").length} Leads</span>
            </div>
          )}
        </div>
      </div>

      {/* BROADCASTED ANNOUNCEMENTS */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-gold" /> Active Broadcasts
        </h3>

        <div className="flex flex-col gap-3 max-h-48 overflow-y-auto scrollbar-none">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-3 bg-white/[0.02] border border-white/[0.03] rounded-xl flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    ann.priority === "High" ? "bg-danger" : ann.priority === "Medium" ? "bg-warning" : "bg-info"
                  }`} />
                  {ann.title}
                </h4>
                <span className="text-[8px] text-text-secondary uppercase">{ann.createdAt}</span>
              </div>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">{ann.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
