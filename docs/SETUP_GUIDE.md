# Setup Guide - Fitness Corner Gym

This guide describes how to configure the application settings, toggle database states, and customize the operational configuration.

---

## ⚙️ Configuration Setup

### 1. Toggle Database Mode (Demo vs Cloud)
Open `src/lib/db/service.ts` or set the environment configuration. The database engine switches dynamic targets:
* **DEMO MODE**: Set to `true` (default) for local testing. All actions write to browser local storage.
* **FIREBASE MODE**: Set to `false` in production. Make sure you set the Firebase environment keys in your `.env.local` file.

### 2. Configure Global Branding (Owner Dashboard)
* Log in as the Owner (`/owner`).
* Navigate to the **Branding Settings** section.
* Update:
  * Gym Name (e.g. "Fitness Corner Gym")
  * Gym Tagline
  * Operational Email & Address
  * WhatsApp Booking Contact Handle (must use complete country prefix, e.g. `+919876543210` for automated WhatsApp chat redirects).
* Submit the form to save configurations globally.

### 3. Customize Static Content (Facilities/FAQS)
* Static facilities and FAQs are configured in `src/lib/db/mockData.ts`.
* Edit arrays under `FACILITIES`, `FAQS`, and `TRANSFORMATIONS` to customize visitor marketing lists.
