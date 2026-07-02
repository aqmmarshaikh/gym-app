# Deployment Guide - Fitness Corner Gym

This guide walks through deploying the FCG application to production cloud environments.

---

## ⚡ Deployment to Vercel

Vercel provides native deployment configurations optimized for Next.js:

1. Create a [Vercel Account](https://vercel.com).
2. Connect your GitHub repository (`aqmmarshaikh/gym-app`).
3. Set the build parameters:
   * **Framework Preset**: Next.js
   * **Build Command**: `npm run build`
   * **Output Directory**: `.next`
4. Add production environment variables:
   * Map all credentials matching your production Firebase project (copy from `.env.local`).
5. Click **Deploy**. Vercel will automatically configure HSTS, SSL, and generate static routing rules.

---

## 🔥 Deploying Firebase Rules

Deploy your security permissions configuration to your Cloud Firebase console using the Firebase CLI:

```bash
# 1. Install Firebase CLI globally
npm install -g firebase-tools

# 2. Login to your Google Firebase account
firebase login

# 3. Use your active project
firebase use --add

# 4. Deploy database security rules
firebase deploy --only firestore:rules

# 5. Deploy storage security rules
firebase deploy --only storage:rules
```
