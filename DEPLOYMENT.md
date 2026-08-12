# Deploying Pratik's Hub on Hostinger (thedebuggersjournal.in)

**Target layout:**
- Frontend (React dashboard): `https://projecthub.thedebuggersjournal.in`
- Backend (API): `https://api-projecthub.thedebuggersjournal.in`
- Database: MySQL, same Hostinger account

Works on **any Hostinger plan, including Premium/Shared** — the backend is plain PHP (`backend-php/`), which every plan supports natively. There's no Node.js app hosting requirement.

> Select **PHP 8.0+** for the subdomain in hPanel (**Advanced → PHP Configuration**) — the backend uses `str_starts_with`/`str_ends_with`, available since PHP 8.0.

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
3. Open **phpMyAdmin** for that database → **SQL** tab → paste the full contents of [`backend/src/db/schema.sql`](backend/src/db/schema.sql) → run it (this schema file works as-is regardless of whether the API is Node or PHP).
4. Confirm tables exist: `categories`, `technologies`, `projects`, `project_technologies`, `page_views`, `messages`.

---

## 3. Deploy the backend to `api-projecthub.thedebuggersjournal.in`

The backend lives in [`backend-php/`](backend-php) — plain PHP with PDO, no Composer/Node runtime required, so it runs on Premium/Shared out of the box.

### 3.1 Set the subdomain's document root
1. In **Domains → Subdomains**, confirm `api-projecthub.thedebuggersjournal.in`'s document root (e.g. `public_html/api-projecthub.thedebuggersjournal.in`).
2. **Advanced → PHP Configuration** → select this subdomain → set **PHP version to 8.0 or higher**.

### 3.2 Upload the code
Choose one:

**Git deploy (if your plan/panel offers it):** connect `https://github.com/pratikwalunjdev/project_hub.git`, set the deploy subdirectory to `backend-php`, target the subdomain's document root.

**Manual upload (always works):**
1. Locally: `cd backend-php && zip -r backend-php.zip . -x ".env"`
2. hPanel **File Manager** → navigate to the `api-projecthub.thedebuggersjournal.in` document root → upload `backend-php.zip` → extract its **contents** directly into that document root (so `api/`, `lib/`, `.htaccess`, `index.php` sit at the root, not nested inside another folder).

### 3.3 Create the `.env` file
In File Manager, create `.env` in the same document root (copy from [`backend-php/.env.example`](backend-php/.env.example)) and fill in:

```
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

`.htaccess` already blocks direct requests to `.env`, but double-check it isn't publicly downloadable after upload.

### 3.4 Generate your admin password hash
If you have SSH access (check **Advanced → SSH Access** — available on some Premium plans too):

```bash
cd api-projecthub.thedebuggersjournal.in
php scripts/hash_password.php "your-chosen-password"
```

No SSH? Run it locally instead (requires PHP installed on your machine) and paste the output into `ADMIN_PASSWORD_HASH`:

```bash
cd backend-php
php scripts/hash_password.php "your-chosen-password"
```

You'll log in with the plain password, never the hash.

### 3.5 Verify
```bash
curl https://api-projecthub.thedebuggersjournal.in/api/health
# → {"status":"ok"}
```
If it fails, check **Files → Error Logs** in hPanel for that subdomain — usually a missing `.env` value, wrong PHP version, or `.htaccess` not being picked up (confirm `mod_rewrite` is enabled, which it is by default on Hostinger Apache).

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
3. Browser console on the frontend shows no CORS errors when it eventually calls the API (the `CORS_ORIGIN` value in `.env` must exactly match the frontend's URL, including `https://`).

---

## 6. Redeploying after changes

- **Backend**: re-upload changed files in `backend-php/` via File Manager/SFTP (or push to `main` if Git deploy is set up) — no restart step needed, PHP is interpreted per-request by Apache.
- **Frontend**: rebuild locally (`npm run build`) and re-upload `dist/` contents — this is the *only* redeploy needed for site-wide changes. Adding a new **project**, however, requires no redeploy at all — that's just a database row via the admin panel once the API is wired in.

---

## Note on the Node.js backend

[`backend/`](backend) (the Express/Node version) is kept in the repo for reference and in case you ever move to a Business/Cloud plan with Node.js app hosting — the database schema is identical, so switching later just means redeploying that instead of `backend-php/`. It isn't used in this deployment.
