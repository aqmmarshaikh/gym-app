# Optimization Checklist - Fitness Corner Gym

Optimization checklist to keep the FCG PWA loading fast.

---

## ⚡ Performance Audits

- [ ] **Image Optimization**: Always use `next/image` to serve responsive images.
- [ ] **Dynamic Routing**: Use dynamic imports to lazy-load dashboard components that are not needed immediately.
- [ ] **Bundle Analysis**: Keep dependency sizes small to prevent performance bottlenecks.
- [ ] **Firestore Query Optimization**: Restructure large datasets into collections to avoid retrieving heavy payloads.
- [ ] **Tailwind Compiler**: Use Tailwind's compiler tools to generate minimal build outputs.
