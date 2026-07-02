# Component Guidelines - Fitness Corner Gym

This document defines standards for creating reusable React and Next.js components in the FCG application.

---

## 🎨 Aesthetic Standards

All components must adhere to the Vercel/Linear design guidelines:
1. **Glassmorphism**: Combine dark transparent backings, border highlights, and ambient backdrop filters.
   * Class: `glass-card border border-white/[0.04] bg-white/[0.01] backdrop-blur-md`
2. **Typography**: Always rely on clean sans-serif typography with strict weights:
   * Header: `font-bold tracking-wider uppercase`
   * Label: `text-[10px] uppercase font-semibold text-text-secondary`
3. **Interactive Feedbacks**: Interactive elements must scale down slightly when pressed to give physical feedback.
   * Class: `active:scale-95 transition-all`

---

## ⚙️ Functional Coding Rules

### 1. Client-Side Hooks
* Components that perform UI-state manipulations or data updates must include the `"use client";` directive at the top.
* Ensure all state handlers are scoped within functional rendering scopes.

### 2. Loading State Handling
* Reusable list-cards must include skeleton layouts (using pulse visual effects) to show during background loads.
* Use Tailwind's `animate-pulse` class for simple loaders.
