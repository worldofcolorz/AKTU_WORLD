import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home.jsx'
import ComingSoonModal from './components/Modal/ComingSoonModal.jsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsSidebarOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app-container">
      <Navbar onMenuClick={() => setIsSidebarOpen(v => !v)} />
      <Sidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onShowComingSoon={() => { setIsSidebarOpen(false); setShowComingSoon(true) }}
      />
      {isSidebarOpen && <div className="backdrop show" onClick={() => setIsSidebarOpen(false)} />}
      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />

      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App


