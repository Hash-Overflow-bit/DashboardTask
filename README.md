# BOXpad Dashboard (React + Vite)

Interactive dashboard with responsive layout, Instagram-style mobile messaging flow, skeleton loading, and smooth animations. Data is powered by JSONPlaceholder public APIs for users, messages, and channels.

## Setup Instructions

Prerequisites:

- Node.js 18+ and npm

Install & run (from the `task` folder):

```bash
cd task
npm install
npm run dev
```

Additional scripts:

- `npm run build` – production build to `dist/`
- `npm run preview` – preview the built app locally
- `npm run lint` – run ESLint

Project entry points:

- App bootstrap: `src/main.jsx`
- Router/pages: `src/pages/HomePage.jsx`, `src/pages/Dashboard.jsx`
- Styles: `src/pages/HomePage.css`, `src/pages/dashboard.css`, `src/App.css`
- Navbar: `src/components/Navbar.jsx` + `src/components/Navbar.css`

## APIs Used

This project uses JSONPlaceholder as a mock backend:

- Users (chat list, sidebar users, details)
  - `https://jsonplaceholder.typicode.com/users`
  - `https://jsonplaceholder.typicode.com/users/{id}`
- Messages (comments used as message data)
  - `https://jsonplaceholder.typicode.com/comments?postId={userId}`
- Channels (posts used as channels, limited to 8)
  - `https://jsonplaceholder.typicode.com/posts?_limit=8`

Implementation is primarily in `src/pages/Dashboard.jsx`:

- Chat list fetched on mount; selects first chat by default
- Messages fetched when a chat is selected (`postId = selectedChat`)
- User details fetched when a chat is selected (`/users/{id}`)
- Sidebar users and channels fetched independently
- Independent skeleton loading states per section

## Assumptions

- JSONPlaceholder is used as a mock data source (no authentication, rate limits may apply).
- "Messages" are derived from `comments` for demo purposes; send message action is not persisted.
- "Channels" are derived from `posts` with truncated titles for compact display.
- The dashboard is a Single-Page App (SPA); client-side routing is supported.
- Mobile flow uses view toggles (`list` ↔ `chat`) for full-screen sections.
- Animations and skeleton loading focus on UX polish; data is static/mocked.
- Icons are provided via `react-icons`.
- Tested on modern Chrome/Edge; requires network access to load API data.

## Features Overview

- Responsive grid: Sidebar, Chat List, Chat Area, Details Panel
- Independent skeleton loaders for each section
- Instagram-style mobile messaging flow with floating button and back navigation
- Smooth scroll-reveal animations for list items and messages
- Honeycomb hexagons with glow animations and tooltips on the homepage
- Collapsible sidebar sections with chevron indicators

## Deployment (Optional)

### Vercel

GUI:

- Create a new Vercel project and set “Project Root” to `task/`.
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: Vite
- Add the existing `vercel.json` (already present at repo root) or include a rewrite in the project settings to support SPA routing.

CLI:

```bash
cd task
npm install
npx vercel --prod
```

Note: The provided `vercel.json` contains a rewrite to route all paths to `/` for SPA behavior.


CLI:



## Screenshots (Optional)

Add screenshots under `task/public/screenshots/` and reference them here:



<img width="1350" height="591" alt="image" src="https://github.com/user-attachments/assets/45529bb5-f5fe-4fa8-934f-5d9ba376d84b" />
<img width="1352" height="595" alt="image" src="https://github.com/user-attachments/assets/618ad41c-0ee0-482a-8afc-d39b5a9f6ca5" />


If you prefer relative paths from the repo root, ensure the README image paths match your hosting setup.

## Notes

- For local SPA routing in dev/preview, Vite handles it automatically. In production, ensure rewrites are configured (e.g., `vercel.json`).
- Environment variables are not required for the mock APIs, but you can switch to your own backend by updating the fetch URLs in `src/pages/Dashboard.js`
