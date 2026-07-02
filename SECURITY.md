# SECURITY - Fitness Corner Gym PWA

This document outlines the security strategy, policies, disclosure protocols, and secure coding standards implemented in the Fitness Corner Gym (FCG) PWA project.

---

## 🔒 Security Policy

We are committed to providing a secure Gym Management System (GMS). Our security model enforces:
1. **Authentication Verification**: Absolute separation of public routes, Member routines, Coach workflows, and Owner controls.
2. **Access Control**: Role-Based Access Control (RBAC) configured at the API/Service layer and reinforced by Firebase Firestore/Storage Security Rules.
3. **Data Integrity**: Audited CRUD endpoints with write restrictions.

---

## 🕵️‍♂️ Vulnerability Reporting

If you identify a security vulnerability within this project, **do not open a public issue.** Instead, please report it directly through our security disclosure channel:

* **Email**: [security@fitnesscorner.com](mailto:security@fitnesscorner.com)
* **GPG Key**: Available upon request.
* **Response SLA**: The security maintainer team will review and respond within **24 hours** of submission.

---

## 🔐 Authentication Strategy

FCG implements a multi-tier authentication flow matching the user persona:

1. **Member Login (Code-Based)**: 
   * Authenticates using a unique Member Code (e.g. `FCG1001`).
   * Validated against Firestore records to verify expiration dates and active check-in status.
2. **Coach/Owner Login (Password-Based)**:
   * Authenticates via Firebase Authentication (`signInWithEmailAndPassword`) or verified local store credentials in demo mode.
   * Session tokens are persisted securely to manage operational dashboards.

---

## 🛡️ Authorization & Firestore Rules

All reads/writes to Cloud Firestore are locked down using path-level validations in `firestore.rules`.

### 1. Members
* **Read**: Can only read their own profile, assigned diet sheet, and assigned daily workout.
* **Write**: Can only update non-sensitive personal metadata (email, phone, bloodGroup, dob, progress photos).
* Cannot update membership expiry date, status, or assigned coach.

### 2. Coaches
* **Read**: Can read all member records, attendance logs, and gym machines.
* **Write**: Can register new members, mark attendance, and configure gym machines or workout categories.
* Cannot suspend or delete other coaches or modify owner accounts.

### 3. Owners
* **Read / Write**: Full access to all collections (Settings, Coaches, Members, Attendance, AuditLogs).
* Exclusive access to billing details and coach suspension triggers.

---

## 💻 Secure Coding Rules

To prevent common web vulnerabilities, all developers must adhere to the following rules:

### 1. Input Validation & XSS Prevention
* All form inputs must be sanitized.
* Rely on React/Next.js default JSX data-binding which automatically escapes HTML content to prevent Cross-Site Scripting (XSS).
* Avoid using `dangerouslySetInnerHTML` unless explicitly approved by the security architect.

### 2. CSRF & Session Management
* Since Next.js is configured as a client-side PWA with static routing, auth tokens are validated directly by the Firebase Web SDK.
* All session states in local storage must be serialized securely and reset upon user sign-out.

### 3. Environment Variable Handling
* Never commit `.env` or `.env.local` files to source control.
* Only expose variables prefixed with `NEXT_PUBLIC_` if they are strictly required on the client side (e.g., Firebase Web API keys).
* Exclude secrets from client bundles by omitting the prefix.

---

## 📋 Production Security Checklist

Before deploying this application to production, verify the following steps:

- [ ] Ensure `DEMO_MODE` is disabled in config.
- [ ] Firestore Security Rules are deployed and verified (`firestore.rules`).
- [ ] Cloud Storage Security Rules are deployed and verified (`storage.rules`).
- [ ] All public endpoints use HTTPS with HSTS headers enabled.
- [ ] Whitelisted remote patterns in `next.config.ts` are limited to trusted CDNs (e.g., Unsplash).
- [ ] Firebase project API keys are restricted in the Google Cloud Console to prevent unauthorized usage.
- [ ] Rotate all coach and owner administrative passwords.
