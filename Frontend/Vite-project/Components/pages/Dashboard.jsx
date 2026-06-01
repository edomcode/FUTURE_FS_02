import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../Topbar'
import Modal from '../Modal'

const scheduleData = [
  { time:'08:00', ampm:'AM', name:'HIIT Momentum',          trainer:'Sarah Mitchell', cap:'18/20', status:'STARTING SOON', statusClass:'badge-blue'   },
  { time:'10:30', ampm:'AM', name:'Advanced Yoga Flow',     trainer:'David Chen',     cap:'12/15', status:'SCHEDULED',     statusClass:'badge-yellow' },
  { time:'01:00', ampm:'PM', name:'Strength & Conditioning',trainer:'Mike Ross',      cap:'25/25', status:'FULL',          statusClass:'badge-red'    },
]

const recentPayments = [
  { name:'Alex Johnson',  type:'Premium Membership',    amount:'$120.00', status:'CLEARED', statusClass:'badge-green',  time:'2 minutes ago'  },
  { name:'Elena Rodriguez',type:'Guest Day Pass',       amount:'$45.00',  status:'CLEARED', statusClass:'badge-green',  time:'15 minutes ago' },
  { name:'Marcus Thorne', type:'Personal Training x10', amount:'$350.00', status:'PENDING', statusClass:'badge-orange', time:'1 hour ago'     },
  { name:'Samantha Lee',  type:'Premium Membership',    amount:'$120.00', status:'CLEARED', statusClass:'badge-green',  time:'3 hours ago'    },
]

const INITIAL_NOTES = [
  { id:1, title:'Equipment Maintenance',    body:'Technicians arriving tomorrow at 9 AM for treadmill recalibration.' },
  { id:2, title:'Trainer Performance Review', body:'Q3 evaluations due by Friday for the coaching staff.' },
  { id:3, title:'New Campaign Launch',      body:'Winter Warrior promotion starts Monday. Prep the front desk.' },
]

