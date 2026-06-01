# ⚡ FitFlow CRM — Gym Client & Lead Management System

A full-stack admin dashboard for managing gym clients, leads, trainers, class schedules, bookings, and payments.

---

## 📸 Pages

| Page | What it does |
|------|-------------|
| **Dashboard** | Overview stats, today's schedule, recent payments, admin notes |
| **Leads** | Full lead pipeline — New → Contacted → Follow-Up → Converted / Lost, with per-lead notes |
| **Clients** | Member management — add, edit, delete, search, paginate |
| **Trainers** | Trainer roster — specialties, availability, certifications |
| **Schedule** | Class grid — create, edit, delete classes, invite clients |
| **Bookings** | Booking table — status updates, new bookings |
| **Payments** | Revenue tracking — add payments, change status, pagination |
| **Settings** | Profile, gym info, notifications, security, billing, roles, appearance |
| **Support** | FAQ accordion, support ticket form, system status |
| **Login** | JWT-protected login — redirects to dashboard on success |

---

## 🗂 Project Structure

```
FUTURE_FS_02/
├── Backend/
│   └── fitness-crm/
│       ├── server.js           ← Express entry point
│       ├── .env                ← Your secrets (never commit this)
│       ├── .env.example        ← Template for .env
│       ├── models/
│       │   ├── User.js         ← Admin users (bcrypt passwords)
│       │   ├── Lead.js         ← Leads with pipeline status + notes
│       │   ├── Client.js       ← Gym members
│       │   ├── Trainer.js      ← Trainers
│       │   ├── Schedule.js     ← Classes
│       │   ├── Booking.js      ← Class bookings
│       │   └── Payment.js      ← Payment records
│       ├── routes/
│       │   ├── auth.js         ← POST /login, POST /register, GET /me
│       │   ├── leads.js        ← Full CRUD + PATCH /status + POST /notes
│       │   ├── clients.js      ← Full CRUD + search + pagination
│       │   ├── trainers.js     ← Full CRUD
│       │   ├── schedule.js     ← Full CRUD
│       │   ├── bookings.js     ← Full CRUD + enrolled count sync
│       │   ├── payments.js     ← Full CRUD + summary stats
│       │   └── dashboard.js    ← Aggregated stats for dashboard
│       └── middleware/
│           └── auth.js         ← JWT protect middleware
│
└── Frontend/
    └── Vite-project/
        ├── src/
        │   ├── main.jsx        ← React entry point
        │   ├── App.jsx         ← Router + auth protection + layout
        │   ├── AuthContext.jsx ← Login/logout state (React Context)
        │   ├── api.js          ← Axios instance with auto token injection
        │   ├── index.css       ← Global reset + CSS variables
        │   └── App.css         ← All component styles
        ├── Components/
        │   ├── Sidebar.jsx     ← Fixed nav with all routes
        │   ├── Topbar.jsx      ← Search, notifications, profile dropdown
        │   ├── Modal.jsx       ← Reusable modal overlay
        │   └── pages/
        │       ├── Login.jsx
        │       ├── Dashboard.jsx
        │       ├── Leads.jsx   ← Full pipeline + notes (works offline too)
        │       ├── Clients.jsx
        │       ├── Trainers.jsx
        │       ├── Schedule.jsx
        │       ├── Bookings.jsx
        │       ├── Payments.jsx
        │       ├── Settings.jsx
        │       └── Support.jsx
        ├── vite.config.js      ← Dev proxy: /api → localhost:5000
        └── .env.example        ← VITE_API_URL template
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [MongoDB Atlas](https://cloud.mongodb.com) account (free tier works)

---

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/FUTURE_FS_02.git
cd FUTURE_FS_02
```

---

### 2. Set up the Backend

```bash
cd Backend/fitness-crm
npm install
```

Create your `.env` file:

```bash
# Copy the template
copy .env.example .env
```

Open `.env` and fill in:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fitflow?retryWrites=true&w=majority
JWT_SECRET=any_long_random_string_here_make_it_at_least_32_chars
PORT=5000
```

**How to get your MONGO_URI:**
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Click **Connect** → **Drivers** → copy the connection string
4. Replace `<username>` and `<password>` with your Atlas credentials

Start the backend:

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

---

### 3. Create your first admin account

Use any API client (Postman, Insomnia, or curl):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Emon Ahmed","email":"emon@fitflow.com","password":"yourpassword","role":"super_admin"}'
```

---

### 4. Set up the Frontend

```bash
cd Frontend/Vite-project
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — you'll see the login page.

Log in with the email and password you registered above.

---

## ✅ Feature Checklist (Deployment Ready)

| Requirement | Status | Details |
|-------------|--------|---------|
| Lead Listing | ✅ | Name, email, phone, source, plan, status all shown |
| Status Updates | ✅ | New → Contacted → Follow-Up → Converted / Lost via dropdown |
| Notes per Lead | ✅ | Add, view, delete notes per lead with timestamp + author |
| Secure Admin Access | ✅ | JWT login, protected routes, auto-redirect to /login |
| Database Integration | ✅ | MongoDB via Mongoose — all data persists |
| Offline Fallback | ✅ | Leads page shows demo data if backend is unreachable |
| Responsive Design | ✅ | Mobile hamburger menu, table scroll, single-column layouts |
| Pagination | ✅ | All tables paginate with working Previous/Next |
| CRUD everywhere | ✅ | Add/Edit/Delete on Clients, Trainers, Leads, Bookings, Payments, Schedule |

---

## 🌐 Deployment

### Frontend → Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Set **Root Directory** to `Frontend/Vite-project`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL = https://your-render-backend.onrender.com
   ```

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service → Connect your repo
2. Set **Root Directory** to `Backend/fitness-crm`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   ```
   MONGO_URI = your MongoDB Atlas connection string
   JWT_SECRET = your secret key
   PORT = 5000
   ```

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create admin account |
| POST | `/api/auth/login` | Login, returns JWT token |
| GET  | `/api/auth/me` | Get current user (protected) |

### Leads (all protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/leads` | List leads (search, status, source, page) |
| POST   | `/api/leads` | Create lead |
| PUT    | `/api/leads/:id` | Update lead |
| PATCH  | `/api/leads/:id/status` | Change status only |
| POST   | `/api/leads/:id/notes` | Add note to lead |
| DELETE | `/api/leads/:id/notes/:noteId` | Remove note |
| DELETE | `/api/leads/:id` | Delete lead |

### Clients, Trainers, Schedule, Bookings, Payments
All follow the same pattern: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router v7, Axios |
| Styling | Pure CSS with CSS variables (no UI library) |
| Build tool | Vite 8 |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas via Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📝 Notes

- The `.env` file is in `.gitignore` — never commit it
- All admin routes require a valid JWT token in the `Authorization: Bearer <token>` header
- The Leads page works in **offline mode** with demo data if the backend is not running
- To reset your password, use the Settings → Security page (once backend is connected)
