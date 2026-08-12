<div align="center">

# 🚀 Pratik's Hub

**My Projects. My World.**

A single dashboard to manage, showcase, and redirect visitors to every project I build — without ever redeploying this site.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/status-in%20development-orange?style=for-the-badge)]()

</div>

---

## 📖 About

**Pratik's Hub** is a personal admin dashboard + public portfolio system built to solve one problem: showcasing dozens of side projects without having to redeploy a monolith every time a new one ships.

Instead, each project is registered as metadata (name, description, live URL, tech stack, category) inside the dashboard. Visiting a project simply **redirects** to wherever it's actually hosted — its own subdomain, folder, or external host. Adding a new project is a form submission, not a deployment.

> 📦 Currently in active development. The frontend dashboard (v1) is live on mock data — backend integration is next.

<details>
<summary><strong>🤔 Why build it this way?</strong></summary>
<br>

Managing 10+ side projects usually means 10+ separate deploy pipelines, domains, and dashboards to remember. This project centralizes everything into **one** place I control end-to-end on a single Hostinger plan:

- ✅ One admin login, one place to add/edit/publish projects
- ✅ Each project stays independently hosted — no coupling, no redeploys of the hub itself
- ✅ Built-in analytics, visitor logs, and a contact inbox, so I don't need third-party tools bolted on

</details>

---

## ✨ Features

| Area | What it does |
|---|---|
| 📊 **Dashboard** | At-a-glance stats, recent projects, visitor trend & tech stack breakdown |
| 🗂️ **Projects** | Search, filter by category/status, switch between list & grid view |
| ➕ **New Project** | Modal form — name, live URL, repo, thumbnail, category, tech stack, status |
| 🏷️ **Categories & Technologies** | Manage the taxonomy used across all projects, with live usage counts |
| 📈 **Analytics** | Visitor trends, top projects by views, traffic by referrer |
| 👥 **Visitors** | Session-level log — page, location, device, referrer, duration |
| 💬 **Messages** | Inbox-style contact form submissions with read/unread state |
| 🛠️ **Admin Panel** | Project management table, site settings, single-admin account, JSON backup/restore |

---

## 🧰 Tech Stack

<div align="center">

| Layer | Choice | Why |
|---|---|---|
| Frontend | **React + Vite** | Fast dev loop, component-driven UI |
| Styling | **Tailwind CSS v4** | Utility-first, no design-system overhead |
| Charts | **Recharts** | Lightweight, composable charts |
| Icons | **Lucide React** | Consistent, tree-shakeable icon set |
| Routing | **React Router** | Client-side navigation across the dashboard |
| Backend *(planned)* | **Node.js / Express** | Runs as a Node app on Hostinger hPanel |
| Database *(planned)* | **MySQL** | Included free on Hostinger hosting |
| Hosting | **Hostinger** | Single provider for frontend, API, and DB — matches the "manage it all myself" goal |

</div>

---

## 🗺️ How redirection works

```
Visitor clicks "ZenithOS" card
        │
        ▼
Dashboard looks up project.liveUrl in the database
        │
        ▼
Browser redirects to https://zenithos.<yourdomain>.com
        │
        ▼
Project loads from wherever IT is hosted — Pratik's Hub never redeploys
```

Adding a new project = inserting one row via the admin panel. No CI/CD, no rebuild of this site.

---

## 🚦 Getting Started

```bash
git clone https://github.com/pratikwalunjdev/project_hub.git
cd project_hub/frontend
npm install
npm run dev
```

Then open **http://localhost:5173** — the dashboard runs entirely on mock data ([`src/data/mockData.js`](frontend/src/data/mockData.js)) until the backend is connected.

<details>
<summary><strong>📁 Project structure</strong></summary>

```
project_hub/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI (cards, charts, modal)
│   │   ├── layout/         # Sidebar, Topbar, AppLayout shell
│   │   ├── pages/          # One file per route
│   │   ├── data/           # Mock data (swapped for API calls later)
│   │   └── App.jsx         # Route definitions
│   └── package.json
└── backend/                 # 🚧 coming soon — Express + MySQL API
```

</details>

---

## 🛣️ Roadmap

- [x] Dashboard UI with stats, charts, and project list
- [x] Projects page — search, filter, grid/list, create modal
- [x] Categories, Technologies, Analytics, Visitors, Messages, Settings
- [x] Full Admin Panel (management, site settings, user access, backup/restore)
- [ ] Express + MySQL backend
- [ ] JWT auth for the single-admin login
- [ ] Replace mock data with live API calls
- [ ] Deploy frontend + backend + DB on Hostinger

---

<div align="center">

Built and maintained solo by **Pratik Walunj**

</div>
