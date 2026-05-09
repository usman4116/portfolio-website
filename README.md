# Muhammad Usman Farhan - Immersive Portfolio

A world-class, futuristic, and highly immersive personal portfolio website featuring a real-time 3D galaxy experience.

## Features

### 3D Galaxy Experience
- Real-time rendered starfield with Three.js
- Parallax depth layers responding to mouse movement
- Floating glowing orbs with continuous animation
- Animated nebula effects

### Animations (Everywhere!)
- Framer Motion powered animations
- GSAP for advanced effects
- Scroll-triggered animations on all sections
- Floating cards with continuous animation
- Neon glow effects on hover
- Smooth transitions everywhere

### Visual Design
- **Dark Blue Theme** - No purple, pure futuristic blue/cyan palette
- **Glassmorphism** - Semi-transparent cards with blur
- **Custom Cursor** - Glowing cursor with particle trail
- **Neon Effects** - Glowing buttons and text shadows
- **Scroll Progress** - Glowing progress indicator

### Sections
1. **Hero** - 3D galaxy background, typing animation, floating elements
2. **About** - Education, certifications, strengths with floating cards
3. **Skills** - Animated progress bars, circular indicators
4. **Projects** - 3D tilt cards, hover effects, category filtering
5. **Experience** - Glowing timeline with animated nodes
6. **Contact** - Glassmorphic form with glowing focus states

### Extra Features
- **Preloader** - Galaxy loading animation with progress
- **AI Assistant** - Floating chatbot with quick responses
- **Shooting Stars** - Random shooting star effects
- **Scroll Progress** - Glowing progress bar at top

## Tech Stack

- React 18 with Vite
- Tailwind CSS
- Framer Motion
- Three.js (@react-three/fiber)
- GSAP
- React Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AIAssistant.jsx
│   ├── CustomCursor.jsx
│   ├── Footer.jsx
│   ├── GalaxyBackground.jsx
│   ├── Navbar.jsx
│   ├── Preloader.jsx
│   ├── ScrollProgress.jsx
│   └── ShootingStars.jsx
├── sections/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Experience.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Data Source

All content is extracted from Muhammad Usman Farhan's CV:
- BS Computer Science from UMT (2021-Present)
- Certifications from Microsoft, Coursera, LinkedIn, EF SET
- Skills in C++, Python, JavaScript, React, DSA, OOP
- Projects including Library Management System, AI Code Assistant, etc.

## Customization

Update the following files to personalize:
- `src/sections/Hero.jsx` - Name, roles, social links
- `src/sections/About.jsx` - Education and certifications
- `src/sections/Skills.jsx` - Skill levels and categories
- `src/sections/Projects.jsx` - Project details
- `src/sections/Experience.jsx` - Timeline items
- `src/sections/Contact.jsx` - Contact information

## Performance

- Three.js rendering optimized
- Components lazy loaded
- Smooth 60 FPS animations
- Minimal bundle size with code splitting

---

Built with passion, code, and a galaxy of creativity.
