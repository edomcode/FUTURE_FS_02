import React, { useState } from 'react'
import Topbar from '../Topbar'

const bookings = [
  { initials: 'JS', color: '#3b82f6', name: 'John Smith', tier: 'Premium Member', classTitle: 'High Intensity HIIT', trainer: 'Sarah Connor', date: 'Oct 24, 2023', time: '09:00 AM - 10:00 AM', status: 'Confirmed', statusClass: 'badge-green' },
  { initials: 'ED', color: '#f5c518', name: 'Emma Davis', tier: 'Trial Session', classTitle: 'Yoga Flow', trainer: 'David Chen', date: 'Oct 24, 2023', time: '11:30 AM - 12:30 PM', status: 'Pending', statusClass: 'badge-yellow' },
  { initials: 'MB', color: '#ef4444', name: 'Michael Brown', tier: 'Regular', classTitle: 'Power Lifting', trainer: 'Sarah Connor', date: 'Oct 25, 2023', time: '05:00 PM - 06:30 PM', status: 'Cancelled', statusClass: 'badge-red' },
  { initials: 'LW', color: '#22c55e', name: 'Lisa Wilson', tier: 'Elite Member', classTitle: 'Pilates Core', trainer: 'David Chen', date: 'Oct 25, 2023', time: '08:00 AM - 09:00 AM', status: 'Confirmed', statusClass: 'badge-green' },
]

export default function Bookings() {
  const [page, setPage] = useState(1)

  return (
    <>
      <Topbar searchPlaceholder="Search bookings or clients..." actionLabel="Add Lead" />
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Bookings Overview</h1>
            <p>Manage class assignments and client schedules efficiently.</p>
          </div>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Booking
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="stat-badge today">Today</span>
                <div className="stat-label">Active Bookings</div>
                <div className="stat-value">42</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="stat-badge action">Action Required</span>
                <div className="stat-label">Pending Confirmation</div>
                <div className="stat-value">12</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </div>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="stat-badge success">Success</span>
                <div className="stat-label">Completed This Week</div>
                <div className="stat-value">156</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="stat-badge attention">Attention</span>
                <div className="stat-label">Cancelled (24h)</div>
                <div className="stat-value" style={{ color: 'var(--red)' }}>3</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {['JS', 'ED', 'MB'].map((i, idx) => (
                <div key={idx} className="avatar-initials" style={{ width: 28, height: 28, fontSize: 10, background: ['#3b82f6', '#f5c518', '#ef4444'][idx] + '22', color: ['#3b82f6', '#f5c518', '#ef4444'][idx] }}>{i}</div>
              ))}
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>+18 &nbsp; Showing 42 bookings for today</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-outline" style={{ padding: '6px 10px' }}>⚙ Filter</button>
              <button className="btn-outline" style={{ padding: '6px 10px' }}>↓ Export</button>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 20 }}>CLIENT NAME</th>
                <th>CLASS TITLE</th>
                <th>BOOKING DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td style={{ paddingLeft: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar-initials" style={{ background: b.color + '22', color: b.color }}>{b.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.tier}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{b.classTitle}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Trainer: {b.trainer}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{b.date}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.time}</div>
                  </td>
                  <td><span className={`badge ${b.statusClass}`}>{b.status}</span></td>
                  <td><button className="dots-btn">⋮</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing 1 to 10 of 42 entries</span>
            <div className="pagination">
              <button className="page-btn">Previous</button>
              {[1, 2, 3].map(n => (
                <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn">Next</button>
            </div>
          </div>
        </div>

        {/* Bottom notes */}
        <div className="two-col" style={{ marginTop: 20 }}>
          <div className="note-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span>📋</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Administrative Note</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Remind trainers to update session status immediately after class conclusion to ensure real-time analytics accuracy.
              High attendance expected for tomorrow's HIIT classes.
            </p>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>LAST UPDATED: 2H AGO</div>
          </div>
          <div className="card-dark" style={{ borderRadius: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--accent)', marginBottom: 8 }}>Class Capacity Insights</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Your morning HIIT classes are reaching 95% capacity consistently. Consider opening a second morning slot.
            </p>
            <button style={{ marginTop: 14, background: 'none', border: 'none', color: 'var(--accent)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              View Analytics Report →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
