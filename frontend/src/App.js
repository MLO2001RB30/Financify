import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState(null);
  const [showContextModal, setShowContextModal] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const messagesEndRef = useRef(null);
  const userId = 'demo-user'; // In production: use proper auth

  useEffect(() => {
    loadContext();
    setMessages([
      {
        role: 'assistant',
        content: 'Hi! I\'m Financify, your AI finance copilot. I can help with burn rate calculations, runway analysis, cap table modeling, and investor reporting. What would you like to know about your startup\'s finances?\n\n🔧 Note: This is a demo version. For full AI functionality, connect to the backend API with your OpenAI key.'
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadContext = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/context/${userId}`);
      if (response.ok) {
        const contextData = await response.json();
        setContext(contextData);
      } else {
        // Backend not available - use demo context
        setIsDemo(true);
        setContext({
          company_name: "Demo Startup",
          industry: "Technology",
          employees: 12,
          monthly_burn: 250000,
          cash_balance: 2500000,
          founded_date: "2024-01-01"
        });
      }
    } catch (error) {
      console.error('Backend not available, using demo mode:', error);
      setIsDemo(true);
      setContext({
        company_name: "Demo Startup", 
        industry: "Technology",
        employees: 12,
        monthly_burn: 250000,
        cash_balance: 2500000,
        founded_date: "2024-01-01"
      });
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (isDemo) {
        // Demo responses
        setTimeout(() => {
          let demoResponse = "I'd love to help you with that! However, this is a demo version of Financify. ";
          
          if (inputMessage.toLowerCase().includes('runway')) {
            demoResponse += `Based on your demo data:\n- Current cash: 2.5M DKK\n- Monthly burn: 250K DKK\n- Runway: ~10 months\n\nTo get real AI insights, please connect the backend with your OpenAI API key.`;
          } else if (inputMessage.toLowerCase().includes('hire') || inputMessage.toLowerCase().includes('ansæt')) {
            demoResponse += `Hiring analysis:\n- Current team: 12 people\n- Adding 2 developers would increase burn by ~60K DKK/month\n- New runway: ~8.5 months\n\nFor detailed analysis, connect to the full AI backend.`;
          } else {
            demoResponse += `For real-time financial analysis and AI-powered insights, please:\n1. Set up the backend server\n2. Add your OpenAI API key\n3. Connect to the full Financify system`;
          }
          
          setMessages(prev => [...prev, { role: 'assistant', content: demoResponse }]);
          setIsLoading(false);
        }, 2000);
        return;
      }

      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          user_id: userId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        throw new Error('Backend error');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error connecting to the backend. This is a demo version - for full functionality, please set up the backend server with your OpenAI API key.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContext = async (newContext) => {
    try {
      if (!isDemo) {
        await fetch(`${API_BASE}/api/context/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, ...newContext })
        });
      }
      setContext(newContext);
      setShowContextModal(false);
    } catch (error) {
      console.error('Failed to update context:', error);
      // Still update locally in demo mode
      setContext(newContext);
      setShowContextModal(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Financify</h1>
        <p>AI Finance Copilot for {context?.company_name || 'Your Startup'} {isDemo && '(Demo Mode)'}</p>
        <button 
          className="context-btn"
          onClick={() => setShowContextModal(true)}
        >
          ⚙️ Company Context
        </button>
      </header>

      {isDemo && (
        <div style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          color: 'white',
          padding: '0.75rem',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          🔧 Demo Mode - For full AI functionality, set up the backend with your OpenAI API key
        </div>
      )}

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
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

        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about burn rate, runway, cap table, hiring scenarios..."
            rows="3"
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>

      {showContextModal && (
        <ContextModal 
          context={context}
          onSave={updateContext}
          onClose={() => setShowContextModal(false)}
          isDemo={isDemo}
        />
      )}
    </div>
  );
}

function ContextModal({ context, onSave, onClose, isDemo }) {
  const [formData, setFormData] = useState(context || {
    company_name: '',
    industry: '',
    employees: 0,
    monthly_burn: 0,
    cash_balance: 0,
    founded_date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Company Context {isDemo && '(Demo)'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Company Name:
              <input 
                type="text"
                value={formData.company_name || ''}
                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
              />
            </label>
            
            <label>
              Industry:
              <input 
                type="text"
                value={formData.industry || ''}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              />
            </label>
            
            <label>
              Employees:
              <input 
                type="number"
                value={formData.employees || 0}
                onChange={(e) => setFormData({...formData, employees: parseInt(e.target.value)})}
              />
            </label>
            
            <label>
              Monthly Burn (DKK):
              <input 
                type="number"
                value={formData.monthly_burn || 0}
                onChange={(e) => setFormData({...formData, monthly_burn: parseFloat(e.target.value)})}
              />
            </label>
            
            <label>
              Cash Balance (DKK):
              <input 
                type="number"
                value={formData.cash_balance || 0}
                onChange={(e) => setFormData({...formData, cash_balance: parseFloat(e.target.value)})}
              />
            </label>
            
            <label>
              Founded Date:
              <input 
                type="date"
                value={formData.founded_date || ''}
                onChange={(e) => setFormData({...formData, founded_date: e.target.value})}
              />
            </label>
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save Context</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App; 