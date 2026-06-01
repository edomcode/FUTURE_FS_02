import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const NOTIFICATIONS = [
  { id:1, icon:'💰', text:'New payment received from Alex Johnson', time:'2 min ago',  unread:true  },
  { id:2, icon:'📅', text:'HIIT Momentum class is starting in 30 min', time:'28 min ago', unread:true  },
  { id:3, icon:'⚠️', text:'Marcus Thorne certification expires in 5 days', time:'1 hr ago',  unread:true  },
  { id:4, icon:'👤', text:'New client Emma Davis registered', time:'3 hrs ago', unread:false },
  { id:5, icon:'✅', text:'Yoga Flow class completed — 12/15 attended', time:'5 hrs ago', unread:false },
]

export default function Topbar({
  searchPlaceholder = 'Find something here...',
  showCreateClass   = false,
  actionLabel       = ' Add Lead',
  onMenuClick,
  onActionClick,
  onCreateClass,
}) {
  const navigate = useNavigate()
  const [notifOpen,  setNotifOpen]  = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifs, setNotifs] = useState(NOTIFICATIONS)

  const notifRef   = useRef(null)
  const profileRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const unreadCount = notifs.filter(n => n.unread).length
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))

  return (
    <header className="topbar">

     
      <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <div className="topbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder={searchPlaceholder}/>
      </div>

      <div className="topbar-spacer"/>

      <div className="topbar-actions">
        {showCreateClass && (
          <button className="btn-primary" onClick={onCreateClass}>Create Class</button>
        )}

     
        <div style={{ position:'relative' }} ref={notifRef}>
          <button className="icon-btn" onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && <span className="notif-dot"/>}
          </button>

          {notifOpen && (
            <div className="dropdown-panel" style={{ width:320, right:0 }}>
              <div className="dropdown-header">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button className="dropdown-link" onClick={markAllRead}>Mark all read</button>
                )}
              </div>
              <div className="dropdown-list">
                {notifs.map(n => (
                  <div key={n.id} className={`notif-item${n.unread ? ' unread' : ''}`}
                    onClick={() => setNotifs(prev => prev.map(x => x.id===n.id ? {...x,unread:false} : x))}>
                    <span className="notif-icon">{n.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, lineHeight:1.4 }}>{n.text}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:3 }}>{n.time}</div>
                    </div>
                    {n.unread && <span className="unread-dot"/>}
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="dropdown-link" onClick={() => setNotifOpen(false)}>View all notifications</button>
              </div>
            </div>
          )}
        </div>

      
        <div style={{ position:'relative' }} ref={profileRef}>
          <button className="icon-btn" onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>

          {profileOpen && (
            <div className="dropdown-panel" style={{ width:220, right:0 }}>
              <div className="dropdown-header" style={{ flexDirection:'column', alignItems:'flex-start', gap:2 }}>
                <span style={{ fontWeight:700 }}>Emon Ahmed</span>
                <span style={{ fontSize:11, color:'var(--text-muted)' }}>Super Admin</span>
              </div>
              <div className="dropdown-list">
                <button className="dropdown-item" onClick={() => { navigate('/settings'); setProfileOpen(false) }}>
                  ⚙ Settings
                </button>
                <button className="dropdown-item" onClick={() => { navigate('/support'); setProfileOpen(false) }}>
                  ❓ Support
                </button>
                <div style={{ borderTop:'1px solid var(--border)', margin:'4px 0' }}/>
                <button className="dropdown-item" style={{ color:'var(--red)' }}
                  onClick={() => { setProfileOpen(false); alert('Logout — connect to backend auth') }}>
                  🚪 Log Out
                </button>
              </div>
            </div>
          )}
        </div>

      
        <div className="user-chip">
          <div>
            <div className="user-name">Emon Ahmed</div>
            <div className="user-role">Super Admin</div>
          </div>
          <div className="user-avatar">EA</div>
        </div>

      
        <button className="btn-add-lead" onClick={onActionClick}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>{actionLabel}</span>
        </button>
      </div>
    </header>
  )
}
