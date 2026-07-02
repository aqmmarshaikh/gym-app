"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, QrCode, Calendar, Clock, Bell, Trash2, Edit3, Save, Phone,
  UserCheck, Shield, HelpCircle
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member, Coach, AttendanceRecord, Notification } from "@/lib/db/mockData";

export default function MemberProfilePage() {
  const [member, setMember] = useState<Member | null>(null);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Edit Profile Mode
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [preferredTiming, setPreferredTiming] = useState("");

  const loadData = () => {
    const session = dbService.getCurrentSession();
    if (session && session.type === "member") {
      const m = dbService.getMemberByCode(session.id);
      if (m) {
        setMember(m);
        setWeight(m.weight.toString());
        setPhotoUrl(m.photoUrl);
        setEmergencyContact(m.emergencyContact);
        setPreferredTiming(m.preferredTiming);

        const c = dbService.getCoachById(m.assignedCoachId);
        if (c) setCoach(c);

        setAttendance(dbService.getAttendanceHistory(m.code) || []);
        setNotifications(dbService.getNotifications(m.code) || []);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    dbService.updateMemberProfile(member.code, {
      weight: parseFloat(weight) || member.weight,
      photoUrl: photoUrl || member.photoUrl,
      emergencyContact: emergencyContact || member.emergencyContact,
      preferredTiming: preferredTiming || member.preferredTiming
    });

    setIsEditing(false);
    loadData();
  };

  const handleMarkNotificationRead = (id: string) => {
    dbService.markNotificationRead(id);
    loadData();
  };

  const handleDeleteNotification = (id: string) => {
    dbService.deleteNotification(id);
    loadData();
  };

  if (!member) return null;

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* HEADER */}
      <div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">User Details</span>
        <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Membership Card</h2>
        <p className="text-xs text-text-secondary mt-1">Scan your digital card QR code at the gym entrance to log attendance.</p>
      </div>

      {/* DIGITAL PREMIUM MEMBERSHIP CARD */}
      <div className="glass-card p-5 rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 via-white/[0.02] to-transparent relative overflow-hidden flex flex-col gap-6 shadow-[0_15px_30px_rgba(212,175,55,0.1)]">
        {/* Glow and brand overlay */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="FCG Logo" fill className="object-contain" />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-widest leading-none text-white">FITNESS CORNER</h4>
              <span className="text-[7.5px] text-gold font-bold tracking-widest uppercase mt-0.5 block">Premium Club Member</span>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-green/10 text-success text-[8px] border border-green/20 rounded font-bold uppercase">
            {member.status}
          </span>
        </div>

        {/* Mid Section */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gold/40 flex-shrink-0 bg-neutral-900">
            <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white leading-normal truncate">{member.name}</h3>
            <span className="text-[9px] text-gold font-black tracking-widest">{member.code}</span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-2 text-[8.5px] text-text-secondary">
              <div>Joined: <strong className="text-white">{member.joiningDate}</strong></div>
              <div>Expires: <strong className="text-white">{member.expiryDate}</strong></div>
            </div>
          </div>

          {/* QR CHECKIN CODE TARGET */}
          <div className="p-1.5 bg-white rounded-xl flex-shrink-0 flex items-center justify-center border border-gold/25 relative group">
            {/* Simulated QR Code using SVG path */}
            <svg className="w-14 h-14" viewBox="0 0 100 100">
              {/* Corner anchors */}
              <rect x="0" y="0" width="25" height="25" fill="black" />
              <rect x="5" y="5" width="15" height="15" fill="white" />
              
              <rect x="75" y="0" width="25" height="25" fill="black" />
              <rect x="80" y="5" width="15" height="15" fill="white" />
              
              <rect x="0" y="75" width="25" height="25" fill="black" />
              <rect x="5" y="80" width="15" height="15" fill="white" />
              
              {/* Fake inner pixel groupings */}
              <rect x="35" y="10" width="10" height="20" fill="black" />
              <rect x="55" y="5" width="15" height="10" fill="black" />
              <rect x="10" y="35" width="20" height="10" fill="black" />
              <rect x="40" y="40" width="25" height="25" fill="black" />
              <rect x="70" y="35" width="15" height="15" fill="black" />
              <rect x="15" y="55" width="15" height="15" fill="black" />
              <rect x="35" y="75" width="25" height="10" fill="black" />
              <rect x="75" y="75" width="15" height="15" fill="black" />
            </svg>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center border-t border-white/[0.04] pt-3 text-[9px] text-text-secondary">
          <span>Assigned Coach: <strong className="text-white">{coach?.name || "General Trainer"}</strong></span>
          <span>Attendance: <strong className="text-gold">{member.attendanceRate}%</strong></span>
        </div>
      </div>

      {/* EDIT PROFILE DIALOG */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-gold" /> Personal Settings
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[10px] text-gold font-bold hover:underline"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] text-text-secondary uppercase mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-[9px] text-text-secondary uppercase mb-1">Timing Slot</label>
                <input
                  type="text"
                  value={preferredTiming}
                  onChange={(e) => setPreferredTiming(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] text-text-secondary uppercase mb-1">Photo Image URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[9px] text-text-secondary uppercase mb-1">Emergency Contact</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-black py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all mt-2"
            >
              Save Profile Details
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
            <div>Blood Group: <strong className="text-white">{member.bloodGroup}</strong></div>
            <div>Age: <strong className="text-white">{member.age} Yrs</strong></div>
            <div>Height: <strong className="text-white">{member.height} cm</strong></div>
            <div>Occupation: <strong className="text-white">{member.occupation}</strong></div>
            <div className="col-span-2 border-t border-white/[0.03] pt-2 mt-1">
              Timing: <strong className="text-white">{member.preferredTiming}</strong>
            </div>
            <div className="col-span-2">
              Emergency: <strong className="text-white">{member.emergencyContact}</strong>
            </div>
          </div>
        )}
      </div>

      {/* NOTIFICATIONS LOG */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-4">
          <Bell className="w-4 h-4 text-gold" /> Notification Center
        </h3>

        <div className="flex flex-col gap-3">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-3 rounded-xl border flex justify-between gap-3 items-start transition-all ${
                  n.read ? "bg-white/[0.01] border-white/[0.03] opacity-60" : "bg-gold/[0.02] border-gold/15"
                }`}
              >
                <div className="flex-1" onClick={() => handleMarkNotificationRead(n.id)}>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {!n.read && <span className="w-1.5 h-1.5 bg-gold rounded-full" />}
                    {n.title}
                  </h4>
                  <p className="text-[10px] text-text-secondary mt-1">{n.message}</p>
                </div>
                <button 
                  onClick={() => handleDeleteNotification(n.id)}
                  className="p-1 hover:text-danger text-text-secondary transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-xs text-text-secondary text-center py-4">No notifications yet.</span>
          )}
        </div>
      </div>

      {/* ATTENDANCE HISTORY LIST */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-gold" /> Attendance History
        </h3>

        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto scrollbar-none pr-1">
          {attendance.length > 0 ? (
            attendance.map((record) => (
              <div 
                key={record.id}
                className="p-3 bg-white/[0.02] border border-white/[0.03] rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-white font-semibold">{record.date}</span>
                  {record.time && (
                    <span className="text-text-secondary text-[10px] block mt-0.5">Time: {record.time}</span>
                  )}
                </div>

                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  record.status === "Present" ? "bg-green/10 text-success border border-green/20" : 
                  record.status === "Late Entry" ? "bg-warning/10 text-warning border border-warning/20" :
                  record.status === "Holiday" ? "bg-info/10 text-info border border-info/20" :
                  "bg-danger/10 text-danger border border-danger/20"
                }`}>
                  {record.status}
                </span>
              </div>
            ))
          ) : (
            <span className="text-xs text-text-secondary text-center py-4">No attendance logged yet. Scan QR at entrance!</span>
          )}
        </div>
      </div>
    </div>
  );
}
