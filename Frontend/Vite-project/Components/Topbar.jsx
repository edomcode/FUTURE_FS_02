import React from 'react'

export default function Topbar({ searchPlaceholder = 'Find something here...', showCreateClass = false, actionLabel = '+ Add Lead' }) {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder={searchPlaceholder} />
      </div>

      <div className="topbar-spacer" />

      <div className="topbar-actions">
        {showCreateClass && (
          <button className="btn-primary">Create Class</button>
        )}

        <button className="icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notif-dot" />
        </button>

        <button className="icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        <div className="user-chip">
          <div>
            <div className="user-name">Emon Ahmed</div>
            <div className="user-role">Super Admin</div>
          </div>
          <div className="user-avatar">EA</div>
        </div>

        <button className="btn-add-lead">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {actionLabel}
        </button>
      </div>
    </header>
  )
}
