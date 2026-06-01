import { useState } from 'react'
import Topbar from '../Topbar'

const FAQS = [
  { q:'How do I add a new client?',             a:'Go to the Clients page and click "Add Client" in the top right. Fill in the name, email, phone, plan, and status, then click Save.' },
  { q:'How do I schedule a new class?',          a:'Go to the Schedule page and click "Create Class" in the topbar, or click the dashed "Schedule New Class" card at the end of the grid.' },
  { q:'How do I change a booking status?',       a:'On the Bookings page, find the booking row and use the status dropdown in the Status column to switch between Pending, Confirmed, and Cancelled.' },
  { q:'How do I mark a payment as paid?',        a:'On the Payments page, find the transaction row and use the status dropdown to change it from PENDING or OVERDUE to PAID.' },
  { q:'How do I add a new trainer?',             a:'Go to the Trainers page and click "Add Trainer". Fill in their name, role, contact info, specialties, and availability.' },
  { q:'How do I connect the backend database?',  a:'Open the .env file in Backend/fitness-crm/ and replace the MONGO_URI placeholder with your real MongoDB Atlas connection string, then run npm run dev.' },
  { q:'How do I deploy to Vercel and Render?',   a:'Push your code to GitHub. Connect the Frontend folder to Vercel and the Backend folder to Render. Add your environment variables in each platform\'s dashboard.' },
  { q:'Can clients log in to this dashboard?',   a:'No. This is the admin panel for gym staff only. Clients would have a separate member portal (not yet built). The login system will be added when the backend is fully connected.' },
]

export default function Support({ onMenuClick, showToast }) {
  const [openFaq, setOpenFaq]   = useState(null)
  const [ticket, setTicket]     = useState({ subject:'', category:'General', message:'' })
  const [submitted, setSubmitted] = useState(false)

  const handleTicket = (e) => {
    e.preventDefault()
    showToast('✅ Support ticket submitted — we\'ll respond within 24 hours')
    setSubmitted(true)
    setTicket({ subject:'', category:'General', message:'' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <>
      <Topbar searchPlaceholder="Search help articles..." onMenuClick={onMenuClick} />
      <div className="page">
        <div className="page-header">
          <h1>Support Center</h1>
          <p>Get help, read guides, and contact the FitFlow team.</p>
        </div>

        
        <div className="support-grid">
          <div className="support-card" onClick={() => showToast('📧 Opening email client…')}>
            <div className="support-icon">📧</div>
            <h4>Email Support</h4>
            <p>Send us an email and we'll respond within 24 hours.</p>
            <div style={{ marginTop:10, fontSize:12, color:'var(--accent)', fontWeight:600 }}>support@fitflow.com</div>
          </div>
          <div className="support-card" onClick={() => showToast('💬 Live chat coming soon')}>
            <div className="support-icon">💬</div>
            <h4>Live Chat</h4>
            <p>Chat with our support team in real time during business hours.</p>
            <div style={{ marginTop:10, fontSize:12, color:'var(--accent)', fontWeight:600 }}>Mon–Fri, 9AM–6PM EST</div>
          </div>
          <div className="support-card" onClick={() => showToast('📖 Documentation opening…')}>
            <div className="support-icon">📖</div>
            <h4>Documentation</h4>
            <p>Full guides for every feature in the FitFlow CRM admin panel.</p>
            <div style={{ marginTop:10, fontSize:12, color:'var(--accent)', fontWeight:600 }}>docs.fitflow.com</div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

         
          <div className="card">
            <div className="card-title" style={{ marginBottom:16 }}>Frequently Asked Questions</div>
            {FAQS.map((faq, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span style={{ color:'var(--accent)', fontSize:18, flexShrink:0 }}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

         
          <div className="card">
            <div className="card-title" style={{ marginBottom:4 }}>Submit a Support Ticket</div>
            <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:16 }}>
              Can't find your answer? Send us a message and we'll get back to you.
            </div>

            {submitted ? (
              <div style={{ textAlign:'center', padding:32 }}>
                <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
                <div style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>Ticket Submitted!</div>
                <div style={{ fontSize:13, color:'var(--text-secondary)' }}>We'll respond to your email within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleTicket}>
                <div className="form-group">
                  <label>Subject *</label>
                  <input className="form-input" required placeholder="e.g. Can't add a new trainer"
                    value={ticket.subject} onChange={e => setTicket(p => ({ ...p, subject:e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-select" value={ticket.category}
                    onChange={e => setTicket(p => ({ ...p, category:e.target.value }))}>
                    <option>General</option>
                    <option>Billing</option>
                    <option>Technical Issue</option>
                    <option>Feature Request</option>
                    <option>Account Access</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea className="form-input" required rows={5}
                    placeholder="Describe your issue in detail…"
                    style={{ resize:'vertical' }}
                    value={ticket.message} onChange={e => setTicket(p => ({ ...p, message:e.target.value }))} />
                </div>
                <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>
                  Send Ticket
                </button>
              </form>
            )}
          </div>
        </div>

      
        <div className="card" style={{ marginTop:20 }}>
          <div className="card-title" style={{ marginBottom:14 }}>System Status</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
            {[
              { name:'API Server',      status:'Operational' },
              { name:'Database',        status:'Operational' },
              { name:'Authentication',  status:'Operational' },
              { name:'File Storage',    status:'Degraded'    },
            ].map(s => (
              <div key={s.name} style={{ background:'var(--bg-card2)', borderRadius:8, padding:12 }}>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>{s.name}</div>
                <span className={`badge ${s.status === 'Operational' ? 'badge-green' : 'badge-orange'}`}>
                  ● {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
