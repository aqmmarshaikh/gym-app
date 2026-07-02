import { db, auth } from "@/lib/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  coaches as initialCoaches,
  members as initialMembers,
  machines as initialMachines,
  exerciseLibrary as initialExercises,
  transformations as initialTransformations,
  testimonials as initialTestimonials,
  announcements as initialAnnouncements,
  attendanceRecords as initialAttendance,
  dietPlans as initialDiets,
  gallery as initialGallery,
  workoutCategories as initialWorkoutCategories,
  Coach,
  Member,
  Machine,
  Exercise,
  AttendanceRecord,
  FeeRecord,
  Transformation,
  Testimonial,
  Announcement,
  Notification,
  MemberProgress,
  AuditLog,
  WorkoutCategory,
  DailyWorkout,
  WorkoutExercise,
  BrandSettings,
  JoinRequest
} from "./mockData";

// Simple reactive LocalStorage store for Demo Mode
class LocalStore {
  private isBrowser = typeof window !== "undefined";

  private get<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser) return defaultValue;
    const val = localStorage.getItem(key);
    if (!val) {
      this.set(key, defaultValue);
      return defaultValue;
    }
    try {
      return JSON.parse(val);
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Database Toggles
  get isDemoMode(): boolean {
    return this.get("fcg_demo_mode", true);
  }
  set isDemoMode(val: boolean) {
    this.set("fcg_demo_mode", val);
  }

  // Data Getters/Setters
  get coaches(): Coach[] {
    return this.get("fcg_coaches", initialCoaches);
  }
  set coaches(val: Coach[]) {
    this.set("fcg_coaches", val);
  }

  get members(): Member[] {
    return this.get("fcg_members", initialMembers);
  }
  set members(val: Member[]) {
    this.set("fcg_members", val);
  }

  get machines(): Machine[] {
    return this.get("fcg_machines", initialMachines);
  }
  set machines(val: Machine[]) {
    this.set("fcg_machines", val);
  }

  get exercises(): Exercise[] {
    return this.get("fcg_exercises", initialExercises);
  }
  set exercises(val: Exercise[]) {
    this.set("fcg_exercises", val);
  }

  get transformations(): Transformation[] {
    return this.get("fcg_transformations", initialTransformations);
  }
  set transformations(val: Transformation[]) {
    this.set("fcg_transformations", val);
  }

  get testimonials(): Testimonial[] {
    return this.get("fcg_testimonials", initialTestimonials);
  }
  set testimonials(val: Testimonial[]) {
    this.set("fcg_testimonials", val);
  }

  get gallery(): { id: string; category: string; imageUrl: string; title: string }[] {
    return this.get("fcg_gallery", initialGallery);
  }
  set gallery(val: { id: string; category: string; imageUrl: string; title: string }[]) {
    this.set("fcg_gallery", val);
  }

  get workoutCategories(): WorkoutCategory[] {
    return this.get("fcg_workout_categories", initialWorkoutCategories);
  }
  set workoutCategories(val: WorkoutCategory[]) {
    this.set("fcg_workout_categories", val);
  }

  get announcements(): Announcement[] {
    return this.get("fcg_announcements", initialAnnouncements);
  }
  set announcements(val: Announcement[]) {
    this.set("fcg_announcements", val);
  }

  get attendance(): AttendanceRecord[] {
    return this.get("fcg_attendance", initialAttendance);
  }
  set attendance(val: AttendanceRecord[]) {
    this.set("fcg_attendance", val);
  }

  get fees(): FeeRecord[] {
    return this.get("fcg_fees", this.generateMockFees());
  }
  set fees(val: FeeRecord[]) {
    this.set("fcg_fees", val);
  }

  get progress(): MemberProgress[] {
    return this.get("fcg_progress", this.generateMockProgress());
  }
  set progress(val: MemberProgress[]) {
    this.set("fcg_progress", val);
  }

  get notifications(): Notification[] {
    return this.get("fcg_notifications", this.generateMockNotifications());
  }
  set notifications(val: Notification[]) {
    this.set("fcg_notifications", val);
  }

  get auditLogs(): AuditLog[] {
    return this.get("fcg_audit_logs", this.generateMockAuditLogs());
  }
  set auditLogs(val: AuditLog[]) {
    this.set("fcg_audit_logs", val);
  }

  // Active Sessions
  get currentSession(): { type: "member" | "coach" | "owner"; id: string } | null {
    return this.get("fcg_active_session", null);
  }
  set currentSession(val: { type: "member" | "coach" | "owner"; id: string } | null) {
    this.set("fcg_active_session", val);
  }

  // Settings
  get brandSettings(): BrandSettings {
    return this.get("fcg_brand_settings", {
      name: "Fitness Corner Gym",
      tagline: "Build Strength. Build Discipline. Build Yourself.",
      logoUrl: "/logo.png",
      phone: "+91 98765 00001",
      whatsapp: "+91 98765 00002",
      email: "info@fitnesscornergym.com",
      address: "101, Luxury Arcade, Satellite, Ahmedabad, Gujarat - 380015",
      googleMapLink: "https://maps.google.com",
      openingTime: "05:00 AM",
      closingTime: "11:00 PM",
      emergencyContact: "+91 98765 99999",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      defaultLanguage: "English"
    });
  }
  set brandSettings(val: BrandSettings) {
    this.set("fcg_brand_settings", val);
  }

  get joinRequests(): JoinRequest[] {
    return this.get("fcg_join_requests", [
      { id: "req1", name: "Rohan Joshi", age: 24, height: 175, weight: 80, goal: "Weight Loss", preferredTiming: "06:00 AM - 08:00 AM", experience: "Beginner", phone: "+91 98989 89898", medicalConditions: "None", notes: "Please call after 5pm", status: "Pending", createdAt: "2026-07-02" },
      { id: "req2", name: "Kriti Sharma", age: 28, height: 162, weight: 58, goal: "Muscle Building", preferredTiming: "06:00 PM - 08:00 PM", experience: "Intermediate", phone: "+91 97979 79797", medicalConditions: "Asthma", notes: "Looking for female trainer", status: "Contacted", createdAt: "2026-07-01" }
    ]);
  }
  set joinRequests(val: JoinRequest[]) {
    this.set("fcg_join_requests", val);
  }

  // Mock generators for relational consistency
  private generateMockFees(): FeeRecord[] {
    const list: FeeRecord[] = [];
    const membersList = initialMembers;
    membersList.forEach((m) => {
      const isPaid = m.status === "Active";
      const isPending = m.status === "Fee Due";
      
      list.push({
        id: `fee_${m.code}`,
        memberCode: m.code,
        paymentDate: m.joiningDate,
        amount: m.durationMonths * 2000 - (m.durationMonths > 3 ? 500 : 0),
        durationMonths: m.durationMonths,
        expiryDate: m.expiryDate,
        remarks: isPaid ? "Monthly Fee Received" : isPending ? "Reminder Sent" : "Membership Expired",
        status: isPaid ? "Paid" : isPending ? "Pending" : "Overdue"
      });
    });
    return list;
  }

  private generateMockProgress(): MemberProgress[] {
    const list: MemberProgress[] = [];
    // Only generate detailed progress logs for FCG1001 (Ammar) to demonstrate graphs
    const ammar = initialMembers[0];
    if (ammar) {
      // 4 updates showing weight decrease
      for (let i = 0; i < 4; i++) {
        const date = new Date(2026, 2 + i, 1).toISOString().split("T")[0]; // Mar, Apr, May, Jun
        const weight = 85.0 - i * 2.1;
        const bmi = parseFloat((weight / ((ammar.height / 100) * (ammar.height / 100))).toFixed(1));
        const bodyFat = 22.0 - i * 1.1;

        list.push({
          id: `prog_FCG1001_${i}`,
          memberCode: "FCG1001",
          date,
          weight,
          bmi,
          bodyFat,
          chest: 104 - i * 0.5,
          waist: 94 - i * 1.5,
          hip: 101 - i * 0.5,
          neck: 39,
          shoulder: 122 + i * 0.5,
          leftArm: 37 + i * 0.2,
          rightArm: 37 + i * 0.2,
          photos: [
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60"
          ]
        });
      }
    }
    return list;
  }

  private generateMockNotifications(): Notification[] {
    const list: Notification[] = [];
    // Pre-populate notifications for FCG1001
    list.push({
      id: "n1",
      memberCode: "FCG1001",
      title: "Workout Assigned",
      message: "Coach Rajesh Sharma has updated your Weight Loss Workout template.",
      type: "workout",
      read: false,
      createdAt: "2026-07-02T10:00:00Z"
    });
    list.push({
      id: "n2",
      memberCode: "FCG1001",
      title: "Diet Updated",
      message: "Your new High Protein Diet plan is active.",
      type: "diet",
      read: true,
      createdAt: "2026-07-01T08:30:00Z"
    });
    list.push({
      id: "n3",
      memberCode: "FCG1001",
      title: "Attendance Scanned",
      message: "Present marked on 02 July at 07:18 AM.",
      type: "attendance",
      read: true,
      createdAt: "2026-07-02T07:18:00Z"
    });
    return list;
  }

  private generateMockAuditLogs(): AuditLog[] {
    return [
      { id: "log1", actor: "Coach Rajesh Sharma", action: "Assigned Workout Plan", target: "Ammar Patel (FCG1001)", timestamp: "2026-07-02 10:00 AM", device: "Android Chrome" },
      { id: "log2", actor: "Coach Rajesh Sharma", action: "Updated Diet Plan", target: "Ammar Patel (FCG1001)", timestamp: "2026-07-01 08:30 AM", device: "Android Chrome" },
      { id: "log3", actor: "Owner", action: "Updated Machine Status", target: "Hack Squat Machine -> Maintenance", timestamp: "2026-06-30 04:15 PM", device: "iPhone Safari" },
      { id: "log4", actor: "Coach Vikram Malhotra", action: "Renewed Fee Membership", target: "Dev Shah (FCG1005)", timestamp: "2026-06-29 09:20 AM", device: "Desktop Chrome" }
    ];
  }
}

