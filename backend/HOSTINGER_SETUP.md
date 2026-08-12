# Deploying the backend on Hostinger

This assumes a **Hostinger Business or Cloud plan** (Node.js app hosting + MySQL are only on these tiers, not Premium/shared-only plans).

---

## 1. Create the MySQL database

1. Log into **hPanel** → go to **Databases → MySQL Databases**.
2. Create a new database — note the auto-generated name (e.g. `u123456789_pratikshub`).
3. Create a new database user, set a strong password, and attach it to the database with **all privileges**.
4. Note down: **database host** (usually `localhost` if the Node app and DB share the same server — Hostinger will show the exact host, sometimes `127.0.0.1` or an internal hostname), **database name**, **username**, **password**.

## 2. Load the schema

1. In hPanel, open **phpMyAdmin** for that database (Databases → phpMyAdmin → select your DB).
2. Go to the **SQL** tab.
3. Paste the entire contents of [`backend/src/db/schema.sql`](src/db/schema.sql) and run it.
4. Confirm the tables appear: `categories`, `technologies`, `projects`, `project_technologies`, `page_views`, `messages`.

## 3. Create the Node.js application

1. In hPanel, go to **Advanced → Node.js**.
2. Click **Create Application**.
   - **Node.js version**: 18 or 20 (LTS)
   - **Application root**: e.g. `backend` (the folder you'll upload/deploy into)
   - **Application URL**: pick the subdomain, e.g. `api.yourdomain.com`
   - **Application startup file**: `src/server.js`
3. Save — Hostinger provisions the app and gives you an SSH/file path to deploy into.

## 4. Upload the backend code

Pick one:

**Option A — Git (recommended, matches this repo):**
1. In the Node.js app settings, check if Hostinger offers **Git deployment** (pulls from your GitHub repo on push). If available, connect it to `https://github.com/pratikwalunjdev/project_hub.git`, set the deploy path to `backend/`.
2. If not available on your plan, use Option B.

**Option B — Manual upload via File Manager or SFTP:**
1. Zip the `backend/` folder (excluding `node_modules` and `.env`).
2. Upload via hPanel **File Manager** or an SFTP client (credentials under **Advanced → SSH Access**) into the Node app's root directory.
3. Extract it there.

## 5. Set environment variables

In the Node.js app's **Environment Variables** section in hPanel, add:

```
PORT=4000
DB_HOST=<from step 1>
DB_PORT=3306
DB_USER=<from step 1>
DB_PASSWORD=<from step 1>
DB_NAME=<from step 1>
JWT_SECRET=<generate a long random string>
ADMIN_EMAIL=pratik.walunj.dev@gmail.com
ADMIN_PASSWORD_HASH=<see step 6>
CORS_ORIGIN=https://yourdomain.com
```

Never commit real values — `.env` is gitignored; `.env.example` in this repo is just the template.

## 6. Generate your admin password hash

Locally (or via Hostinger's SSH terminal once the app is deployed):

```bash
cd backend
node src/scripts/hashPassword.js "your-chosen-password"
```

Copy the printed hash into `ADMIN_PASSWORD_HASH` in step 5. You log in with this password, not the hash.

## 7. Install dependencies & start

In hPanel's Node.js app screen there's usually a **Run NPM Install** button — click it (equivalent to `npm install` in the app root). Then hit **Restart App**.

If you have SSH access instead:

```bash
cd ~/path-to/backend
npm install
npm run start
```

Hostinger keeps the process alive via its Node.js app manager (Passenger) — you don't need `pm2` separately.

## 8. Point the frontend at it

In the React app, set the API base URL (once we wire the frontend to real data) to your Node app's URL, e.g. `https://api.yourdomain.com/api`.

## 9. Verify

```bash
curl https://api.yourdomain.com/api/health
# → {"status":"ok"}
```

If you get a 502/504, check the Node app logs in hPanel (**Node.js → your app → Logs**) — usually a missing env var or the app crashing on `require`.
