import React, { useState } from "react";
import "./NavbarFooter.css";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <footer className={`footer ${isExpanded ? "expanded" : ""}`}>
      <div className="footer-header">
        <p className="footer-copy">© 2025 AKTU World. All rights reserved.</p>
        <button onClick={toggleFooter} className="toggle-btn">
          {isExpanded ? "Close" : "Contact Us"}
        </button>
      </div>

      {isExpanded && (
        <div className="footer-content">
          <div className="contact-info">
            <p>
              <strong>Address:</strong> 123 AKTU Road, Lucknow, India
            </p>
            <p>
              <strong>Email:</strong> contact@aktuworld.com
            </p>
            <p>
              <strong>Website:</strong> www.aktuworld.com
            </p>
            <p>
              <strong>Phone:</strong> +91 9876543210
            </p>
          </div>

          <div className="contact-form">
            <h3>Send us a message</h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Phone Number" />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
