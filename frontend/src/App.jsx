import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsSidebarOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Send GA4 page_view on route changes
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname + window.location.search
        })
      }
    } catch { }
  }, [location])

  return (
    <div className="app-container">
      <Navbar onMenuClick={() => setIsSidebarOpen(v => !v)} />
      <Sidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {isSidebarOpen && <div className="backdrop show" onClick={() => setIsSidebarOpen(false)} />}

      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App


