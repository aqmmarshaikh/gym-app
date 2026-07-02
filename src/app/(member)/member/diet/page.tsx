"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Droplet, Plus, Info, Coffee, Sun, Soup, Moon
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Diet } from "@/lib/db/mockData";

export default function MemberDietPage() {
  const [diet, setDiet] = useState<Diet | null>(null);
  
  // Water tracker states
  const [waterLogged, setWaterLogged] = useState(2500); // 2.5L default starting for demo
  const [waterGoal, setWaterGoal] = useState(3500); // 3.5L goal
  
  useEffect(() => {
    const loadData = async () => {
      const session = dbService.getCurrentSession();
      if (session && session.type === "member") {
        const data = dbService.getMemberDiet(session.id);
        if (data) {
          setDiet(data);
          setWaterGoal(data.water * 1000 || 3500);
        }
      }
    };
    loadData();
  }, []);

  const addWater = (ml: number) => {
    setWaterLogged((prev) => Math.min(prev + ml, 6000)); // cap at 6L
  };

  const resetWater = () => {
    setWaterLogged(0);
  };

  if (!diet) return null;

  // Water calculations
  const waterPercent = Math.min(Math.round((waterLogged / waterGoal) * 100), 100);
  
  // Meals structure
  const mealsList = [
    { title: "Breakfast", icon: Coffee, data: diet.breakfast },
    { title: "Morning Snack", icon: Sun, data: diet.snack },
    { title: "Lunch", icon: Soup, data: diet.lunch },
    { title: "Evening Snack", icon: Sun, data: diet.eveningSnack },
    { title: "Dinner", icon: Soup, data: diet.dinner },
    { title: "Before Sleep", icon: Moon, data: diet.beforeSleep }
  ];

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* HEADER */}
      <div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Nutrition Engine</span>
        <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Today&apos;s Diet Plan</h2>
        <p className="text-xs text-text-secondary mt-1">Goal-based customized nutritional templates assigned by your coach.</p>
      </div>

      {/* DIET CALORIES METRIC BANNER */}
      <div className="grid grid-cols-4 gap-2.5">
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Calories</span>
          <span className="text-sm font-bold text-white block mt-0.5">{diet.calories} kcal</span>
        </div>
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Protein</span>
          <span className="text-sm font-bold text-gold block mt-0.5">{diet.protein}g</span>
        </div>
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Carbs</span>
          <span className="text-sm font-bold text-white block mt-0.5">{diet.carbs}g</span>
        </div>
        <div className="p-3 bg-bg-card border border-white/[0.04] rounded-xl text-center">
          <span className="text-[9px] text-text-secondary uppercase">Fat</span>
          <span className="text-sm font-bold text-white block mt-0.5">{diet.fat}g</span>
        </div>
      </div>

      {/* WATER TRACKER LOGS */}
      <div className="glass-card p-5 rounded-2xl border border-gold/15 bg-white/[0.01] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-info" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Water Intake Tracker</h4>
              <span className="text-[9px] text-text-secondary mt-0.5">Goal: {(waterGoal / 1000).toFixed(1)} L</span>
            </div>
          </div>
          <span className="text-xs text-info font-bold">{(waterLogged / 1000).toFixed(2)} L ({waterPercent}%)</span>
        </div>

        {/* Circular Ring Progress or Sleek Bar */}
        <div className="flex items-center gap-6 p-2">
          {/* Circular ring simulator */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-neutral-800 fill-none"
                strokeWidth="6"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-info fill-none"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 34}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 34 * (1 - waterPercent / 100)}` }}
                transition={{ duration: 0.8 }}
              />
            </svg>
            <div className="absolute text-center flex flex-col items-center">
              <span className="text-xs font-black text-white">{waterPercent}%</span>
              <span className="text-[8px] text-text-secondary uppercase">Hydrated</span>
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-3">
            {/* Add buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => addWater(250)}
                className="px-2 py-2 bg-white/5 border border-white/5 hover:border-info/30 rounded-xl text-[10px] font-bold text-white flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-info" /> 250ml
              </button>
              <button 
                onClick={() => addWater(500)}
                className="px-2 py-2 bg-white/5 border border-white/5 hover:border-info/30 rounded-xl text-[10px] font-bold text-white flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-info" /> 500ml
              </button>
              <button 
                onClick={() => addWater(750)}
                className="px-2 py-2 bg-white/5 border border-white/5 hover:border-info/30 rounded-xl text-[10px] font-bold text-white flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-info" /> 750ml
              </button>
              <button 
                onClick={() => addWater(1000)}
                className="px-2 py-2 bg-white/5 border border-white/5 hover:border-info/30 rounded-xl text-[10px] font-bold text-white flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-info" /> 1.0 L
              </button>
            </div>
            
            <button 
              onClick={resetWater}
              className="text-[9px] text-text-secondary uppercase tracking-widest hover:underline hover:text-white"
            >
              Reset Logs
            </button>
          </div>
        </div>
      </div>

      {/* MEALS LIST */}
      <div className="flex flex-col gap-4">
        {mealsList.map((meal, idx) => {
          const Icon = meal.icon;
          const data = meal.data;
          if (!data) return null;

          return (
            <div 
              key={idx}
              className="glass-card p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gold" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">{meal.title}</h4>
                </div>
                <span className="text-[10px] text-text-secondary font-medium">Meal {idx + 1}</span>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/[0.03] rounded-xl flex items-start gap-3">
                <div className="flex-1">
                  <h5 className="text-xs font-bold text-white leading-normal">{data.meal}</h5>
                  <p className="text-[10px] text-text-secondary mt-1">Calories: {data.calories} kcal | Protein: {data.protein}g</p>
                </div>
              </div>

              {/* Tips / Alternative food Accordion detail */}
              <div className="flex flex-col gap-2 p-2.5 bg-black/40 rounded-xl border border-white/[0.02] text-[10px]">
                <div className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-text-secondary"><strong className="text-white">Alternative options: </strong>{data.alternate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
