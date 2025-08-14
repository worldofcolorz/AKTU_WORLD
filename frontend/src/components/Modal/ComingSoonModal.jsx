import React from 'react'
import './coming-soon.css'

function ComingSoonModal({ open, onClose }) {
    if (!open) return null

    return (
        <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="cs-title">
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-card">
                <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
                <div className="art">
                    {/* Animated SVG bot */}
                    <svg viewBox="0 0 200 160" className="bot">
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                        <circle cx="100" cy="80" r="58" fill="url(#g1)" opacity="0.12" />
                        <rect x="60" y="50" rx="10" ry="10" width="80" height="60" fill="white" stroke="#e2e8f0" />
                        <circle cx="85" cy="78" r="8" fill="#0ea5e9" className="blink" />
                        <circle cx="115" cy="78" r="8" fill="#10b981" className="blink delay" />
                        <rect x="92" y="26" width="16" height="22" rx="8" fill="#0ea5e9" className="antenna" />
                        <circle cx="100" cy="26" r="6" fill="#10b981" />
                    </svg>
                </div>
                <h2 id="cs-title">EduLorz AI</h2>
                <p className="subtitle">Coming very soon</p>
                <div className="dots" aria-hidden>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
    )
}

export default ComingSoonModal


