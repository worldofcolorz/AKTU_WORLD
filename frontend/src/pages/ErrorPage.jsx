import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  return (
    <section className="status-page">
      <h1>Something went wrong</h1>
      <p>{error?.statusText || error?.message || 'An unexpected error occurred.'}</p>
      <Link to="/" className="status-page-link">Go back home</Link>
    </section>
  )
}

export default ErrorPage
