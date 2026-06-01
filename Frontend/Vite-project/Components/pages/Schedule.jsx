import { useState } from 'react'
import Topbar from '../Topbar'
import Modal from '../Modal'

const TYPE_COLORS = { HIIT:'#f5c518', YOGA:'#22c55e', STRENGTH:'#3b82f6', SPIN:'#a855f7', PILATES:'#f97316', BOXING:'#ef4444', OTHER:'#9aa0b4' }
const STATUS_CLASS = { 'CONFIRMED':'status-confirmed', 'CONTACTING WAITLIST':'status-waitlist', 'NEW BOOKING':'status-new', 'CANCELLED':'status-waitlist' }

const INITIAL_CLASSES = [
  { id:1, type:'HIIT',     title:'Afternoon Burn: Level 3',  time:'14:00', duration:'60 MINS', trainer:'Marcus Aurelius', cap:18, maxCap:20, status:'CONFIRMED',           img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
  { id:2, type:'YOGA',     title:'Vinyasa Sunset Flow',       time:'17:30', duration:'75 MINS', trainer:'Sarah Jenkins',   cap:15, maxCap:15, status:'CONTACTING WAITLIST', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80' },
  { id:3, type:'STRENGTH', title:'Barbell Masters',            time:'06:00', duration:'90 MINS', trainer:'David Goggins',   cap:6,  maxCap:15, status:'NEW BOOKING',         img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
  { id:4, type:'SPIN',     title:'RPM Challenge 300',          time:'19:00', duration:'45 MINS', trainer:'Elena Ruiz',      cap:20, maxCap:22, status:'CONFIRMED',           img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
  { id:5, type:'PILATES',  title:'Core Precision: Reformer',  time:'11:00', duration:'50 MINS', trainer:'Chloe Martin',    cap:8,  maxCap:12, status:'NEW BOOKING',         img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80' },
]

const EMPTY_FORM = { type:'HIIT', title:'', time:'', duration:'60 MINS', trainer:'', cap:0, maxCap:20, status:'NEW BOOKING', img:'' }

const dateFilters = ['All Dates','Today','Tomorrow','Wed, Oct 25','Thu, Oct 26']

export default function Schedule({ onMenuClick, showToast }) {
  const [classes, setClasses]       = useState(INITIAL_CLASSES)
  const [activeDate, setActiveDate] = useState('All Dates')
  const [view, setView]             = useState('Grid')
  const [addOpen, setAddOpen]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [inviteTarget, setInviteTarget] = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)

  const capPercent = (c,m) => Math.round((c/m)*100)

  const openAdd  = () => { setForm(EMPTY_FORM); setAddOpen(true) }
  const openEdit = (c) => { setForm({ type:c.type, title:c.title, time:c.time, duration:c.duration, trainer:c.trainer, cap:c.cap, maxCap:c.maxCap, status:c.status, img:c.img }); setEditTarget(c) }

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsed = { ...form, cap:Number(form.cap), maxCap:Number(form.maxCap) }
    if (editTarget) {
      setClasses(prev => prev.map(c => c.id===editTarget.id ? { ...c, ...parsed } : c))
      showToast(`✅ "${parsed.title}" updated`)
      setEditTarget(null)
    } else {
      setClasses(prev => [...prev, { ...parsed, id:Date.now() }])
      showToast(`✅ "${parsed.title}" scheduled`)
      setAddOpen(false)
    }
    setForm(EMPTY_FORM)
  }

  const handleDelete = () => {
    setClasses(prev => prev.filter(c => c.id !== deleteTarget.id))
    showToast(`🗑 "${deleteTarget.title}" removed`, 'error')
    setDeleteTarget(null)
  }

  const handleInvite = (e) => {
    e.preventDefault()
    showToast(`✅ Invite sent for "${inviteTarget.title}"`)
    setInviteTarget(null)
  }

  const ClassForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Class Title *</label>
          <input className="form-input" required placeholder="Afternoon Burn"
            value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select className="form-select" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
            {Object.keys(TYPE_COLORS).map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Time</label>
          <input className="form-input" placeholder="14:00"
            value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input className="form-input" placeholder="60 MINS"
            value={form.duration} onChange={e=>setForm(p=>({...p,duration:e.target.value}))} />
        </div>
      </div>
      <div className="form-group">
        <label>Trainer Name</label>
        <input className="form-input" placeholder="Marcus Aurelius"
          value={form.trainer} onChange={e=>setForm(p=>({...p,trainer:e.target.value}))} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Enrolled</label>
          <input className="form-input" type="number" min="0"
            value={form.cap} onChange={e=>setForm(p=>({...p,cap:e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Max Capacity</label>
          <input className="form-input" type="number" min="1"
            value={form.maxCap} onChange={e=>setForm(p=>({...p,maxCap:e.target.value}))} />
        </div>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select className="form-select" value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>
          {['NEW BOOKING','CONFIRMED','CONTACTING WAITLIST','CANCELLED'].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={()=>{ setAddOpen(false); setEditTarget(null) }}>Cancel</button>
        <button type="submit" className="btn-primary">{editTarget ? 'Save Changes' : 'Schedule Class'}</button>
      </div>
    </form>
  )

  return (
    <>
      <Topbar searchPlaceholder="Search classes, trainers, or dates..." showCreateClass onMenuClick={onMenuClick} onCreateClass={openAdd} />
      <div className="page">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div className="page-header" style={{ marginBottom:0 }}>
            <h1>Class Schedule</h1>
            <p>Manage and monitor upcoming sessions for the next 7 days.</p>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            {['Grid','List'].map(v=>(
              <button key={v} className={`btn-outline${view===v?' active':''}`} onClick={()=>setView(v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="stats-row" style={{ marginBottom:24 }}>
          <div className="stat-card"><div className="stat-label">Today's Classes</div><div className="stat-value">{classes.length}</div></div>
          <div className="stat-card"><div className="stat-label">Total Capacity</div><div className="stat-value">84%</div></div>
          <div className="stat-card"><div className="stat-label">Active Trainers</div><div className="stat-value">08</div></div>
          <div className="stat-card"><div className="stat-label">Waitlisted</div><div className="stat-value" style={{ color:'var(--red)' }}>15</div></div>
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
          {dateFilters.map(d=>(
            <button key={d} className={`chip${activeDate===d?' active':''}`} onClick={()=>setActiveDate(d)}>{d}</button>
          ))}
        </div>

        <div className="schedule-grid-cards">
          {classes.map(cls => {
            const pct = capPercent(cls.cap, cls.maxCap)
            const barColor = pct>=100?'red':pct>=80?'':'blue'
            const typeColor = TYPE_COLORS[cls.type] || '#9aa0b4'
            return (
              <div className="class-card" key={cls.id}>
                <div className="class-card-img">
                  {cls.img && <img src={cls.img} alt={cls.title} />}
                  <span className="class-type-tag" style={{ background:typeColor, color:'#000' }}>{cls.type}</span>
                  <span className={`status-tag ${STATUS_CLASS[cls.status]||'status-new'}`}>{cls.status}</span>
                  {/* Edit / Delete buttons on hover */}
                  <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:4 }}>
                    <button onClick={()=>openEdit(cls)} style={{ background:'rgba(0,0,0,0.5)', border:'none', color:'#fff', borderRadius:4, padding:'3px 8px', fontSize:11, cursor:'pointer' }}>✏ Edit</button>
                    <button onClick={()=>setDeleteTarget(cls)} style={{ background:'rgba(239,68,68,0.7)', border:'none', color:'#fff', borderRadius:4, padding:'3px 8px', fontSize:11, cursor:'pointer' }}>✕</button>
                  </div>
                </div>
                <div className="class-card-body">
                  <div className="class-title-row">
                    <span className="class-title">{cls.title}</span>
                    <div style={{ textAlign:'right' }}>
                      <div className="class-time">{cls.time}</div>
                      <div className="class-duration">{cls.duration}</div>
                    </div>
                  </div>
                  <div className="class-trainer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    {cls.trainer}
                  </div>
                  <div className="cap-row">
                    <div>
                      <div className="cap-text">Capacity</div>
                      <div className="progress-bar" style={{ width:120, marginTop:4 }}>
                        <div className={`progress-fill ${barColor}`} style={{ width:`${pct}%` }} />
                      </div>
                    </div>
                    <div className="cap-num">{cls.cap}/{cls.maxCap}</div>
                    {cls.cap >= cls.maxCap
                      ? <span className="badge badge-red" style={{ fontSize:10 }}>⚠ WAITLIST</span>
                      : <button className="btn-primary" style={{ padding:'6px 14px', fontSize:12 }} onClick={()=>setInviteTarget(cls)}>Invite</button>
                    }
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add new class card */}
          <div className="add-class-card" onClick={openAdd}>
            <div className="plus-circle">+</div>
            <p>Schedule New Class</p>
            <span>Add a new recurring or one-time session</span>
          </div>
        </div>
      </div>

      <Modal isOpen={addOpen} onClose={()=>setAddOpen(false)} title="Schedule New Class"><ClassForm /></Modal>
      <Modal isOpen={!!editTarget} onClose={()=>setEditTarget(null)} title="Edit Class"><ClassForm /></Modal>

      <Modal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} title="Remove Class">
        <p className="confirm-text">Remove <span className="confirm-name">"{deleteTarget?.title}"</span> from the schedule?</p>
        <div className="form-actions">
          <button className="btn-outline" onClick={()=>setDeleteTarget(null)}>Cancel</button>
          <button className="btn-primary" style={{ background:'var(--red)' }} onClick={handleDelete}>Remove</button>
        </div>
      </Modal>

      <Modal isOpen={!!inviteTarget} onClose={()=>setInviteTarget(null)} title={`Invite to "${inviteTarget?.title}"`}>
        <form onSubmit={handleInvite}>
          <div className="form-group">
            <label>Client Email or Name</label>
            <input className="form-input" required placeholder="client@email.com" />
          </div>
          <div className="form-group">
            <label>Message (optional)</label>
            <textarea className="form-input" rows={3} placeholder="You're invited to join this class…" style={{ resize:'vertical' }} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={()=>setInviteTarget(null)}>Cancel</button>
            <button type="submit" className="btn-primary">Send Invite</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
