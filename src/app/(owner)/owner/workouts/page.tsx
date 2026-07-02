"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ToggleLeft, ToggleRight, 
  Dumbbell, Plus, Trash2, Edit, ArrowUp, ArrowDown, Search, Check, 
  Calendar, AlertCircle, ListFilter
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { Machine, WorkoutCategory, WorkoutExercise, DailyWorkout } from "@/lib/db/mockData";

export default function OwnerWorkoutsPage() {
  const router = useRouter();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [categories, setCategories] = useState<WorkoutCategory[]>([]);
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"machines" | "categories">("machines");

  // Search & Sort for Machines
  const [machineSearch, setMachineSearch] = useState("");
  const [machineSort, setMachineSort] = useState<"name" | "status" | "active">("name");

  // Modals for Machines
  const [showAddMachine, setShowAddMachine] = useState(false);
  const [newMachineName, setNewMachineName] = useState("");
  const [newMachineCat, setNewMachineCat] = useState("Strength");
  const [newMachineMuscle, setNewMachineMuscle] = useState("Full Body");

  const [machineToEdit, setMachineToEdit] = useState<Machine | null>(null);
  const [editMachineName, setEditMachineName] = useState("");

  // Workout Assignment Engine State
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | null>(null);
  const [selectedDay, setSelectedDay] = useState<DailyWorkout["day"]>("Monday");

  // Modals for Categories
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  const [categoryToEdit, setCategoryToEdit] = useState<WorkoutCategory | null>(null);
  const [editCatName, setEditCatName] = useState("");
  const [editCatDesc, setEditCatDesc] = useState("");

  // Modals for Exercises
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExName, setNewExName] = useState("");
  const [newExSets, setNewExSets] = useState(4);
  const [newExReps, setNewExReps] = useState("12");
  const [newExRest, setNewExRest] = useState("60s");
  const [newExMuscle, setNewExMuscle] = useState("Chest");
  const [newExMachine, setNewExMachine] = useState("None");
  const [newExDifficulty, setNewExDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [newExNote, setNewExNote] = useState("");

  const [exerciseToEdit, setExerciseToEdit] = useState<WorkoutExercise | null>(null);
  const [editExName, setEditExName] = useState("");
  const [editExSets, setEditExSets] = useState(4);
  const [editExReps, setEditExReps] = useState("12");
  const [editExRest, setEditExRest] = useState("60s");
  const [editExMuscle, setEditExMuscle] = useState("Chest");
  const [editExMachine, setEditExMachine] = useState("None");
  const [editExDifficulty, setEditExDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [editExNote, setEditExNote] = useState("");

  // Editing focus state
  const [editingFocus, setEditingFocus] = useState(false);
  const [dailyFocusText, setDailyFocusText] = useState("");

  // Standard machine templates
  const standardMachines = [
    "Bench Press", "Incline Bench", "Decline Bench", "Smith Machine", "Leg Press", 
    "Hack Squat", "Leg Extension", "Leg Curl", "Lat Pulldown", "Cable Cross", 
    "Seated Row", "Chest Press", "Shoulder Press", "Pec Deck", "Butterfly", 
    "Pull Up Bar", "Dip Station", "Barbell", "EZ Bar", "Straight Bar", "Trap Bar", 
    "Adjustable Bench", "Flat Bench", "Dumbbells", "Adjustable Dumbbells", "Kettlebells", 
    "Medicine Ball", "Battle Rope", "Treadmill", "Cross Trainer", "Air Bike", 
    "Spin Bike", "Rowing Machine", "Stair Climber", "Ab Bench", "Hyper Extension Bench", 
    "Power Rack", "Half Rack", "Functional Trainer", "Cable Machine", "Resistance Bands", 
    "Suspension Trainer", "Foam Roller", "Jump Rope"
  ];

  const loadData = useCallback(() => {
    setMachines(dbService.getMachines());
    setCategories(dbService.getWorkoutCategories());
    if (selectedCategory) {
      const refreshedCat = dbService.getWorkoutCategories().find(c => c.id === selectedCategory.id);
      if (refreshedCat) setSelectedCategory(refreshedCat);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const init = async () => {
      loadData();
    };
    init();
  }, [loadData]);

  // MACHINE HANDLERS
  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMachineName.trim()) return;

    dbService.addMachine(newMachineName.trim(), newMachineCat, newMachineMuscle);
    setNewMachineName("");
    setShowAddMachine(false);
    loadData();
  };

  const handleEditMachine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!machineToEdit || !editMachineName.trim()) return;

    dbService.editMachineName(machineToEdit.id, editMachineName.trim());
    setMachineToEdit(null);
    setEditMachineName("");
    loadData();
  };

  const handleDeleteMachine = (id: string) => {
    if (confirm("Are you sure you want to delete this machine?")) {
      dbService.deleteMachine(id);
      loadData();
    }
  };

  const handleToggleMachineStatus = (id: string, status: Machine["status"]) => {
    dbService.toggleMachineStatus(id, status);
    loadData();
  };

  const handleToggleMachineActive = (id: string) => {
    dbService.toggleMachineActive(id);
    loadData();
  };

  // CATEGORY HANDLERS
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    dbService.addWorkoutCategory(newCatName.trim(), newCatDesc.trim());
    setNewCatName("");
    setNewCatDesc("");
    setShowAddCategory(false);
    loadData();
  };

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryToEdit || !editCatName.trim()) return;

    dbService.editWorkoutCategory(categoryToEdit.id, editCatName.trim(), editCatDesc.trim());
    setCategoryToEdit(null);
    setEditCatName("");
    setEditCatDesc("");
    loadData();
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category? All weekly schedules for it will be lost.")) {
      dbService.deleteWorkoutCategory(id);
      if (selectedCategory?.id === id) {
        setSelectedCategory(null);
      }
      loadData();
    }
  };

  // DAILY FOCUS HANDLER
  const handleUpdateFocus = () => {
    if (!selectedCategory) return;
    dbService.updateDailyWorkoutFocus(selectedCategory.id, selectedDay, dailyFocusText);
    setEditingFocus(false);
    loadData();
  };

  // EXERCISE HANDLERS
  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !newExName.trim()) return;

    dbService.addExerciseToCategory(selectedCategory.id, selectedDay, {
      name: newExName.trim(),
      sets: newExSets,
      reps: newExReps.trim(),
      restTime: newExRest.trim(),
      targetMuscle: newExMuscle,
      machineRequired: newExMachine,
      difficulty: newExDifficulty,
      coachNote: newExNote.trim()
    });

    setNewExName("");
    setNewExSets(4);
    setNewExReps("12");
    setNewExRest("60s");
    setNewExNote("");
    setShowAddExercise(false);
    loadData();
  };

  const handleEditExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !exerciseToEdit || !editExName.trim()) return;

    dbService.editExerciseInCategory(selectedCategory.id, selectedDay, exerciseToEdit.id, {
      name: editExName.trim(),
      sets: editExSets,
      reps: editExReps.trim(),
      restTime: editExRest.trim(),
      targetMuscle: editExMuscle,
      machineRequired: editExMachine,
      difficulty: editExDifficulty,
      coachNote: editExNote.trim()
    });

    setExerciseToEdit(null);
    setEditExName("");
    loadData();
  };

  const handleDeleteExercise = (exId: string) => {
    if (!selectedCategory) return;
    if (confirm("Are you sure you want to delete this exercise?")) {
      dbService.deleteExerciseFromCategory(selectedCategory.id, selectedDay, exId);
      loadData();
    }
  };

  const handleMoveExercise = (idx: number, direction: "up" | "down") => {
    if (!selectedCategory) return;
    const dailyWorkout = selectedCategory.dailyWorkouts.find(dw => dw.day === selectedDay);
    if (!dailyWorkout) return;

    const list = [...dailyWorkout.exercises];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;

    dbService.reorderExercisesInCategory(selectedCategory.id, selectedDay, list.map(ex => ex.id));
    loadData();
  };

  // FILTERED MACHINES
  const filteredMachines = machines
    .filter(m => {
      const match = m.name.toLowerCase().includes(machineSearch.toLowerCase()) || 
                    m.targetMuscle.toLowerCase().includes(machineSearch.toLowerCase());
      return match;
    })
    .sort((a, b) => {
      if (machineSort === "name") return a.name.localeCompare(b.name);
      if (machineSort === "status") return a.status.localeCompare(b.status);
      if (machineSort === "active") {
        const activeA = a.isActive !== false ? 1 : 0;
        const activeB = b.isActive !== false ? 1 : 0;
        return activeB - activeA;
      }
      return 0;
    });

  // Active workout day configuration
  const activeDailyWorkout = selectedCategory?.dailyWorkouts.find(dw => dw.day === selectedDay);

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            if (selectedCategory) {
              setSelectedCategory(null);
            } else {
              router.push("/owner/dashboard");
            }
          }}
          className="p-2 bg-white/5 border border-white/5 text-text-secondary hover:text-white rounded-xl active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
        </button>
        <div>
          <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Configurator</span>
          <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">
            {selectedCategory ? `${selectedCategory.name} Plan` : "Gym Configurator"}
          </h2>
        </div>
      </div>

      {!selectedCategory ? (
        <>
          {/* Main Tabs Selector */}
          <div className="grid grid-cols-2 gap-2 bg-bg-card p-1 rounded-xl border border-white/[0.04]">
            <button
              onClick={() => setActiveTab("machines")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "machines" ? "bg-gold text-black" : "text-text-secondary hover:text-white"
              }`}
            >
              Gym Machines ({machines.length})
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "categories" ? "bg-gold text-black" : "text-text-secondary hover:text-white"
              }`}
            >
              Workout Categories ({categories.length})
            </button>
          </div>

          {/* TAB 1: GYM MACHINES MANAGEMENT */}
          {activeTab === "machines" && (
            <div className="flex flex-col gap-4">
              {/* Add Machine Button & Search */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={machineSearch}
                    onChange={(e) => setMachineSearch(e.target.value)}
                    placeholder="Search machines or muscles..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={() => setShowAddMachine(true)}
                  className="px-4 bg-gold text-black rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Sort Filter Selector */}
              <div className="flex items-center gap-2 text-xs text-text-secondary bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.03]">
                <ListFilter className="w-3.5 h-3.5 text-gold" />
                <span>Sort by:</span>
                <select
                  value={machineSort}
                  onChange={(e) => setMachineSort(e.target.value as "name" | "status" | "active")}
                  className="bg-transparent text-white font-bold border-none outline-none cursor-pointer focus:text-gold"
                >
                  <option value="name">Machine Name</option>
                  <option value="status">Availability</option>
                  <option value="active">Active State</option>
                </select>
              </div>

              {/* Machines Fleet List */}
              <div className="flex flex-col gap-3">
                {filteredMachines.length > 0 ? (
                  filteredMachines.map((m) => {
                    const isActive = m.isActive !== false;

                    return (
                      <div 
                        key={m.id}
                        className={`glass-card p-4 rounded-xl border transition-all ${
                          isActive ? "border-white/[0.04] bg-white/[0.01]" : "border-white/[0.01] bg-black/40 opacity-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white flex items-center gap-2">
                              {m.name}
                              {!isActive && (
                                <span className="text-[8px] bg-danger/20 border border-danger/30 text-danger px-1.5 py-0.5 rounded font-extrabold uppercase">
                                  Disabled
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center gap-2 text-[9px] text-text-secondary mt-1 uppercase tracking-wide">
                              <span>{m.category}</span>
                              <span>•</span>
                              <span>{m.targetMuscle}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setMachineToEdit(m);
                                setEditMachineName(m.name);
                              }}
                              className="p-1.5 bg-white/5 border border-white/5 rounded-lg text-text-secondary hover:text-white hover:border-gold/30 active:scale-95 transition-all"
                            >
                              <Edit className="w-3 h-3 text-gold" />
                            </button>
                            <button
                              onClick={() => handleDeleteMachine(m.id)}
                              className="p-1.5 bg-danger/10 border border-danger/20 rounded-lg text-danger active:scale-95 transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Controls (Status Selectors & Enable/Disable Switch) */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.03]">
                          {/* Availability Switchers */}
                          <div className="flex gap-1.5">
                            {(["Available", "Unavailable", "Maintenance"] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => handleToggleMachineStatus(m.id, st)}
                                className={`px-2 py-1 rounded text-[8px] font-bold uppercase tracking-wider border transition-all ${
                                  m.status === st
                                    ? st === "Available" 
                                      ? "bg-green/10 text-green border-green/30"
                                      : st === "Maintenance"
                                        ? "bg-warning/10 text-warning border-warning/30"
                                        : "bg-danger/10 text-danger border-danger/30"
                                    : "bg-transparent text-text-secondary border-white/5 hover:border-white/10"
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>

                          {/* Enable/Disable Toggle Switch */}
                          <button
                            onClick={() => handleToggleMachineActive(m.id)}
                            className="flex items-center gap-1.5 text-[9px] text-text-secondary font-bold"
                          >
                            <span>Active State:</span>
                            {isActive ? (
                              <ToggleRight className="w-6 h-6 text-gold" />
                            ) : (
                              <ToggleLeft className="w-6 h-6 text-text-secondary opacity-50" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-text-secondary bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
                    No gym machines match your search.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: WORKOUT ASSIGNMENT ENGINE */}
          {activeTab === "categories" && (
            <div className="flex flex-col gap-4">
              {/* Category creation bar */}
              <button
                onClick={() => setShowAddCategory(true)}
                className="w-full py-3.5 bg-gold text-black rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
              >
                <Plus className="w-4 h-4" /> Create Custom Workout Category
              </button>

              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <div 
                    key={cat.id}
                    className="glass-card p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{cat.name}</h4>
                        <p className="text-[10px] text-text-secondary mt-1">{cat.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setCategoryToEdit(cat);
                            setEditCatName(cat.name);
                            setEditCatDesc(cat.description || "");
                          }}
                          className="p-1.5 bg-white/5 border border-white/5 rounded-lg text-text-secondary hover:text-white hover:border-gold/30 active:scale-95 transition-all"
                        >
                          <Edit className="w-3 h-3 text-gold" />
                        </button>
                        {cat.name !== "General Fitness" && (
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1.5 bg-danger/10 border border-danger/25 rounded-lg text-danger active:scale-95 transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedDay("Monday");
                      }}
                      className="w-full py-2 bg-white/5 hover:bg-gold/10 hover:text-gold rounded-lg border border-white/5 hover:border-gold/30 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Edit Weekly Plan (Monday - Sunday)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* DYNAMIC WEEKLY WORKOUT PLANNER (Monday - Sunday) */
        <div className="flex flex-grow flex-col gap-5">
          {/* Summary Banner */}
          <div className="p-4 bg-bg-card border border-white/[0.04] rounded-2xl flex flex-col gap-1">
            <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">Goal Description</span>
            <p className="text-[10px] text-text-secondary leading-relaxed">{selectedCategory.description}</p>
          </div>

          {/* Weekday Selector Slider */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 shrink-0">
            {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const).map((day) => {
              const isSelected = selectedDay === day;
              const hasExercises = (selectedCategory.dailyWorkouts.find(dw => dw.day === day)?.exercises.length || 0) > 0;

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setEditingFocus(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all shrink-0 border relative ${
                    isSelected 
                      ? "bg-gold text-black border-gold shadow-[0_4px_10px_rgba(212,175,55,0.15)]" 
                      : "bg-white/5 text-text-secondary border-white/5 hover:border-gold/20"
                  }`}
                >
                  {day}
                  {hasExercises && (
                    <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isSelected ? 'bg-black' : 'bg-gold'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Focus Editor */}
          {activeDailyWorkout && (
            <div className="glass-card p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-between text-xs">
              <div className="flex-1">
                <span className="text-[9px] text-text-secondary uppercase">Workout Focus:</span>
                {editingFocus ? (
                  <div className="flex gap-2 mt-1.5">
                    <input
                      type="text"
                      value={dailyFocusText}
                      onChange={(e) => setDailyFocusText(e.target.value)}
                      placeholder="e.g. Chest & Triceps"
                      className="bg-black border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none focus:border-gold flex-1"
                    />
                    <button
                      onClick={handleUpdateFocus}
                      className="p-1.5 bg-green/10 border border-green/20 rounded-lg text-green active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h4 className="text-white font-bold text-sm mt-0.5">
                    {activeDailyWorkout.focus || "No Focus Configured"}
                  </h4>
                )}
              </div>

              {!editingFocus && (
                <button
                  onClick={() => {
                    setEditingFocus(true);
                    setDailyFocusText(activeDailyWorkout.focus || "");
                  }}
                  className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-gold uppercase"
                >
                  Edit Focus
                </button>
              )}
            </div>
          )}

          {/* Exercises Header & Add Button */}
          <div className="flex justify-between items-center mt-2 border-b border-white/[0.04] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-gold" /> 
              Exercises ({activeDailyWorkout?.exercises.length || 0})
            </h3>
            {selectedDay !== "Sunday" && (
              <button
                onClick={() => {
                  setNewExName("");
                  setNewExMachine("None");
                  setShowAddExercise(true);
                }}
                className="px-3 py-1.5 bg-gold text-black rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-1 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3" /> Add Exercise
              </button>
            )}
          </div>

          {/* Exercises List for the Selected Day */}
          <div className="flex flex-col gap-3 flex-grow overflow-y-auto">
            {activeDailyWorkout && activeDailyWorkout.exercises.length > 0 ? (
              activeDailyWorkout.exercises.map((ex, idx) => {
                const reqMachineObj = machines.find(m => m.name.toLowerCase().trim() === ex.machineRequired.toLowerCase().trim());
                const isMachineUnavailable = reqMachineObj && (reqMachineObj.status !== "Available" || reqMachineObj.isActive === false);

                return (
                  <div 
                    key={ex.id}
                    className={`glass-card p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                      isMachineUnavailable 
                        ? "border-danger/30 bg-danger/[0.02]" 
                        : "border-white/[0.03] bg-white/[0.01]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          {ex.name}
                          {isMachineUnavailable && (
                            <span className="text-[7.5px] bg-danger/10 border border-danger/30 text-danger px-1.5 py-0.5 rounded font-black uppercase flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5" /> Machine Down
                            </span>
                          )}
                        </h4>
                        <span className="text-[9px] text-text-secondary uppercase mt-0.5 block">
                          Needs: <span className={isMachineUnavailable ? "text-danger font-bold" : "text-gold"}>{ex.machineRequired}</span>
                        </span>
                      </div>

                      {/* Controls: Up/Down arrows, Edit, Delete */}
                      <div className="flex gap-1.5">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveExercise(idx, "up")}
                          className="p-1 bg-white/5 border border-white/5 rounded text-text-secondary hover:text-white disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === activeDailyWorkout.exercises.length - 1}
                          onClick={() => handleMoveExercise(idx, "down")}
                          className="p-1 bg-white/5 border border-white/5 rounded text-text-secondary hover:text-white disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setExerciseToEdit(ex);
                            setEditExName(ex.name);
                            setEditExSets(ex.sets);
                            setEditExReps(ex.reps);
                            setEditExRest(ex.restTime);
                            setEditExMuscle(ex.targetMuscle);
                            setEditExMachine(ex.machineRequired);
                            setEditExDifficulty(ex.difficulty);
                            setEditExNote(ex.coachNote || "");
                          }}
                          className="p-1 bg-white/5 border border-white/5 rounded text-text-secondary hover:text-white"
                        >
                          <Edit className="w-3.5 h-3.5 text-gold" />
                        </button>
                        <button
                          onClick={() => handleDeleteExercise(ex.id)}
                          className="p-1 bg-danger/10 border border-danger/25 rounded text-danger"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Meta info row */}
                    <div className="flex gap-4 text-[10px] text-text-secondary">
                      <span>Sets: <strong className="text-white font-bold">{ex.sets}</strong></span>
                      <span>Reps: <strong className="text-white font-bold">{ex.reps}</strong></span>
                      <span>Rest: <strong className="text-white font-bold">{ex.restTime}</strong></span>
                      <span>Difficulty: <strong className="text-gold uppercase">{ex.difficulty}</strong></span>
                    </div>

                    {ex.coachNote && (
                      <div className="p-2 bg-black/45 border border-white/[0.02] rounded-lg text-[9.5px] text-text-secondary">
                        <strong className="text-white">Coach Note:</strong> {ex.coachNote}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center text-xs text-text-secondary bg-white/[0.01] border border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6 text-gold" />
                {selectedDay === "Sunday" ? "Rest Day. No training required." : "No exercises added for this day yet."}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODALS SECTION */}
      {/* ================================================= */}

      {/* 1. ADD MACHINE MODAL */}
      {showAddMachine && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Add Gym Machine</h3>
            <form onSubmit={handleAddMachine} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Select Machine or Custom Name</label>
                <input
                  list="standard-machines"
                  type="text"
                  required
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                  placeholder="e.g. Lat Pulldown Station"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
                <datalist id="standard-machines">
                  {standardMachines.map((m) => <option key={m} value={m} />)}
                </datalist>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Category</label>
                <select
                  value={newMachineCat}
                  onChange={(e) => setNewMachineCat(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                >
                  <option value="Strength">Strength Focus</option>
                  <option value="Cardio">Cardio Focus</option>
                  <option value="Functional">Functional Focus</option>
                  <option value="Recovery">Recovery Focus</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Target Muscle Group</label>
                <input
                  type="text"
                  required
                  value={newMachineMuscle}
                  onChange={(e) => setNewMachineMuscle(e.target.value)}
                  placeholder="e.g. Back, Chest, Legs"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMachine(false)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Add Machine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT MACHINE NAME MODAL */}
      {machineToEdit && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Rename Gym Machine</h3>
            <form onSubmit={handleEditMachine} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">New Machine Name</label>
                <input
                  type="text"
                  required
                  value={editMachineName}
                  onChange={(e) => setEditMachineName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setMachineToEdit(null)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Save Name
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD CATEGORY MODAL */}
      {showAddCategory && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Add Workout Category</h3>
            <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Powerlifting, Beginner"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Description</label>
                <textarea
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Goals and targets of this weekly schedule..."
                  rows={2}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT CATEGORY MODAL */}
      {categoryToEdit && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Edit Workout Category</h3>
            <form onSubmit={handleEditCategory} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary uppercase mb-1">Description</label>
                <textarea
                  value={editCatDesc}
                  onChange={(e) => setEditCatDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setCategoryToEdit(null)}
                  className="flex-1 bg-white/5 border border-white/5 py-3 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD EXERCISE MODAL */}
      {showAddExercise && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card max-h-[85vh] overflow-y-auto scrollbar-none">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Add Exercise to {selectedDay}</h3>
            <form onSubmit={handleAddExercise} className="flex flex-col gap-3">
              <div>
                <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Exercise Name</label>
                <input
                  type="text"
                  required
                  value={newExName}
                  onChange={(e) => setNewExName(e.target.value)}
                  placeholder="e.g. Lat Pulldown"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Sets</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newExSets}
                    onChange={(e) => setNewExSets(parseInt(e.target.value) || 3)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Reps</label>
                  <input
                    type="text"
                    required
                    value={newExReps}
                    onChange={(e) => setNewExReps(e.target.value)}
                    placeholder="e.g. 12 or 10-12"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Rest Time</label>
                  <input
                    type="text"
                    required
                    value={newExRest}
                    onChange={(e) => setNewExRest(e.target.value)}
                    placeholder="e.g. 60s"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Target Muscle</label>
                  <input
                    type="text"
                    required
                    value={newExMuscle}
                    onChange={(e) => setNewExMuscle(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Difficulty</label>
                  <select
                    value={newExDifficulty}
                    onChange={(e) => setNewExDifficulty(e.target.value as "Beginner" | "Intermediate" | "Advanced")}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Machine Required</label>
                <select
                  value={newExMachine}
                  onChange={(e) => setNewExMachine(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                >
                  <option value="None">None (Bodyweight / Free Weight)</option>
                  {machines.filter(m => m.isActive !== false).map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Coach Note</label>
                <textarea
                  value={newExNote}
                  onChange={(e) => setNewExNote(e.target.value)}
                  placeholder="Tips, safety, or breathing cues..."
                  rows={2}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowAddExercise(false)}
                  className="flex-1 bg-white/5 border border-white/5 py-2.5 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Save Exercise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. EDIT EXERCISE MODAL */}
      {exerciseToEdit && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-gold/20 bg-bg-card max-h-[85vh] overflow-y-auto scrollbar-none">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Edit Exercise</h3>
            <form onSubmit={handleEditExercise} className="flex flex-col gap-3">
              <div>
                <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Exercise Name</label>
                <input
                  type="text"
                  required
                  value={editExName}
                  onChange={(e) => setEditExName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Sets</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editExSets}
                    onChange={(e) => setEditExSets(parseInt(e.target.value) || 3)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Reps</label>
                  <input
                    type="text"
                    required
                    value={editExReps}
                    onChange={(e) => setEditExReps(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Rest Time</label>
                  <input
                    type="text"
                    required
                    value={editExRest}
                    onChange={(e) => setEditExRest(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Target Muscle</label>
                  <input
                    type="text"
                    required
                    value={editExMuscle}
                    onChange={(e) => setEditExMuscle(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Difficulty</label>
                  <select
                    value={editExDifficulty}
                    onChange={(e) => setEditExDifficulty(e.target.value as "Beginner" | "Intermediate" | "Advanced")}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Machine Required</label>
                <select
                  value={editExMachine}
                  onChange={(e) => setEditExMachine(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none"
                >
                  <option value="None">None (Bodyweight / Free Weight)</option>
                  {machines.filter(m => m.isActive !== false).map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-text-secondary uppercase mb-1">Coach Note</label>
                <textarea
                  value={editExNote}
                  onChange={(e) => setEditExNote(e.target.value)}
                  rows={2}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-gold outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setExerciseToEdit(null)}
                  className="flex-1 bg-white/5 border border-white/5 py-2.5 rounded-xl text-xs font-bold text-text-secondary active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gold text-black py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
