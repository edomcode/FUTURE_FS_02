/**
 * AuthContext.jsx
 * Provides login/logout state to the whole app.
 * Any component can call useAuth() to get the current user or log out.
 */
import { createContext, useContext, useState } from 'react'
import api from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Try to restore user from localStorage on first load
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fitflow_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const login = async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      // Save token and user info to localStorage so they survive page refresh
      localStorage.setItem('fitflow_token', data.token)
      localStorage.setItem('fitflow_user',  JSON.stringify(data))
      setUser(data)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('fitflow_token')
    localStorage.removeItem('fitflow_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — any component can do: const { user, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext)
