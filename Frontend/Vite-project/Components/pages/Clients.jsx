import React from 'react'
import Topbar from '../Topbar'

const clients = [
  { initials: 'JS', color: '#3b82f6', name: 'John Smith', email: 'j.smith@email.com', plan: 'Premium Membership', joined: 'Jan 12, 2023', status: 'Active', statusClass: 'badge-green' },
  { initials: 'ED', color: '#f5c518', name: 'Emma Davis', email: 'e.davis@email.com', plan: 'Trial Session', joined: 'Oct 20, 2023', status: 'Trial', statusClass: 'badge-yellow' },
  { initials: 'MB', color: '#ef4444', name: 'Michael Brown', email: 'm.brown@email.com', plan: 'Monthly Basic', joined: 'Mar 5, 2023', status: 'Inactive', statusClass: 'badge-red' },
  { initials: 'LW', color: '#22c55e', name: 'Lisa Wilson', email: 'l.wilson@email.com', plan: 'Elite Membership', joined: 'Feb 18, 2023', status: 'Active', statusClass: 'badge-green' },
  { initials: 'AR', color: '#a855f7', name: 'Alex Rivera', email: 'a.rivera@email.com', plan: 'Personal Training', joined: 'Jun 1, 2023', status: 'Active', statusClass: 'badge-green' },
]

export default function Clients() {
  return (
    <>
      <Topbar searchPlaceholder="Search clients..." />
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Clients</h1>
            <p>View and manage all registered gym members.</p>
          </div>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Client
          </button>
        </div>

        <div className="stats-row" style={{ marginBottom: 24 }}>
          {[
            { label: 'TOTAL CLIENTS', value: '5,890' },
            { label: 'ACTIVE', value: '4,210' },
            { label: 'TRIAL', value: '320' },
            { label: 'INACTIVE', value: '1,360' },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 20 }}>CLIENT NAME</th>
                <th>PLAN</th>
                <th>JOINED</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={i}>
                  <td style={{ paddingLeft: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar-initials" style={{ background: c.color + '22', color: c.color }}>{c.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--blue)' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{c.plan}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{c.joined}</td>
                  <td><span className={`badge ${c.statusClass}`}>{c.status}</span></td>
                  <td><button className="dots-btn">⋮</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)' }}>
            Showing 1 to 5 of 5,890 clients
          </div>
        </div>
      </div>
    </>
  )
}
