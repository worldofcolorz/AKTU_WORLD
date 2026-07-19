import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  )
}

export default NotFound
