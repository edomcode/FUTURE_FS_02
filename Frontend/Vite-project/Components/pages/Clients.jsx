import { useState } from 'react'
import Topbar from '../Topbar'
import Modal from '../Modal'

const PLANS = ['Trial Session', 'Monthly Basic', 'Premium Membership', 'Elite Membership', 'Personal Training']
const STATUSES = ['Active', 'Trial', 'Inactive']

const COLORS = ['#3b82f6','#f5c518','#ef4444','#22c55e','#a855f7','#f97316','#06b6d4']
const colorFor = (name) => COLORS[name.charCodeAt(0) % COLORS.length]
const initialsFor = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2)
const statusClass = (s) => s === 'Active' ? 'badge-green' : s === 'Trial' ? 'badge-yellow' : 'badge-red'

const INITIAL_CLIENTS = [
  { id:1, name:'John Smith',    email:'j.smith@email.com',   phone:'+1 (555) 111-2222', plan:'Premium Membership', status:'Active',   joined:'Jan 12, 2023' },
  { id:2, name:'Emma Davis',    email:'e.davis@email.com',   phone:'+1 (555) 333-4444', plan:'Trial Session',      status:'Trial',    joined:'Oct 20, 2023' },
  { id:3, name:'Michael Brown', email:'m.brown@email.com',   phone:'+1 (555) 555-6666', plan:'Monthly Basic',      status:'Inactive', joined:'Mar 5, 2023'  },
  { id:4, name:'Lisa Wilson',   email:'l.wilson@email.com',  phone:'+1 (555) 777-8888', plan:'Elite Membership',   status:'Active',   joined:'Feb 18, 2023' },
  { id:5, name:'Alex Rivera',   email:'a.rivera@email.com',  phone:'+1 (555) 999-0000', plan:'Personal Training',  status:'Active',   joined:'Jun 1, 2023'  },
]

const EMPTY_FORM = { name:'', email:'', phone:'', plan:'Trial Session', status:'Trial' }

export default function Clients({ onMenuClick, showToast }) {
  const [clients, setClients]       = useState(INITIAL_CLIENTS)
  const [search, setSearch]         = useState('')
  const [page, setPage]             = useState(1)
  const [addOpen, setAddOpen]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)   
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const PER_PAGE = 5

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible    = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const openAdd = () => { setForm(EMPTY_FORM); setAddOpen(true) }
  const openEdit = (c) => { setForm({ name:c.name, email:c.email, phone:c.phone, plan:c.plan, status:c.status }); setEditTarget(c) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editTarget) {
      setClients(prev => prev.map(c => c.id === editTarget.id ? { ...c, ...form } : c))
      showToast(`✅ ${form.name} updated`)
      setEditTarget(null)
    } else {
      const newClient = { ...form, id: Date.now(), joined: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) }
      setClients(prev => [newClient, ...prev])
      showToast(`✅ ${form.name} added`)
      setAddOpen(false)
    }
    setForm(EMPTY_FORM)
  }

  const handleDelete = () => {
    setClients(prev => prev.filter(c => c.id !== deleteTarget.id))
    showToast(`🗑 ${deleteTarget.name} removed`, 'error')
    setDeleteTarget(null)
  }

  const stats = {
    total:    clients.length,
    active:   clients.filter(c => c.status === 'Active').length,
    trial:    clients.filter(c => c.status === 'Trial').length,
    inactive: clients.filter(c => c.status === 'Inactive').length,
  }

  const ClientForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input className="form-input" required placeholder="John Smith"
            value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input className="form-input" type="email" required placeholder="john@email.com"
            value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} />
        </div>
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input className="form-input" placeholder="+1 (555) 000-0000"
          value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Plan</label>
          <select className="form-select" value={form.plan} onChange={e => setForm(p=>({...p,plan:e.target.value}))}>
            {PLANS.map(pl => <option key={pl}>{pl}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-select" value={form.status} onChange={e => setForm(p=>({...p,status:e.target.value}))}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={() => { setAddOpen(false); setEditTarget(null) }}>Cancel</button>
        <button type="submit" className="btn-primary">{editTarget ? 'Save Changes' : 'Add Client'}</button>
      </div>
    </form>
  )

  return (
    <>
      <Topbar searchPlaceholder="Search clients..." onMenuClick={onMenuClick}
        actionLabel="+ Add Lead" onActionClick={openAdd} />
      <div className="page">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div className="page-header" style={{ marginBottom:0 }}>
            <h1>Clients</h1>
            <p>View and manage all registered gym members.</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Client
          </button>
        </div>

       
        <div className="stats-row" style={{ marginBottom:24 }}>
          {[
            { label:'TOTAL CLIENTS', value: stats.total },
            { label:'ACTIVE',        value: stats.active },
            { label:'TRIAL',         value: stats.trial },
            { label:'INACTIVE',      value: stats.inactive },
          ].map((s,i) => (
            <div className="stat-card" key={i}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>

       
        <div style={{ marginBottom:16 }}>
          <input className="form-input" style={{ maxWidth:320 }}
            placeholder="Search by name or email…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>

    
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div className="table-scroll-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft:20 }}>CLIENT NAME</th>
                  <th>PLAN</th>
                  <th>JOINED</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign:'center', padding:32, color:'var(--text-muted)' }}>No clients found</td></tr>
                )}
                {visible.map(c => {
                  const col = colorFor(c.name)
                  return (
                    <tr key={c.id}>
                      <td style={{ paddingLeft:20 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div className="avatar-initials" style={{ background:col+'22', color:col }}>{initialsFor(c.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
                            <div style={{ fontSize:12, color:'var(--blue)' }}>{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize:13 }}>{c.plan}</td>
                      <td style={{ fontSize:13, color:'var(--text-secondary)' }}>{c.joined}</td>
                      <td><span className={`badge ${statusClass(c.status)}`}>{c.status}</span></td>
                      <td>
                        <div style={{ display:'flex', gap:6 }}>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12 }} onClick={() => openEdit(c)}>Edit</button>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12, color:'var(--red)', borderColor:'var(--red)' }} onClick={() => setDeleteTarget(c)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--text-muted)' }}>Showing {visible.length} of {filtered.length} clients</span>
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" disabled={page===1} onClick={() => setPage(p=>p-1)}>Previous</button>
                {Array.from({ length: totalPages }, (_,i) => i+1).map(n => (
                  <button key={n} className={`page-btn${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" disabled={page===totalPages} onClick={() => setPage(p=>p+1)}>Next</button>
              </div>
            )}
          </div>
        </div>
      </div>

    
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add New Client"><ClientForm /></Modal>

     
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Client"><ClientForm /></Modal>

      
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Client">
        <p className="confirm-text">Are you sure you want to remove <span className="confirm-name">{deleteTarget?.name}</span>? This cannot be undone.</p>
        <div className="form-actions">
          <button className="btn-outline" onClick={() => setDeleteTarget(null)}>Cancel</button>
          <button className="btn-primary" style={{ background:'var(--red)' }} onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </>
  )
}
