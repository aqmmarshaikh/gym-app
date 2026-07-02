# Responsive Design Guide - Fitness Corner Gym

Responsive layout strategies for FCG.

---

## 📱 Mobile-First Layout

* **Target Device Viewport**: This application is optimized specifically for mobile devices.
* **Layout Grid Wrapper**: The root layout wrapper (`src/app/layout.tsx`) wraps the pages inside a centered mobile portrait frame (`max-w-md w-full`) when loaded on tablet or desktop screens.
* **Breakpoints**: Avoid standard large desktop grid setups. Focus on mobile dimensions (e.g. `xs`, `sm`, `md` layout wrappers) to design components.
