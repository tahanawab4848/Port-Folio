# Harsh Goyal — Developer & Designer Portfolio

A dark-themed personal portfolio for **Harsh Goyal** — Computer Science graduate from NSUT, currently a Content R&D Trainee at PhysicsWallah. Focused on UI/UX, front-end development, and GenAI integration.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack

- React 18 / TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Lucide React (icons)
- Kanit font (Google Fonts, weights 300–900)

## Sections

1. **Hero** — name, tagline, magnetic-hover portrait
2. **About** — bio + skills grouped by Languages / Frameworks / Tools / AI
3. **Services** — UI/UX Design, Web Design, Front-end Development, GenAI Integration
4. **Projects** — sticky-stacking cards for AI Tutor, PiLearn, ResumeIQ, Notch
5. **Contact** — Email, WhatsApp, LinkedIn, GitHub

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Deploy to Vercel

Push to GitHub → import the repo at [vercel.com/new](https://vercel.com/new) → click Deploy. No environment variables needed.

## Project structure

```
src/
├── App.tsx                    # composes all sections
├── main.tsx                   # React entry
├── index.css                  # global styles + .hero-heading gradient
└── components/
    ├── HeroSection.tsx        # navbar, massive heading, magnetic portrait
    ├── AboutSection.tsx       # bio, animated text, skills grid
    ├── ServicesSection.tsx    # white section, 4 numbered services
    ├── ProjectsSection.tsx    # sticky-stacking project cards
    ├── ContactSection.tsx     # 4 contact methods with icons
    │
    ├── ContactButton.tsx      # gradient pill CTA
    ├── LiveProjectButton.tsx  # ghost outline pill
    ├── FadeIn.tsx             # whileInView animation wrapper
    ├── Magnet.tsx             # mouse-following magnetic hover
    └── AnimatedText.tsx       # char-by-char scroll-driven reveal
```

## Featured projects

| Project | Live | Built with |
|---|---|---|
| ResumeIQ | [resumeiq-harsh.vercel.app](https://resumeiq-harsh.vercel.app) | React, Gemini API, Vercel |
| Notch | [notch-zeta.vercel.app](https://notch-zeta.vercel.app) | React, Tailwind, Framer Motion |

## Customisation

| Want to change | Open this file |
|---|---|
| Name, nav links, hero text | `src/components/HeroSection.tsx` |
| About paragraph, skills list | `src/components/AboutSection.tsx` |
| Services list | `src/components/ServicesSection.tsx` (`SERVICES` array) |
| Projects, screenshots, live URLs | `src/components/ProjectsSection.tsx` (`PROJECTS` array) |
| Contact methods | `src/components/ContactSection.tsx` (`CONTACT_METHODS` array) |
| Project screenshots | drop new images in `public/` and reference as `/filename.png` |
| Brand gradient, font, dark colour | `src/index.css` and `tailwind.config.js` |
| Page title, meta description | `index.html` |

## Credits

Designed & built by **Harsh Goyal** · [LinkedIn](https://www.linkedin.com/in/harsh-goyal-7900b2256/) · [GitHub](https://github.com/harshgoyal27)
