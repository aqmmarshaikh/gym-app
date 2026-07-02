# Troubleshooting Guide - Fitness Corner Gym

Common issues and solutions for developers running FCG.

---

## 🛠️ Common Issues & Fixes

### 1. "Unconfigured Host" error on `next/image`
* **Error**: `Invalid src prop on next/image, hostname is not configured`
* **Solution**: Whitelist the remote image host (e.g. `images.unsplash.com`) in `next.config.ts` under the `images.remotePatterns` array.

### 2. Changes in local database do not update the UI
* **Solution**: Clear browser storage or local state. The application runs in Demo Mode by default and caches structures in browser LocalStorage. Clear LocalStorage to force the app to re-seed.

### 3. Firebase Authentication fails to initialize
* **Solution**: Verify that sign-in providers are enabled in your Firebase console and that the project keys in `.env.local` match exactly.
