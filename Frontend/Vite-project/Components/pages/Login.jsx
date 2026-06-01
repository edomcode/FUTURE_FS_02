import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../src/AuthContext'

export default function Login() {
  const { login, loading, error, setError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const ok = await login(form.email, form.password)
    if (ok) navigate('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '36px 32px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      }}>
   
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>
            ⚡ FitFlow CRM
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Admin Terminal
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
          Sign in to access the admin dashboard.
        </p>

     
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            color: 'var(--red)',
            marginBottom: 16,
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              className="form-input"
              type="email"
              required
              placeholder="admin@fitflow.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPw ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPw(s => !s)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14,
                }}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: 14, marginTop: 8, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

     
        <div style={{
          marginTop: 20,
          padding: '12px 14px',
          background: 'rgba(245,197,24,0.06)',
          border: '1px solid rgba(245,197,24,0.15)',
          borderRadius: 8,
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
        }}>
          <strong style={{ color: 'var(--accent)' }}>First time?</strong> Register an admin account via the backend:<br />
          <code style={{ color: 'var(--text-primary)', fontSize: 11 }}>
            POST /api/auth/register {'{'} name, email, password {'}'}
          </code>
        </div>
      </div>
    </div>
  )
}
