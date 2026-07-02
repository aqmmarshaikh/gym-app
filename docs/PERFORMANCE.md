# Performance Optimizations - Fitness Corner Gym

This document details the performance tuning, resource caching, and bundle optimizations implemented in FCG.

---

## ⚡ Performance Optimizations

### 1. Resource Caching
* Static images, logos, and fonts are cached under standard Next.js asset-serving endpoints.
* Dynamic member profiles and workout routines are cached locally in browser LocalStorage when running offline.

### 2. Firestore Queries Optimization
* Compound indexing: Compound indices are explicitly configured to prevent full collection table scans when searching members or filtering logs.
* Projection: Documents are designed to keep payload sizes small. Large assets (e.g. progress photos) are saved to Firebase Storage and referenced by simple URL strings.

### 3. Progressive Web App (PWA) Configurations
* Standard PWA service worker setups cache application layouts, pages, and icons to support offline app loads.
* Visual assets and remote graphics whitelisting prevent layout rendering blockages.
