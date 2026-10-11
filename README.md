# Students Manager

A simple full-stack app for teachers to manage students and assignments.

## Stack

- Frontend: Next.js + React + Tailwind
- Backend: Express + TypeScript
- Database: MongoDB + Mongoose
- Auth: JWT

This setup is fast, simple, and easy to extend for a student-management dashboard.

## Database

Existing teacher:

- Name: `admin`
- ID: `123456789`

## Environment

`backend/.env`:

```env
JWT_SECRET=your_super_secret_key
MONGODB_URI=mongodb://localhost:27017/students-manager
PORT=3001
```

`frontend/.env.local`:

```env
BACKEND_URL=http://localhost:3001
```

## Run locally

```bash
cd backend && npm install
cd ../frontend && npm install
```

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Open:

`http://localhost:3000`
