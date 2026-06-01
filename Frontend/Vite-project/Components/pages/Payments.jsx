import { useState } from 'react'
import Topbar from '../Topbar'
import Modal from '../Modal'

const COLORS = ['#3b82f6','#22c55e','#ef4444','#a855f7','#f97316','#f5c518','#06b6d4']
const colorFor  = (name) => COLORS[name.charCodeAt(0) % COLORS.length]
const initialsFor = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const STATUS_CLASS = { PAID: 'badge-green', PENDING: 'badge-yellow', OVERDUE: 'badge-red' }

// 12 rows so pagination actually works (5 per page = 3 pages)
const INITIAL_PAYMENTS = [
  { id:1,  name:'John Doe',      type:'Annual Platinum Membership',       amount:1200, status:'PAID',    date:'Oct 24, 2023' },
  { id:2,  name:'Alice Smith',   type:'Personal Training (12 Sessions)',  amount:450,  status:'PENDING', date:'Oct 22, 2023' },
  { id:3,  name:'Michael Ross',  type:'Monthly Basic Access',             amount:85,   status:'OVERDUE', date:'Oct 15, 2023' },
  { id:4,  name:'Sarah Lane',    type:'Group Yoga Pass (10 class)',       amount:120,  status:'PAID',    date:'Oct 20, 2023' },
  { id:5,  name:'Kevin Brown',   type:'Nutritional Planning Kit',         amount:65,   status:'PENDING', date:'Oct 21, 2023' },
  { id:6,  name:'Lisa Wilson',   type:'Elite Membership — Annual',        amount:980,  status:'PAID',    date:'Oct 19, 2023' },
  { id:7,  name:'Marcus Thorne', type:'Personal Training x5',             amount:175,  status:'OVERDUE', date:'Oct 10, 2023' },
  { id:8,  name:'Emma Davis',    type:'Trial Session',                    amount:0,    status:'PAID',    date:'Oct 18, 2023' },
  { id:9,  name:'James Carter',  type:'Premium Membership — Monthly',     amount:120,  status:'PENDING', date:'Oct 17, 2023' },
  { id:10, name:'Nina Patel',    type:'Spin Class Pass (8 sessions)',     amount:96,   status:'PAID',    date:'Oct 16, 2023' },
  { id:11, name:'Omar Hassan',   type:'Monthly Basic Access',             amount:85,   status:'OVERDUE', date:'Oct 12, 2023' },
  { id:12, name:'Chloe Martin',  type:'Pilates Reformer — 10 sessions',  amount:200,  status:'PAID',    date:'Oct 11, 2023' },
]

const EMPTY_FORM = { name:'', type:'', amount:'', status:'PENDING', date:'' }
const PER_PAGE = 5

