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

    const trimmed = {
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      messageTitle: formData.messageTitle.trim(),
      message: formData.message.trim()
    }

    if (!trimmed.name || !trimmed.mobile || !trimmed.email || !trimmed.messageTitle || !trimmed.message) {
      alert('Please fill in all fields before submitting')
      return
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(trimmed.mobile)) {
      alert('Please enter a valid mobile number')
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
      const dataToSend = { ...trimmed, timestamp, wordCount }

      // Convert data to URL parameters for GET request
      const params = new URLSearchParams()
      Object.entries(dataToSend).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value)
        }
      })

      const scriptBaseUrl = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL
      if (!scriptBaseUrl) {
        throw new Error('Contact form is not configured (missing VITE_GOOGLE_SHEETS_SCRIPT_URL)')
      }
      const scriptUrl = `${scriptBaseUrl}?${params.toString()}`

      // A cross-origin no-cors fetch still reaches the Apps Script endpoint but the
      // response body/status can't be read - only a real network failure (DNS/offline/
      // connection refused) rejects the promise, which is what we can reliably detect.
      await fetch(scriptUrl, { method: 'GET', mode: 'no-cors' })

      alert('Message sent successfully!')
      setFormData({ name: '', mobile: '', email: '', messageTitle: '', message: '' })
      setWordCount(0)
    } catch (error) {
      alert(`Failed to send message: ${error.message}. Please try again in a moment.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'message') {
      // The 30-word limit is the real constraint (the textarea's maxLength is
      // just a character-count backstop, which let people type well past 30
      // words as long as they used short words) - enforce it live by
      // truncating to the first 30 words instead of only checking on submit.
      // Slice the ORIGINAL string at the 30th word's end position, rather
      // than splitting+rejoining words with a single space - that used to
      // collapse every run of whitespace (double spaces, line breaks the
      // user already typed) across the whole message, not just the part
      // being cut off.

      // A single word with no spaces (e.g. "gggg...g") still counts as "1
      // word" no matter how long it is, so the word-count check alone can be
      // bypassed with one very long token - cap any individual word's length
      // too, generous enough for real long words/URLs but not unbounded.
      const MAX_WORD_LENGTH = 40
      const value_ = value.replace(new RegExp(`\\S{${MAX_WORD_LENGTH + 1},}`, 'g'), (word) => word.slice(0, MAX_WORD_LENGTH))

      const wordMatches = [...value_.matchAll(/\S+/g)]
      if (wordMatches.length > 30) {
        const cutoff = wordMatches[29].index + wordMatches[29][0].length
        setFormData((prev) => ({ ...prev, message: value_.slice(0, cutoff) }))
        setWordCount(30)
        return
      }
      setFormData((prev) => ({ ...prev, message: value_ }))
      setWordCount(wordMatches.length)
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
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
                  pattern="[0-9+\-\s()]{7,20}"
                  title="Enter a valid mobile number"
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
                  maxLength="1000"
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


