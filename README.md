# Job Seeking Application

A full‑stack MERN application with separate `backend` (Express + MongoDB) and `frontend` (React + Vite).

## Prerequisites
- Node.js LTS and npm
- MongoDB Atlas or local MongoDB
- Cloudinary account (optional: only if image upload is used)

## Project structure
```
backend/
frontend/
```

## Quick start

### 1) Install dependencies
```bash
# Backend deps
cd backend
npm install

# Frontend deps
cd ../frontend
npm install
```

### 2) Configure environment
- Copy `backend/config/config.env.example` to `backend/config/config.env` and fill in real values.

```powershell
Copy-Item backend/config/config.env.example backend/config/config.env
```

Required keys in `backend/config/config.env`:
- `PORT`, `FRONTEND_URL`
- `MONGO_URI`
- `JWT_SECRET_KEY`, `JWT_EXPIRE`, `COOKIE_EXPIRE`
- `CLOUDINARY_CLIENT_NAME`, `CLOUDINARY_CLIENT_API`, `CLOUDINARY_CLIENT_SECRET` (if used)

### 3) Run locally
Open two terminals:
```bash
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd frontend
npm run dev
```
Backend default: `http://localhost:4000`
Frontend default: `http://localhost:5173`

## Deploy notes
- Do not commit `backend/config/config.env` or any real secrets. A root `.gitignore` is provided.
- If deploying the frontend separately, set `FRONTEND_URL` accordingly in backend env and ensure CORS/cookies match your hostnames.

## First push to GitHub
```bash
# From project root (this folder)
git init

git add .
git commit -m "Initial commit: MERN job seeking app"

# Create a new empty repo on GitHub, then set the remote (edit values):
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## Deployment (quick pointers)
- Frontend (Netlify/Vercel): build command `npm run build`, publish directory `frontend/dist`. Set the project root to `frontend/`.
- Backend (Render): create a Web Service from `backend/` with `Build Command: npm ci` and `Start Command: npm start`. Add environment variables from `backend/config/config.env`.

## Troubleshooting
- If the login page looks tiny, update to latest; fixed widths were replaced with responsive styles in `frontend/src/App.css`.
- If cookies don’t set in browser, verify `FRONTEND_URL` and `withCredentials: true` in API calls.
- If uploads fail, verify Cloudinary credentials or disable related features.

## License
MIT (or your choice)
