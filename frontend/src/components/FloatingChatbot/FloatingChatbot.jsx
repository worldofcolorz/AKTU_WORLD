import React, { useState, useEffect } from 'react';
import './floatingchatbot.css';

const FloatingChatbot = ({ onOpenChat }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show the widget after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show the help message after widget appears
      setTimeout(() => {
        setShowMessage(true);
        // Hide message after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowMessage(false);
    onOpenChat();
  };

  return (
    <div className={`floating-chatbot ${isVisible ? 'visible' : ''}`}>
      {showMessage && (
        <div className="chat-message">
          <div className="message-bubble">
            Hi! I'm your friend here to help you with your studies! 🤖
          </div>
          <div className="message-arrow"></div>
        </div>
      )}
      
      <button className="chatbot-button" onClick={handleClick}>
        <div className="robot-icon">
          <div className="robot-head">
            <div className="robot-eyes">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
            </div>
            <div className="robot-mouth"></div>
          </div>
          <div className="robot-body">
            <div className="robot-chest"></div>
          </div>
        </div>
        
        <div className="pulse-ring"></div>
        <div className="pulse-ring pulse-ring-2"></div>
      </button>
    </div>
  );
};

export default FloatingChatbot;
