import React, { useState } from 'react'
import './footer.css'

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    messageTitle: '',
    message: ''
  })
  const [wordCount, setWordCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (wordCount > 30) {
      alert('Message must be 30 words or less')
      return
    }

    // Debug: Check if form data is empty
    if (!formData.name || !formData.mobile || !formData.email || !formData.messageTitle || !formData.message) {
      alert('Please fill in all fields before submitting')
      return
    }

    setIsSubmitting(true)
    try {
      const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      // Google Sheets integration - CORS-free approach
      const dataToSend = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        messageTitle: formData.messageTitle.trim(),
        message: formData.message.trim(),
        timestamp,
        wordCount: wordCount
      }

      console.log('Form data before sending:', formData)
      console.log('Data being sent:', dataToSend)

      // Convert data to URL parameters for GET request
      const params = new URLSearchParams()
      Object.entries(dataToSend).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value)
        }
      })

      const scriptUrl = `https://script.google.com/macros/s/AKfycbzkAkCV3sCqR_59HbIUQjgNWEKT1vE3fXc1Oeja8huPSC_9NepEt1VE-n9NacliGoMO/exec?${params.toString()}`

      console.log('Final script URL:', scriptUrl)
      console.log('URL parameters:', params.toString())

      // Use image-based tracking to avoid CORS completely
      return new Promise((resolve, reject) => {
        const img = new Image()

        img.onload = () => {
          console.log('Data sent successfully via image tracking')
          resolve({ success: true })
        }

        img.onerror = () => {
          console.log('Image tracking completed (this is normal)')
          resolve({ success: true })
        }

        // Set a timeout to ensure the request completes
        setTimeout(() => {
          resolve({ success: true })
        }, 1000)

        // Start the request
        img.src = scriptUrl
      }).then(() => {
        alert('Message sent successfully!')
        setFormData({ name: '', mobile: '', email: '', messageTitle: '', message: '' })
        setWordCount(0)
      })
    } catch (error) {
      console.error('Error sending message:', error)
      alert(`Failed to send message: ${error.message}. Please check the console for details.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (name === 'message') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0)
      setWordCount(words.length)
    }
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>© {new Date().getFullYear()} EduLorz</h3>
          <p>Empowering students with quality educational resources</p>
          <div className="social-icons">
            <a href="https://linkedin.com/in/edulorz-4457a737a" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/edulorz/" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://youtube.com/@edulorz?si=rPnb8Lm8SZMRub29" className="social-icon" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="contact-box">
            <h3>Contact Us</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="messageTitle"
                  placeholder="Message Title"
                  value={formData.messageTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message (max 30 words)"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="3"
                  maxLength="200"
                />
                <div className="word-count">
                  {wordCount}/30 words
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


