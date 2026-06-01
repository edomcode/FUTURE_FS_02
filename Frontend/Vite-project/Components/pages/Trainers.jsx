import { useState } from 'react'
import Topbar from '../Topbar'
import Modal from '../Modal'

const SPECIALTIES = ['HIIT','YOGA','STRENGTH','BOXING','SPIN','PILATES','MOBILITY','ENDURANCE','CROSSFIT']
const AVAIL_OPTIONS = ['AVAILABLE','IN SESSION','OFF']
const AVAIL_CLASS = { 'AVAILABLE':'badge-green', 'IN SESSION':'badge-orange', 'OFF':'badge-red' }
const COLORS = ['#3b82f6','#22c55e','#f97316','#a855f7','#f5c518','#ef4444','#06b6d4']
const colorFor = (name) => COLORS[name.charCodeAt(0) % COLORS.length]
const initialsFor = (name) => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)

const TAG_COLORS = { HIIT:'tag-blue', YOGA:'tag-green', STRENGTH:'tag-yellow', BOXING:'tag-orange',
  SPIN:'tag-purple', PILATES:'tag-orange', MOBILITY:'tag-purple', ENDURANCE:'tag-green', CROSSFIT:'tag-yellow' }

const INITIAL_TRAINERS = [
  { id:1, name:'Alex Rivera',   role:'Senior Elite Coach',   specialties:['STRENGTH','HIIT'],      phone:'+1 (555) 123-4567', email:'a.rivera@fitflow.com', availability:'AVAILABLE'   },
  { id:2, name:'Sarah Chen',    role:'Lead Instructor',      specialties:['YOGA','MOBILITY'],       phone:'+1 (555) 987-6543', email:'s.chen@fitflow.com',   availability:'IN SESSION'  },
  { id:3, name:'Marcus Thorne', role:'Performance Coach',    specialties:['HIIT','BOXING'],         phone:'+1 (555) 345-6789', email:'m.thorne@fitflow.com', availability:'OFF'         },
  { id:4, name:'Jasmine Brooks',role:'CrossFit Specialist',  specialties:['STRENGTH','ENDURANCE'],  phone:'+1 (555) 234-5678', email:'j.brooks@fitflow.com', availability:'AVAILABLE'   },
]

const EMPTY_FORM = { name:'', role:'', phone:'', email:'', specialties:[], availability:'AVAILABLE' }

