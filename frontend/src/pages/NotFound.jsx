import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="status-page">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="status-page-link">Go back home</Link>
    </section>
  )
}

export default NotFound
