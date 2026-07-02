# Firebase Setup Guide - Fitness Corner Gym

This guide walks through configuring a Google Firebase project to support cloud authentication and Firestore database capabilities.

---

## 🏗 Firebase Configuration Stepper

### 1. Create a Firebase Project
* Open the [Firebase Console](https://console.firebase.google.com/).
* Click **Add Project** and name it `fitness-corner-gym`.
* Choose whether to enable Google Analytics (recommended for visitor logs) and create the project.

### 2. Configure a Web Application
* In the project dashboard, click the **Web icon (</>)** to register an app.
* Name it `FCG Web Client`.
* Copy the generated `firebaseConfig` credentials object.

### 3. Setup Environment Keys
* Open your local `.env.local` file.
* Map the copied credentials:
  ```env
  NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fitness-corner-gym.firebaseapp.com
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=fitness-corner-gym
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fitness-corner-gym.appspot.com
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
  NEXT_PUBLIC_FIREBASE_APP_ID=1:234...
  ```

### 4. Enable Authentication
* In the Firebase sidebar, go to **Build > Authentication**.
* Click **Get Started**.
* Enable the **Email/Password** provider under Sign-in methods.

### 5. Initialize Cloud Firestore
* Go to **Build > Firestore Database**.
* Click **Create Database**.
* Set location and select **Start in production mode**.
* Deploy the security rules contained in your local `firestore.rules` file to configure role-based access.

### 6. Initialize Cloud Storage
* Go to **Build > Storage**.
* Click **Get Started**.
* Set location and select **Start in production mode**.
* Deploy the rules in `storage.rules` to configure storage permissions.

### 7. Seed Initial Datasets
* Run the application in Firebase mode.
* Scroll to the public landing page footer.
* Click **Seed Firebase Firestore** to seed default owner, coach, and member records.
