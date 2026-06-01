import { useState } from 'react'
import Topbar from '../Topbar'
import Modal from '../Modal'

const COLORS = ['#3b82f6','#f5c518','#ef4444','#22c55e','#a855f7','#f97316']
const colorFor = (name) => COLORS[name.charCodeAt(0) % COLORS.length]
const initialsFor = (name) => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
const statusClass = (s) => s==='Confirmed'?'badge-green':s==='Pending'?'badge-yellow':'badge-red'

const INITIAL_BOOKINGS = [
  { id:1, name:'John Smith',    tier:'Premium Member', classTitle:'High Intensity HIIT', trainer:'Sarah Connor', date:'Oct 24, 2023', time:'09:00 AM - 10:00 AM', status:'Confirmed' },
  { id:2, name:'Emma Davis',    tier:'Trial Session',  classTitle:'Yoga Flow',           trainer:'David Chen',   date:'Oct 24, 2023', time:'11:30 AM - 12:30 PM', status:'Pending'   },
  { id:3, name:'Michael Brown', tier:'Regular',        classTitle:'Power Lifting',        trainer:'Sarah Connor', date:'Oct 25, 2023', time:'05:00 PM - 06:30 PM', status:'Cancelled' },
  { id:4, name:'Lisa Wilson',   tier:'Elite Member',   classTitle:'Pilates Core',         trainer:'David Chen',   date:'Oct 25, 2023', time:'08:00 AM - 09:00 AM', status:'Confirmed' },
]

const EMPTY_FORM = { name:'', tier:'Regular', classTitle:'', trainer:'', date:'', time:'', status:'Pending' }

