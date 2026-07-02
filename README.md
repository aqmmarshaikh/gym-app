# 🏋️‍♂️ Fitness Corner Gym (FCG)

[![CI Pipeline Status](https://github.com/aqmmarshaikh/gym-app/actions/workflows/ci.yml/badge.svg)](https://github.com/aqmmarshaikh/gym-app/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE.md)
[![Next.js Version](https://img.shields.io/badge/Next.js-15.0-black.svg?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Firebase Platform](https://img.shields.io/badge/Firebase-Firestore-amber.svg?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Aesthetic Standard](https://img.shields.io/badge/Aesthetics-Vercel%20%2F%20Linear-black.svg?style=flat&color=C5A85C)](#design-system)

Fitness Corner Gym (FCG) is a mobile-first, production-grade **Gym Management System (GMS)** built as a Progressive Web Application (PWA). Designed exclusively for mobile viewports, it eliminates physical paperwork by unifying a public marketing website, a member portal, a coach administration panel, and an owner analytics dashboard into a single, high-fidelity application.

---

## 📱 Interactive Portals

FCG is architected into 4 core sections, each optimized for specific user personas:

### 1. Public Marketing Website
* **Facilities & Machines**: A search-optimized inventory showcasing active gym machinery.
* **Membership Request Wizard**: A lead-generation tool capturing member stats and generating formatted WhatsApp dispatch links to automate sales onboarding.
* **Transformations & Testimonials**: Dynamic carousels highlighting client progress.

### 2. Member Portal
* **Digital Access Card**: High-contrast simulated QR Code layout for hands-free front desk check-in.
* **Dynamic Daily Routine**: Renders the current day's targeted workout plan automatically based on the member's goal category.
* **Interactive Rest Timer**: A precise rest manager with customizable presets (30s/60s/90s/120s) and completion audio indicators.
* **Smart Machine Filter**: Automatically hides exercises that require machines flagged by coaches or owners as *Unavailable*, *Maintenance*, or *Disabled*.
* **Nutritional Tracking**: Calorie, protein, and water logging circles.

### 3. Coach Control Panel
* **Gym Configurator**: Full CRUD tool to manage the gym's machine fleet, create workout categories, and design 7-day weekly exercise plans.
* **Digital Check-In**: Camera-based simulated QR Code Scanner with laser-sweeps and manual overrides.
* **Member Registration Stepper**: Complete wizard to capture member demographics, physiological baselines, active subscription slots, and automatically generate code codes (e.g. `FCG1001`).

### 4. Owner Dashboard
* **Revenue Analytics**: High-performance tracking of incoming renewals and active memberships.
* **Staff Access Controller**: Activate, suspend, or add coach credentials and override passwords.
* **Operational Configurations**: Update global branding parameters, taglines, and contact handles.
* **JSON System Backup**: Exporter utility allowing immediate local backup downloads of the entire GMS state.

---

## 🛠 Tech Stack

* **Core Framework**: Next.js 15 (App Router, Turbopack)
* **Language**: TypeScript (Strict Compile Targets)
* **Styling & UI**: Tailwind CSS v4, Framer Motion (Transitions and Physics-based Micro-animations), Lucide Icons
* **Database & Auth**: Dual-Mode Architecture
  * **Offline Demo Mode**: Reactive `localStorage` wrapper featuring simulated server latency.
  * **Firebase Mode**: Cloud Firestore database, Firebase Authentication, and Cloud Storage integration.
* **CI/CD & Deployment**: GitHub Actions (Lint, Typecheck, Build Validation) & Vercel hosting.

---

## ⚡ Quick Start

### 1. Clone the Project
```bash
git clone https://github.com/aqmmarshaikh/gym-app.git
cd gym-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environments
Create a `.env.local` file using the template:
```bash
cp .env.example .env.local
```

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your browser (press `F12` and toggle to a mobile screen view like iPhone 15 Pro for optimal layout).

---

## 🔐 Credentials for Testing

The app defaults to **Demo (Offline) Mode** for immediate evaluation:

* **Owner Account**:
  * Email/Username: `owner123@gmail.com` or `owner`
  * Password: `Owner@123`
* **Coach Account**:
  * Email/Username: `coach123@gmail.com` or `coach`
  * Password: `Coach@123`
* **Sample Member Codes**:
  * Permanent Codes: `FCG1001`, `FCG1002`, `FCG1003`, `FCG1004`, `FCG1005` (Ammar Patel, etc.)

---

## 📁 Repository Structure

```
├── .github/                # GitHub templates, configurations & actions CI/CD pipelines
├── public/                 # Static assets, branding logo, and PWA manifest profiles
└── src/
    ├── app/                # Next.js route directory structures
    │   ├── (public)/       # Guest screens (Landing, About, WhatsApp registration)
    │   ├── (member)/       # Member dashboard, QR card, active training and diet
    │   ├── (coach)/        # Coach tools, check-ins, member lists, machine configs
    │   └── (owner)/        # Owner analytics, staff operations, brand manager
    ├── components/         # Reusable structural UI elements and theme providers
    └── lib/
        ├── db/             # Data access layers, mock databases, and LocalStore
        └── firebase/       # Cloud Firestore and authentication configs
```

---

## 📚 Project Documentation Index

For exhaustive engineering references, please review the specific guides below:

* **Foundational Architecture**: [ARCHITECTURE.md](docs/ARCHITECTURE.md) | [PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) | [FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md)
* **Installation & Setup**: [INSTALLATION.md](docs/INSTALLATION.md) | [QUICK_START.md](docs/QUICK_START.md) | [FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)
* **Security & Operations**: [SECURITY.md](SECURITY.md) | [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | [DEPLOYMENT.md](docs/DEPLOYMENT.md)
* **Code & UI Guidelines**: [CODING_STANDARDS.md](docs/CODING_STANDARDS.md) | [COMPONENT_GUIDELINES.md](docs/COMPONENT_GUIDELINES.md) | [UI_GUIDELINES.md](docs/UI_GUIDELINES.md)
* **PWA & Optimization**: [PWA_SETUP.md](docs/PWA_SETUP.md) | [PERFORMANCE.md](docs/PERFORMANCE.md) | [OPTIMIZATION.md](docs/OPTIMIZATION.md)
* **Testing & QA**: [TESTING.md](docs/TESTING.md) | [QA_CHECKLIST.md](docs/QA_CHECKLIST.md) | [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
