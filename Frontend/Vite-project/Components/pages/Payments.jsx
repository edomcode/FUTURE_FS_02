import React, { useState } from 'react'
import Topbar from '../Topbar'

const transactions = [
  { initials: 'JD', color: '#3b82f6', name: 'John Doe', type: 'Annual Platinum Membership', amount: '$1,200.00', status: 'PAID', statusClass: 'badge-green', date: 'Oct 24, 2023' },
  { initials: 'AS', color: '#22c55e', name: 'Alice Smith', type: 'Personal Training (12 Sessions)', amount: '$450.00', status: 'PENDING', statusClass: 'badge-yellow', date: 'Oct 22, 2023' },
  { initials: 'MR', color: '#ef4444', name: 'Michael Ross', type: 'Monthly Basic Access', amount: '$85.00', status: 'OVERDUE', statusClass: 'badge-red', date: 'Oct 15, 2023' },
  { initials: 'SL', color: '#a855f7', name: 'Sarah Lane', type: 'Group Yoga Pass (10 class)', amount: '$120.00', status: 'PAID', statusClass: 'badge-green', date: 'Oct 20, 2023' },
  { initials: 'KB', color: '#f97316', name: 'Kevin Brown', type: 'Nutritional Planning Kit', amount: '$65.00', status: 'PENDING', statusClass: 'badge-yellow', date: 'Oct 21, 2023' },
]

export default function Payments() {
  const [page, setPage] = useState(1)

  return (
    <>
      <Topbar searchPlaceholder="Find transactions, invoices..." actionLabel="Add Lead" />
      <div className="page">
        <div className="page-header">
          <h1>Payments Tracking</h1>
          <p>Monitor club revenue, pending invoices, and historical payment data.</p>
        </div>

        {/* Hero + side cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, marginBottom: 24 }}>
          <div className="payments-hero">
            <div className="rev-label">Revenue Insights</div>
            <div className="rev-title">Total Monthly Revenue</div>
            <div className="rev-amount">$42,850.00</div>
            <div className="rev-growth">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
              12.5%
            </div>
            <button className="btn-primary" style={{ marginTop: 20 }}>Download Full Report</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card">
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Pending Invoices</div>
              <div style={{ fontSize: 26, fontWeight: 800 }}>$8,240.50</div>
              <div className="progress-bar" style={{ marginTop: 8 }}>
                <div className="progress-fill blue" style={{ width: '65%' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>65% of monthly target reached</div>
            </div>
            <div className="card">
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Overdue Amount</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--red)' }}>$1,450.00</div>
              <div style={{ fontSize: 12, color: 'var(--orange)', marginTop: 6 }}>⚠ 12 Clients require follow-up</div>
            </div>
          </div>
        </div>

        {/* Transactions table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Recent Transactions</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-outline" style={{ padding: '7px 14px', fontSize: 12 }}>⚙ Filters</button>
              <button className="btn-outline" style={{ padding: '7px 14px', fontSize: 12 }}>↓ Export</button>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 20 }}>CLIENT NAME</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td style={{ paddingLeft: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar-initials" style={{ background: t.color + '22', color: t.color }}>{t.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.type}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: 14 }}>{t.amount}</td>
                  <td><span className={`badge ${t.statusClass}`}>{t.status}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.date}</td>
                  <td><button className="dots-btn">⋮</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing 5 of 1,240 entries</span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span>📋</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Overdue Reminder Notes</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 2 }}>
              <li>Follow up with Michael Ross regarding the Basic Access payment delay.</li>
              <li>Send renewal invoice to John Doe for next year's Platinum pass.</li>
            </ul>
          </div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Automated Billing Status</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Smart auto-billing is currently active for 85% of members.</div>
              </div>
              {/* Toggle */}
              <div style={{
                width: 44, height: 24, background: 'var(--green)', borderRadius: 12,
                position: 'relative', cursor: 'pointer', flexShrink: 0
              }}>
                <div style={{
                  width: 18, height: 18, background: '#fff', borderRadius: '50%',
                  position: 'absolute', top: 3, right: 4, transition: 'right 0.2s'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
