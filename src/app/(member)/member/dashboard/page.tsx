"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, Dumbbell, Apple, Activity, Bell, Flame, Droplet, Award,
  Sparkles, CheckCircle2, UserCheck, ArrowRight
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Member, Coach } from "@/lib/db/mockData";

export default function MemberDashboardPage() {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [workout, setWorkout] = useState<any[]>([]);
  const [diet, setDiet] = useState<any>(null);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const session = dbService.getCurrentSession();
    if (session && session.type === "member") {
      const m = dbService.getMemberByCode(session.id);
      if (m) {
        setMember(m);
        const c = dbService.getCoachById(m.assignedCoachId);
        if (c) setCoach(c);
        
        // Fetch workout & diet
        setWorkout(dbService.getMemberWorkout(m.code) || []);
        setDiet(dbService.getMemberDiet(m.code));
        
        // Calculate remaining days
        const diffTime = new Date(m.expiryDate).getTime() - new Date().getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays > 0 ? diffDays : 0);

        // Fetch unread notifications
        const notifs = dbService.getNotifications(m.code);
        setUnreadNotifications(notifs.filter(n => !n.read).length);
      }
    }
  }, []);

  if (!member) return null;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* 1. TOP PROFILE AREA */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Dashboard</span>
          <h2 className="text-xl font-bold flex items-center gap-1.5 mt-0.5">
            Hello {member.name.split(" ")[0]} 👋
          </h2>
          <div className="flex items-center gap-1.5 text-text-secondary text-[10px] mt-1">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>{today}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button 
            onClick={() => router.push("/member/profile")} // redirects to notifications under profile/settings
            className="p-2.5 bg-white/5 rounded-xl border border-white/5 relative active:scale-95 transition-all"
          >
            <Bell className="w-4 h-4 text-gold" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>
          
          <span className="px-2.5 py-1 bg-green/10 text-success text-[10px] font-bold rounded-lg border border-green/20 uppercase">
            {member.status}
          </span>
        </div>
      </div>

      {/* 2. MEMBERSHIP COUNTDOWN */}
      <div className="glass-card p-4 rounded-2xl border border-gold/15 bg-gradient-to-r from-gold/5 via-transparent to-transparent flex items-center justify-between">
        <div>
          <span className="text-[10px] text-text-secondary uppercase font-semibold">Membership Plan</span>
          <h3 className="text-lg font-bold text-white mt-0.5">{member.durationMonths} Month Premium</h3>
          <p className="text-[10px] text-text-secondary mt-1">Expires: {member.expiryDate}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-gold leading-none">{daysRemaining}</div>
          <span className="text-[9px] text-text-secondary uppercase tracking-wider block mt-1">Days Left</span>
        </div>
      </div>

      {/* 3. TODAY'S WORKOUT CARD */}
      <div className="glass-card p-5 rounded-2xl border border-gold/15 bg-white/[0.02] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gold/15 rounded-lg text-gold border border-gold/25">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] text-text-secondary uppercase font-bold">Today's Workout</span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {member.goal} Routine
              </h4>
            </div>
          </div>
          <span className="text-[10px] text-gold font-semibold">{workout.length} Exercises</span>
        </div>

        {workout.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 text-[10px] text-text-secondary">
              <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">
                Est: {workout.length * 12} Mins
              </span>
              <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">
                Target: {workout[0]?.targetMuscle} Focus
              </span>
            </div>
            
            <button
              onClick={() => router.push("/member/workout")}
              className="w-full bg-gold text-black text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gold-hover transition-all"
            >
              Start Workout <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="py-4 text-center text-xs text-text-secondary">
            No workout assigned for today. Contact your coach!
          </div>
        )}
      </div>

      {/* 4. TODAY'S DIET & WATER CARD */}
      <div className="grid grid-cols-2 gap-4">
        {/* Diet Overview */}
        <div className="glass-card p-4 rounded-2xl border border-gold/10 bg-white/[0.01] flex flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <Apple className="w-4 h-4 text-gold" />
            <span className="text-[10px] text-text-secondary uppercase font-semibold">Today's Diet</span>
          </div>

          {diet ? (
            <div>
              <div className="text-xl font-bold text-white">{diet.calories}</div>
              <span className="text-[9px] text-text-secondary uppercase">Calories Goal</span>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gold font-bold">
                <Flame className="w-3 h-3 text-gold" />
                <span>{diet.protein}g Protein</span>
              </div>
            </div>
          ) : (
            <span className="text-[11px] text-text-secondary">No diet plan assigned.</span>
          )}

          <button 
            onClick={() => router.push("/member/diet")}
            className="text-[10px] text-gold font-bold hover:underline flex items-center gap-0.5 mt-2"
          >
            View Meals &rarr;
          </button>
        </div>

        {/* Quick Water Widget */}
        <div className="glass-card p-4 rounded-2xl border border-gold/10 bg-white/[0.01] flex flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-gold" />
            <span className="text-[10px] text-text-secondary uppercase font-semibold">Water intake</span>
          </div>

          <div>
            <div className="text-xl font-bold text-white">2.5 L</div>
            <span className="text-[9px] text-text-secondary uppercase">Logged Today</span>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-info font-bold">
              <Sparkles className="w-3 h-3 text-info" />
              <span>Goal: {diet?.water || 3.5} L</span>
            </div>
          </div>

          <button 
            onClick={() => router.push("/member/diet")}
            className="text-[10px] text-gold font-bold hover:underline flex items-center gap-0.5 mt-2"
          >
            Log Water &rarr;
          </button>
        </div>
      </div>

      {/* 5. QUICK STATS & COACH INFORMATION */}
      <div className="glass-card p-5 rounded-2xl border border-gold/10 bg-white/[0.01] flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-gold" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Quick Metrics</h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/[0.02] border border-white/[0.03] rounded-xl">
            <span className="text-[9px] text-text-secondary uppercase block">Current Weight</span>
            <span className="text-base font-bold text-white mt-1 block">{member.weight} kg</span>
            <span className="text-[9px] text-text-secondary block mt-0.5">Target: {member.targetWeight} kg</span>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/[0.03] rounded-xl">
            <span className="text-[9px] text-text-secondary uppercase block">BMI Value</span>
            <span className="text-base font-bold text-white mt-1 block">{member.bmi}</span>
            <span className="text-[9px] text-text-secondary block mt-0.5">Body Fat: {member.bodyFat}%</span>
          </div>
        </div>

        {/* Assigned Trainer Details */}
        {coach && (
          <div className="flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/[0.03] rounded-xl">
            <UserCheck className="w-4 h-4 text-gold" />
            <div className="flex-1">
              <span className="text-[9px] text-text-secondary uppercase block">Assigned Coach</span>
              <span className="text-xs font-bold text-white block">{coach.name}</span>
            </div>
            <span className="text-[10px] text-gold font-medium">{coach.specialization}</span>
          </div>
        )}
      </div>
    </div>
  );
}
