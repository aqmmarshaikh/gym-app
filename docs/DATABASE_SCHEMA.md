# Database Schema - Fitness Corner Gym

This document details the Firestore document schemas, local storage keys, and TypeScript interfaces used in FCG.

---

## 📂 Firestore Collection Mappings

### 1. `members` Collection
* **Path**: `/members/{memberCode}`
* **Schema**:
  ```typescript
  interface Member {
    code: string;           // e.g. "FCG1001" (Acts as Document ID)
    name: string;           // Full Name
    status: "Active" | "Expired" | "Blocked" | "Pending";
    assignedCoachId: string;// Links to a coach document ID
    goal: string;           // goal category matching Category IDs
    expiryDate: string;     // ISO String "YYYY-MM-DD"
    phone: string;          // Contact handle
    email?: string;
    bloodGroup?: string;
    dob?: string;
    occupation?: string;
    weight?: number;        // Current baseline weight
    height?: number;        // Height in cm
    chest?: number;
    waist?: number;
    gender?: "Male" | "Female" | "Other";
    paymentStatus?: "Paid" | "Pending";
    photos?: string[];      // Storage bucket URLs for progress tracking
  }
  ```

### 2. `coaches` Collection
* **Path**: `/coaches/{coachId}`
* **Schema**:
  ```typescript
  interface Coach {
    id: string;             // Email prefix or custom UUID
    name: string;
    role: "Coach" | "Admin";
    specialty: string;      // e.g. "Strength Training", "HIIT"
    phone: string;
    email: string;
    status: "Active" | "Suspended";
  }
  ```

### 3. `machines` Collection
* **Path**: `/machines/{machineId}`
* **Schema**:
  ```typescript
  interface Machine {
    id: string;
    name: string;
    category: string;       // Strength, Cardio, Functional, Recovery
    targetMuscle: string;
    status: "Available" | "Unavailable" | "Maintenance";
    isActive?: boolean;     // Enable/Disable flag
  }
  ```

### 4. `workoutCategories` Collection
* **Path**: `/workoutCategories/{categoryId}`
* **Schema**:
  ```typescript
  interface WorkoutCategory {
    id: string;
    name: string;
    description: string;
    dailyWorkouts: DailyWorkout[];
  }

  interface DailyWorkout {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    focus: string;          // e.g. "Chest & Triceps"
    exercises: WorkoutExercise[];
  }

  interface WorkoutExercise {
    id: string;
    name: string;
    sets: number;
    reps: string;
    restTime: string;
    targetMuscle: string;
    machineRequired: string; // Machine Name or "None"
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    coachNote?: string;
  }
  ```

### 5. `attendance` Collection
* **Path**: `/attendance/{recordId}`
* **Schema**:
  ```typescript
  interface AttendanceRecord {
    id: string;
    memberCode: string;
    name: string;
    date: string;           // "YYYY-MM-DD"
    time: string;           // "HH:MM AM/PM"
    status: "Present";
  }
  ```