export default function Dashboard({ onMenuClick, showToast }) {
  const navigate = useNavigate()


  const [leadOpen, setLeadOpen]   = useState(false)
  const [leadForm, setLeadForm]   = useState({ name:'', email:'', phone:'', plan:'Trial Session' })

  
  const [setupOpen, setSetupOpen] = useState(false)
  const [setupForm, setSetupForm] = useState({ clubName:'', loyaltyProgram:'Points', discountPct:'10' })

  const [notes, setNotes]         = useState(INITIAL_NOTES)
  const [noteOpen, setNoteOpen]   = useState(false)
  const [noteForm, setNoteForm]   = useState({ title:'', body:'' })
  const [editNote, setEditNote]   = useState(null)

  const handleLeadSubmit = (e) => {
    e.preventDefault()
    showToast(`✅ Lead "${leadForm.name}" added — check Clients page`)
    setLeadOpen(false)
    setLeadForm({ name:'', email:'', phone:'', plan:'Trial Session' })
  }

  const handleSetupSubmit = (e) => {
    e.preventDefault()
    showToast(`✅ Loyalty Card set up for "${setupForm.clubName}"`)
    setSetupOpen(false)
  }

  const openAddNote  = () => { setNoteForm({ title:'', body:'' }); setEditNote(null); setNoteOpen(true) }
  const openEditNote = (n) => { setNoteForm({ title:n.title, body:n.body }); setEditNote(n); setNoteOpen(true) }
  const handleNoteSubmit = (e) => {
    e.preventDefault()
    if (editNote) {
      setNotes(prev => prev.map(n => n.id === editNote.id ? { ...n, ...noteForm } : n))
      showToast('✅ Note updated')
    } else {
      setNotes(prev => [...prev, { ...noteForm, id: Date.now() }])
      showToast('✅ Note added')
    }
    setNoteOpen(false)
  }
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    showToast('🗑 Note removed', 'error')
  }

  return (
    <>
      <Topbar
        searchPlaceholder="Find something here..."
        onMenuClick={onMenuClick}
        actionLabel="+ Add Lead"
        onActionClick={() => setLeadOpen(true)}
      />
      <div className="page">

        
        <div className="dashboard-grid">
          <div className="hero-banner">
            <h2>Good Morning Emon,<br />Ready to set up your<br />club's Loyalty Card?</h2>
           
            <button className="btn-setup" onClick={() => setSetupOpen(true)}>Set Up</button>
            <div className="gift-label">🎁 Gift Voucher<br /><span style={{ fontSize:9, opacity:0.8 }}>50% OFF ANY PLAN</span></div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="member-activity-card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span className="card-title">Member Activity</span>
                <span style={{ color:'var(--text-muted)', fontSize:18, cursor:'pointer' }}>···</span>
              </div>
              <div className="bubble-chart">
                <div className="bubble" style={{ width:72, height:72, background:'#3b82f6' }}>90%</div>
                <div className="bubble" style={{ width:60, height:60, background:'#22c55e' }}>65%</div>
                <div className="bubble" style={{ width:66, height:66, background:'#f5c518' }}>89%</div>
              </div>
              <div className="time-legend">
                <div className="legend-item"><span className="legend-dot" style={{ background:'#3b82f6' }} />08:00–10:00</div>
                <div className="legend-item"><span className="legend-dot" style={{ background:'#f5c518' }} />10:00–14:00</div>
                <div className="legend-item"><span className="legend-dot" style={{ background:'#a855f7' }} />14:00–18:00</div>
                <div className="legend-item"><span className="legend-dot" style={{ background:'#22c55e' }} />18:00–22:00</div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="stats-row" style={{ gridTemplateColumns:'repeat(3, 1fr) 220px' }}>
          <div className="stat-card" style={{ cursor:'pointer' }} onClick={() => navigate('/clients')}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:11, color:'var(--green)', fontWeight:700, marginBottom:6 }}>↑ +26.8%</div>
                <div className="stat-label">Total Clients</div>
                <div className="stat-value">5,890</div>
                <div className="stat-sub">+3,840 from last month</div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>

          <div className="stat-card" style={{ cursor:'pointer' }} onClick={() => navigate('/schedule')}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <span className="stat-badge today">Today</span>
                <div className="stat-label">Upcoming Classes</div>
                <div className="stat-value">12</div>
                <div className="stat-sub">3 peak hour sessions</div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>

          <div className="stat-card" style={{ cursor:'pointer' }} onClick={() => navigate('/payments')}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:11, color:'var(--green)', fontWeight:700, marginBottom:6 }}>↑ +8.3%</div>
                <div className="stat-label">Monthly Revenue</div>
                <div className="stat-value">$42,500</div>
                <div className="stat-sub">Target: $45,000</div>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
          </div>

          <div className="retention-card">
            <div style={{ fontSize:12, color:'var(--text-secondary)' }}>Client Retention</div>
            <div className="big-pct">94.2%</div>
            <div className="progress-bar"><div className="progress-fill" style={{ width:'94%' }} /></div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:6 }}>Consistent growth</div>
          </div>
        </div>

       
        <div className="dashboard-bottom">
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
              <div>
                <div className="card-title">Today's Class Schedule</div>
                <div className="card-sub">Managing peak hour performance</div>
              </div>
              <button onClick={() => navigate('/schedule')} style={{ fontSize:13, color:'var(--accent)', fontWeight:600, background:'none', border:'none', cursor:'pointer' }}>
                View All Schedule
              </button>
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
                <span style={{ color:'var(--text-muted)', fontSize:18 }}>›</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title" style={{ marginBottom:14 }}>Recent Payments</div>
            {recentPayments.map((p, i) => (
              <div className="payment-row" key={i}>
                <div className="pr-top">
                  <span className="pr-name">{p.name}</span>
                  <span className="pr-amount">{p.amount}</span>
                </div>
                <div className="pr-bottom">
                  <span className="pr-type">{p.type}</span>
                  <span className={`badge ${p.statusClass}`}>{p.status}</span>
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{p.time}</div>
              </div>
            ))}
            <div style={{ textAlign:'center', marginTop:12 }}>
              <button onClick={() => navigate('/payments')} style={{ fontSize:13, color:'var(--text-secondary)', fontWeight:600, background:'none', border:'none', cursor:'pointer' }}>
                All Transactions →
              </button>
            </div>
          </div>
        </div>

       
        <div className="card">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span className="card-title" style={{ marginBottom:0 }}>Admin Notes & Reminders</span>
            </div>
            <button className="btn-primary" style={{ padding:'6px 14px', fontSize:12 }} onClick={openAddNote}>+ Add Note</button>
          </div>
          <div className="admin-notes-grid">
            {notes.map(n => (
              <div className="admin-note-card" key={n.id} style={{ position:'relative' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                  <h4 style={{ marginBottom:0 }}>{n.title}</h4>
                  <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                    <button onClick={() => openEditNote(n)} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:12, padding:'0 4px' }}>✏</button>
                    <button onClick={() => deleteNote(n.id)} style={{ background:'none', border:'none', color:'var(--red)', cursor:'pointer', fontSize:12, padding:'0 4px' }}>✕</button>
                  </div>
                </div>
                <p>{n.body}</p>
              </div>
            ))}
            {notes.length === 0 && (
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:24, color:'var(--text-muted)', fontSize:13 }}>
                No notes yet. Click "+ Add Note" to create one.
              </div>
            )}
          </div>
        </div>
      </div>

   
      <Modal isOpen={leadOpen} onClose={() => setLeadOpen(false)} title="Add New Lead">
        <form onSubmit={handleLeadSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input className="form-input" required placeholder="John Smith"
              value={leadForm.name} onChange={e => setLeadForm(p => ({ ...p, name:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input className="form-input" type="email" required placeholder="john@email.com"
              value={leadForm.email} onChange={e => setLeadForm(p => ({ ...p, email:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-input" placeholder="+1 (555) 000-0000"
              value={leadForm.phone} onChange={e => setLeadForm(p => ({ ...p, phone:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Interested Plan</label>
            <select className="form-select" value={leadForm.plan} onChange={e => setLeadForm(p => ({ ...p, plan:e.target.value }))}>
              <option>Trial Session</option>
              <option>Monthly Basic</option>
              <option>Premium Membership</option>
              <option>Elite Membership</option>
              <option>Personal Training</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => setLeadOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Add Lead</button>
          </div>
        </form>
      </Modal>

   
      <Modal isOpen={setupOpen} onClose={() => setSetupOpen(false)} title="Set Up Loyalty Card">
        <form onSubmit={handleSetupSubmit}>
          <div className="form-group">
            <label>Club / Gym Name *</label>
            <input className="form-input" required placeholder="FitFlow Gym"
              value={setupForm.clubName} onChange={e => setSetupForm(p => ({ ...p, clubName:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Loyalty Program Type</label>
            <select className="form-select" value={setupForm.loyaltyProgram} onChange={e => setSetupForm(p => ({ ...p, loyaltyProgram:e.target.value }))}>
              <option>Points</option>
              <option>Stamps</option>
              <option>Tier-based</option>
              <option>Cashback</option>
            </select>
          </div>
          <div className="form-group">
            <label>Member Discount (%)</label>
            <input className="form-input" type="number" min="0" max="100" placeholder="10"
              value={setupForm.discountPct} onChange={e => setSetupForm(p => ({ ...p, discountPct:e.target.value }))} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => setSetupOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Activate Loyalty Card</button>
          </div>
        </form>
      </Modal>

    
      <Modal isOpen={noteOpen} onClose={() => setNoteOpen(false)} title={editNote ? 'Edit Note' : 'Add Note'}>
        <form onSubmit={handleNoteSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input className="form-input" required placeholder="Equipment Maintenance"
              value={noteForm.title} onChange={e => setNoteForm(p => ({ ...p, title:e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Note *</label>
            <textarea className="form-input" required rows={4} placeholder="Write your note here…" style={{ resize:'vertical' }}
              value={noteForm.body} onChange={e => setNoteForm(p => ({ ...p, body:e.target.value }))} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => setNoteOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">{editNote ? 'Save Changes' : 'Add Note'}</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
