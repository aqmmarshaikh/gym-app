# Accessibility Guidelines - Fitness Corner Gym

Accessibility (a11y) rules enforced within FCG.

---

## ♿ Requirements

### 1. Color Contrast Checks
* Text elements must maintain a minimum contrast ratio of **4.5:1** against backgrounds.
* Gold accents used for critical notifications must have a backing card to guarantee legibility.

### 2. Semantic HTML elements
* Always use standard semantic layout wrappers (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`) rather than generic `<div>` containers.
* Use `<button>` for clickable elements and ensure they have descriptive `aria-label` tags if they only display icons.
