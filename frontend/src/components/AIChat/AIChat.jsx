import React, { useState, useRef, useEffect } from 'react';
import './aichat.css';
import { apiPost } from '../../lib/api';

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m EduLorz AI, your intelligent study assistant. How can I help you with your learning today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const data = await apiPost('/api/ai/chat', {
        message: userMessage.content
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.response || 'Sorry, I could not generate a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorContent = 'Sorry, I encountered an error. Please try again later.';
      
      // Provide more specific error messages
      const msg = (error?.message || '').toString();
      if (msg.includes('Failed to fetch')) {
        errorContent = 'Unable to connect to the AI service. Please check if the backend server is running.';
      } else if (msg.includes('API Error: 500') || msg.includes('failed with 500')) {
        errorContent = 'AI service configuration error. Please check the Google AI API key setup.';
      } else if (msg.includes('API Error: 404') || msg.includes('failed with 404')) {
        errorContent = 'AI service endpoint not found. Please check the backend configuration.';
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: errorContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Hello! I\'m EduLorz AI, your intelligent study assistant. How can I help you with your learning today?',
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-modal">
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <div className="ai-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="7" y="3" width="10" height="8" rx="2" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <circle cx="10" cy="7" r="1" />
                <circle cx="14" cy="7" r="1" />
                <rect x="6" y="11" width="12" height="8" rx="2" />
                <line x1="6" y1="15" x2="4" y2="15" />
                <line x1="18" y1="15" x2="20" y2="15" />
              </svg>
            </div>
            <div>
              <h3>EduLorz AI</h3>
              <p>Your intelligent study assistant</p>
            </div>
          </div>
          <div className="ai-chat-controls">
            <button 
              className="ai-chat-clear" 
              onClick={clearChat}
              title="Clear conversation"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
            <button 
              className="ai-chat-close" 
              onClick={onClose}
              title="Close chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="ai-chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`ai-message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'ai' ? (
                  <div className="ai-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="7" y="3" width="10" height="8" rx="2" />
                      <circle cx="10" cy="7" r="1" />
                      <circle cx="14" cy="7" r="1" />
                    </svg>
                  </div>
                ) : (
                  <div className="user-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="ai-message ai">
              <div className="message-avatar">
                <div className="ai-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="7" y="3" width="10" height="8" rx="2" />
                    <circle cx="10" cy="7" r="1" />
                    <circle cx="14" cy="7" r="1" />
                  </svg>
                </div>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-chat-input">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              rows="1"
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9 22,2" />
              </svg>
            </button>
          </div>
          <div className="input-hint">
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
