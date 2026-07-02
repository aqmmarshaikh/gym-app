# Features Catalog - Fitness Corner Gym

This document contains a complete inventory of the features built into the Fitness Corner Gym GMS Progressive Web Application.

---

## 📋 Comprehensive Feature Map

### 1. Unified Authentication Layer
* **Dual-Mode Auth**: Supports local code validation and Firebase cloud authentication.
* **Smart Redirects**: Auto-detects session details and routes users to the correct dashboard (`/member`, `/coach`, or `/owner`).

### 2. Gym Machine Management
* **Inventory Configurator**: Add, edit, rename, and delete gym machines.
* **Status Flags**: Tag machines as **Available**, **Unavailable**, or **Maintenance**.
* **Global Active Toggle**: Turn machines on or off globally.
* **Real-time Synchronization**: Changes to machine status instantly update the member's daily routine.

### 3. Workout Category & Plan Editor
* **17 Seeded Workout Schedules**: Instant default weekly schedules for specific goals (Weight Loss, Strength, Bodybuilding, etc.).
* **Daily Focus Manager**: Configure targeted muscle groups for each weekday.
* **Detailed Exercise Editor**:
  * Set sets, reps, rest duration, target muscle, difficulty, required machinery, and coach comments.
  * Drag-and-drop or push-button exercise reordering.
  * Delete/Add exercises from any of the 7-day schedules.

### 4. Interactive Member Dashboard
* **Dynamic Daily Routine**: Renders the current day's targeted workout plan automatically based on the member's goal category.
* **Interactive Rest Timer**: A precise rest manager with customizable presets (30s/60s/90s/120s) and completion audio indicators.
* **Digital Membership Card**: Rotates a simulated QR Code to facilitate scanner-based access check-ins.
* **Nutritional and Water Logs**: Tracks protein requirements, water metrics, and calorie burn targets.
* **Measurement Tracking**: Logs physiological stats and displays line chart trends.

### 5. Staff Console
* **Digital Scanner**: Scan simulated member QR codes or override manually.
* **Registration Stepper**: Register members and generate unique IDs.
* **Fee Collection Drawer**: Renew subscriptions and track due payments.

### 6. Owner Panel
* **Operational Dashboard**: Financial analysis, membership analytics, and system audit logging.
* **Credentials Manager**: Manage administrative access keys.
* **JSON Exporter**: Save a copy of all local database states immediately.
