import React, { useState } from 'react'
import Topbar from '../Topbar'

const classes = [
  {
    id: 1,
    type: 'HIIT',
    typeColor: '#f5c518',
    title: 'Afternoon Burn: Level 3',
    time: '14:00',
    duration: '60 MINS',
    trainer: 'Marcus Aurelius',
    cap: 18,
    maxCap: 20,
    status: 'CONFIRMED',
    statusClass: 'status-confirmed',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  },
  {
    id: 2,
    type: 'YOGA',
    typeColor: '#22c55e',
    title: 'Vinyasa Sunset Flow',
    time: '17:30',
    duration: '75 MINS',
    trainer: 'Sarah Jenkins',
    cap: 15,
    maxCap: 15,
    status: 'CONTACTING WAITLIST',
    statusClass: 'status-waitlist',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  },
  {
    id: 3,
    type: 'STRENGTH',
    typeColor: '#3b82f6',
    title: 'Barbell Masters',
    time: '06:00',
    duration: '90 MINS',
    trainer: 'David Goggins',
    cap: 6,
    maxCap: 15,
    status: 'NEW BOOKING',
    statusClass: 'status-new',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  },
  {
    id: 4,
    type: 'SPIN',
    typeColor: '#a855f7',
    title: 'RPM Challenge 300',
    time: '19:00',
    duration: '45 MINS',
    trainer: 'Elena Ruiz',
    cap: 20,
    maxCap: 22,
    status: 'CONFIRMED',
    statusClass: 'status-confirmed',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
  },
  {
    id: 5,
    type: 'PILATES',
    typeColor: '#f97316',
    title: 'Core Precision: Reformer',
    time: '11:00',
    duration: '50 MINS',
    trainer: 'Chloe Martin',
    cap: 8,
    maxCap: 12,
    status: 'NEW BOOKING',
    statusClass: 'status-new',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
  },
]

const dateFilters = ['All Dates', 'Today', 'Tomorrow', 'Wed, Oct 25', 'Thu, Oct 26']

export default function Schedule() {
  const [activeDate, setActiveDate] = useState('All Dates')
  const [view, setView] = useState('Grid')

  const capPercent = (c, m) => Math.round((c / m) * 100)

  return (
    <>
      <Topbar searchPlaceholder="Search classes, trainers, or dates..." showCreateClass />
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Class Schedule</h1>
            <p>Manage and monitor upcoming sessions for the next 7 days.</p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Grid', 'List'].map(v => (
              <button key={v} className={`btn-outline${view === v ? ' active' : ''}`} onClick={() => setView(v)}>{v}</button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-label">Today's Classes</div>
            <div className="stat-value">12 <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>+2 vs yesterday</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Capacity</div>
            <div className="stat-value">84% <span style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>Peak: 92%</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Trainers</div>
            <div className="stat-value">08 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>on rotation</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Waitlisted</div>
            <div className="stat-value" style={{ color: 'var(--red)' }}>15 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>across 4 classes</span></div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {dateFilters.map(d => (
            <button key={d} className={`chip${activeDate === d ? ' active' : ''}`} onClick={() => setActiveDate(d)}>{d}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <select style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 8, padding: '6px 12px', fontSize: 13 }}>
              <option>All Class Types</option>
              <option>HIIT</option>
              <option>Yoga</option>
              <option>Strength</option>
              <option>Spin</option>
              <option>Pilates</option>
            </select>
            <select style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 8, padding: '6px 12px', fontSize: 13 }}>
              <option>All Trainers</option>
              <option>Marcus Aurelius</option>
              <option>Sarah Jenkins</option>
              <option>David Goggins</option>
            </select>
          </div>
        </div>

        {/* Class cards grid */}
        <div className="schedule-grid-cards">
          {classes.map(cls => {
            const pct = capPercent(cls.cap, cls.maxCap)
            const barColor = pct >= 100 ? 'red' : pct >= 80 ? '' : 'blue'
            return (
              <div className="class-card" key={cls.id}>
                <div className="class-card-img">
                  <img src={cls.img} alt={cls.title} />
                  <span className="class-type-tag" style={{ background: cls.typeColor, color: '#000' }}>{cls.type}</span>
                  <span className={`status-tag ${cls.statusClass}`}>{cls.status}</span>
                </div>
                <div className="class-card-body">
                  <div className="class-title-row">
                    <span className="class-title">{cls.title}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div className="class-time">{cls.time}</div>
                      <div className="class-duration">{cls.duration}</div>
                    </div>
                  </div>
                  <div className="class-trainer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    {cls.trainer}
                  </div>
                  <div className="cap-row">
                    <div>
                      <div className="cap-text">Capacity</div>
                      <div className="progress-bar" style={{ width: 120, marginTop: 4 }}>
                        <div className={`progress-fill ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="cap-num">{cls.cap}/{cls.maxCap}</div>
                    {cls.cap >= cls.maxCap ? (
                      <span className="badge badge-red" style={{ fontSize: 10 }}>⚠ WAITLIST ACTIVE</span>
                    ) : cls.statusClass === 'status-new' ? (
                      <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>Invite</button>
                    ) : (
                      <button style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text-secondary)' }}>✏</button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add new class card */}
          <div className="add-class-card">
            <div className="plus-circle">+</div>
            <p>Schedule New Class</p>
            <span>Add a new recurring or one-time session</span>
          </div>
        </div>
      </div>
    </>
  )
}
