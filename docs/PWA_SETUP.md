# PWA Setup & Manifest - Fitness Corner Gym

PWA settings and manifest guidelines for FCG.

---

## 📱 Progressive Web App Configuration

### 1. App Manifest (`public/manifest.json`)
The manifest configures PWA options for mobile devices:
* Display: `standalone` (removes browser URL bar).
* Orientation: `portrait-primary` (locks screen in portrait mode).
* Icons: High-resolution brand logo arrays to support device desktop shortcuts.

### 2. Service Worker Settings
* Standard service workers cache static layouts, CSS themes, and assets.
* Expose offline warnings if users try to use online-only features (e.g. Firebase Auth) without an active internet connection.
