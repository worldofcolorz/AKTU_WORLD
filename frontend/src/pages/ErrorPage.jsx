import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  return (
    <section style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>Something went wrong</h1>
      <p>{error?.statusText || error?.message || 'An unexpected error occurred.'}</p>
      <Link to="/">Go back home</Link>
    </section>
  )
}

export default ErrorPage
