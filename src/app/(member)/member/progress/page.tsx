"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Ruler, Activity 
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { MemberProgress, Member } from "@/lib/db/mockData";

export default function MemberProgressPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [progressHistory, setProgressHistory] = useState<MemberProgress[]>([]);
  const [showLogModal, setShowLogModal] = useState(false);
  
  // Log form states
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [waist, setWaist] = useState("");
  const [chest, setChest] = useState("");

  const loadData = () => {
    const session = dbService.getCurrentSession();
    if (session && session.type === "member") {
      const m = dbService.getMemberByCode(session.id);
      if (m) {
        setMember(m);
        const history = dbService.getMemberProgress(m.code);
        setProgressHistory(history || []);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      loadData();
    };
    init();
  }, []);

  const handleLogProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    const parsedWeight = parseFloat(weight);
    const parsedBodyFat = parseFloat(bodyFat) || 15;
    const parsedWaist = parseFloat(waist) || 0;
    const parsedChest = parseFloat(chest) || 0;

    if (!parsedWeight) return;

    // Calculate BMI
    const bmi = parseFloat((parsedWeight / ((member.height / 100) * (member.height / 100))).toFixed(1));

    dbService.addMemberProgress({
      memberCode: member.code,
      date: new Date().toISOString().split("T")[0],
      weight: parsedWeight,
      bmi,
      bodyFat: parsedBodyFat,
      waist: parsedWaist,
      chest: parsedChest,
      photos: ["https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60"]
    });

    // Reset Form
    setWeight("");
    setBodyFat("");
    setWaist("");
    setChest("");
    setShowLogModal(false);

    // Refresh Data
    loadData();
  };

  if (!member) return null;

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Metrics Hub</span>
          <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Body Progress</h2>
          <p className="text-xs text-text-secondary mt-1">Track weights, chest, waist, and muscle measurements.</p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="p-2.5 bg-gold text-black rounded-xl hover:bg-gold-hover active:scale-95 transition-all flex items-center justify-center gap-1 font-bold text-xs"
        >
          <Plus className="w-4 h-4" /> Log Stats
        </button>
      </div>

      {/* MODAL / OVERLAY FOR STATS ENTRY */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm">
          <motion.div 
            className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Log Today&apos;s Stats</h3>
            
            <form onSubmit={handleLogProgress} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Current Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 78.5"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Body Fat %</label>
                <input
                  type="number"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Waist (inches)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    placeholder="e.g. 34"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Chest (inches)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={chest}
                    onChange={(e) => setChest(e.target.value)}
                    placeholder="e.g. 40"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* TREND TIMELINES / GRAPHS */}
      <div className="glass-card p-5 rounded-2xl border border-gold/15 bg-white/[0.01] flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-gold" /> Weight Trend (Last 4 Check-ins)
        </h3>

        {progressHistory.length > 0 ? (
          <div className="flex flex-col gap-4 mt-2">
            {/* SVG custom graph simulator */}
            <div className="h-28 w-full bg-black/40 rounded-xl border border-white/[0.03] p-3 flex flex-col justify-between relative overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                <div className="border-b border-white w-full h-0" />
                <div className="border-b border-white w-full h-0" />
                <div className="border-b border-white w-full h-0" />
              </div>

              {/* Simple Sparkline Bars */}
              <div className="flex justify-around items-end h-20 w-full px-2 z-10">
                {progressHistory.map((p, idx) => {
                  const pct = Math.min(Math.round(((p.weight - 60) / 30) * 100), 100);
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-gold">{p.weight}kg</span>
                      <div className="w-6 bg-gold/10 border border-gold/30 rounded-t-md relative flex items-end justify-center" style={{ height: `${pct}px` }}>
                        <div className="absolute top-0 w-full bg-gold h-1 rounded-t-md" />
                      </div>
                      <span className="text-[8px] text-text-secondary uppercase">{p.date.split("-")[1]}/{p.date.split("-")[2]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Goal Target: <strong>{member.targetWeight} kg</strong></span>
              <span>Total Loss: <strong>{(member.joiningWeight - member.weight).toFixed(1)} kg</strong></span>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-text-secondary">
            No progress entries recorded yet. Tap Log Stats to log your weight!
          </div>
        )}
      </div>

      {/* MEASUREMENTS DETAILED HISTORY TIMELINE */}
      <div className="glass-card p-5 rounded-2xl border border-gold/10 bg-white/[0.01] flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Ruler className="w-4 h-4 text-gold" /> Measurement Logs
        </h3>

        <div className="flex flex-col gap-3">
          {progressHistory.slice().reverse().map((log) => (
            <div 
              key={log.id} 
              className="p-4 bg-white/[0.02] border border-white/[0.03] rounded-xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between border-b border-white/[0.03] pb-2">
                <span className="text-xs font-bold text-white">{log.date}</span>
                <span className="text-[10px] text-gold font-medium">BMI: {log.bmi} | Fat: {log.bodyFat}%</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-[10px] text-text-secondary">
                <div>Weight: <strong className="text-white">{log.weight} kg</strong></div>
                {log.waist && <div>Waist: <strong className="text-white">{log.waist} in</strong></div>}
                {log.chest && <div>Chest: <strong className="text-white">{log.chest} in</strong></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
