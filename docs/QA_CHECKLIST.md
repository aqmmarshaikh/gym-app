# QA & Verification Checklist - Fitness Corner Gym

Quality Assurance checklists to complete before rolling out releases to production.

---

## 📋 Release Verification Checklist

- [ ] **Compilation Validation**: Verify `npx tsc --noEmit` runs with zero issues.
- [ ] **Linter Check**: Run `npm run lint` and verify there are no active errors.
- [ ] **Production Build Check**: Run `npm run build` locally and verify the static generation output.
- [ ] **Auth Flow Verification**:
  - Log in with Owner credentials (`owner123@gmail.com` / `Owner@123`).
  - Log in with Coach credentials (`coach123@gmail.com` / `Coach@123`).
  - Access Member portal using code `FCG1001`.
- [ ] **Smart Filtering Validation**:
  - Set a gym machine (e.g. Leg Extension) to "Unavailable" in the Coach panel.
  - Switch to Member portal. Verify that Leg Extension exercises are hidden from today's workout.
  - Set the machine back to "Available". Verify that the exercise immediately reappears on the member routine.
- [ ] **Offline Persistence Validation**:
  - Make edits to machine statuses, workouts, or member details.
  - Refresh the browser tab.
  - Verify that all changes remain persisted in LocalStorage.
