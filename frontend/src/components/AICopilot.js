import React, { useState, useRef, useEffect } from 'react';

const AICopilot = ({ companyData, financialData }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "🧠 Hi! I'm your AI Financial Copilot with contextual understanding of Financify Inc. I can analyze your data, generate reports, and help with strategic decisions.",
      timestamp: new Date(),
      suggestions: [
        "What was our EBITDA in Q2?",
        "Explain why revenue grew in June",
        "Show me our cash runway",
        "Compare Q1 vs Q2 performance",
        "Generate investor update for Q4",
        "Create scenario if we hire 3 people"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [pinnedInsights, setPinnedInsights] = useState([]);
  const [aiMode, setAiMode] = useState('analysis'); // analysis, scenarios, reports
  const messagesEndRef = useRef(null);

  // Enhanced company context for AI (MCP-style persistent context)
  const companyContext = {
    name: 'Financify Inc.',
    industry: 'Financial Technology',
    stage: 'Series A',
    employees: 28,
    foundedYear: 2023,
    businessModel: 'B2B SaaS',
    keyMetrics: {
      mrr: '$127K',
      cac: '$1,200',
      ltv: '$8,400',
      churnRate: '3.2%',
      grossMargin: '57%'
    },
    lastFunding: { amount: '$2.5M', date: '2024-03-15', lead: 'Andreessen Horowitz' },
    nextMilestones: ['Series A: $10M', 'Product expansion', 'Team scale to 50']
  };

  // Enhanced Financial data access for AI responses with context awareness
  const getFinancialInsight = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Investor update generation
    if (lowerQuery.includes('investor update') || lowerQuery.includes('investor report')) {
      return {
        type: 'investor-update',
        title: 'Q4 2024 Investor Update - Financify Inc.',
        summary: 'Strong Q4 performance with 139% revenue growth and first positive EBITDA quarter.',
        keyMetrics: {
          'Revenue': '$378K (+139% QoQ)',
          'EBITDA': '$102K (27% margin)',
          'Cash': '$642K (14.3 months runway)',
          'Customers': '+94 new customers'
        },
        highlights: [
          '🎯 Achieved profitability milestone 2 quarters ahead of plan',
          '🚀 3 enterprise deals closed ($50K+ ARR each)',
          '💰 Burn rate reduced by 35% through operational efficiency',
          '🏆 Product-market fit confirmed with 98% customer satisfaction'
        ],
        challenges: [
          'Rising customer acquisition costs in competitive market',
          'Need to scale engineering team for product roadmap'
        ],
        nextQuarter: [
          'Launch enterprise platform features',
          'Hire 5 engineers and 2 sales reps',
          'Begin Series A fundraising process'
        ],
        exportActions: ['📧 Email to investors', '💬 Send to Slack', '📝 Export to Notion']
      };
    }

    // Scenario generation
    if (lowerQuery.includes('scenario') || lowerQuery.includes('what if')) {
      let scenarioType = 'general';
      let assumptions = [];
      let impact = {};
      
      if (lowerQuery.includes('hire') || lowerQuery.includes('people')) {
        scenarioType = 'hiring';
        assumptions = ['3 new hires: 2 engineers ($120K each), 1 sales rep ($90K)', '+$45K/month OpEx increase', 'Ramp time: 3 months to full productivity'];
        impact = {
          'Monthly OpEx': '+$45K (was $35K, now $80K)',
          'Runway': '8.0 months (vs 14.3 months baseline)',
          'Revenue Impact': '+$25K/month after month 3',
          'Break-even': 'Month 6 with accelerated sales'
        };
      } else if (lowerQuery.includes('cut') || lowerQuery.includes('reduce')) {
        scenarioType = 'cost-cutting';
        assumptions = ['Reduce OpEx by 25%', 'Pause hiring for 6 months', 'Renegotiate vendor contracts'];
        impact = {
          'Monthly OpEx': '-$12K (was $35K, now $23K)',
          'Runway': '27.9 months (+95% extension)',
          'Revenue Impact': 'Minimal short-term impact',
          'Risk': 'Slower growth and potential talent loss'
        };
      }
      
      return {
        type: 'scenario-analysis',
        scenarioType,
        title: `Scenario: ${scenarioType.charAt(0).toUpperCase() + scenarioType.slice(1)} Impact`,
        assumptions,
        impact,
        recommendation: scenarioType === 'hiring' ? 
          '✅ Recommended: Strong revenue potential justifies the risk' : 
          '⚠️ Consider carefully: May slow growth momentum',
        confidence: scenarioType === 'hiring' ? 'High (85%)' : 'Medium (70%)',
        modelingDetails: 'Based on current burn rate, customer acquisition trends, and market conditions'
      };
    }
    
    // EBITDA queries
    if (lowerQuery.includes('ebitda')) {
      if (lowerQuery.includes('q2') || lowerQuery.includes('second quarter')) {
        return {
          type: 'financial-analysis',
          metric: 'EBITDA Q2',
          value: '$75K',
          calculation: 'Apr: $8K + May: $13K + Jun: $29K = $50K average',
          insight: 'Strong Q2 performance with 263% improvement from Q1. June was particularly strong due to new customer acquisitions.',
          chart: 'Q1: -$20K → Q2: $17K → Projected Q3: $30K'
        };
      }
      return {
        type: 'financial-analysis',
        metric: 'EBITDA Trend',
        value: '$37K (Dec)',
        calculation: 'Revenue $127K - Direct costs $55K - OPEX $35K = $37K',
        insight: 'EBITDA turned positive in April and has been consistently growing. Currently at 29% margin.',
        chart: 'Jan: -$10K → Jun: $29K → Dec: $37K'
      };
    }

    // Revenue queries
    if (lowerQuery.includes('revenue')) {
      if (lowerQuery.includes('june') || lowerQuery.includes('jun')) {
        return {
          type: 'financial-analysis',
          metric: 'June Revenue Growth',
          value: '$93K',
          calculation: '$93K vs May $67K = +39% MoM growth',
          insight: 'June surge driven by 3 new enterprise clients and expansion revenue from existing customers. Product launch campaign was highly effective.',
          breakdown: 'New customers: $28K • Expansion: $15K • Recurring: $50K'
        };
      }
      return {
        type: 'financial-analysis',
        metric: 'Revenue Trend',
        value: '$127K (Dec)',
        calculation: 'YoY growth: +380% • MoM growth: +15.4%',
        insight: 'Consistent growth with strong enterprise adoption. Revenue tripled since Q1.',
        chart: 'Q1 avg: $31K → Q2 avg: $67K → Q4 avg: $108K'
      };
    }

    // Cash runway queries
    if (lowerQuery.includes('runway') || lowerQuery.includes('cash')) {
      return {
        type: 'financial-analysis',
        metric: 'Cash Runway',
        value: '14.3 months',
        calculation: 'Cash: $642K ÷ Burn rate: $45K = 14.3 months',
        insight: 'Healthy runway with decreasing burn rate. Series A target should be Q3 2025.',
        recommendation: 'Start fundraising by Dec 2024 to maintain 6+ month buffer'
      };
    }

    // Comparison queries
    if (lowerQuery.includes('q1') && lowerQuery.includes('q2')) {
      return {
        type: 'comparison-analysis',
        metric: 'Q1 vs Q2 Performance',
        comparison: {
          q1: { revenue: '$93K', ebitda: '-$20K', customers: '+18' },
          q2: { revenue: '$222K', ebitda: '+$50K', customers: '+47' }
        },
        insight: 'Q2 showed massive improvement across all metrics. Revenue grew 139%, EBITDA went positive.',
        keyDrivers: ['Enterprise customer acquisition', 'Product-market fit', 'Operational efficiency']
      };
    }

    // General financial health
    if (lowerQuery.includes('health') || lowerQuery.includes('performance')) {
      return {
        type: 'health-analysis',
        metrics: {
          'Growth Rate': '+18.7% MoM - Excellent',
          'Gross Margin': '57% - Strong',
          'Burn Multiple': '0.35 - Efficient',
          'CAC Payback': '6 months - Good'
        },
        insight: 'Overall financial health is strong. Growth is accelerating while maintaining unit economics.',
        riskFactors: ['Rising CAC', 'Market saturation risk'],
        opportunities: ['Enterprise expansion', 'International markets']
      };
    }

    // Default response
    return {
      type: 'general',
      content: `I can help you analyze financial metrics like revenue, EBITDA, cash flow, and more. Try asking specific questions about periods or comparisons!`,
      suggestions: [
        "What's our gross margin trend?",
        "How is our burn rate changing?",
        "Show Q3 vs Q4 performance",
        "What are our key growth drivers?"
      ]
    };
  };

  // AI mode functions
  const switchAIMode = (mode) => {
    setAiMode(mode);
    const modeMessages = {
      'analysis': "🔍 Switched to Analysis mode. I'll help you understand your financial data and trends.",
      'scenarios': "🧪 Switched to Scenario mode. I can model different business scenarios and their impacts.", 
      'reports': "📋 Switched to Reports mode. I'll help generate investor updates and export data."
    };
    
    const aiMessage = {
      id: Date.now(),
      type: 'ai',
      content: modeMessages[mode],
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  const formatAIResponse = (insight) => {
    switch (insight.type) {
      case 'investor-update':
        return (
          <div className="ai-investor-update">
            <div className="update-header">
              <h4>{insight.title}</h4>
              <p className="update-summary">{insight.summary}</p>
            </div>
            
            <div className="key-metrics-section">
              <h5>📊 Key Metrics</h5>
              <div className="metrics-grid">
                {Object.entries(insight.keyMetrics).map(([metric, value]) => (
                  <div key={metric} className="metric-card-ai">
                    <span className="metric-label-ai">{metric}</span>
                    <span className="metric-value-ai">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="highlights-section">
              <h5>🌟 Key Highlights</h5>
              <ul className="highlights-list">
                {insight.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="challenges-section">
              <h5>⚠️ Challenges & Risks</h5>
              <ul className="challenges-list">
                {insight.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>

            <div className="next-quarter-section">
              <h5>🎯 Next Quarter Focus</h5>
              <ul className="next-quarter-list">
                {insight.nextQuarter.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="export-actions">
              <h5>📤 Export Options</h5>
              <div className="export-buttons">
                {insight.exportActions.map((action, index) => (
                  <button key={index} className="export-action-btn">
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'scenario-analysis':
        return (
          <div className="ai-scenario-analysis">
            <div className="scenario-header">
              <h4>{insight.title}</h4>
              <div className="scenario-confidence">
                Confidence: <span className="confidence-level">{insight.confidence}</span>
              </div>
            </div>

            <div className="assumptions-section">
              <h5>📋 Assumptions</h5>
              <ul className="assumptions-list">
                {insight.assumptions.map((assumption, index) => (
                  <li key={index}>{assumption}</li>
                ))}
              </ul>
            </div>

            <div className="impact-section">
              <h5>📈 Financial Impact</h5>
              <div className="impact-grid">
                {Object.entries(insight.impact).map(([metric, value]) => (
                  <div key={metric} className="impact-item">
                    <span className="impact-metric">{metric}:</span>
                    <span className="impact-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="recommendation-section">
              <h5>💡 Recommendation</h5>
              <div className="recommendation-text">{insight.recommendation}</div>
            </div>

            <div className="modeling-details">
              <p className="details-text">{insight.modelingDetails}</p>
            </div>

            <div className="scenario-actions">
              <button className="scenario-action-btn primary">📊 Run Full Model</button>
              <button className="scenario-action-btn secondary">💾 Save Scenario</button>
              <button className="scenario-action-btn secondary">📤 Share Analysis</button>
            </div>
          </div>
        );

      case 'financial-analysis':
        return (
          <div className="ai-financial-response">
            <div className="metric-header">
              <h4>{insight.metric}</h4>
              <span className="metric-value">{insight.value}</span>
            </div>
            {insight.calculation && (
              <div className="calculation">
                <strong>Calculation:</strong> {insight.calculation}
              </div>
            )}
            <div className="insight">
              <strong>Insight:</strong> {insight.insight}
            </div>
            {insight.chart && (
              <div className="trend-chart">
                <strong>Trend:</strong> {insight.chart}
              </div>
            )}
            {insight.breakdown && (
              <div className="breakdown">
                <strong>Breakdown:</strong> {insight.breakdown}
              </div>
            )}
            {insight.recommendation && (
              <div className="recommendation">
                <strong>💡 Recommendation:</strong> {insight.recommendation}
              </div>
            )}
          </div>
        );

      case 'comparison-analysis':
        return (
          <div className="ai-comparison-response">
            <h4>{insight.metric}</h4>
            <div className="comparison-grid">
              <div className="quarter-data">
                <h5>Q1</h5>
                {Object.entries(insight.comparison.q1).map(([key, value]) => (
                  <div key={key} className="metric-item">
                    <span className="metric-label">{key}:</span>
                    <span className="metric-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="quarter-data">
                <h5>Q2</h5>
                {Object.entries(insight.comparison.q2).map(([key, value]) => (
                  <div key={key} className="metric-item">
                    <span className="metric-label">{key}:</span>
                    <span className="metric-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="insight">{insight.insight}</div>
            <div className="key-drivers">
              <strong>Key Drivers:</strong>
              <ul>
                {insight.keyDrivers.map((driver, index) => (
                  <li key={index}>{driver}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'health-analysis':
        return (
          <div className="ai-health-response">
            <h4>{insight.type.replace('-', ' ')}</h4>
            <div className="health-metrics">
              {Object.entries(insight.metrics).map(([metric, status]) => (
                <div key={metric} className="health-metric">
                  <span className="metric-name">{metric}:</span>
                  <span className="metric-status">{status}</span>
                </div>
              ))}
            </div>
            <div className="insight">{insight.insight}</div>
            <div className="risks-opportunities">
              <div className="risks">
                <strong>⚠️ Risk Factors:</strong>
                <ul>
                  {insight.riskFactors.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
              <div className="opportunities">
                <strong>🚀 Opportunities:</strong>
                <ul>
                  {insight.opportunities.map((opp, index) => (
                    <li key={index}>{opp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="ai-general-response">
            <div className="content">{insight.content}</div>
            {insight.suggestions && (
              <div className="suggestions">
                <p><strong>Try asking:</strong></p>
                {insight.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-btn"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(suggestion), 100);
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const insight = getFinancialInsight(messageText);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: formatAIResponse(insight),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="ai-copilot enhanced">
      <div className="chat-header">
        <div className="ai-status">
          <div className="status-indicator online"></div>
          <span>AI Financial Copilot</span>
        </div>
        <div className="ai-mode-selector">
          <button 
            className={`mode-btn ${aiMode === 'analysis' ? 'active' : ''}`}
            onClick={() => switchAIMode('analysis')}
            title="Financial Analysis Mode"
          >
            🔍 Analysis
          </button>
          <button 
            className={`mode-btn ${aiMode === 'scenarios' ? 'active' : ''}`}
            onClick={() => switchAIMode('scenarios')}
            title="Scenario Modeling Mode"
          >
            🧪 Scenarios
          </button>
          <button 
            className={`mode-btn ${aiMode === 'reports' ? 'active' : ''}`}
            onClick={() => switchAIMode('reports')}
            title="Report Generation Mode"
          >
            📋 Reports
          </button>
        </div>
        <div className="chat-actions">
          <button className="chat-action-btn" title="Pin insight">📌</button>
          <button className="chat-action-btn" title="Clear chat">🗑️</button>
          <button className="chat-action-btn" title="Export conversation">📄</button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              {typeof message.content === 'string' ? message.content : message.content}
            </div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message ai typing">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="quick-actions">
          {aiMode === 'analysis' && (
            <>
              <button 
                className="quick-action-btn"
                onClick={() => handleSuggestionClick("What's our financial health?")}
              >
                📊 Health Check
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleSuggestionClick("Show Q4 performance")}
              >
                📈 Q4 Review
              </button>
            </>
          )}
          {aiMode === 'scenarios' && (
            <>
              <button 
                className="quick-action-btn"
                onClick={() => handleSuggestionClick("What if we hire 3 people?")}
              >
                👥 Hiring Scenario
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleSuggestionClick("Model cost reduction by 25%")}
              >
                ✂️ Cost Cutting
              </button>
            </>
          )}
          {aiMode === 'reports' && (
            <>
              <button 
                className="quick-action-btn"
                onClick={() => handleSuggestionClick("Generate investor update for Q4")}
              >
                📬 Investor Update
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleSuggestionClick("Create board deck for funding")}
              >
                📋 Board Deck
              </button>
            </>
          )}
        </div>
        
        <div className="input-area">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about revenue, EBITDA, cash flow, or any financial metric..."
            className="chat-input enhanced"
            rows="1"
          />
          <button 
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="send-button enhanced"
          >
            <span className="send-icon">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICopilot; 