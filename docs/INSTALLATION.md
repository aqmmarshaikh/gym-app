# Installation Guide - Fitness Corner Gym

This guide walks through setting up the development environment, installing dependencies, and configuring local variables.

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
* **Node.js**: Version `20.x` or higher (LTS is recommended).
* **NPM**: Version `10.x` or higher (installed automatically with Node).
* **Git**: To clone and manage repositories.

---

## 🛠 Step-by-Step Installation

### 1. Clone the Codebase
```bash
git clone https://github.com/aqmmarshaikh/gym-app.git
cd gym-app
```

### 2. Install Project Packages
Use standard npm command to install all dependencies:
```bash
npm install
```

### 3. Initialize Environments
Copy the sample environment config file into a local configurations file:
```bash
cp .env.example .env.local
```

### 4. Open Environment Config
Modify `.env.local` to match your target Firebase Web App settings (refer to [docs/FIREBASE_SETUP.md](FIREBASE_SETUP.md) for keys instructions).

### 5. Launch the Server
```bash
npm run dev
```
By default, the application runs locally at `http://localhost:3000`. Open this URL in your web browser.
To inspect the mobile interface, open the browser's developer console (F12) and toggle device simulation mode.
