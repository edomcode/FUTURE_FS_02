import React from 'react'
import Topbar from '../Topbar'

const trainers = [
  {
    initials: 'AR', color: '#3b82f6',
    name: 'Alex Rivera', role: 'Senior Elite Coach',
    specialties: [{ label: 'STRENGTH', cls: 'tag-yellow' }, { label: 'HIIT', cls: 'tag-blue' }],
    phone: '+1 (555) 123-4567', email: 'a.rivera@fitflow.com',
    availability: 'AVAILABLE', availClass: 'badge-green',
  },
  {
    initials: 'SC', color: '#22c55e',
    name: 'Sarah Chen', role: 'Lead Instructor',
    specialties: [{ label: 'YOGA', cls: 'tag-green' }, { label: 'MOBILITY', cls: 'tag-purple' }],
    phone: '+1 (555) 987-6543', email: 's.chen@fitflow.com',
    availability: 'IN SESSION', availClass: 'badge-orange',
  },
  {
    initials: 'MT', color: '#f97316',
    name: 'Marcus Thorne', role: 'Performance Coach',
    specialties: [{ label: 'HIIT', cls: 'tag-blue' }, { label: 'BOXING', cls: 'tag-orange' }],
    phone: '+1 (555) 345-6789', email: 'm.thorne@fitflow.com',
    availability: 'OFF', availClass: 'badge-red',
  },
  {
    initials: 'JB', color: '#a855f7',
    name: 'Jasmine Brooks', role: 'CrossFit Specialist',
    specialties: [{ label: 'STRENGTH', cls: 'tag-yellow' }, { label: 'ENDURANCE', cls: 'tag-green' }],
    phone: '+1 (555) 234-5678', email: 'j.brooks@fitflow.com',
    availability: 'AVAILABLE', availClass: 'badge-green',
  },
]

export default function Trainers() {
  return (
    <>
      <Topbar searchPlaceholder="Search trainers..." actionLabel="Add Lead" />
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Trainers Management</h1>
            <p>View and manage your professional training roster.</p>
          </div>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
            </svg>
            Add Trainer
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{ marginBottom: 24 }}>
          {[
            { label: 'TOTAL TRAINERS', value: '24', icon: '👥' },
            { label: 'AVAILABLE NOW', value: '12', icon: '✅' },
            { label: 'IN SESSION', value: '8', icon: '⏱' },
            { label: 'AVG. CAPACITY', value: '78%', icon: '📈' },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value">{s.value}</div>
                </div>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 20 }}>TRAINER NAME</th>
                <th>SPECIALTY</th>
                <th>CONTACT</th>
                <th>AVAILABILITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((t, i) => (
                <tr key={i}>
                  <td style={{ paddingLeft: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="trainer-avatar" style={{ background: t.color + '22', color: t.color }}>{t.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {t.specialties.map((s, j) => (
                      <span key={j} className={`tag ${s.cls}`}>{s.label}</span>
                    ))}
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{t.phone}</div>
                    <div style={{ fontSize: 12, color: 'var(--blue)' }}>{t.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${t.availClass}`}>
                      {t.availability === 'AVAILABLE' && '● '}
                      {t.availability === 'IN SESSION' && '● '}
                      {t.availability === 'OFF' && '● '}
                      {t.availability}
                    </span>
                  </td>
                  <td>
                    <button className="dots-btn">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing 1 to 4 of 24 trainers</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="page-btn">‹</button>
              <button className="page-btn">›</button>
            </div>
          </div>
        </div>

        {/* Bottom insight cards */}
        <div className="two-col" style={{ marginTop: 20 }}>
          <div className="note-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span>💡</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Weekly Availability Insight</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              High demand for <strong style={{ color: 'var(--accent)' }}>HIIT</strong> sessions observed on Tuesday and Thursday evenings.
              Consider opening 2 more slots for Trainer Alex Rivera to accommodate waitlisted clients.
            </p>
          </div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span>📋</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Upcoming Certification Renewals</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13 }}>Marcus Thorne (CPR/AED)</span>
              <span style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>Due in 5 days</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ fontSize: 13 }}>Sarah Chen (Yoga Alliance)</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>Due in 14 days</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