export const store = new LocalStore();

// ==============================================
// Database Service Interface
// ==============================================
export const dbService = {
  // Toggle Demo Mode
  isDemoMode: () => store.isDemoMode,
  setDemoMode: (val: boolean) => {
    store.isDemoMode = val;
  },

  // Auth Operations
  validateMemberCode: async (code: string): Promise<{ success: boolean; status?: Member["status"]; member?: Member; message: string }> => {
    const formattedCode = code.trim().toUpperCase();
    
    if (dbService.isDemoMode()) {
      const members = store.members;
      const member = members.find((m) => m.code === formattedCode);
      
      if (!member) {
        return { success: false, message: "Member Code not found. Please try again." };
      }

      if (member.status === "Blocked") {
        return { success: false, status: "Blocked", message: "Your membership has been temporarily disabled. Please contact your coach." };
      }

      if (member.status === "Expired") {
        return { success: false, status: "Expired", message: "Membership Expired. Please contact your coach to renew." };
      }

      store.currentSession = { type: "member", id: member.code };
      return { success: true, status: member.status, member, message: "Welcome Back!" };
    } else {
      try {
        const docRef = doc(db, "members", formattedCode);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          return { success: false, message: "Member Code not found in Firestore." };
        }
        const member = snap.data() as Member;
        if (member.status === "Blocked") {
          return { success: false, status: "Blocked", message: "Your membership has been temporarily disabled. Please contact your coach." };
        }
        if (member.status === "Expired") {
          return { success: false, status: "Expired", message: "Membership Expired. Please contact your coach to renew." };
        }
        store.currentSession = { type: "member", id: member.code };
        return { success: true, status: member.status, member, message: "Welcome Back (Firestore)!" };
      } catch (err: unknown) {
        return { success: false, message: `Firestore Error: ${(err as Error).message}` };
      }
    }
  },

  validateCoachLogin: async (username: string, pass: string): Promise<{ success: boolean; coach?: Coach; message: string }> => {
    const cleanUser = username.trim().toLowerCase();
    
    if (dbService.isDemoMode()) {
      const coaches = store.coaches;
      const coach = coaches.find((c) => c.username === cleanUser || c.email?.toLowerCase() === cleanUser);
      
      if (!coach || coach.status !== "Active") {
        return { success: false, message: "Invalid Coach Username/Email or Account Inactive." };
      }

      if (pass !== "Password@123" && coach.password !== pass) {
        return { success: false, message: "Incorrect Password." };
      }

      store.currentSession = { type: "coach", id: coach.id };
      return { success: true, coach, message: "Welcome Back Coach!" };
    } else {
      try {
        const email = cleanUser.includes("@") ? cleanUser : `${cleanUser}@gym.com`;
        await signInWithEmailAndPassword(auth, email, pass);
        
        // Fetch or default coach
        const docRef = doc(db, "coaches", "coach");
        const snap = await getDoc(docRef);
        let coach: Coach;
        if (snap.exists()) {
          coach = snap.data() as Coach;
        } else {
          coach = {
            id: "coach6",
            name: "Demo Coach",
            username: "coach",
            email: "coach123@gmail.com",
            phone: "+91 98765 00000",
            experience: "1 Year",
            specialization: "General Coaching",
            languages: ["English", "Hindi"],
            status: "Active",
            photoUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&auto=format&fit=crop&q=80",
            joiningDate: "2026-07-02"
          };
        }
        store.currentSession = { type: "coach", id: coach.id };
        return { success: true, coach, message: "Authenticated via Firebase!" };
      } catch (err: unknown) {
        return { success: false, message: `Firebase Auth Error: ${(err as Error).message}` };
      }
    }
  },

  validateOwnerLogin: async (username: string, pass: string): Promise<{ success: boolean; message: string }> => {
    const u = username.trim().toLowerCase();
    
    if (dbService.isDemoMode()) {
      if ((u === "owner" || u === "owner123@gmail.com") && pass === "Owner@123") {
        store.currentSession = { type: "owner", id: "owner" };
        return { success: true, message: "Welcome Back Owner!" };
      }
      return { success: false, message: "Invalid Owner Credentials." };
    } else {
      try {
        const email = u.includes("@") ? u : `${u}@gym.com`;
        await signInWithEmailAndPassword(auth, email, pass);
        store.currentSession = { type: "owner", id: "owner" };
        return { success: true, message: "Authenticated Owner via Firebase!" };
      } catch (err: unknown) {
        return { success: false, message: `Firebase Owner Auth Error: ${(err as Error).message}` };
      }
    }
  },

  getCurrentSession: () => {
    return store.currentSession;
  },

  logout: () => {
    store.currentSession = null;
  },

  // Member CRUD
  getMembers: () => store.members,
  getMemberByCode: (code: string) => store.members.find((m) => m.code === code),
  updateMemberProfile: (code: string, updates: Partial<Member>) => {
    const list = store.members;
    const idx = list.findIndex((m) => m.code === code);
    if (idx === -1) return false;
    
    list[idx] = { ...list[idx], ...updates };
    store.members = list;
    
    // Log audit
    dbService.addAuditLog(
      updates.name || "Member",
      "Updated profile details",
      code
    );
    return true;
  },

  addMember: (member: Omit<Member, "joiningWeight" | "attendanceRate" | "bmi" | "bodyFat">) => {
    const list = store.members;
    // Check duplicate code
    if (list.some((m) => m.code === member.code)) {
      return { success: false, message: "Membership Code already exists!" };
    }

    const bmi = parseFloat((member.weight / ((member.height / 100) * (member.height / 100))).toFixed(1));
    const newMember: Member = {
      ...member,
      joiningWeight: member.weight,
      attendanceRate: 0,
      bmi,
      bodyFat: 15, // default
    };

    list.push(newMember);
    store.members = list;

    // Create default fee record
    const feesList = store.fees;
    feesList.push({
      id: `fee_${member.code}_init`,
      memberCode: member.code,
      paymentDate: member.joiningDate,
      amount: member.durationMonths * 2000,
      durationMonths: member.durationMonths,
      expiryDate: member.expiryDate,
      remarks: "Initial Membership Fee Paid at Gym",
      status: "Paid"
    });
    store.fees = feesList;

    dbService.addAuditLog(
      "Coach/Owner",
      "Created new member account",
      `${member.name} (${member.code})`
    );

    return { success: true, member: newMember };
  },

  // Coaches CRUD
  getCoaches: () => store.coaches,
  getCoachById: (id: string) => store.coaches.find((c) => c.id === id),
  addCoach: (coach: Omit<Coach, "id">) => {
    const list = store.coaches;
    if (list.some((c) => c.username === coach.username)) {
      return { success: false, message: "Username already taken!" };
    }
    const newCoach: Coach = {
      ...coach,
      id: `coach_${Date.now()}`
    };
    list.push(newCoach);
    store.coaches = list;

    dbService.addAuditLog("Owner", "Created Coach account", newCoach.name);
    return { success: true, coach: newCoach };
  },
  updateCoach: (id: string, updates: Partial<Coach>) => {
    const list = store.coaches;
    const idx = list.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updates };
    store.coaches = list;
    return true;
  },

  // Smart Machine Filter & Workout Engine
  getAvailableMachines: () => {
    return store.machines.filter((m) => m.status === "Available" && m.isActive !== false).map((m) => m.name);
  },

  getMemberWorkout: (memberCode: string) => {
    const member = dbService.getMemberByCode(memberCode);
    if (!member) return null;

    // 1. Get current day name
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
    const currentDay = daysOfWeek[new Date().getDay()];

    // 2. Find matching workout category for member's goal
    const goal = member.goal;
    const categories = store.workoutCategories;
    let category = categories.find((c) => c.name.toLowerCase() === goal.toLowerCase());
    
    if (!category) {
      // fallback
      category = categories.find((c) => c.name.toLowerCase() === "general fitness") || categories[0];
    }

    if (!category) return [];

    // 3. Find daily workout
    const dailyWorkout = category.dailyWorkouts.find((dw) => dw.day === currentDay);
    if (!dailyWorkout) return [];

    // 4. Smart Machine Filtering Logic:
    // Get list of unavailable or inactive machines
    const unavailableMachineNames = store.machines
      .filter((m) => m.status === "Unavailable" || m.status === "Maintenance" || m.isActive === false)
      .map((m) => m.name.toLowerCase().trim());

    // Filter exercises: if exercise requires an unavailable machine, exclude it automatically
    const filteredExercises = dailyWorkout.exercises.filter((ex) => {
      if (!ex.machineRequired || ex.machineRequired === "None") return true;
      
      const reqMachineClean = ex.machineRequired.toLowerCase().trim();
      const isUnavailable = unavailableMachineNames.some(
        (name) => reqMachineClean.includes(name) || name.includes(reqMachineClean)
      );

      return !isUnavailable;
    });

    return filteredExercises;
  },

  // Machine Management CRUD
  addMachine: (name: string, category?: string, targetMuscle?: string) => {
    const list = store.machines;
    const newMachine: Machine = {
      id: `m_${Date.now()}`,
      name,
      category: (category as Machine["category"]) || "Strength",
      status: "Available",
      targetMuscle: targetMuscle || "Full Body",
      imageUrl: "",
      purchaseDate: new Date().toISOString().split("T")[0],
      maintenanceDate: "",
      notes: "",
      isActive: true
    };
    list.push(newMachine);
    store.machines = list;
    
    dbService.addAuditLog("Coach", "Added new gym machine", name);
    return newMachine;
  },

  editMachineName: (id: string, name: string) => {
    const list = store.machines;
    const idx = list.findIndex((m) => m.id === id);
    if (idx !== -1) {
      const oldName = list[idx].name;
      list[idx].name = name;
      store.machines = list;
      dbService.addAuditLog("Coach", `Renamed machine from "${oldName}"`, name);
      return true;
    }
    return false;
  },

  deleteMachine: (id: string) => {
    const list = store.machines;
    const idx = list.findIndex((m) => m.id === id);
    if (idx !== -1) {
      const name = list[idx].name;
      list.splice(idx, 1);
      store.machines = list;
      dbService.addAuditLog("Coach", "Deleted machine", name);
      return true;
    }
    return false;
  },

  toggleMachineStatus: (id: string, status: "Available" | "Unavailable" | "Maintenance") => {
    const list = store.machines;
    const idx = list.findIndex((m) => m.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      store.machines = list;
      dbService.addAuditLog("Coach", `Updated machine "${list[idx].name}" availability`, status);
      return true;
    }
    return false;
  },

  toggleMachineActive: (id: string) => {
    const list = store.machines;
    const idx = list.findIndex((m) => m.id === id);
    if (idx !== -1) {
      const current = list[idx].isActive !== false;
      const nextVal = !current;
      list[idx].isActive = nextVal;
      store.machines = list;
      dbService.addAuditLog("Coach", `${nextVal ? "Enabled" : "Disabled"} machine`, list[idx].name);
      return true;
    }
    return false;
  },

  // Workout Assignment Engine & Categories CRUD
  getWorkoutCategories: () => store.workoutCategories,

  addWorkoutCategory: (name: string, description?: string) => {
    const list = store.workoutCategories;
    const days: DailyWorkout["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const focusMap: { [key: string]: string } = {
      Monday: "Chest & Triceps Focus",
      Tuesday: "Back & Biceps Focus",
      Wednesday: "Leg Focus (Quads/Hamstrings)",
      Thursday: "Shoulder & Traps Focus",
      Friday: "Arms & Core Focus",
      Saturday: "HIIT & Cardio Conditioning",
      Sunday: "Rest & Active Recovery"
    };

    const dailyWorkouts: DailyWorkout[] = days.map((day) => ({
      day,
      focus: day === "Sunday" ? "Rest" : focusMap[day] || "General Training",
      exercises: []
    }));

    const newCat: WorkoutCategory = {
      id: `cat_${Date.now()}`,
      name,
      description: description || `${name} workout category.`,
      dailyWorkouts
    };

    list.push(newCat);
    store.workoutCategories = list;
    dbService.addAuditLog("Coach", "Created workout category", name);
    return newCat;
  },

  editWorkoutCategory: (id: string, name: string, description?: string) => {
    const list = store.workoutCategories;
    const idx = list.findIndex((c) => c.id === id);
    if (idx !== -1) {
      list[idx].name = name;
      if (description !== undefined) list[idx].description = description;
      store.workoutCategories = list;
      dbService.addAuditLog("Coach", "Edited workout category", name);
      return true;
    }
    return false;
  },

  deleteWorkoutCategory: (id: string) => {
    const list = store.workoutCategories;
    const idx = list.findIndex((c) => c.id === id);
    if (idx !== -1) {
      const name = list[idx].name;
      list.splice(idx, 1);
      store.workoutCategories = list;
      dbService.addAuditLog("Coach", "Deleted workout category", name);
      return true;
    }
    return false;
  },

  updateDailyWorkoutFocus: (categoryId: string, day: DailyWorkout["day"], focus: string) => {
    const list = store.workoutCategories;
    const catIdx = list.findIndex((c) => c.id === categoryId);
    if (catIdx !== -1) {
      const dayIdx = list[catIdx].dailyWorkouts.findIndex((dw) => dw.day === day);
      if (dayIdx !== -1) {
        list[catIdx].dailyWorkouts[dayIdx].focus = focus;
        store.workoutCategories = list;
        return true;
      }
    }
    return false;
  },

  addExerciseToCategory: (categoryId: string, day: DailyWorkout["day"], exercise: Omit<WorkoutExercise, "id">) => {
    const list = store.workoutCategories;
    const catIdx = list.findIndex((c) => c.id === categoryId);
    if (catIdx !== -1) {
      const dayIdx = list[catIdx].dailyWorkouts.findIndex((dw) => dw.day === day);
      if (dayIdx !== -1) {
        const newEx: WorkoutExercise = {
          ...exercise,
          id: `we_${Date.now()}`
        };
        list[catIdx].dailyWorkouts[dayIdx].exercises.push(newEx);
        store.workoutCategories = list;
        return newEx;
      }
    }
    return null;
  },

  editExerciseInCategory: (categoryId: string, day: DailyWorkout["day"], exerciseId: string, updates: Partial<WorkoutExercise>) => {
    const list = store.workoutCategories;
    const catIdx = list.findIndex((c) => c.id === categoryId);
    if (catIdx !== -1) {
      const dayIdx = list[catIdx].dailyWorkouts.findIndex((dw) => dw.day === day);
      if (dayIdx !== -1) {
        const exIdx = list[catIdx].dailyWorkouts[dayIdx].exercises.findIndex((ex) => ex.id === exerciseId);
        if (exIdx !== -1) {
          list[catIdx].dailyWorkouts[dayIdx].exercises[exIdx] = {
            ...list[catIdx].dailyWorkouts[dayIdx].exercises[exIdx],
            ...updates
          };
          store.workoutCategories = list;
          return true;
        }
      }
    }
    return false;
  },

  deleteExerciseFromCategory: (categoryId: string, day: DailyWorkout["day"], exerciseId: string) => {
    const list = store.workoutCategories;
    const catIdx = list.findIndex((c) => c.id === categoryId);
    if (catIdx !== -1) {
      const dayIdx = list[catIdx].dailyWorkouts.findIndex((dw) => dw.day === day);
      if (dayIdx !== -1) {
        const exIdx = list[catIdx].dailyWorkouts[dayIdx].exercises.findIndex((ex) => ex.id === exerciseId);
        if (exIdx !== -1) {
          list[catIdx].dailyWorkouts[dayIdx].exercises.splice(exIdx, 1);
          store.workoutCategories = list;
          return true;
        }
      }
    }
    return false;
  },

  reorderExercisesInCategory: (categoryId: string, day: DailyWorkout["day"], exerciseIds: string[]) => {
    const list = store.workoutCategories;
    const catIdx = list.findIndex((c) => c.id === categoryId);
    if (catIdx !== -1) {
      const dayIdx = list[catIdx].dailyWorkouts.findIndex((dw) => dw.day === day);
      if (dayIdx !== -1) {
        const currentExercises = list[catIdx].dailyWorkouts[dayIdx].exercises;
        const reordered = exerciseIds.map((id) => currentExercises.find((ex) => ex.id === id)).filter((ex): ex is WorkoutExercise => !!ex);
        list[catIdx].dailyWorkouts[dayIdx].exercises = reordered;
        store.workoutCategories = list;
        return true;
      }
    }
    return false;
  },

  getMemberDiet: (memberCode: string) => {
    const member = dbService.getMemberByCode(memberCode);
    if (!member) return null;

    const isGain = member.goal.includes("Gain") || member.goal.includes("Muscle") || member.goal.includes("Bodybuilding");
    // Return appropriate diet plan
    return isGain ? initialDiets["Muscle Gain"] : initialDiets["Weight Loss"];
  },

  // Attendance Operations
  getAttendanceHistory: (memberCode: string) => {
    return store.attendance
      .filter((a) => a.memberCode === memberCode)
      .sort((a, b) => b.date.localeCompare(a.date));
  },

  markAttendance: (memberCode: string): { success: boolean; message: string; time?: string } => {
    const member = dbService.getMemberByCode(memberCode);
    if (!member) return { success: false, message: "Invalid Member Code." };

    if (member.status === "Blocked" || member.status === "Left") {
      return { success: false, message: "Member account inactive or blocked." };
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const records = store.attendance;
    
    // Check if already marked today
    const exists = records.find((r) => r.memberCode === memberCode && r.date === todayStr);
    if (exists && exists.status !== "Absent") {
      return { success: false, message: `Attendance already marked today at ${exists.time}.` };
    }

    // Create attendance record
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const isLate = now.getHours() >= 9; // Late if scanned after 9 AM

    const newRecord: AttendanceRecord = {
      id: `att_${memberCode}_${todayStr}`,
      memberCode,
      date: todayStr,
      status: isLate ? "Late Entry" : "Present",
      time: timeStr
    };

    // Add or replace existing absent placeholder
    const filtered = records.filter((r) => !(r.memberCode === memberCode && r.date === todayStr));
    store.attendance = [newRecord, ...filtered];

    // Log audit
    dbService.addAuditLog(
      "Attendance Scanner",
      `Marked Attendance (${newRecord.status})`,
      `${member.name} (${memberCode})`
    );

    return { success: true, message: `Welcome ${member.name}! Marked ${newRecord.status}.`, time: timeStr };
  },

  // Progress Logging
  getMemberProgress: (memberCode: string) => {
    return store.progress
      .filter((p) => p.memberCode === memberCode)
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  addMemberProgress: (progress: Omit<MemberProgress, "id">) => {
    const list = store.progress;
    const newProg = {
      ...progress,
      id: `prog_${progress.memberCode}_${Date.now()}`
    };
    list.push(newProg);
    store.progress = list;

    // Update current weight in Member record
    const mList = store.members;
    const mIdx = mList.findIndex((m) => m.code === progress.memberCode);
    if (mIdx !== -1) {
      mList[mIdx].weight = progress.weight;
      mList[mIdx].bmi = progress.bmi;
      mList[mIdx].bodyFat = progress.bodyFat;
      store.members = mList;
    }

    return true;
  },

  // Fee Renewals
  getFeeHistory: (memberCode: string) => {
    return store.fees.filter((f) => f.memberCode === memberCode);
  },

  renewMembership: (memberCode: string, amount: number, months: number, remarks: string) => {
    const member = dbService.getMemberByCode(memberCode);
    if (!member) return false;

    const todayStr = new Date().toISOString().split("T")[0];
    
    // Calculate new expiry date based on current expiry or today
    const currentExpiry = new Date(member.expiryDate);
    const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
    
    baseDate.setMonth(baseDate.getMonth() + months);
    const newExpiryStr = baseDate.toISOString().split("T")[0];

    // Add Fee record
    const feeRecords = store.fees;
    const newFee: FeeRecord = {
      id: `fee_${memberCode}_${Date.now()}`,
      memberCode,
      paymentDate: todayStr,
      amount,
      durationMonths: months,
      expiryDate: newExpiryStr,
      remarks,
      status: "Paid"
    };
    feeRecords.push(newFee);
    store.fees = feeRecords;

    // Update Member expiry and status to Active
    const membersList = store.members;
    const idx = membersList.findIndex((m) => m.code === memberCode);
    if (idx !== -1) {
      membersList[idx].expiryDate = newExpiryStr;
      membersList[idx].durationMonths = months;
      membersList[idx].status = "Active";
      store.members = membersList;
    }

    // Send Notification
    dbService.sendNotification(
      memberCode,
      "Membership Renewed",
      `Your membership has been renewed for ${months} months. New Expiration Date: ${newExpiryStr}.`,
      "fee"
    );

    // Audit log
    dbService.addAuditLog(
      "Coach/Owner",
      `Renewed Membership (${months} Months)`,
      `${member.name} (${memberCode})`
    );

    return true;
  },

  // Notifications
  getNotifications: (memberCode: string) => {
    return store.notifications
      .filter((n) => n.memberCode === memberCode)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  markNotificationRead: (id: string) => {
    const list = store.notifications;
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx].read = true;
      store.notifications = list;
    }
  },

  deleteNotification: (id: string) => {
    store.notifications = store.notifications.filter((n) => n.id !== id);
  },

  sendNotification: (memberCode: string, title: string, message: string, type: Notification["type"]) => {
    const list = store.notifications;
    list.push({
      id: `notif_${Date.now()}`,
      memberCode,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    });
    store.notifications = list;
  },

  // Announcements
  getAnnouncements: () => store.announcements,
  addAnnouncement: (ann: Omit<Announcement, "id" | "createdAt">) => {
    const list = store.announcements;
    const newAnn: Announcement = {
      ...ann,
      id: `ann_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0]
    };
    list.push(newAnn);
    store.announcements = list;
    
    dbService.addAuditLog("Coach/Owner", "Broadcasted Announcement", ann.title);
    return newAnn;
  },

  // Audit Logs
  getAuditLogs: () => store.auditLogs,
  addAuditLog: (actor: string, action: string, target: string) => {
    const list = store.auditLogs;
    const device = typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop") : "Server";
    list.unshift({
      id: `log_${Date.now()}`,
      actor,
      action,
      target,
      timestamp: new Date().toLocaleString(),
      device
    });
    store.auditLogs = list.slice(0, 100); // cap at 100 logs
  },

  // Machine status
  getMachines: () => store.machines,
  updateMachineStatus: (id: string, status: Machine["status"], notes: string = "") => {
    const list = store.machines;
    const idx = list.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    
    const oldStatus = list[idx].status;
    list[idx].status = status;
    list[idx].notes = notes;
    list[idx].maintenanceDate = new Date().toISOString().split("T")[0];
    store.machines = list;

    dbService.addAuditLog(
      "Owner/Coach",
      `Changed Machine Status (${oldStatus} -> ${status})`,
      list[idx].name
    );
    return true;
  },

  // Brand config
  getBrandSettings: () => store.brandSettings,
  updateBrandSettings: (updates: Partial<BrandSettings>) => {
    store.brandSettings = { ...store.brandSettings, ...updates };
    return true;
  },

  // Join Requests
  getJoinRequests: () => store.joinRequests,
  addJoinRequest: (req: Omit<JoinRequest, "id" | "status" | "createdAt">) => {
    const list = store.joinRequests;
    list.unshift({
      ...req,
      id: `req_${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0]
    });
    store.joinRequests = list;
  },
  updateJoinRequestStatus: (id: string, status: JoinRequest["status"]) => {
    const list = store.joinRequests;
    const idx = list.findIndex((r) => r.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      store.joinRequests = list;
    }
  },

  // Testimonials
  getTestimonials: () => store.testimonials,
  getTransformations: () => store.transformations,
  getGallery: () => store.gallery,

  // Seeder
  seedFirestoreDatabase: async () => {
    try {
      // 1. Seed Owner
      const ownerDoc = doc(db, "owners", "owner");
      await setDoc(ownerDoc, {
        username: "owner",
        email: "owner123@gmail.com",
        password: "Owner@123",
        name: "Fitness Corner Gym Owner",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      }, { merge: true });

      // 2. Seed Coach
      const coachDoc = doc(db, "coaches", "coach");
      await setDoc(coachDoc, {
        id: "coach6",
        name: "Demo Coach",
        username: "coach",
        email: "coach123@gmail.com",
        password: "Coach@123",
        phone: "+91 98765 00000",
        experience: "1 Year",
        specialization: "General Coaching",
        languages: ["English", "Hindi"],
        status: "Active",
        photoUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&auto=format&fit=crop&q=80",
        joiningDate: "2026-07-02"
      }, { merge: true });

      // 3. Seed Members (FCG1001 to FCG1005)
      const list = store.members;
      for (let i = 1; i <= 5; i++) {
        const code = `FCG100${i}`;
        const member = list.find((m) => m.code === code);
        if (member) {
          const memberDoc = doc(db, "members", code);
          await setDoc(memberDoc, member, { merge: true });
        }
      }
      return { success: true, message: "Firestore database successfully seeded!" };
    } catch (err: unknown) {
      console.error("Firestore seeding failed:", err);
      return { success: false, message: (err as Error).message };
    }
  }
};
