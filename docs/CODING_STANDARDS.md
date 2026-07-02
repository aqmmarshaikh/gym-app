# Coding Standards - Fitness Corner Gym

This document details the code styling guidelines, nomenclature, and formatting rules that must be followed by developers working on FCG.

---

## 🏷️ Nomenclature Rules

### 1. File & Directory Naming
* **Directories**: Always use lowercase Kebab-case naming conventions.
  * E.g., `become-member`, `coach-configurator`
* **Components**: Use PascalCase for standard components and lowercase kebab-case for routes.
  * E.g., `ThemeProvider.tsx`
* **Utility Files**: Lowercase camelCase.
  * E.g., `dbService.ts`

### 2. Variable & Function Naming
* **Variables & Properties**: Always use camelCase.
  * E.g., `memberCode`, `workoutPlan`
* **Helper Functions**: Prefix with action verbs.
  * E.g., `validateMemberCode`, `fetchMachines`, `updateBrandingSettings`
* **Boolean Indicators**: Prefix with descriptive helper indicators.
  * E.g., `isActive`, `hasExpired`, `isAvailable`

---

## 🛠️ TypeScript Configurations

* **Strict Checks**: Never bypass TypeScript checks. Avoid the use of `any` type overrides unless absolutely necessary.
* **Typing Interfaces**: Prefer standard `interface` contracts for data collections and schemas.
* **Component Declarations**: Explicitly define component returns:
  ```typescript
  export default function MemberProfileCard(): React.ReactNode {
     // ...
  }
  ```
