"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, ChevronRight, X, KeyRound, Save, DollarSign
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member, Coach } from "@/lib/db/mockData";

export default function CoachMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  
  // Search & Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [goalFilter, setGoalFilter] = useState("All");

  // Selected Member Details Modal
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  // Renewal modal inside detail view
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewAmount, setRenewAmount] = useState("6000");
  const [renewDuration, setRenewDuration] = useState("3");
  const [renewRemarks] = useState("Fees paid cash at desk");

  // Edit details inside modal
  const [editGoal, setEditGoal] = useState("");
  const [editStatus, setEditStatus] = useState<Member["status"]>("Active");
  const [coachNotes, setCoachNotes] = useState("");

  // Add Member Stepper wizard
  const [showAddWizard, setShowAddWizard] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [newMember, setNewMember] = useState({
    code: "",
    name: "",
    gender: "Male" as Member["gender"],
    age: 25,
    height: 175,
    weight: 75,
    targetWeight: 70,
    goal: "Weight Loss",
    experience: "Beginner" as Member["experience"],
    durationMonths: 3,
    phone: "",
    address: "",
    preferredTiming: "06:00 AM - 08:00 AM",
    medicalNotes: "None",
    emergencyContact: "",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    bloodGroup: "O+",
    occupation: "Student",
    dob: "2001-06-15"
  });
  const [wizardError, setWizardError] = useState("");

  const loadData = () => {
    setMembers(dbService.getMembers());
    setCoaches(dbService.getCoaches());
  };

  useEffect(() => {
    const init = async () => {
      loadData();
    };
    init();
  }, []);

  const handleSelectMember = (m: Member) => {
    setSelectedMember(m);
    setEditGoal(m.goal);
    setEditStatus(m.status);
    setCoachNotes(m.medicalNotes || "");
  };

  const handleSaveMemberDetails = () => {
    if (!selectedMember) return;
    dbService.updateMemberProfile(selectedMember.code, {
      goal: editGoal,
      status: editStatus,
      medicalNotes: coachNotes
    });
    loadData();
    setSelectedMember(null);
  };

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    dbService.renewMembership(
      selectedMember.code,
      parseFloat(renewAmount),
      parseInt(renewDuration),
      renewRemarks
    );

    setShowRenewModal(false);
    setSelectedMember(null);
    loadData();
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWizardError("");

    // Expiry calculation
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setMonth(today.getMonth() + newMember.durationMonths);

    const res = dbService.addMember({
      code: newMember.code,
      name: newMember.name,
      gender: newMember.gender,
      age: newMember.age,
      height: newMember.height,
      weight: newMember.weight,
      targetWeight: newMember.targetWeight,
      goal: newMember.goal,
      experience: newMember.experience,
      joiningDate: today.toISOString().split("T")[0],
      durationMonths: newMember.durationMonths,
      expiryDate: expiryDate.toISOString().split("T")[0],
      assignedCoachId: coaches[0]?.id || "coach1",
      phone: newMember.phone,
      address: newMember.address,
      preferredTiming: newMember.preferredTiming,
      medicalNotes: newMember.medicalNotes,
      emergencyContact: newMember.emergencyContact,
      photoUrl: newMember.photoUrl,
      status: "Active",
      bloodGroup: newMember.bloodGroup,
      occupation: newMember.occupation,
      dob: newMember.dob
    });

    if (res.success) {
      setShowAddWizard(false);
      setAddStep(1);
      setNewMember({
        code: "",
        name: "",
        gender: "Male",
        age: 25,
        height: 175,
        weight: 75,
        targetWeight: 70,
        goal: "Weight Loss",
        experience: "Beginner",
        durationMonths: 3,
        phone: "",
        address: "",
        preferredTiming: "06:00 AM - 08:00 AM",
        medicalNotes: "None",
        emergencyContact: "",
        photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        bloodGroup: "O+",
        occupation: "Student",
        dob: "2001-06-15"
      });
      loadData();
    } else {
      setWizardError(res.message || "An error occurred.");
    }
  };

  // Searching & Filtering logic
  const filteredMembers = members.filter((m) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = 
      m.name.toLowerCase().includes(query) || 
      m.code.toLowerCase().includes(query) || 
      m.phone.includes(query);
      
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    const matchesGoal = goalFilter === "All" || m.goal === goalFilter;

    return matchesSearch && matchesStatus && matchesGoal;
  });

  const goalsList = [
    "Weight Loss", "Weight Gain", "Muscle Building", "Bodybuilding", "Strength",
    "Powerlifting", "Six Pack", "General Fitness", "Cardio", "Women's Fitness",
    "Senior Fitness", "HIIT", "Functional Training", "Custom"
  ];

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Directory</span>
          <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Member Directory</h2>
          <p className="text-xs text-text-secondary mt-1">Manage physical stats, expiry statuses, goals and notes.</p>
        </div>

        <button
          onClick={() => { setShowAddWizard(true); setAddStep(1); }}
          className="p-2.5 bg-gold text-black rounded-xl hover:bg-gold-hover active:scale-95 transition-all flex items-center justify-center gap-1 font-bold text-xs"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code, name, phone..."
            className="w-full bg-bg-card border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white focus:border-gold outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-gold"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Fee Due">Fee Due</option>
            <option value="Expired">Expired</option>
            <option value="Blocked">Blocked</option>
            <option value="Left">Left Gym</option>
          </select>

          {/* Goal Filter */}
          <select
            value={goalFilter}
            onChange={(e) => setGoalFilter(e.target.value)}
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-gold"
          >
            <option value="All">All Goals</option>
            {goalsList.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* MEMBER LIST */}
      <div className="flex flex-col gap-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((m) => (
            <div 
              key={m.code}
              onClick={() => handleSelectMember(m)}
              className="glass-card p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.05]">
                  <Image src={m.photoUrl} alt={m.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-normal truncate">{m.name}</h4>
                  <span className="text-[9px] text-gold font-bold tracking-widest block">{m.code}</span>
                  <span className="text-[9px] text-text-secondary block mt-0.5">{m.goal} • Coach {coaches.find(c => c.id === m.assignedCoachId)?.name.split(" ")[0]}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                  m.status === "Active" ? "bg-green/10 text-success border border-green/20" :
                  m.status === "Fee Due" ? "bg-warning/10 text-warning border border-warning/20" :
                  "bg-danger/10 text-danger border border-danger/20"
                }`}>
                  {m.status}
                </span>
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-xs text-text-secondary">
            No members match the search query or active filter.
          </div>
        )}
      </div>

      {/* MEMBER DETAILS MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm">
            <motion.div 
              className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card max-h-[85vh] overflow-y-auto scrollbar-none flex flex-col gap-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase truncate">{selectedMember.name}</h3>
                  <span className="text-[9px] text-gold font-bold tracking-widest">{selectedMember.code}</span>
                </div>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="p-1 hover:text-white text-text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col gap-4">
                {/* Image & Quick details */}
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 bg-neutral-900 rounded-xl overflow-hidden border border-white/[0.05]">
                    <Image src={selectedMember.photoUrl} alt={selectedMember.name} fill className="object-cover" />
                  </div>
                  <div className="text-xs text-text-secondary flex flex-col justify-between">
                    <div>Phone: <strong className="text-white">{selectedMember.phone}</strong></div>
                    <div>Expiry: <strong className="text-white">{selectedMember.expiryDate}</strong></div>
                    <div>Goal: <strong className="text-gold">{selectedMember.goal}</strong></div>
                  </div>
                </div>

                {/* Edit Controls */}
                <div className="border-t border-white/[0.03] pt-4 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] text-text-secondary uppercase mb-1">Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as Member["status"])}
                        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold"
                      >
                        <option value="Active">Active</option>
                        <option value="Fee Due">Fee Due</option>
                        <option value="Expired">Expired</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Left">Left Gym</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] text-text-secondary uppercase mb-1">Fitness Goal</label>
                      <select
                        value={editGoal}
                        onChange={(e) => setEditGoal(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold"
                      >
                        {goalsList.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Medical Notes & Coach Warnings</label>
                    <textarea
                      value={coachNotes}
                      onChange={(e) => setCoachNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>

                {/* RENEW MEMBERSHIP */}
                <div className="border-t border-white/[0.03] pt-4">
                  <button
                    onClick={() => setShowRenewModal(!showRenewModal)}
                    className="w-full bg-gold/10 text-gold border border-gold/20 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <DollarSign className="w-4 h-4" /> Renew Membership / Register Fee
                  </button>
                  
                  {showRenewModal && (
                    <motion.div 
                      className="p-3.5 bg-black/40 rounded-xl border border-white/[0.03] mt-3 flex flex-col gap-3"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] text-text-secondary uppercase mb-1">Amount (INR)</label>
                          <input
                            type="number"
                            value={renewAmount}
                            onChange={(e) => setRenewAmount(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-text-secondary uppercase mb-1">Duration (Months)</label>
                          <select
                            value={renewDuration}
                            onChange={(e) => setRenewDuration(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                          >
                            <option value="1">1 Month</option>
                            <option value="3">3 Months</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={handleRenew}
                        className="w-full bg-gold text-black py-2 rounded-xl text-xs font-bold active:scale-95 transition-all"
                      >
                        Confirm Renewal
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 border-t border-white/[0.03] pt-4 mt-auto">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveMemberDetails}
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD MEMBER STEPPER WIZARD */}
      <AnimatePresence>
        {showAddWizard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm">
            <motion.div 
              className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card max-h-[85vh] overflow-y-auto scrollbar-none flex flex-col gap-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">Add New Member</h3>
                  <span className="text-[9px] text-text-secondary uppercase">Step {addStep} of 5</span>
                </div>
                <button 
                  onClick={() => setShowAddWizard(false)}
                  className="p-1 hover:text-white text-text-secondary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP 1: Basic details */}
              {addStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      placeholder="e.g. +91 98765 00111"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] text-text-secondary uppercase mb-1">Gender</label>
                      <select
                        value={newMember.gender}
                        onChange={(e) => setNewMember({ ...newMember, gender: e.target.value as Member["gender"] })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] text-text-secondary uppercase mb-1">Age</label>
                      <input
                        type="number"
                        value={newMember.age}
                        onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) || 18 })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Body details */}
              {addStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] text-text-secondary uppercase mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={newMember.height}
                        onChange={(e) => setNewMember({ ...newMember, height: parseInt(e.target.value) || 170 })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-text-secondary uppercase mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newMember.weight}
                        onChange={(e) => setNewMember({ ...newMember, weight: parseFloat(e.target.value) || 70 })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Medical Conditions</label>
                    <input
                      type="text"
                      value={newMember.medicalNotes}
                      onChange={(e) => setNewMember({ ...newMember, medicalNotes: e.target.value })}
                      placeholder="e.g. Asthma, Knee pain, None"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Fitness details */}
              {addStep === 3 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Fitness Goal</label>
                    <select
                      value={newMember.goal}
                      onChange={(e) => setNewMember({ ...newMember, goal: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {goalsList.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Preferred Timing Slot</label>
                    <select
                      value={newMember.preferredTiming}
                      onChange={(e) => setNewMember({ ...newMember, preferredTiming: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM</option>
                      <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                      <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 4: Membership details */}
              {addStep === 4 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Membership Duration</label>
                    <select
                      value={newMember.durationMonths}
                      onChange={(e) => setNewMember({ ...newMember, durationMonths: parseInt(e.target.value) || 3 })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="1">1 Month Plan</option>
                      <option value="3">3 Months Plan</option>
                      <option value="6">6 Months Plan</option>
                      <option value="12">12 Months Plan</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 5: Generate Code */}
              {addStep === 5 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[9px] text-text-secondary uppercase mb-1">Manual Member Code</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={newMember.code}
                        onChange={(e) => setNewMember({ ...newMember, code: e.target.value.trim().toUpperCase() })}
                        placeholder="e.g. FCG1048"
                        className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white uppercase"
                      />
                    </div>
                  </div>
                  {wizardError && (
                    <div className="p-2 bg-danger/10 border border-danger/20 rounded-lg text-[10px] text-danger">
                      {wizardError}
                    </div>
                  )}
                </div>
              )}

              {/* Stepper Footer Controls */}
              <div className="flex gap-3 border-t border-white/[0.03] pt-4 mt-auto">
                {addStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setAddStep(addStep - 1)}
                    className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary"
                  >
                    Back
                  </button>
                )}
                {addStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setAddStep(addStep + 1)}
                    className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddMemberSubmit}
                    className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold"
                  >
                    Register Member
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
