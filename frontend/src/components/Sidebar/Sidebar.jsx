import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="header">
        <span>Explore</span>
        <button className="close" onClick={onClose} aria-label="Close sidebar">×</button>
      </div>
      <nav className="menu hide-scrollbar" aria-label="Primary">
        <Link to="/" onClick={onClose}>
          <span className="icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
          </span>
          <span>Home</span>
        </Link>
        <Link to="/notes" onClick={onClose}>
          <span className="icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h12a2 2 0 0 1 2 2v12l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2z" />
            </svg>
          </span>
          <span>Study Materials</span>
        </Link>
        <Link to="/papers" onClick={onClose}>
          <span className="icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </span>
          <span>Papers</span>
        </Link>


      </nav>
      <div className="footer-actions">
        <button type="button" className="secondary-btn" onClick={onClose} aria-label="Close menu">Close</button>
      </div>
    </aside>
  )
}

export default Sidebar