export default function Trainers({ onMenuClick, showToast }) {
  const [trainers, setTrainers]     = useState(INITIAL_TRAINERS)
  const [page, setPage]             = useState(1)
  const [addOpen, setAddOpen]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const PER_PAGE = 5

  const totalPages = Math.ceil(trainers.length / PER_PAGE)
  const visible    = trainers.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const toggleSpec = (s) => setForm(p => ({
    ...p,
    specialties: p.specialties.includes(s) ? p.specialties.filter(x=>x!==s) : [...p.specialties, s]
  }))

  const openAdd  = () => { setForm(EMPTY_FORM); setAddOpen(true) }
  const openEdit = (t) => { setForm({ name:t.name, role:t.role, phone:t.phone, email:t.email, specialties:[...t.specialties], availability:t.availability }); setEditTarget(t) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editTarget) {
      setTrainers(prev => prev.map(t => t.id===editTarget.id ? { ...t, ...form } : t))
      showToast(`✅ ${form.name} updated`)
      setEditTarget(null)
    } else {
      setTrainers(prev => [{ ...form, id:Date.now() }, ...prev])
      showToast(`✅ ${form.name} added`)
      setAddOpen(false)
    }
    setForm(EMPTY_FORM)
  }

  const handleDelete = () => {
    setTrainers(prev => prev.filter(t => t.id !== deleteTarget.id))
    showToast(`🗑 ${deleteTarget.name} removed`, 'error')
    setDeleteTarget(null)
  }

  const stats = {
    total:     trainers.length,
    available: trainers.filter(t=>t.availability==='AVAILABLE').length,
    inSession: trainers.filter(t=>t.availability==='IN SESSION').length,
  }

  const TrainerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input className="form-input" required placeholder="Alex Rivera"
            value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Role / Title</label>
          <input className="form-input" placeholder="Senior Coach"
            value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input className="form-input" type="email" required placeholder="trainer@fitflow.com"
            value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input className="form-input" placeholder="+1 (555) 000-0000"
            value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
        </div>
      </div>
      <div className="form-group">
        <label>Availability</label>
        <select className="form-select" value={form.availability} onChange={e=>setForm(p=>({...p,availability:e.target.value}))}>
          {AVAIL_OPTIONS.map(a=><option key={a}>{a}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Specialties (select all that apply)</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:4 }}>
          {SPECIALTIES.map(s => (
            <button type="button" key={s}
              className={`chip${form.specialties.includes(s)?' active':''}`}
              onClick={() => toggleSpec(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={()=>{ setAddOpen(false); setEditTarget(null) }}>Cancel</button>
        <button type="submit" className="btn-primary">{editTarget ? 'Save Changes' : 'Add Trainer'}</button>
      </div>
    </form>
  )

  return (
    <>
      <Topbar searchPlaceholder="Search trainers..." onMenuClick={onMenuClick}
        actionLabel="+ Add Lead" onActionClick={() => setAddOpen(true)} />
      <div className="page">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div className="page-header" style={{ marginBottom:0 }}>
            <h1>Trainers Management</h1>
            <p>View and manage your professional training roster.</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/>
            </svg>
            Add Trainer
          </button>
        </div>

        <div className="stats-row" style={{ marginBottom:24 }}>
          {[
            { label:'TOTAL TRAINERS',  value: stats.total,     icon:'👥' },
            { label:'AVAILABLE NOW',   value: stats.available, icon:'✅' },
            { label:'IN SESSION',      value: stats.inSession, icon:'⏱' },
            { label:'AVG. CAPACITY',   value: '78%',           icon:'📈' },
          ].map((s,i) => (
            <div className="stat-card" key={i}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div>
                <span style={{ fontSize:24 }}>{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div className="table-scroll-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft:20 }}>TRAINER NAME</th>
                  <th>SPECIALTY</th>
                  <th>CONTACT</th>
                  <th>AVAILABILITY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(t => {
                  const col = colorFor(t.name)
                  return (
                    <tr key={t.id}>
                      <td style={{ paddingLeft:20 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <div className="trainer-avatar" style={{ background:col+'22', color:col }}>{initialsFor(t.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14 }}>{t.name}</div>
                            <div style={{ fontSize:12, color:'var(--text-muted)' }}>{t.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>{t.specialties.map(s=><span key={s} className={`tag ${TAG_COLORS[s]||'tag-blue'}`}>{s}</span>)}</td>
                      <td>
                        <div style={{ fontSize:13 }}>{t.phone}</div>
                        <div style={{ fontSize:12, color:'var(--blue)' }}>{t.email}</div>
                      </td>
                      <td><span className={`badge ${AVAIL_CLASS[t.availability]}`}>● {t.availability}</span></td>
                      <td>
                        <div style={{ display:'flex', gap:6 }}>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12 }} onClick={()=>openEdit(t)}>Edit</button>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12, color:'var(--red)', borderColor:'var(--red)' }} onClick={()=>setDeleteTarget(t)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--text-muted)' }}>Showing {visible.length} of {trainers.length} trainers</span>
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
                {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                  <button key={n} className={`page-btn${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>›</button>
              </div>
            )}
          </div>
        </div>

        <div className="two-col" style={{ marginTop:20 }}>
          <div className="note-box">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <span>💡</span><span style={{ fontWeight:700, fontSize:14 }}>Weekly Availability Insight</span>
            </div>
            <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>
              High demand for <strong style={{ color:'var(--accent)' }}>HIIT</strong> sessions on Tuesday and Thursday evenings.
              Consider opening 2 more slots for Trainer Alex Rivera.
            </p>
          </div>
          <div className="card">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <span>📋</span><span style={{ fontWeight:700, fontSize:14 }}>Upcoming Certification Renewals</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
              <span style={{ fontSize:13 }}>Marcus Thorne (CPR/AED)</span>
              <span style={{ fontSize:13, color:'var(--red)', fontWeight:600 }}>Due in 5 days</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0' }}>
              <span style={{ fontSize:13 }}>Sarah Chen (Yoga Alliance)</span>
              <span style={{ fontSize:13, color:'var(--text-secondary)', fontWeight:600 }}>Due in 14 days</span>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="Add New Trainer"><TrainerForm /></Modal>
      <Modal isOpen={!!editTarget} onClose={()=>setEditTarget(null)} title="Edit Trainer"><TrainerForm /></Modal>
      <Modal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} title="Remove Trainer">
        <p className="confirm-text">Remove <span className="confirm-name">{deleteTarget?.name}</span> from the roster?</p>
        <div className="form-actions">
          <button className="btn-outline" onClick={()=>setDeleteTarget(null)}>Cancel</button>
          <button className="btn-primary" style={{ background:'var(--red)' }} onClick={handleDelete}>Remove</button>
        </div>
      </Modal>
    </>
  )
}
