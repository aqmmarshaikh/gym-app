"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, CheckSquare, Square, Info, AlertTriangle, 
  Clock, Flame, HelpCircle, Trophy, Sparkles, Dumbbell
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { WorkoutExercise } from "@/lib/db/mockData";

export default function MemberWorkoutPage() {
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [completedMap, setCompletedMap] = useState<{ [key: string]: boolean }>({});
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerMax, setTimerMax] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerOption, setTimerOption] = useState(60); // 30, 60, 90, 120

  // Workout metrics
  const [workoutComplete, setWorkoutComplete] = useState(false);

  useEffect(() => {
    const session = dbService.getCurrentSession();
    if (session && session.type === "member") {
      const data = dbService.getMemberWorkout(session.id);
      if (data) {
        setExercises(data);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
      // Play a simple browser alert or chime sound if possible
      if (typeof window !== "undefined") {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
          gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.3);
        } catch {
          // Fallback if audio context is blocked
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds]);

  const startRestTimer = (seconds: number) => {
    setTimerOption(seconds);
    setTimerMax(seconds);
    setTimerSeconds(seconds);
    setTimerActive(true);
  };

  const toggleExerciseComplete = (id: string) => {
    const updated = { ...completedMap, [id]: !completedMap[id] };
    setCompletedMap(updated);

    // Check if all are completed
    const allDone = exercises.length > 0 && exercises.every((ex) => updated[ex.id]);
    if (allDone) {
      setWorkoutComplete(true);
    } else {
      setWorkoutComplete(false);
    }
  };

  const totalCompleted = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = exercises.length > 0 ? Math.round((totalCompleted / exercises.length) * 100) : 0;
  const totalCalories = exercises.reduce((acc, curr) => acc + (completedMap[curr.id] ? (curr.sets * 20) : 0), 0);

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* HEADER */}
      <div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Training Engine</span>
        <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Today's Workout</h2>
        <p className="text-xs text-text-secondary mt-1">Exercises filtered dynamically based on available gym machines.</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="glass-card p-4 rounded-2xl border border-gold/15 bg-white/[0.01]">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-text-secondary font-medium">Workout Progress</span>
          <span className="text-gold font-bold">{progressPercent}% ({totalCompleted}/{exercises.length} Exercises)</span>
        </div>
        <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-white/[0.05]">
          <motion.div 
            className="bg-gold h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* REST TIMER COMPONENT */}
      <div className="glass-card p-4 rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.03] to-transparent flex flex-col items-center gap-3">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] text-text-secondary uppercase font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gold" /> Rest Timer
          </span>
          <span className="text-xs text-gold font-bold">{timerSeconds}s</span>
        </div>

        {/* Big circular progress bar or digital bar */}
        <div className="w-full bg-neutral-900/60 h-1.5 rounded-full overflow-hidden border border-white/[0.03] relative">
          <div 
            className="bg-gold h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timerSeconds / timerMax) * 100}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex gap-2">
            {[30, 60, 90, 120].map((sec) => (
              <button
                key={sec}
                onClick={() => startRestTimer(sec)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                  timerOption === sec 
                    ? "bg-gold text-black border-gold" 
                    : "bg-white/5 text-text-secondary border-white/5 hover:border-gold/30"
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTimerActive(!timerActive)}
              className="p-2 bg-white/5 rounded-lg border border-white/5 text-gold active:scale-95 transition-all"
            >
              {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => { setTimerSeconds(timerMax); setTimerActive(false); }}
              className="p-2 bg-white/5 rounded-lg border border-white/5 text-text-secondary active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* WORKOUT COMPLETION SUCCESS */}
      <AnimatePresence>
        {workoutComplete && (
          <motion.div 
            className="p-5 rounded-2xl bg-green/10 border border-success/30 flex flex-col items-center text-center gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Trophy className="w-10 h-10 text-success animate-bounce" />
            <h4 className="text-base font-bold text-white uppercase tracking-wider">Workout Completed!</h4>
            <p className="text-xs text-text-secondary max-w-xs">
              Excellent job! You finished all exercises on your schedule and burned approximately **{totalCalories} calories**. Keep up the consistency!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXERCISE LIST */}
      <div className="flex flex-col gap-4">
        {exercises.map((ex, idx) => {
          const isDone = !!completedMap[ex.id];
          return (
            <div 
              key={ex.id}
              className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                isDone ? "border-green/20 bg-green/[0.01] opacity-75" : "border-white/[0.05] bg-white/[0.02]"
              }`}
            >
              {/* Exercise Header Card */}
              <div className="flex p-4 gap-4">
                <div className="w-20 h-20 bg-neutral-950 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/[0.03]">
                  <Dumbbell className="w-8 h-8 text-gold/80" />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">
                        {ex.targetMuscle} • {ex.difficulty}
                      </span>
                      <button 
                        onClick={() => toggleExerciseComplete(ex.id)}
                        className={`text-gold active:scale-95 transition-all ${isDone ? 'text-success' : 'text-text-secondary'}`}
                      >
                        {isDone ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-white truncate mt-1">{ex.name}</h3>
                    <p className="text-[10px] text-text-secondary truncate mt-0.5">Machine: {ex.machineRequired}</p>
                  </div>

                  <div className="flex gap-4 text-[10px] font-bold mt-1">
                    <span className="text-gold">{ex.sets} Sets</span>
                    <span className="text-white">{ex.reps} Reps</span>
                    <span className="text-text-secondary">Rest: {ex.restTime}</span>
                  </div>
                </div>
              </div>

              {/* Extra Details Accordion/Notice */}
              {ex.coachNote && (
                <div className="px-4 pb-4 pt-2 border-t border-white/[0.02] bg-black/40 flex flex-col gap-2 text-[10.5px]">
                  <div className="flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-text-secondary"><strong className="text-white">Coach Note: </strong>{ex.coachNote}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
