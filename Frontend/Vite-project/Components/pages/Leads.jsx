import { useState, useEffect, useCallback } from 'react'
import Topbar from '../Topbar'
import Modal from '../Modal'
import api from '../../src/api'

const SOURCES   = ['Walk-in', 'Website', 'Referral', 'Social Media', 'Phone Call', 'Other']
const PLANS     = ['Trial Session', 'Monthly Basic', 'Premium Membership', 'Elite Membership', 'Personal Training']
const STATUSES  = ['New', 'Contacted', 'Follow-Up', 'Converted', 'Lost']

const STATUS_COLORS = {
  'New':        'badge-blue',
  'Contacted':  'badge-yellow',
  'Follow-Up':  'badge-orange',
  'Converted':  'badge-green',
  'Lost':       'badge-red',
}

const COLORS = ['#3b82f6','#f5c518','#ef4444','#22c55e','#a855f7','#f97316','#06b6d4']
const colorFor    = (name) => COLORS[(name || 'A').charCodeAt(0) % COLORS.length]
const initialsFor = (name) => (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const EMPTY_FORM = { name:'', email:'', phone:'', source:'Walk-in', interestedPlan:'Trial Session', status:'New', followUpDate:'', assignedTo:'' }
const PER_PAGE = 8


const DEMO_LEADS = [
  { _id:'1', name:'James Carter',   email:'j.carter@email.com',  phone:'+1 (555) 100-2000', source:'Website',      interestedPlan:'Premium Membership', status:'New',       followUpDate:null,         notes:[],                                                    assignedTo:'Emon Ahmed',  createdAt: new Date().toISOString() },
  { _id:'2', name:'Nina Patel',     email:'n.patel@email.com',   phone:'+1 (555) 200-3000', source:'Referral',     interestedPlan:'Personal Training',  status:'Contacted', followUpDate:'2024-11-20', notes:[{ _id:'n1', text:'Called — interested in PT package', createdBy:'Emon Ahmed', createdAt: new Date().toISOString() }], assignedTo:'Sarah Manager', createdAt: new Date().toISOString() },
  { _id:'3', name:'Omar Hassan',    email:'o.hassan@email.com',  phone:'+1 (555) 300-4000', source:'Walk-in',      interestedPlan:'Monthly Basic',      status:'Follow-Up', followUpDate:'2024-11-18', notes:[{ _id:'n2', text:'Visited gym, needs follow-up call', createdBy:'Emon Ahmed', createdAt: new Date().toISOString() }], assignedTo:'Emon Ahmed',  createdAt: new Date().toISOString() },
  { _id:'4', name:'Chloe Martin',   email:'c.martin@email.com',  phone:'+1 (555) 400-5000', source:'Social Media', interestedPlan:'Elite Membership',   status:'Converted', followUpDate:null,         notes:[{ _id:'n3', text:'Signed up for Elite plan ✅', createdBy:'Emon Ahmed', createdAt: new Date().toISOString() }],       assignedTo:'Sarah Manager', createdAt: new Date().toISOString() },
  { _id:'5', name:'David Kim',      email:'d.kim@email.com',     phone:'+1 (555) 500-6000', source:'Phone Call',   interestedPlan:'Trial Session',      status:'Lost',      followUpDate:null,         notes:[{ _id:'n4', text:'Not interested at this time', createdBy:'Emon Ahmed', createdAt: new Date().toISOString() }],        assignedTo:'Emon Ahmed',  createdAt: new Date().toISOString() },
  { _id:'6', name:'Priya Sharma',   email:'p.sharma@email.com',  phone:'+1 (555) 600-7000', source:'Website',      interestedPlan:'Premium Membership', status:'New',       followUpDate:'2024-11-22', notes:[],                                                    assignedTo:'Unassigned',  createdAt: new Date().toISOString() },
  { _id:'7', name:'Lucas Ferreira', email:'l.ferreira@email.com',phone:'+1 (555) 700-8000', source:'Referral',     interestedPlan:'Personal Training',  status:'Contacted', followUpDate:'2024-11-19', notes:[],                                                    assignedTo:'Emon Ahmed',  createdAt: new Date().toISOString() },
  { _id:'8', name:'Amara Diallo',   email:'a.diallo@email.com',  phone:'+1 (555) 800-9000', source:'Walk-in',      interestedPlan:'Monthly Basic',      status:'New',       followUpDate:null,         notes:[],                                                    assignedTo:'Unassigned',  createdAt: new Date().toISOString() },
  { _id:'9', name:'Tom Bradley',    email:'t.bradley@email.com', phone:'+1 (555) 900-1000', source:'Social Media', interestedPlan:'Elite Membership',   status:'Follow-Up', followUpDate:'2024-11-21', notes:[],                                                    assignedTo:'Sarah Manager', createdAt: new Date().toISOString() },
]

export default function Leads({ onMenuClick, showToast }) {
  const [leads, setLeads]           = useState([])
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [search, setSearch]         = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterSource, setFilterSource] = useState('')
  const [fetching, setFetching]     = useState(false)
  const [offline, setOffline]       = useState(false)

  const [addOpen, setAddOpen]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detailLead, setDetailLead] = useState(null)  
  const [noteText, setNoteText]     = useState('')
  const [form, setForm]             = useState(EMPTY_FORM)
  const [saving, setSaving]         = useState(false)

  const totalPages = Math.ceil(total / PER_PAGE)


  const fetchLeads = useCallback(async () => {
    setFetching(true)
    try {
      const params = new URLSearchParams({ page, limit: PER_PAGE })
      if (search)       params.set('search', search)
      if (filterStatus) params.set('status', filterStatus)
      if (filterSource) params.set('source', filterSource)

      const { data } = await api.get(`/api/leads?${params}`)
      setLeads(data.leads)
      setTotal(data.total)
      setOffline(false)
    } catch {
  
      setOffline(true)
      let filtered = DEMO_LEADS
      if (search)       filtered = filtered.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()))
      if (filterStatus) filtered = filtered.filter(l => l.status === filterStatus)
      if (filterSource) filtered = filtered.filter(l => l.source === filterSource)
      setTotal(filtered.length)
      setLeads(filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE))
    } finally {
      setFetching(false)
    }
  }, [page, search, filterStatus, filterSource])

  useEffect(() => { fetchLeads() }, [fetchLeads])


  const openAdd  = () => { setForm(EMPTY_FORM); setAddOpen(true) }
  const openEdit = (l) => {
    setForm({
      name: l.name, email: l.email, phone: l.phone,
      source: l.source, interestedPlan: l.interestedPlan,
      status: l.status, assignedTo: l.assignedTo || '',
      followUpDate: l.followUpDate ? l.followUpDate.slice(0, 10) : '',
    })
    setEditTarget(l)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editTarget) {
        if (offline) {
          setLeads(prev => prev.map(l => l._id === editTarget._id ? { ...l, ...form } : l))
        } else {
          const { data } = await api.put(`/api/leads/${editTarget._id}`, form)
          setLeads(prev => prev.map(l => l._id === editTarget._id ? data : l))
        }
        showToast(`✅ ${form.name} updated`)
        setEditTarget(null)
      } else {
        if (offline) {
          const newLead = { ...form, _id: String(Date.now()), notes: [], createdAt: new Date().toISOString() }
          setLeads(prev => [newLead, ...prev])
          setTotal(t => t + 1)
        } else {
          const { data } = await api.post('/api/leads', form)
          setLeads(prev => [data, ...prev])
          setTotal(t => t + 1)
        }
        showToast(`✅ Lead "${form.name}" added`)
        setAddOpen(false)
      }
    } catch (err) {
      showToast(`❌ ${err.response?.data?.message || 'Error saving lead'}`, 'error')
    } finally {
      setSaving(false)
      setForm(EMPTY_FORM)
    }
  }


  const handleStatusChange = async (id, newStatus) => {
    const prev = leads.find(l => l._id === id)
 
    setLeads(ls => ls.map(l => l._id === id ? { ...l, status: newStatus } : l))
    try {
      if (!offline) await api.patch(`/api/leads/${id}/status`, { status: newStatus })
      showToast(`✅ Status → ${newStatus}`)
    
      if (detailLead?._id === id) setDetailLead(d => ({ ...d, status: newStatus }))
    } catch {
  
      setLeads(ls => ls.map(l => l._id === id ? { ...l, status: prev.status } : l))
      showToast('❌ Status update failed', 'error')
    }
  }


  const handleDelete = async () => {
    try {
      if (!offline) await api.delete(`/api/leads/${deleteTarget._id}`)
      setLeads(prev => prev.filter(l => l._id !== deleteTarget._id))
      setTotal(t => t - 1)
      showToast(`🗑 ${deleteTarget.name} removed`, 'error')
      setDeleteTarget(null)
    } catch (err) {
      showToast(`❌ ${err.response?.data?.message || 'Delete failed'}`, 'error')
    }
  }

  
  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!noteText.trim()) return
    const newNote = { _id: String(Date.now()), text: noteText.trim(), createdBy: 'Admin', createdAt: new Date().toISOString() }
    try {
      if (offline) {
        const updated = { ...detailLead, notes: [...(detailLead.notes || []), newNote] }
        setDetailLead(updated)
        setLeads(prev => prev.map(l => l._id === detailLead._id ? updated : l))
      } else {
        const { data } = await api.post(`/api/leads/${detailLead._id}/notes`, { text: noteText.trim() })
        setDetailLead(data)
        setLeads(prev => prev.map(l => l._id === data._id ? data : l))
      }
      showToast('✅ Note saved')
      setNoteText('')
    } catch {
      showToast('❌ Failed to save note', 'error')
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      if (offline) {
        const updated = { ...detailLead, notes: detailLead.notes.filter(n => n._id !== noteId) }
        setDetailLead(updated)
        setLeads(prev => prev.map(l => l._id === detailLead._id ? updated : l))
      } else {
        const { data } = await api.delete(`/api/leads/${detailLead._id}/notes/${noteId}`)
        setDetailLead(data)
        setLeads(prev => prev.map(l => l._id === data._id ? data : l))
      }
      showToast('🗑 Note removed', 'error')
    } catch {
      showToast('❌ Failed to remove note', 'error')
    }
  }

 
  const allLeads = offline ? DEMO_LEADS : leads
  const stats = {
    total:     offline ? DEMO_LEADS.length : total,
    new:       allLeads.filter(l => l.status === 'New').length,
    contacted: allLeads.filter(l => l.status === 'Contacted' || l.status === 'Follow-Up').length,
    converted: allLeads.filter(l => l.status === 'Converted').length,
  }

  const LeadForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input className="form-input" required placeholder="James Carter"
            value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input className="form-input" type="email" required placeholder="james@email.com"
            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Phone</label>
          <input className="form-input" placeholder="+1 (555) 000-0000"
            value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Source</label>
          <select className="form-select" value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))}>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Interested Plan</label>
          <select className="form-select" value={form.interestedPlan} onChange={e => setForm(p => ({ ...p, interestedPlan: e.target.value }))}>
            {PLANS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Follow-Up Date</label>
          <input className="form-input" type="date"
            value={form.followUpDate} onChange={e => setForm(p => ({ ...p, followUpDate: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Assigned To</label>
          <input className="form-input" placeholder="Emon Ahmed"
            value={form.assignedTo} onChange={e => setForm(p => ({ ...p, assignedTo: e.target.value }))} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={() => { setAddOpen(false); setEditTarget(null) }}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Add Lead'}</button>
      </div>
    </form>
  )

  return (
    <>
      <Topbar searchPlaceholder="Search leads…" onMenuClick={onMenuClick}
        actionLabel="+ Add Lead" onActionClick={openAdd} />
      <div className="page">

     
        {offline && (
          <div style={{ background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:8, padding:'10px 16px', marginBottom:16, fontSize:13, color:'var(--orange)' }}>
            ⚠ Backend offline — showing demo data. Connect MongoDB to persist leads.
          </div>
        )}

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div className="page-header" style={{ marginBottom:0 }}>
            <h1>Leads</h1>
            <p>Track and manage potential gym members through your sales pipeline.</p>
          </div>
          <button className="btn-primary" onClick={openAdd}>+ Add Lead</button>
        </div>

     
        <div className="stats-row" style={{ marginBottom:24 }}>
          {[
            { label:'TOTAL LEADS',  value: stats.total,     color: 'var(--text-primary)' },
            { label:'NEW',          value: stats.new,       color: 'var(--blue)'         },
            { label:'IN PROGRESS',  value: stats.contacted, color: 'var(--accent)'       },
            { label:'CONVERTED',    value: stats.converted, color: 'var(--green)'        },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

      
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <input className="form-input" style={{ maxWidth:260 }} placeholder="Search name or email…"
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          <select className="form-select" style={{ width:'auto' }}
            value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="form-select" style={{ width:'auto' }}
            value={filterSource} onChange={e => { setFilterSource(e.target.value); setPage(1) }}>
            <option value="">All Sources</option>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </select>
          {(search || filterStatus || filterSource) && (
            <button className="btn-outline" style={{ padding:'8px 14px', fontSize:12 }}
              onClick={() => { setSearch(''); setFilterStatus(''); setFilterSource(''); setPage(1) }}>
              Clear Filters
            </button>
          )}
        </div>

     
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div className="table-scroll-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft:20 }}>LEAD NAME</th>
                  <th>SOURCE</th>
                  <th>INTERESTED PLAN</th>
                  <th>STATUS</th>
                  <th>FOLLOW-UP</th>
                  <th>NOTES</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {fetching && (
                  <tr><td colSpan={7} style={{ textAlign:'center', padding:32, color:'var(--text-muted)' }}>Loading…</td></tr>
                )}
                {!fetching && leads.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign:'center', padding:32, color:'var(--text-muted)' }}>No leads found. Click "+ Add Lead" to create one.</td></tr>
                )}
                {!fetching && leads.map(l => {
                  const col = colorFor(l.name)
                  return (
                    <tr key={l._id}>
                      <td style={{ paddingLeft:20 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div className="avatar-initials" style={{ background:col+'22', color:col }}>{initialsFor(l.name)}</div>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14 }}>{l.name}</div>
                            <div style={{ fontSize:12, color:'var(--blue)' }}>{l.email}</div>
                            {l.phone && <div style={{ fontSize:11, color:'var(--text-muted)' }}>{l.phone}</div>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-blue" style={{ fontSize:11 }}>{l.source}</span>
                      </td>
                      <td style={{ fontSize:13 }}>{l.interestedPlan}</td>
                      <td>
                     
                        <select
                          className="form-select"
                          style={{ width:'auto', padding:'4px 8px', fontSize:11 }}
                          value={l.status}
                          onChange={e => handleStatusChange(l._id, e.target.value)}
                        >
                          {STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ fontSize:12, color: l.followUpDate ? 'var(--accent)' : 'var(--text-muted)' }}>
                        {l.followUpDate ? new Date(l.followUpDate).toLocaleDateString('en-US', { month:'short', day:'numeric' }) : '—'}
                      </td>
                      <td>
                        <button
                          className="btn-outline"
                          style={{ padding:'4px 10px', fontSize:12, position:'relative' }}
                          onClick={() => { setDetailLead(l); setNoteText('') }}
                        >
                          Notes
                          {l.notes?.length > 0 && (
                            <span style={{ marginLeft:5, background:'var(--accent)', color:'#000', borderRadius:10, padding:'1px 6px', fontSize:10, fontWeight:700 }}>
                              {l.notes.length}
                            </span>
                          )}
                        </button>
                      </td>
                      <td>
                        <div style={{ display:'flex', gap:6 }}>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12 }} onClick={() => openEdit(l)}>Edit</button>
                          <button className="btn-outline" style={{ padding:'4px 10px', fontSize:12, color:'var(--red)', borderColor:'var(--red)' }} onClick={() => setDeleteTarget(l)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div style={{ padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)' }}>
            <span style={{ fontSize:13, color:'var(--text-muted)' }}>
              {total > 0 ? `Showing ${(page-1)*PER_PAGE+1}–${Math.min(page*PER_PAGE, total)} of ${total} leads` : '0 leads'}
            </span>
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" disabled={page===1} style={{ opacity:page===1?0.4:1 }} onClick={() => setPage(p=>p-1)}>Previous</button>
                {Array.from({ length: totalPages }, (_,i) => i+1).map(n => (
                  <button key={n} className={`page-btn${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" disabled={page===totalPages} style={{ opacity:page===totalPages?0.4:1 }} onClick={() => setPage(p=>p+1)}>Next</button>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add New Lead"><LeadForm /></Modal>

      
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Lead"><LeadForm /></Modal>

    
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Lead">
        <p className="confirm-text">Delete lead <span className="confirm-name">{deleteTarget?.name}</span>? This cannot be undone.</p>
        <div className="form-actions">
          <button className="btn-outline" onClick={() => setDeleteTarget(null)}>Cancel</button>
          <button className="btn-primary" style={{ background:'var(--red)' }} onClick={handleDelete}>Delete</button>
        </div>
      </Modal>

   
      <Modal isOpen={!!detailLead} onClose={() => setDetailLead(null)} title={`Notes — ${detailLead?.name}`}>
        <div style={{ marginBottom:16 }}>
          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12 }}>
            <span className={`badge ${STATUS_COLORS[detailLead?.status] || 'badge-blue'}`}>{detailLead?.status}</span>
            <span style={{ fontSize:12, color:'var(--text-muted)' }}>{detailLead?.email}</span>
          </div>

        
          <div style={{ maxHeight:240, overflowY:'auto', marginBottom:14 }}>
            {(!detailLead?.notes || detailLead.notes.length === 0) && (
              <div style={{ textAlign:'center', padding:20, color:'var(--text-muted)', fontSize:13 }}>No notes yet. Add one below.</div>
            )}
            {detailLead?.notes?.map(n => (
              <div key={n._id} style={{ background:'var(--bg-card2)', borderRadius:8, padding:'10px 12px', marginBottom:8, position:'relative' }}>
                <div style={{ fontSize:13, lineHeight:1.5, paddingRight:24 }}>{n.text}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>
                  {n.createdBy} · {new Date(n.createdAt).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}
                </div>
                <button
                  onClick={() => handleDeleteNote(n._id)}
                  style={{ position:'absolute', top:8, right:8, background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:13 }}
                >✕</button>
              </div>
            ))}
          </div>

      
          <form onSubmit={handleAddNote}>
            <div className="form-group" style={{ marginBottom:8 }}>
              <label>Add a Note</label>
              <textarea className="form-input" rows={3} placeholder="e.g. Called — interested in PT package, follow up next week"
                style={{ resize:'vertical' }}
                value={noteText} onChange={e => setNoteText(e.target.value)} />
            </div>
            <div className="form-actions" style={{ borderTop:'none', paddingTop:0, marginTop:0 }}>
              <button type="button" className="btn-outline" onClick={() => setDetailLead(null)}>Close</button>
              <button type="submit" className="btn-primary" disabled={!noteText.trim()}>Save Note</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
