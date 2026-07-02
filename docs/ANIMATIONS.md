# Animations & Micro-interactions - Fitness Corner Gym

Animation guidelines and physics settings for FCG.

---

## 🎨 Animation Standards

* **Library**: The application leverages `framer-motion` for physical micro-interactions.
* **Spring Settings**: Use custom spring-physics mappings for smooth, high-fidelity UI transitions:
  * Transition: `type: "spring", stiffness: 300, damping: 25`
* **Common Use Cases**:
  * Tap feedback: Scale down slightly when pressed (`whileTap={{ scale: 0.98 }}`).
  * Modal transitions: Slide up from the bottom when opened.
  * Checklist toggles: Animate checks with a physical bounce when marked complete.
