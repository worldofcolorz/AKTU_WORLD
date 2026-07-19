import React from 'react'
import { apiGet, apiPost } from '../lib/api'
import { fetchDriveStats } from '../lib/drive'
import './home.css'
import FloatingChatbot from '../components/FloatingChatbot/FloatingChatbot'
import AIChat from '../components/AIChat/AIChat'

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = React.useState(0)
  // Animate FROM whatever is currently shown, not always from 0 - `value`
  // changes on every visits poll (every 5s), and restarting the count-up
  // from zero each time made the number visibly reset and re-animate forever
  // instead of settling once.
  const displayRef = React.useRef(0)
  React.useEffect(() => {
    let raf = 0
    const start = performance.now()
    const from = displayRef.current
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = Math.floor(from + (value - from) * eased)
      displayRef.current = next
      setDisplay(next)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <>{display.toLocaleString()}</>
}

function Stat({ value, label, image }) {
  return (
    <div className="stat-card">
      <div className="stat-art">
        {image}
      </div>
      <div className="stat-value"><AnimatedNumber value={value} duration={1400} /></div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Home() {
  const [totalResources, setTotalResources] = React.useState(0)
  const [totalSubjects, setTotalSubjects] = React.useState(0)
  const [visits, setVisits] = React.useState(0)
  const [apiStatus, setApiStatus] = React.useState('')
  const [isAIChatOpen, setIsAIChatOpen] = React.useState(false)

  React.useEffect(() => {
    let isMounted = true
    apiGet('/api/health')
      .then((d) => { if (isMounted) setApiStatus(d?.status || '') })
      .catch(() => { if (isMounted) setApiStatus('') })
    return () => { isMounted = false }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    fetchDriveStats()
      .then((d) => {
        if (!isMounted) return
        setTotalResources(d?.totalResources || 0)
        setTotalSubjects(d?.totalSubjects || 0)
      })
      .catch(() => {
        // ignore; stats stay at 0 if Drive isn't configured yet
      })
    return () => { isMounted = false }
  }, [])

  // Increment global visit count on each page load, then poll for live updates
  React.useEffect(() => {
    let isMounted = true
    const increment = async () => {
      try {
        const r = await apiPost('/api/visits/increment')
        if (isMounted && typeof r?.count === 'number') setVisits(r.count)
      } catch {
        // ignore; fallback value remains
      }
    }
    const poll = async () => {
      try {
        const r = await apiGet('/api/visits')
        if (isMounted && typeof r?.count === 'number') setVisits(r.count)
      } catch {
        // ignore transient errors
      }
    }

    // increment() already sets the initial value - no need for an immediate
    // poll() right after it too, that was just a duplicate GET /api/visits.
    increment()
    const id = setInterval(poll, 5000)
    return () => { isMounted = false; clearInterval(id) }
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Welcome to EduLorz</h1>
            <p>Responsive, interactive, and fast.</p>
            {apiStatus && (
              <p style={{ fontSize: '12px', opacity: 0.7 }}>Backend status: {apiStatus}</p>
            )}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="impact-heading">
          <span className="kicker">Live metrics</span>
          <h2>Impact in numbers</h2>
          <div className="accent"><span /></div>
        </div>
        <div className="stat-grid">
          <Stat value={visits} label="Student visits" image={<img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80" alt="students" />} />
          <Stat value={totalResources} label="Study resources" image={<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="study resources" />} />
          <Stat value={totalSubjects} label="Subjects covered" image={<img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80" alt="subjects" />} />
        </div>
      </section>

      <section className="story">
        <div className="story-container">
          <div className="story-image">
            <div className="image-wrapper">
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80" alt="Our journey" />
            </div>
          </div>
          <div className="story-content">
            <div className="story-header">
              <span className="story-kicker">Our Journey</span>
              <h2 className="story-title">
                <span className="title-word">Building</span>
                <span className="title-word">the</span>
                <span className="title-word">Future</span>
                <span className="title-word">of</span>
                <span className="title-word">Learning</span>
              </h2>
            </div>
            <div className="story-paragraphs">
              <p className="story-p">
                EduLorz started with a <span className="highlight">simple idea</span>: make learning effortless.
                We believe every student deserves access to the best educational resources without the hassle of endless searching.
              </p>
              <p className="story-p">
                What began as a small collection of study materials has grown into a comprehensive platform
                serving thousands of students. Our mission is to <span className="highlight">transform how students learn</span>
                by curating and organizing the most valuable educational content.
              </p>
              <p className="story-p">
                Today, we're proud to offer <span className="highlight">24+ subjects</span> with carefully selected resources,
                helping students focus on what matters most: their education and growth.
              </p>
            </div>
            <div className="story-stats">
              <div className="mini-stat">
                <span className="mini-stat-number">24/7</span>
                <span className="mini-stat-label">Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingChatbot onOpenChat={() => setIsAIChatOpen(true)} />
      
      <AIChat 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />
    </>
  )
}

export default Home


