import React from 'react'
import './home.css'
import { getTotalResourceCount } from '../data/resources'
import { getApproxSiteOpens } from '../lib/visits'
import { SUBJECTS_COVERED } from '../data/stats'

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
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
  const totalResources = getTotalResourceCount()
  const opens = getApproxSiteOpens()

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Welcome to EduLor</h1>
            <p>Responsive, interactive, and fast.</p>
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
          <Stat value={opens} label="Student visits" image={<img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80" alt="students" />} />
          <Stat value={totalResources} label="Study resources" image={<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="study resources" />} />
          <Stat value={SUBJECTS_COVERED} label="Subjects covered" image={<img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80" alt="subjects" />} />
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
                EduLor started with a <span className="highlight">simple idea</span>: make learning effortless.
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
    </>
  )
}

export default Home


