import { useState } from 'react'
import Topbar from '../Topbar'


function Toggle({ on, onChange }) {
  return (
    <div
      className="toggle"
      style={{ background: on ? 'var(--green)' : 'var(--border)' }}
      onClick={() => onChange(!on)}
    >
      <div className="toggle-thumb" style={{ left: on ? 'auto' : 4, right: on ? 4 : 'auto' }} />
    </div>
  )
}

const NAV_ITEMS = [
  { id:'profile',       label:'Profile',          icon:'👤' },
  { id:'gym',           label:'Gym Info',          icon:'🏋️' },
  { id:'notifications', label:'Notifications',     icon:'🔔' },
  { id:'security',      label:'Security',          icon:'🔒' },
  { id:'billing',       label:'Billing & Plans',   icon:'💳' },
  { id:'roles',         label:'Staff & Roles',     icon:'👥' },
  { id:'appearance',    label:'Appearance',        icon:'🎨' },
]

export default function Settings({ onMenuClick, showToast }) {
  const [activeTab, setActiveTab] = useState('profile')

  
  const [profile, setProfile] = useState({ name:'Emon Ahmed', email:'emon@fitflow.com', phone:'+1 (555) 000-1234', role:'Super Admin' })


  const [gym, setGym] = useState({ name:'FitFlow Gym', address:'123 Fitness Ave, New York, NY', phone:'+1 (555) 999-0000', email:'info@fitflow.com', openTime:'06:00', closeTime:'22:00' })

 
  const [notifs, setNotifs] = useState({
    newBooking:    true,
    paymentReceived: true,
    paymentOverdue:  true,
    classReminder:   false,
    certExpiry:      true,
    newClient:       true,
  })


  const [pwForm, setPwForm] = useState({ current:'', newPw:'', confirm:'' })
  const [twoFA, setTwoFA]   = useState(false)


  const [plan] = useState('Professional')


  const [staff] = useState([
    { id:1, name:'Emon Ahmed',   email:'emon@fitflow.com',    role:'Super Admin', status:'Active' },
    { id:2, name:'Sarah Manager',email:'sarah@fitflow.com',   role:'Manager',     status:'Active' },
    { id:3, name:'Mike Staff',   email:'mike@fitflow.com',    role:'Staff',       status:'Active' },
  ])


  const [appearance, setAppearance] = useState({ theme:'dark', accentColor:'#f5c518', compactMode:false })

  const save = (section) => showToast(`✅ ${section} saved successfully`)

  return (
    <>
      <Topbar searchPlaceholder="Search settings..." onMenuClick={onMenuClick} />
      <div className="page">
        <div className="page-header">
          <h1>Settings</h1>
          <p>Manage your gym profile, preferences, and system configuration.</p>
        </div>

        <div className="settings-grid">
    
          <div className="settings-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`settings-nav-item${activeTab === item.id ? ' active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>

       
          <div>

        
            {activeTab === 'profile' && (
              <div className="settings-card">
                <h3>Admin Profile</h3>
                <p className="settings-desc">Update your personal information and display name.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-input" value={profile.name}
                      onChange={e => setProfile(p => ({ ...p, name:e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-input" type="email" value={profile.email}
                      onChange={e => setProfile(p => ({ ...p, email:e.target.value }))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input className="form-input" value={profile.phone}
                      onChange={e => setProfile(p => ({ ...p, phone:e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input className="form-input" value={profile.role} disabled
                      style={{ opacity:0.5, cursor:'not-allowed' }} />
                  </div>
                </div>
                <div className="form-actions" style={{ borderTop:'none', paddingTop:0, marginTop:8 }}>
                  <button className="btn-primary" onClick={() => save('Profile')}>Save Profile</button>
                </div>
              </div>
            )}

          
            {activeTab === 'gym' && (
              <div className="settings-card">
                <h3>Gym Information</h3>
                <p className="settings-desc">Details shown to clients and on reports.</p>
                <div className="form-group">
                  <label>Gym / Club Name</label>
                  <input className="form-input" value={gym.name}
                    onChange={e => setGym(p => ({ ...p, name:e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input className="form-input" value={gym.address}
                    onChange={e => setGym(p => ({ ...p, address:e.target.value }))} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input className="form-input" value={gym.phone}
                      onChange={e => setGym(p => ({ ...p, phone:e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input className="form-input" value={gym.email}
                      onChange={e => setGym(p => ({ ...p, email:e.target.value }))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Opening Time</label>
                    <input className="form-input" type="time" value={gym.openTime}
                      onChange={e => setGym(p => ({ ...p, openTime:e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Closing Time</label>
                    <input className="form-input" type="time" value={gym.closeTime}
                      onChange={e => setGym(p => ({ ...p, closeTime:e.target.value }))} />
                  </div>
                </div>
                <div className="form-actions" style={{ borderTop:'none', paddingTop:0, marginTop:8 }}>
                  <button className="btn-primary" onClick={() => save('Gym Info')}>Save Gym Info</button>
                </div>
              </div>
            )}

           
            {activeTab === 'notifications' && (
              <div className="settings-card">
                <h3>Notification Preferences</h3>
                <p className="settings-desc">Choose which events trigger a notification for you.</p>
                {[
                  { key:'newBooking',      label:'New Booking',         desc:'When a client books a class'              },
                  { key:'paymentReceived', label:'Payment Received',    desc:'When a payment is marked as PAID'         },
                  { key:'paymentOverdue',  label:'Payment Overdue',     desc:'When a payment becomes overdue'           },
                  { key:'classReminder',   label:'Class Reminder',      desc:'30 minutes before a class starts'         },
                  { key:'certExpiry',      label:'Cert Expiry Warning', desc:'When a trainer certification is expiring' },
                  { key:'newClient',       label:'New Client Registered',desc:'When a new member signs up'             },
                ].map(item => (
                  <div className="settings-row" key={item.key}>
                    <div>
                      <div className="settings-row-label">{item.label}</div>
                      <div className="settings-row-desc">{item.desc}</div>
                    </div>
                    <Toggle on={notifs[item.key]} onChange={v => {
                      setNotifs(p => ({ ...p, [item.key]:v }))
                      showToast(`${v ? '✅' : '🔕'} ${item.label} notifications ${v ? 'enabled' : 'disabled'}`)
                    }} />
                  </div>
                ))}
              </div>
            )}

           
            {activeTab === 'security' && (
              <>
                <div className="settings-card">
                  <h3>Change Password</h3>
                  <p className="settings-desc">Use a strong password with at least 8 characters.</p>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input className="form-input" type="password" placeholder="••••••••"
                      value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current:e.target.value }))} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>New Password</label>
                      <input className="form-input" type="password" placeholder="••••••••"
                        value={pwForm.newPw} onChange={e => setPwForm(p => ({ ...p, newPw:e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input className="form-input" type="password" placeholder="••••••••"
                        value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm:e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-actions" style={{ borderTop:'none', paddingTop:0, marginTop:8 }}>
                    <button className="btn-primary" onClick={() => {
                      if (pwForm.newPw !== pwForm.confirm) { showToast('❌ Passwords do not match', 'error'); return }
                      if (pwForm.newPw.length < 8) { showToast('❌ Password must be at least 8 characters', 'error'); return }
                      showToast('✅ Password updated successfully')
                      setPwForm({ current:'', newPw:'', confirm:'' })
                    }}>Update Password</button>
                  </div>
                </div>
                <div className="settings-card">
                  <h3>Two-Factor Authentication</h3>
                  <p className="settings-desc">Add an extra layer of security to your account.</p>
                  <div className="settings-row">
                    <div>
                      <div className="settings-row-label">Enable 2FA</div>
                      <div className="settings-row-desc">Require a code from your phone when logging in</div>
                    </div>
                    <Toggle on={twoFA} onChange={v => { setTwoFA(v); showToast(v ? '✅ 2FA enabled' : '⚠ 2FA disabled', v ? 'success' : 'error') }} />
                  </div>
                </div>
              </>
            )}

        
            {activeTab === 'billing' && (
              <div className="settings-card">
                <h3>Billing & Plan</h3>
                <p className="settings-desc">Your current subscription and payment method.</p>
                <div style={{ background:'var(--bg-card2)', borderRadius:10, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>CURRENT PLAN</div>
                  <div style={{ fontSize:22, fontWeight:800, color:'var(--accent)' }}>{plan}</div>
                  <div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:4 }}>$49 / month · Renews Dec 1, 2024</div>
                </div>
                {[
                  { name:'Starter',      price:'$19/mo',  features:'Up to 100 clients, 5 trainers'       },
                  { name:'Professional', price:'$49/mo',  features:'Unlimited clients, 20 trainers, analytics' },
                  { name:'Enterprise',   price:'$99/mo',  features:'Everything + custom branding + API access' },
                ].map(p => (
                  <div key={p.name} className="settings-row">
                    <div>
                      <div className="settings-row-label">{p.name} — {p.price}</div>
                      <div className="settings-row-desc">{p.features}</div>
                    </div>
                    {plan === p.name
                      ? <span className="badge badge-green">Current</span>
                      : <button className="btn-outline" style={{ padding:'5px 14px', fontSize:12 }}
                          onClick={() => showToast(`📧 Upgrade request for ${p.name} sent`)}>Switch</button>
                    }
                  </div>
                ))}
              </div>
            )}

       
            {activeTab === 'roles' && (
              <div className="settings-card">
                <h3>Staff & Access Roles</h3>
                <p className="settings-desc">Manage who has access to this admin panel and what they can do.</p>
                <div style={{ marginBottom:16, padding:12, background:'var(--bg-card2)', borderRadius:8, fontSize:13, color:'var(--text-secondary)', lineHeight:1.7 }}>
                  <strong style={{ color:'var(--text-primary)' }}>Super Admin</strong> — full access to everything<br/>
                  <strong style={{ color:'var(--text-primary)' }}>Manager</strong> — access to Clients, Trainers, Schedule, Bookings. No Payments.<br/>
                  <strong style={{ color:'var(--text-primary)' }}>Staff</strong> — view-only access to Schedule and Bookings.
                </div>
                <div className="table-scroll-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>NAME</th><th>EMAIL</th><th>ROLE</th><th>STATUS</th><th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map(s => (
                        <tr key={s.id}>
                          <td style={{ fontWeight:600 }}>{s.name}</td>
                          <td style={{ fontSize:12, color:'var(--blue)' }}>{s.email}</td>
                          <td><span className="badge badge-blue">{s.role}</span></td>
                          <td><span className="badge badge-green">{s.status}</span></td>
                          <td><button className="btn-outline" style={{ padding:'4px 10px', fontSize:12 }}
                            onClick={() => showToast(`✅ Role updated for ${s.name}`)}>Edit Role</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop:14 }}>
                  <button className="btn-primary" onClick={() => showToast('📧 Invite sent')}>+ Invite Staff Member</button>
                </div>
              </div>
            )}

         
            {activeTab === 'appearance' && (
              <div className="settings-card">
                <h3>Appearance</h3>
                <p className="settings-desc">Customize how the dashboard looks.</p>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Theme</div>
                    <div className="settings-row-desc">Currently: {appearance.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                  </div>
                  <select className="form-select" style={{ width:'auto' }}
                    value={appearance.theme}
                    onChange={e => { setAppearance(p => ({ ...p, theme:e.target.value })); showToast('✅ Theme updated (refresh to apply)') }}>
                    <option value="dark">Dark</option>
                    <option value="light">Light (coming soon)</option>
                  </select>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Accent Color</div>
                    <div className="settings-row-desc">The yellow highlight color used throughout the app</div>
                  </div>
                  <input type="color" value={appearance.accentColor}
                    onChange={e => setAppearance(p => ({ ...p, accentColor:e.target.value }))}
                    style={{ width:40, height:32, border:'none', background:'none', cursor:'pointer' }} />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Compact Mode</div>
                    <div className="settings-row-desc">Reduce spacing to show more data on screen</div>
                  </div>
                  <Toggle on={appearance.compactMode} onChange={v => {
                    setAppearance(p => ({ ...p, compactMode:v }))
                    showToast(v ? '✅ Compact mode on' : '✅ Compact mode off')
                  }} />
                </div>
                <div className="form-actions" style={{ borderTop:'none', paddingTop:0, marginTop:8 }}>
                  <button className="btn-primary" onClick={() => save('Appearance')}>Save Appearance</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
