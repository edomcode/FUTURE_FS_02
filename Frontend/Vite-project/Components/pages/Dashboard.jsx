import React from 'react'
import Topbar from '../Topbar'

const scheduleData = [
  { time: '08:00', ampm: 'AM', name: 'HIIT Momentum', trainer: 'Sarah Mitchell', cap: '18/20', status: 'STARTING SOON', statusClass: 'badge-blue' },
  { time: '10:30', ampm: 'AM', name: 'Advanced Yoga Flow', trainer: 'David Chen', cap: '12/15', status: 'SCHEDULED', statusClass: 'badge-yellow' },
  { time: '01:00', ampm: 'PM', name: 'Strength & Conditioning', trainer: 'Mike Ross', cap: '25/25', status: 'FULL', statusClass: 'badge-red' },
]

const payments = [
  { name: 'Alex Johnson', type: 'Premium Membership', amount: '$120.00', status: 'CLEARED', statusClass: 'badge-green', time: '2 minutes ago' },
  { name: 'Elena Rodriguez', type: 'Guest Day Pass', amount: '$45.00', status: 'CLEARED', statusClass: 'badge-green', time: '15 minutes ago' },
  { name: 'Marcus Thorne', type: 'Personal Training x10', amount: '$350.00', status: 'PENDING', statusClass: 'badge-orange', time: '1 hour ago' },
  { name: 'Samantha Lee', type: 'Premium Membership', amount: '$120.00', status: 'CLEARED', statusClass: 'badge-green', time: '3 hours ago' },
]

const notes = [
  { title: 'Equipment Maintenance', body: 'Technicians arriving tomorrow at 9 AM for treadmill recalibration.' },
  { title: 'Trainer Performance Review', body: 'Q3 evaluations due by Friday for the coaching staff.' },
  { title: 'New Campaign Launch', body: 'Winter Warrior promotion starts Monday. Prep the front desk.' },
]

export default function Dashboard() {
  return (
    <>
      <Topbar searchPlaceholder="Find something here..." />
      <div className="page">

        {/* Hero + Member Activity */}
        <div className="dashboard-grid">
          <div className="hero-banner">
            <h2>Good Morning Emon,<br />Ready to set up your<br />club's Loyalty Card?</h2>
            <button className="btn-setup">Set Up</button>
            <div className="gift-label">🎁 Gift Voucher<br /><span style={{ fontSize: 9, opacity: 0.8 }}>50% OFF ANY PLAN</span></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="member-activity-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="card-title">Member Activity</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }}>···</span>
              </div>
              <div className="bubble-chart">
                <div className="bubble" style={{ width: 72, height: 72, background: '#3b82f6' }}>90%</div>
                <div className="bubble" style={{ width: 60, height: 60, background: '#22c55e' }}>65%</div>
                <div className="bubble" style={{ width: 66, height: 66, background: '#f5c518' }}>89%</div>
              </div>
              <div className="time-legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }} />08:00–10:00</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#f5c518' }} />10:00–14:00</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#a855f7' }} />14:00–18:00</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }} />18:00–22:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row" style={{ gridTemplateColumns: 'repeat(3, 1fr) 220px' }}>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>↑ +26.8%</div>
                <div className="stat-label">Total Clients</div>
                <div className="stat-value">5,890</div>
                <div className="stat-sub">+3,840 from last month</div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="stat-badge today">Today</span>
                <div className="stat-label">Upcoming Classes</div>
                <div className="stat-value">12</div>
                <div className="stat-sub">3 peak hour sessions</div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>↑ +8.3%</div>
                <div className="stat-label">Monthly Revenue</div>
                <div className="stat-value">$42,500</div>
                <div className="stat-sub">Target: $45,000</div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
          </div>

          <div className="retention-card">
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Client Retention</div>
            <div className="big-pct">94.2%</div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: '94%' }} /></div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Consistent growth</div>
          </div>
        </div>

        {/* Schedule + Payments */}
        <div className="dashboard-bottom">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div>
                <div className="card-title">Today's Class Schedule</div>
                <div className="card-sub">Managing peak hour performance</div>
              </div>
              <a href="/schedule" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>View All Schedule</a>
            </div>
            {scheduleData.map((s, i) => (
              <div className="schedule-row" key={i}>
                <div className="schedule-time">
                  <div className="hour">{s.time}</div>
                  <div className="ampm">{s.ampm}</div>
                </div>
                <div className="schedule-info">
                  <div className="class-name">{s.name}</div>
                  <div className="trainer-name">Trainer: {s.trainer}</div>
                </div>
                <div className="schedule-capacity">
                  <div className="cap-label">Capacity</div>
                  <div className="cap-val">{s.cap}</div>
                </div>
                <span className={`badge ${s.statusClass}`}>{s.status}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Recent Payments</div>
            {payments.map((p, i) => (
              <div className="payment-row" key={i}>
                <div className="pr-top">
                  <span className="pr-name">{p.name}</span>
                  <span className="pr-amount">{p.amount}</span>
                </div>
                <div className="pr-bottom">
                  <span className="pr-type">{p.type}</span>
                  <span className={`badge ${p.statusClass}`}>{p.status}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{p.time}</div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a href="/payments" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>All Transactions</a>
            </div>
          </div>
        </div>

        {/* Admin Notes */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="card-title">Admin Notes & Reminders</span>
          </div>
          <div className="admin-notes-grid">
            {notes.map((n, i) => (
              <div className="admin-note-card" key={i}>
                <h4>{n.title}</h4>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