export default function Payments({ onMenuClick, showToast }) {
  const [payments, setPayments]     = useState(INITIAL_PAYMENTS)
  const [page, setPage]             = useState(1)
  const [addOpen, setAddOpen]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const [billingOn, setBillingOn]   = useState(true)
  const [setupOpen, setSetupOpen]   = useState(false)   // for Dashboard "Set Up" — not used here but exported via prop

  const totalPages = Math.ceil(payments.length / PER_PAGE)
  const visible    = payments.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openAdd  = () => { setForm(EMPTY_FORM); setAddOpen(true) }
  const openEdit = (p) => {
    setForm({ name:p.name, type:p.type, amount:String(p.amount), status:p.status, date:p.date })
    setEditTarget(p)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsed = { ...form, amount: parseFloat(form.amount) || 0 }
    if (editTarget) {
      setPayments(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...parsed } : p))
      showToast(`✅ Payment for ${parsed.name} updated`)
      setEditTarget(null)
    } else {
      setPayments(prev => [{ ...parsed, id: Date.now() }, ...prev])
      showToast(`✅ Payment record for ${parsed.name} added`)
      setAddOpen(false)
      setPage(1)
    }
    setForm(EMPTY_FORM)
  }

  const handleDelete = () => {
    setPayments(prev => prev.filter(p => p.id !== deleteTarget.id))
    showToast(`🗑 Payment record removed`, 'error')
    setDeleteTarget(null)
    if (page > Math.ceil((payments.length - 1) / PER_PAGE)) setPage(p => Math.max(1, p - 1))
  }

  const handleStatusChange = (id, newStatus) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
    showToast(`✅ Status updated to ${newStatus}`)
  }

  // Summary stats computed from live data
  const totalRevenue  = payments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0)
  const pendingTotal  = payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + p.amount, 0)
  const overdueTotal  = payments.filter(p => p.status === 'OVERDUE').reduce((s, p) => s + p.amount, 0)
  const overdueCount  = payments.filter(p => p.status === 'OVERDUE').length

  const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 })

  const PaymentForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Client Name *</label>
        <input className="form-input" required placeholder="John Doe"
          value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
      </div>
      <div className="form-group">
        <label>Description *</label>
        <input className="form-input" required placeholder="Annual Platinum Membership"
          value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Amount ($) *</label>
          <input className="form-input" type="number" min="0" step="0.01" required placeholder="0.00"
            value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
            <option>PENDING</option>
            <option>PAID</option>
            <option>OVERDUE</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Date</label>
        <input className="form-input" type="date"
          value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={() => { setAddOpen(false); setEditTarget(null) }}>Cancel</button>
        <button type="submit" className="btn-primary">{editTarget ? 'Save Changes' : 'Add Payment'}</button>
      </div>
    </form>
  )

  return (
    <>
      <Topbar
        searchPlaceholder="Find transactions, invoices..."
        actionLabel="+ Add Payment"
        onMenuClick={onMenuClick}
        onActionClick={openAdd}
      />
      <div className="page">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div className="page-header" style={{ marginBottom:0 }}>
            <h1>Payments Tracking</h1>
            <p>Monitor club revenue, pending invoices, and historical payment data.</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>+ Add Payment</button>
        </div>

        {/* Hero + side cards — all live data */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:16, marginBottom:24 }} className="payments-hero-grid">
          <div className="payments-hero">
            <div className="rev-label">Revenue Insights</div>
            <div className="rev-title">Total Revenue (Paid)</div>
            <div className="rev-amount">{fmt(totalRevenue)}</div>
            <div className="rev-growth">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
              12.5%
            </div>
            <button className="btn-primary" style={{ marginTop:20 }}
              onClick={() => showToast('📄 Report download started')}>
              Download Full Report
            </button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="card">
              <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:6 }}>Pending Invoices</div>
              <div style={{ fontSize:26, fontWeight:800 }}>{fmt(pendingTotal)}</div>
              <div className="progress-bar" style={{ marginTop:8 }}>
                <div className="progress-fill blue" style={{ width: `${Math.min(100, (pendingTotal / (totalRevenue || 1)) * 100)}%` }} />
              </div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:6 }}>{payments.filter(p=>p.status==='PENDING').length} pending invoices</div>
            </div>
            <div className="card">
              <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:6 }}>Overdue Amount</div>
              <div style={{ fontSize:26, fontWeight:800, color:'var(--red)' }}>{fmt(overdueTotal)}</div>
              <div style={{ fontSize:12, color:'var(--orange)', marginTop:6 }}>⚠ {overdueCount} client{overdueCount !== 1 ? 's' : ''} require follow-up</div>
            </div>
          </div>
        </div>

        {/* Transactions table */}
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid var(--border)' }}>
            <span style={{ fontWeight:700, fontSize:16 }}>Recent Transactions</span>
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn-outline" style={{ padding:'7px 14px', fontSize:12 }}
                onClick={() => showToast('🔍 Filter panel coming soon')}>⚙ Filters</button>
              <button className="btn-outline" style={{ padding:'7px 14px', fontSize:12 }}
                onClick={() => showToast('📥 Export started')}>↓ Export</button>
            </div>
          </div>

          <div className="table-scroll-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft:20 }}>CLIENT NAME</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign:'center', padding:32, color:'var(--text-muted)' }}>No payments found</td></tr>
                )}
                {visible.map(t => {
                  const col = colorFor(t.name)
                  return (
                    <tr key={t.id}>
                      <td style={{ paddingLeft:20 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div className="avatar-initials" style={{ background:col+'22', color:col }}>{initialsFor(t.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14 }}>{t.name}</div>
                            <div style={{ fontSize:12, color:'var(--text-muted)' }}>{t.type}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight:700, fontSize:14 }}>{fmt(t.amount)}</td>
                      <td>
                        <select
                          className="form-select"
                          style={{ width:'auto', padding:'3px 8px', fontSize:11 }}
                          value={t.status}
                          onChange={e => handleStatusChange(t.id, e.target.value)}
                        >
                          <option>PAID</option>
                          <option>PENDING</option>
                          <option>OVERDUE</option>
                        </select>
                      </td>
                      <td style={{ fontSize:13, color:'var(--text-secondary)' }}>{t.date}</td>
                      <td>
                        <div style={{ display:'flex', gap:6 }}>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12 }} onClick={() => openEdit(t)}>Edit</button>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12, color:'var(--red)', borderColor:'var(--red)' }} onClick={() => setDeleteTarget(t)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* WORKING pagination */}
          <div style={{ padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--text-muted)' }}>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, payments.length)} of {payments.length} entries
            </span>
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                style={{ opacity: page === 1 ? 0.4 : 1 }}
                onClick={() => setPage(p => p - 1)}
              >Previous</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`page-btn${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}
                >{n}</button>
              ))}

              <button
                className="page-btn"
                disabled={page === totalPages}
                style={{ opacity: page === totalPages ? 0.4 : 1 }}
                onClick={() => setPage(p => p + 1)}
              >Next</button>
            </div>
          </div>
        </div>

        {/* Bottom notes */}
        <div className="two-col" style={{ marginTop:20 }}>
          <div className="note-box">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span>📋</span>
              <span style={{ fontWeight:700, fontSize:14 }}>Overdue Reminder Notes</span>
            </div>
            <ul style={{ paddingLeft:18, fontSize:13, color:'var(--text-secondary)', lineHeight:2 }}>
              {payments.filter(p => p.status === 'OVERDUE').slice(0, 3).map(p => (
                <li key={p.id}>Follow up with <strong>{p.name}</strong> — {p.type} ({fmt(p.amount)})</li>
              ))}
              {payments.filter(p => p.status === 'OVERDUE').length === 0 && (
                <li style={{ color:'var(--green)' }}>✅ No overdue payments right now</li>
              )}
            </ul>
          </div>
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>Automated Billing Status</div>
                <div style={{ fontSize:13, color:'var(--text-secondary)' }}>
                  Smart auto-billing is currently <strong style={{ color: billingOn ? 'var(--green)' : 'var(--red)' }}>{billingOn ? 'active' : 'inactive'}</strong> for 85% of members.
                </div>
              </div>
              {/* Working toggle */}
              <div
                onClick={() => { setBillingOn(b => !b); showToast(billingOn ? '⚠ Auto-billing disabled' : '✅ Auto-billing enabled', billingOn ? 'error' : 'success') }}
                style={{
                  width:44, height:24,
                  background: billingOn ? 'var(--green)' : 'var(--border)',
                  borderRadius:12, position:'relative', cursor:'pointer', flexShrink:0,
                  transition:'background 0.2s'
                }}
              >
                <div style={{
                  width:18, height:18, background:'#fff', borderRadius:'50%',
                  position:'absolute', top:3,
                  right: billingOn ? 4 : 'auto',
                  left:  billingOn ? 'auto' : 4,
                  transition:'all 0.2s'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Payment Record">
        <PaymentForm />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Payment">
        <PaymentForm />
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Payment">
        <p className="confirm-text">Delete payment record for <span className="confirm-name">{deleteTarget?.name}</span>? This cannot be undone.</p>
        <div className="form-actions">
          <button className="btn-outline" onClick={() => setDeleteTarget(null)}>Cancel</button>
          <button className="btn-primary" style={{ background:'var(--red)' }} onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </>
  )
}
