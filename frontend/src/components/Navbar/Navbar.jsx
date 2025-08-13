import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="logo" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
            <path d="M8 4v16"/>
            <path d="M16 4v16"/>
            <path d="M4 8h16"/>
          </svg>
        </span>
        <span>EduLor</span>
      </Link>
      <div className="spacer" />
      <button className="icon-btn" aria-label="Open menu" onClick={onMenuClick}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </header>
  )
}

export default Navbar


