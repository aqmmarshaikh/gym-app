# Folder Structure - Fitness Corner Gym

This document details the folder structure and naming conventions of the FCG Progressive Web Application.

---

## 📁 Repository Directory Layout

```
├── .github/                  # GitHub workflow pipelines and templates
│   ├── issue_template/       # GitHub bug, enhancement, and question templates
│   └── workflows/            # CI Actions (linting, type checking, build tests)
├── public/                   # Public static files and image assets
│   ├── logo.png              # Global branding logo file
│   └── manifest.json         # PWA Manifest configuration
├── src/
│   ├── app/                  # Route structures inside Next.js App Router
│   │   ├── (public)/         # SEO pages (landing, about, whatsapp registration)
│   │   │   ├── about/        # Machine showcase, openings, and FAQs
│   │   │   └── become-member/# Member inquiry form
│   │   ├── (member)/         # Member authenticated routes
│   │   │   ├── member/       # Member entry authentication validation
│   │   │   └── member/...    # Dashboard, workout panels, water, profile
│   │   ├── (coach)/          # Trainer dashboard, attendance logs, and configurators
│   │   ├── (owner)/          # Administrative dashboards and branding tools
│   │   ├── globals.css       # Core Tailwind CSS imports and dark-mode variables
│   │   └── layout.tsx        # Base root wrapper enforcing mobile view frame constraints
│   ├── components/           # Reusable functional React components
│   │   └── ThemeProvider.tsx # Client-side theme provider interface
│   └── lib/                  # Shared utility methods and database managers
│       ├── db/               # Local persistence layers and seed templates
│       └── firebase/         # Cloud credentials configurations and client helpers
```
