# Deploying Pratik's Hub on Hostinger (thedebuggersjournal.in)

**Target layout:**
- Frontend (React dashboard): `https://projecthub.thedebuggersjournal.in`
- Backend (API): `https://api-projecthub.thedebuggersjournal.in`
- Database: MySQL, same Hostinger account

Requires a **Business or Cloud** Hostinger plan (Node.js app hosting isn't on Premium/shared-only tiers).

---

## 1. Create the subdomains

1. Log into **hPanel** for `thedebuggersjournal.in`.
2. Go to **Domains → Subdomains**.
3. Create subdomain `projecthub` → this gives you `projecthub.thedebuggersjournal.in`, with its own document root (e.g. `public_html/projecthub.thedebuggersjournal.in`).
4. Create a second subdomain `api-projecthub` → this gives you `api-projecthub.thedebuggersjournal.in`, with its own document root (e.g. `public_html/api-projecthub.thedebuggersjournal.in`).

   > Hostinger doesn't allow multi-level subdomains (e.g. `api.projecthub.thedebuggersjournal.in`), so this uses a sibling subdomain instead.
5. Wait for DNS to propagate (usually instant on Hostinger since it manages the zone) — check both resolve under **Domains → DNS Zone**.
6. Under **Security → SSL**, issue free SSL (Let's Encrypt) for both subdomains. Enable **force HTTPS** for each.

---

## 2. Create the MySQL database

1. **Databases → MySQL Databases** → create a new database (e.g. `u123456789_projecthub`) and a DB user with a strong password, full privileges.
2. Note: **host** (Hostinger will show it — usually `localhost` since DB and app share the server), **database name**, **username**, **password**.
3. Open **phpMyAdmin** for that database → **SQL** tab → paste the full contents of [`backend/src/db/schema.sql`](backend/src/db/schema.sql) → run it.
4. Confirm tables exist: `categories`, `technologies`, `projects`, `project_technologies`, `page_views`, `messages`.

---

## 3. Deploy the backend to `api-projecthub.thedebuggersjournal.in`

### 3.1 Create the Node.js app
1. **Advanced → Node.js** → **Create Application**.
2. Node.js version: 18 or 20 LTS.
3. **Application root**: point it at the `api-projecthub.thedebuggersjournal.in` document root (or a subfolder inside it, e.g. `backend`).
4. **Application URL**: select `api-projecthub.thedebuggersjournal.in`.
5. **Application startup file**: `src/server.js`.
6. Save — Hostinger provisions the app and shows you the deployment path + an "Enter to virtual env" SSH command.

### 3.2 Upload the code
Choose one:

**Git deploy (if your plan supports it):**
- In the Node app's settings, connect the repository `https://github.com/pratikwalunjdev/project_hub.git`, set the deploy subdirectory to `backend`, and enable auto-deploy on push to `main`.

**Manual upload (always works):**
1. Locally: `cd backend && zip -r backend.zip . -x "node_modules/*" ".env"`
2. hPanel **File Manager** → navigate to the Node app's root → upload `backend.zip` → extract it.

### 3.3 Set environment variables
In the Node.js app's **Environment Variables** panel, add:

```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=<your db user>
DB_PASSWORD=<your db password>
DB_NAME=<your db name>
JWT_SECRET=<long random string>
ADMIN_EMAIL=pratik.walunj.dev@gmail.com
ADMIN_PASSWORD_HASH=<see 3.4>
CORS_ORIGIN=https://projecthub.thedebuggersjournal.in
```

### 3.4 Generate your admin password hash
Via the Node app's SSH terminal (hPanel gives you a command to enter its virtual env) or locally:

```bash
cd backend
node src/scripts/hashPassword.js "your-chosen-password"
```

Paste the output into `ADMIN_PASSWORD_HASH` above. You'll log in with the plain password, never the hash.

### 3.5 Install & start
In the Node.js app screen, click **Run NPM Install**, then **Restart**. Hostinger's Passenger process manager keeps it alive — no separate `pm2` needed.

### 3.6 Verify
```bash
curl https://api-projecthub.thedebuggersjournal.in/api/health
# → {"status":"ok"}
```
If it fails, check **Node.js → your app → Logs** in hPanel — usually a missing env var or a crash on startup.

---

## 4. Deploy the frontend to `projecthub.thedebuggersjournal.in`

### 4.1 Point the frontend at the live API
Before building, create `frontend/.env.production`:

```
VITE_API_URL=https://api-projecthub.thedebuggersjournal.in/api
```

*(This env var isn't wired into the code yet — it will be used once we replace mock data with real API calls. Safe to add now.)*

### 4.2 Build
```bash
cd frontend
npm install
npm run build
```
This produces a static `dist/` folder — no Node runtime needed to serve it.

### 4.3 Upload
1. hPanel **File Manager** → navigate to the `projecthub.thedebuggersjournal.in` document root.
2. Upload the **contents** of `dist/` (not the folder itself) directly into that document root.
3. Since this is a single-page app using client-side routing, add a rewrite so all paths fall back to `index.html`. In the document root, create `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Without this, refreshing on `/projects` or `/admin` will 404.

### 4.4 Verify
Visit `https://projecthub.thedebuggersjournal.in` — the dashboard should load, and direct navigation to `/projects`, `/admin`, etc. should work without a 404 on refresh.

---

## 5. End-to-end check

1. `https://projecthub.thedebuggersjournal.in` loads the dashboard (still on mock data until the API wiring step).
2. `https://api-projecthub.thedebuggersjournal.in/api/health` returns `{"status":"ok"}`.
3. Browser console on the frontend shows no CORS errors when it eventually calls the API (the `CORS_ORIGIN` env var in step 3.3 must exactly match the frontend's URL, including `https://`).

---

## 6. Redeploying after changes

- **Backend**: push to `main` (if Git deploy is set up) or re-upload + **Restart** the Node app.
- **Frontend**: rebuild locally (`npm run build`) and re-upload `dist/` contents — this is the *only* redeploy needed for site-wide changes. Adding a new **project**, however, requires no redeploy at all — that's just a database row via the admin panel once the API is wired in.
