"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Plus, ToggleLeft, ToggleRight
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Coach } from "@/lib/db/mockData";

export default function OwnerCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState<Coach | null>(null);

  // Form states
  const [newCoach, setNewCoach] = useState({
    name: "",
    username: "",
    password: "Password@123",
    phone: "",
    experience: "5 Years",
    specialization: "General Fitness",
    languages: "English, Hindi",
    photoUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80"
  });
  const [addError, setAddError] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loadData = () => {
    setCoaches(dbService.getCoaches());
  };

  useEffect(() => {
    const init = async () => {
      loadData();
    };
    init();
  }, []);

  const handleToggleCoachStatus = (c: Coach) => {
    const nextStatus = c.status === "Active" ? "Inactive" as const : "Active" as const;
    dbService.updateCoach(c.id, { status: nextStatus });
    dbService.addAuditLog("Owner", `Toggled Coach Status (${nextStatus})`, c.name);
    loadData();
  };

  const handleAddCoach = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");

    const res = dbService.addCoach({
      name: newCoach.name,
      username: newCoach.username,
      password: newCoach.password,
      phone: newCoach.phone,
      experience: newCoach.experience,
      specialization: newCoach.specialization,
      languages: newCoach.languages.split(",").map(x => x.trim()),
      photoUrl: newCoach.photoUrl,
      status: "Active",
      joiningDate: new Date().toISOString().split("T")[0]
    });

    if (res.success) {
      setShowAddModal(false);
      setNewCoach({
        name: "",
        username: "",
        password: "Password@123",
        phone: "",
        experience: "5 Years",
        specialization: "General Fitness",
        languages: "English, Hindi",
        photoUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80"
      });
      loadData();
    } else {
      setAddError(res.message || "An error occurred.");
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResetModal || !newPassword) return;

    dbService.updateCoach(showResetModal.id, { password: newPassword });
    dbService.addAuditLog("Owner", "Reset Coach Security Key", showResetModal.name);
    
    setNewPassword("");
    setShowResetModal(null);
  };

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Human Resources</span>
          <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Manage Coaches</h2>
          <p className="text-xs text-text-secondary mt-1">Configure credentials, status overrides & assignments.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="p-2.5 bg-gold text-black rounded-xl hover:bg-gold-hover active:scale-95 transition-all flex items-center justify-center gap-1 font-bold text-xs"
        >
          <Plus className="w-4 h-4" /> Add Coach
        </button>
      </div>

      {/* COACH LIST */}
      <div className="flex flex-col gap-4">
        {coaches.map((c) => {
          const isActive = c.status === "Active";
          return (
            <div 
              key={c.id}
              className={`glass-card p-4 rounded-2xl border transition-all ${
                isActive ? "border-white/[0.04] bg-white/[0.01]" : "border-danger/10 bg-black/60 opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.05] flex-shrink-0">
                  <Image src={c.photoUrl} alt={c.name} fill className="object-cover" />
                </div>

                <div className="flex-grow flex flex-col min-w-0">
                  <h3 className="text-xs font-bold text-white leading-normal truncate">{c.name}</h3>
                  <span className="text-[9px] text-gold font-bold tracking-widest">@{c.username}</span>
                  <span className="text-[9px] text-text-secondary mt-0.5 block">{c.specialization} • Exp: {c.experience}</span>
                  <span className="text-[9.5px] text-text-secondary mt-1 block">Phone: {c.phone}</span>
                </div>

                {/* Status Toggle & Password Reset triggers */}
                <div className="flex flex-col gap-3 items-end">
                  <button 
                    onClick={() => handleToggleCoachStatus(c)}
                    className="text-gold active:scale-95 transition-all"
                  >
                    {isActive ? (
                      <ToggleRight className="w-7 h-7 text-gold" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-text-secondary opacity-50" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setShowResetModal(c)}
                    className="text-[9px] bg-white/5 border border-white/5 text-gold hover:border-gold/30 px-2 py-1 rounded"
                  >
                    Key Reset
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD COACH MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm">
            <motion.div 
              className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-3 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Create Coach Account</h3>
                <button onClick={() => setShowAddModal(false)} className="text-text-secondary hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCoach} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[9px] text-text-secondary uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newCoach.name}
                    onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={newCoach.username}
                      onChange={(e) => setNewCoach({ ...newCoach, username: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Password</label>
                    <input
                      type="text"
                      required
                      value={newCoach.password}
                      onChange={(e) => setNewCoach({ ...newCoach, password: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] text-text-secondary uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newCoach.phone}
                    onChange={(e) => setNewCoach({ ...newCoach, phone: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Specialization</label>
                    <input
                      type="text"
                      value={newCoach.specialization}
                      onChange={(e) => setNewCoach({ ...newCoach, specialization: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Experience</label>
                    <input
                      type="text"
                      value={newCoach.experience}
                      onChange={(e) => setNewCoach({ ...newCoach, experience: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {addError && (
                  <div className="p-2 bg-danger/10 border border-danger/20 rounded-lg text-[10px] text-danger">
                    {addError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all mt-2"
                >
                  Create Coach Account
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RESET PASSWORD MODAL */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm">
            <motion.div 
              className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-3 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Reset Coach Key</h3>
                <button onClick={() => setShowResetModal(null)} className="text-text-secondary hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleResetPasswordSubmit} className="flex flex-col gap-4">
                <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-xs text-text-secondary">
                  Updating security credentials for: <strong className="text-white block mt-1">{showResetModal.name}</strong>
                </div>

                <div>
                  <label className="block text-[9px] text-text-secondary uppercase mb-1">New Security Password</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new security password"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(null)}
                    className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold"
                  >
                    Confirm Reset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
