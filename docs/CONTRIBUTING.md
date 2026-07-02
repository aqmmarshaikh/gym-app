# Contributing Guidelines - Fitness Corner Gym

Thank you for contributing to the Fitness Corner Gym project! To maintain code quality and structural integrity, please follow the guidelines below.

---

## 🛠️ Contribution Stepper

### 1. File an Issue
Before making code changes, please search active issues or open a new one (using our templates for Bug Reports or Feature Requests) to discuss proposed modifications.

### 2. Branch Naming Standard
Create a descriptive branch for your changes:
* Bug fixes: `fix/issue-description`
* New features: `feat/feature-name`
* Infrastructure/Performance: `perf/refactor-target`

### 3. Verify Code Quality Locally
Before pushing your commits, run tests locally to ensure there are no regressions:
```bash
# Verify formatting
npm run lint

# Verify type safety
npx tsc --noEmit

# Verify build output
npm run build
```

### 4. Create a Pull Request
* Open a pull request against the `main` branch.
* Complete the Pull Request Template checklist in full.
* Assign reviews to the designated repository owners.
