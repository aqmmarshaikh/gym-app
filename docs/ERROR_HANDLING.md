# Error Handling - Fitness Corner Gym

Strategies for handling and displaying errors in FCG.

---

## 🛡️ Error Boundary Strategy

* **API & Form Validations**: Form handlers must catch errors and display them as context banners (using `lucide/AlertTriangle` icons) rather than breaking the application flow.
* **Fallback Screens**: If the local database fails to load, the system displays a clear warning screen with instructions to reset browser data cache.
* **Sign-in Fallbacks**: Incorrect login codes or passwords display immediate inline helper tags below inputs.