export default function Bookings({ onMenuClick, showToast }) {
  const [bookings, setBookings]     = useState(INITIAL_BOOKINGS)
  const [page, setPage]             = useState(1)
  const [addOpen, setAddOpen]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const PER_PAGE = 5

  const totalPages = Math.ceil(bookings.length / PER_PAGE)
  const visible    = bookings.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const openAdd  = () => { setForm(EMPTY_FORM); setAddOpen(true) }
  const openEdit = (b) => { setForm({ name:b.name, tier:b.tier, classTitle:b.classTitle, trainer:b.trainer, date:b.date, time:b.time, status:b.status }); setEditTarget(b) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editTarget) {
      setBookings(prev => prev.map(b => b.id===editTarget.id ? { ...b, ...form } : b))
      showToast(`✅ Booking for ${form.name} updated`)
      setEditTarget(null)
    } else {
      setBookings(prev => [{ ...form, id:Date.now() }, ...prev])
      showToast(`✅ Booking for ${form.name} created`)
      setAddOpen(false)
    }
    setForm(EMPTY_FORM)
  }

  const handleDelete = () => {
    setBookings(prev => prev.filter(b => b.id !== deleteTarget.id))
    showToast(`🗑 Booking removed`, 'error')
    setDeleteTarget(null)
  }

  const handleStatusChange = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id===id ? { ...b, status:newStatus } : b))
    showToast(`✅ Status updated to ${newStatus}`)
  }

  const stats = {
    active:    bookings.filter(b=>b.status==='Confirmed').length,
    pending:   bookings.filter(b=>b.status==='Pending').length,
    cancelled: bookings.filter(b=>b.status==='Cancelled').length,
  }

  const BookingForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Client Name *</label>
          <input className="form-input" required placeholder="John Smith"
            value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Membership Tier</label>
          <select className="form-select" value={form.tier} onChange={e=>setForm(p=>({...p,tier:e.target.value}))}>
            {['Regular','Trial Session','Premium Member','Elite Member'].map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Class Title *</label>
          <input className="form-input" required placeholder="High Intensity HIIT"
            value={form.classTitle} onChange={e=>setForm(p=>({...p,classTitle:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Trainer</label>
          <input className="form-input" placeholder="Sarah Connor"
            value={form.trainer} onChange={e=>setForm(p=>({...p,trainer:e.target.value}))} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input className="form-input" type="date"
            value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Time Slot</label>
          <input className="form-input" placeholder="09:00 AM - 10:00 AM"
            value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} />
        </div>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select className="form-select" value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>
          {['Pending','Confirmed','Cancelled'].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={()=>{ setAddOpen(false); setEditTarget(null) }}>Cancel</button>
        <button type="submit" className="btn-primary">{editTarget ? 'Save Changes' : 'Create Booking'}</button>
      </div>
    </form>
  )

  return (
    <>
      <Topbar searchPlaceholder="Search bookings or clients..." actionLabel="+ New Booking"
        onMenuClick={onMenuClick} onActionClick={openAdd} />
      <div className="page">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div className="page-header" style={{ marginBottom:0 }}>
            <h1>Bookings Overview</h1>
            <p>Manage class assignments and client schedules efficiently.</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Booking
          </button>
        </div>

        <div className="stats-row" style={{ marginBottom:24 }}>
          {[
            { badge:'today',    label:'Active Bookings',      value: stats.active    },
            { badge:'action',   label:'Pending Confirmation', value: stats.pending   },
            { badge:'success',  label:'Completed This Week',  value: 156             },
            { badge:'attention',label:'Cancelled (24h)',      value: stats.cancelled, red:true },
          ].map((s,i) => (
            <div className="stat-card" key={i}>
              <span className={`stat-badge ${s.badge}`}>{s.badge==='today'?'Today':s.badge==='action'?'Action Required':s.badge==='success'?'Success':'Attention'}</span>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={s.red?{color:'var(--red)'}:{}}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--text-secondary)' }}>Showing {bookings.length} bookings</span>
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn-outline" style={{ padding:'6px 10px' }}>↓ Export</button>
            </div>
          </div>
          <div className="table-scroll-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft:20 }}>CLIENT NAME</th>
                  <th>CLASS TITLE</th>
                  <th>BOOKING DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(b => {
                  const col = colorFor(b.name)
                  return (
                    <tr key={b.id}>
                      <td style={{ paddingLeft:20 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div className="avatar-initials" style={{ background:col+'22', color:col }}>{initialsFor(b.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14 }}>{b.name}</div>
                            <div style={{ fontSize:12, color:'var(--text-muted)' }}>{b.tier}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight:600, fontSize:14 }}>{b.classTitle}</div>
                        <div style={{ fontSize:12, color:'var(--text-muted)' }}>Trainer: {b.trainer}</div>
                      </td>
                      <td>
                        <div style={{ fontSize:13 }}>{b.date}</div>
                        <div style={{ fontSize:12, color:'var(--text-muted)' }}>{b.time}</div>
                      </td>
                      <td>
                        {/* Clicking the badge cycles through statuses */}
                        <select className="form-select" style={{ width:'auto', padding:'3px 8px', fontSize:11 }}
                          value={b.status}
                          onChange={e => handleStatusChange(b.id, e.target.value)}>
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ display:'flex', gap:6 }}>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12 }} onClick={()=>openEdit(b)}>Edit</button>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12, color:'var(--red)', borderColor:'var(--red)' }} onClick={()=>setDeleteTarget(b)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--text-muted)' }}>Showing {visible.length} of {bookings.length} entries</span>
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button>
                {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                  <button key={n} className={`page-btn${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
              </div>
            )}
          </div>
        </div>

        <div className="two-col" style={{ marginTop:20 }}>
          <div className="note-box">
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <span>📋</span><span style={{ fontWeight:700, fontSize:14 }}>Administrative Note</span>
            </div>
            <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>
              Remind trainers to update session status immediately after class conclusion.
              High attendance expected for tomorrow's HIIT classes.
            </p>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:8 }}>LAST UPDATED: 2H AGO</div>
          </div>
          <div className="card-dark" style={{ borderRadius:10 }}>
            <div style={{ fontWeight:700, fontSize:15, color:'var(--accent)', marginBottom:8 }}>Class Capacity Insights</div>
            <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>
              Morning HIIT classes are reaching 95% capacity consistently. Consider opening a second morning slot.
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="New Booking"><BookingForm /></Modal>
      <Modal isOpen={!!editTarget} onClose={()=>setEditTarget(null)} title="Edit Booking"><BookingForm /></Modal>
      <Modal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} title="Delete Booking">
        <p className="confirm-text">Delete booking for <span className="confirm-name">{deleteTarget?.name}</span>?</p>
        <div className="form-actions">
          <button className="btn-outline" onClick={()=>setDeleteTarget(null)}>Cancel</button>
          <button className="btn-primary" style={{ background:'var(--red)' }} onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </>
  )
}
