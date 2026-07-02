# API & Service Structure - Fitness Corner Gym

This document describes the operational methods exposed by the core data layer of FCG.

---

## ⚡ DB Service Core Methods

All database mutations and query fetches reside inside `dbService` (`src/lib/db/service.ts`).

### 1. Authentication Modules
* `validateMemberCode(code: string): Promise<{ success: boolean; member?: Member; error?: string }>`
* `validateCoachLogin(email: string, pass: string): Promise<{ success: boolean; coach?: Coach; error?: string }>`
* `validateOwnerLogin(email: string, pass: string): Promise<{ success: boolean; successState: boolean; error?: string }>`

### 2. Gym Fleet Control (Machines)
* `getMachines(): Machine[]`
* `addMachine(name: string, category: string, muscle: string): void`
* `editMachineName(id: string, name: string): void`
* `deleteMachine(id: string): void`
* `toggleMachineStatus(id: string, status: Machine["status"]): void`
* `toggleMachineActive(id: string): void`

### 3. Workout Configurator Engine
* `getWorkoutCategories(): WorkoutCategory[]`
* `addWorkoutCategory(name: string, description: string): void`
* `editWorkoutCategory(id: string, name: string, description: string): void`
* `deleteWorkoutCategory(id: string): void`
* `updateDailyWorkoutFocus(catId: string, day: string, focus: string): void`
* `addExerciseToCategory(catId: string, day: string, exercise: Omit<WorkoutExercise, "id">): void`
* `editExerciseInCategory(catId: string, day: string, exId: string, updated: Omit<WorkoutExercise, "id">): void`
* `deleteExerciseFromCategory(catId: string, day: string, exId: string): void`
* `reorderExercisesInCategory(catId: string, day: string, orderedIds: string[]): void`

### 4. Dynamic Routine Resolution
* `getMemberWorkout(memberCode: string): WorkoutExercise[]`
  * Resolves the member's current goal to find their category.
  * Resolves the weekday to fetch that day's exercises.
  * Checks the active status and availability status of each required machine.
  * Dynamically filters out exercises requiring unavailable or disabled machinery.
