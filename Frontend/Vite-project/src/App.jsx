import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import Sidebar from '../Components/Sidebar'
import Modal from '../Components/Modal'
import Login    from '../Components/pages/Login'
import Dashboard from '../Components/pages/Dashboard'
import Clients  from '../Components/pages/Clients'
import Trainers from '../Components/pages/Trainers'
import Schedule from '../Components/pages/Schedule'
import Bookings from '../Components/pages/Bookings'
import Payments from '../Components/pages/Payments'
import Leads    from '../Components/pages/Leads'
import Settings from '../Components/pages/Settings'
import Support  from '../Components/pages/Support'

// ── Protected route wrapper ──────────────────────────────────
// If the user is not logged in, redirect them to /login
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

// ── Main app shell (only rendered when logged in) ────────────
function AppShell() {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen]     = useState(false)
  const [quickLeadOpen, setQuickLeadOpen] = useState(false)
  const [quickLeadForm, setQuickLeadForm] = useState({ name:'', email:'', phone:'', plan:'Trial Session' })
  const [toast, setToast]                 = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleQuickLeadSubmit = (e) => {
    e.preventDefault()
    showToast(`✅ Lead "${quickLeadForm.name}" added!`)
    setQuickLeadOpen(false)
    setQuickLeadForm({ name:'', email:'', phone:'', plan:'Trial Session' })
  }

  const pageProps = { onMenuClick: () => setSidebarOpen(true), showToast }

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onQuickLead={() => setQuickLeadOpen(true)}
        onLogout={logout}
      />

      <div className="main-content">
        <Routes>
          <Route path="/"         element={<Dashboard {...pageProps} />} />
          <Route path="/clients"  element={<Clients   {...pageProps} />} />
          <Route path="/trainers" element={<Trainers  {...pageProps} />} />
          <Route path="/schedule" element={<Schedule  {...pageProps} />} />
          <Route path="/bookings" element={<Bookings  {...pageProps} />} />
          <Route path="/payments" element={<Payments  {...pageProps} />} />
          <Route path="/leads"    element={<Leads     {...pageProps} />} />
          <Route path="/settings" element={<Settings  {...pageProps} />} />
          <Route path="/support"  element={<Support   {...pageProps} />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Quick Lead Modal */}
      <Modal isOpen={quickLeadOpen} onClose={() => setQuickLeadOpen(false)} title="Quick Lead">
        <form onSubmit={handleQuickLeadSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input className="form-input" placeholder="e.g. John Smith" required
              value={quickLeadForm.name}
              onChange={e => setQuickLeadForm(p => ({ ...p, name:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input className="form-input" type="email" placeholder="john@email.com" required
              value={quickLeadForm.email}
              onChange={e => setQuickLeadForm(p => ({ ...p, email:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-input" placeholder="+1 (555) 000-0000"
              value={quickLeadForm.phone}
              onChange={e => setQuickLeadForm(p => ({ ...p, phone:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Interested Plan</label>
            <select className="form-select" value={quickLeadForm.plan}
              onChange={e => setQuickLeadForm(p => ({ ...p, plan:e.target.value }))}>
              <option>Trial Session</option>
              <option>Monthly Basic</option>
              <option>Premium Membership</option>
              <option>Elite Membership</option>
              <option>Personal Training</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => setQuickLeadOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Add Lead</button>
          </div>
        </form>
      </Modal>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}

// ── Root component ───────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public route — login page */}
          <Route path="/login" element={<LoginGate />} />

          {/* All other routes are protected */}
          <Route path="/*" element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

// Redirect to dashboard if already logged in
function LoginGate() {
  const { user } = useAuth()
  if (user) return <Navigate to="/" replace />
  return <Login />
}

export default App
