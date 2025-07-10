import React, { useState } from 'react';

const InvestorReports = ({ companyData }) => {
  const [activeReportType, setActiveReportType] = useState('monthly');
  const [selectedPeriod, setSelectedPeriod] = useState('Dec 2024');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [reportTypes] = useState([
    {
      id: 'monthly',
      name: 'Monthly Update',
      icon: '📊',
      description: 'Standard monthly investor update with key metrics',
      frequency: 'Monthly',
      recipients: 15
    },
    {
      id: 'board',
      name: 'Board Deck',
      icon: '📋',
      description: 'Comprehensive board presentation with detailed analysis',
      frequency: 'Quarterly',
      recipients: 5
    },
    {
      id: 'fundraising',
      name: 'Fundraising Materials',
      icon: '💰',
      description: 'Pitch deck and data room for fundraising activities',
      frequency: 'As needed',
      recipients: 'Variable'
    },
    {
      id: 'annual',
      name: 'Annual Report',
      icon: '📈',
      description: 'Comprehensive annual review with full financial statements',
      frequency: 'Annually',
      recipients: 25
    }
  ]);

  const [monthlyMetrics] = useState({
    revenue: {
      current: 127000,
      previous: 110000,
      growth: 15.4
    },
    arr: {
      current: 1524000,
      previous: 1320000,
      growth: 15.4
    },
    customers: {
      current: 347,
      previous: 329,
      growth: 5.5
    },
    churn: {
      current: 2.1,
      previous: 2.4,
      change: -0.3
    },
    burnRate: {
      current: 45000,
      previous: 48000,
      change: -6.3
    },
    runway: {
      current: 14.3,
      previous: 13.8,
      change: 0.5
    }
  });

  const [achievements] = useState([
    {
      id: 1,
      icon: '🚀',
      title: 'Product Launch Success',
      description: 'Launched new AI forecasting feature, adopted by 78% of customers',
      impact: '+$23K MRR',
      date: '2024-12-15'
    },
    {
      id: 2,
      icon: '🤝',
      title: 'Strategic Partnership',
      description: 'Signed integration partnership with QuickBooks',
      impact: '15% faster onboarding',
      date: '2024-12-10'
    },
    {
      id: 3,
      icon: '👥',
      title: 'Team Expansion',
      description: 'Hired 3 senior engineers and 1 product designer',
      impact: '40% dev velocity increase',
      date: '2024-12-05'
    }
  ]);

  const [challenges] = useState([
    {
      id: 1,
      icon: '⚠️',
      title: 'Customer Acquisition Cost',
      description: 'CAC increased to $850, above target of $750',
      mitigation: 'Optimizing ad spend and improving conversion funnel',
      timeline: 'Q1 2025'
    },
    {
      id: 2,
      icon: '🔧',
      title: 'Technical Debt',
      description: 'Legacy code causing slower feature development',
      mitigation: 'Allocated 25% of dev time to refactoring',
      timeline: 'Ongoing'
    }
  ]);

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${Math.round(value).toLocaleString()}`;
  };

  const formatPercentage = (value) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // In a real app, this would download or email the report
    alert(`${reportTypes.find(r => r.id === activeReportType)?.name} generated successfully!`);
  };

  const ReportsOverview = () => (
    <div className="reports-overview">
      <div className="overview-header">
        <h2>Investor Relations Dashboard</h2>
        <p>Generate comprehensive reports and updates for your investors and board</p>
      </div>

      <div className="overview-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">12</div>
              <div className="stat-label">Reports Generated</div>
              <div className="stat-trend positive">+3 this month</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">45</div>
              <div className="stat-label">Active Investors</div>
              <div className="stat-trend positive">+5 new</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-value">98%</div>
              <div className="stat-label">Open Rate</div>
              <div className="stat-trend positive">+2% from last month</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">2.3</div>
              <div className="stat-label">Avg. Time to Read</div>
              <div className="stat-trend">minutes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-reports">
        <div className="section-header">
          <h3>Recent Reports</h3>
          <button className="view-all-btn">View All</button>
        </div>
        
        <div className="reports-list">
          <div className="report-item">
            <div className="report-info">
              <span className="report-icon">📊</span>
              <div className="report-details">
                <div className="report-name">Monthly Update - December 2024</div>
                <div className="report-meta">Sent to 15 investors • Dec 1, 2024</div>
              </div>
            </div>
            <div className="report-actions">
              <button className="action-btn-small">📄 View</button>
              <button className="action-btn-small">📤 Resend</button>
            </div>
          </div>
          
          <div className="report-item">
            <div className="report-info">
              <span className="report-icon">📋</span>
              <div className="report-details">
                <div className="report-name">Q4 2024 Board Deck</div>
                <div className="report-meta">Sent to 5 board members • Nov 28, 2024</div>
              </div>
            </div>
            <div className="report-actions">
              <button className="action-btn-small">📄 View</button>
              <button className="action-btn-small">📊 Analytics</button>
            </div>
          </div>
          
          <div className="report-item">
            <div className="report-info">
              <span className="report-icon">💰</span>
              <div className="report-details">
                <div className="report-name">Series A Data Room</div>
                <div className="report-meta">Updated Nov 15, 2024 • 47 documents</div>
              </div>
            </div>
            <div className="report-actions">
              <button className="action-btn-small">🔗 Share</button>
              <button className="action-btn-small">📁 Manage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportTypeSelector = () => (
    <div className="report-type-selector">
      <div className="selector-header">
        <h3>Report Types</h3>
        <p>Choose the type of report you want to generate</p>
      </div>
      
      <div className="report-types-grid">
        {reportTypes.map(type => (
          <button
            key={type.id}
            className={`report-type-card ${activeReportType === type.id ? 'active' : ''}`}
            onClick={() => setActiveReportType(type.id)}
          >
            <div className="type-icon">{type.icon}</div>
            <div className="type-content">
              <div className="type-name">{type.name}</div>
              <div className="type-description">{type.description}</div>
              <div className="type-meta">
                <span className="frequency">{type.frequency}</span>
                <span className="recipients">{type.recipients} recipients</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const MonthlyUpdateBuilder = () => (
    <div className="report-builder">
      <div className="builder-header">
        <div className="builder-info">
          <span className="builder-icon">📊</span>
          <div>
            <h3>Monthly Update Generator</h3>
            <p>Comprehensive monthly investor update with key metrics and highlights</p>
          </div>
        </div>
        <div className="period-selector">
          <label>Reporting Period:</label>
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="Dec 2024">December 2024</option>
            <option value="Nov 2024">November 2024</option>
            <option value="Oct 2024">October 2024</option>
          </select>
        </div>
      </div>

      <div className="builder-content">
        <div className="metrics-preview">
          <h4>Key Metrics Summary</h4>
          <div className="metrics-grid-preview">
            <div className="metric-preview">
              <div className="metric-header">
                <span className="metric-name">Monthly Recurring Revenue</span>
                <span className={`metric-trend ${monthlyMetrics.revenue.growth > 0 ? 'positive' : 'negative'}`}>
                  {formatPercentage(monthlyMetrics.revenue.growth)}
                </span>
              </div>
              <div className="metric-values">
                <span className="current-value">{formatCurrency(monthlyMetrics.revenue.current)}</span>
                <span className="previous-value">vs {formatCurrency(monthlyMetrics.revenue.previous)}</span>
              </div>
            </div>

            <div className="metric-preview">
              <div className="metric-header">
                <span className="metric-name">Annual Recurring Revenue</span>
                <span className={`metric-trend ${monthlyMetrics.arr.growth > 0 ? 'positive' : 'negative'}`}>
                  {formatPercentage(monthlyMetrics.arr.growth)}
                </span>
              </div>
              <div className="metric-values">
                <span className="current-value">{formatCurrency(monthlyMetrics.arr.current)}</span>
                <span className="previous-value">vs {formatCurrency(monthlyMetrics.arr.previous)}</span>
              </div>
            </div>

            <div className="metric-preview">
              <div className="metric-header">
                <span className="metric-name">Total Customers</span>
                <span className={`metric-trend ${monthlyMetrics.customers.growth > 0 ? 'positive' : 'negative'}`}>
                  {formatPercentage(monthlyMetrics.customers.growth)}
                </span>
              </div>
              <div className="metric-values">
                <span className="current-value">{monthlyMetrics.customers.current}</span>
                <span className="previous-value">vs {monthlyMetrics.customers.previous}</span>
              </div>
            </div>

            <div className="metric-preview">
              <div className="metric-header">
                <span className="metric-name">Monthly Churn Rate</span>
                <span className={`metric-trend ${monthlyMetrics.churn.change < 0 ? 'positive' : 'negative'}`}>
                  {formatPercentage(monthlyMetrics.churn.change)}
                </span>
              </div>
              <div className="metric-values">
                <span className="current-value">{monthlyMetrics.churn.current}%</span>
                <span className="previous-value">vs {monthlyMetrics.churn.previous}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="highlights-section">
          <div className="achievements-preview">
            <h4>Key Achievements</h4>
            <div className="achievements-list">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-item">
                  <span className="achievement-icon">{achievement.icon}</span>
                  <div className="achievement-content">
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-description">{achievement.description}</div>
                    <div className="achievement-impact">{achievement.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="challenges-preview">
            <h4>Challenges & Mitigations</h4>
            <div className="challenges-list">
              {challenges.map(challenge => (
                <div key={challenge.id} className="challenge-item">
                  <span className="challenge-icon">{challenge.icon}</span>
                  <div className="challenge-content">
                    <div className="challenge-title">{challenge.title}</div>
                    <div className="challenge-description">{challenge.description}</div>
                    <div className="challenge-mitigation">
                      <strong>Action:</strong> {challenge.mitigation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="builder-actions">
          <div className="preview-options">
            <button className="option-btn">📧 Email Preview</button>
            <button className="option-btn">📄 PDF Preview</button>
            <button className="option-btn">🎨 Customize Template</button>
          </div>
          
          <div className="generate-actions">
            <button 
              className="generate-btn primary"
              onClick={generateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Generating...
                </>
              ) : (
                <>
                  📊 Generate Report
                </>
              )}
            </button>
            <button className="generate-btn secondary">📤 Schedule Send</button>
          </div>
        </div>
      </div>
    </div>
  );

  const BoardDeckBuilder = () => (
    <div className="report-builder">
      <div className="builder-header">
        <div className="builder-info">
          <span className="builder-icon">📋</span>
          <div>
            <h3>Board Deck Generator</h3>
            <p>Comprehensive board presentation with 24 pre-built slides</p>
          </div>
        </div>
      </div>

      <div className="deck-outline">
        <h4>Presentation Outline</h4>
        <div className="slides-preview">
          <div className="slide-section">
            <div className="section-title">Executive Summary (3 slides)</div>
            <div className="slides-list">
              <div className="slide-item">1. Company Overview & Mission</div>
              <div className="slide-item">2. Key Metrics Dashboard</div>
              <div className="slide-item">3. Executive Summary</div>
            </div>
          </div>

          <div className="slide-section">
            <div className="section-title">Business Performance (8 slides)</div>
            <div className="slides-list">
              <div className="slide-item">4. Revenue Growth & ARR</div>
              <div className="slide-item">5. Customer Metrics & Cohorts</div>
              <div className="slide-item">6. Unit Economics & LTV/CAC</div>
              <div className="slide-item">7. Sales Funnel & Pipeline</div>
              <div className="slide-item">8. Product Usage & Engagement</div>
              <div className="slide-item">9. Market Position & Competitive Landscape</div>
              <div className="slide-item">10. Customer Success Stories</div>
              <div className="slide-item">11. Key Wins & Achievements</div>
            </div>
          </div>

          <div className="slide-section">
            <div className="section-title">Financial Review (6 slides)</div>
            <div className="slides-list">
              <div className="slide-item">12. P&L Statement</div>
              <div className="slide-item">13. Cash Flow & Burn Rate</div>
              <div className="slide-item">14. Balance Sheet Summary</div>
              <div className="slide-item">15. Runway Analysis</div>
              <div className="slide-item">16. Budget vs Actual</div>
              <div className="slide-item">17. Financial Projections</div>
            </div>
          </div>

          <div className="slide-section">
            <div className="section-title">Operations & Strategy (7 slides)</div>
            <div className="slides-list">
              <div className="slide-item">18. Team & Hiring</div>
              <div className="slide-item">19. Product Roadmap</div>
              <div className="slide-item">20. Technology & Infrastructure</div>
              <div className="slide-item">21. Go-to-Market Strategy</div>
              <div className="slide-item">22. Risk Assessment</div>
              <div className="slide-item">23. Ask & Use of Funds</div>
              <div className="slide-item">24. Q&A Discussion Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportBuilder = () => {
    switch (activeReportType) {
      case 'monthly':
        return <MonthlyUpdateBuilder />;
      case 'board':
        return <BoardDeckBuilder />;
      case 'fundraising':
        return (
          <div className="report-builder">
            <div className="builder-header">
              <div className="builder-info">
                <span className="builder-icon">💰</span>
                <div>
                  <h3>Fundraising Materials</h3>
                  <p>Pitch deck and data room for Series A fundraising</p>
                </div>
              </div>
            </div>
            <div className="coming-soon">
              <h4>🚧 Coming Soon</h4>
              <p>Advanced fundraising material generator is in development</p>
            </div>
          </div>
        );
      case 'annual':
        return (
          <div className="report-builder">
            <div className="builder-header">
              <div className="builder-info">
                <span className="builder-icon">📈</span>
                <div>
                  <h3>Annual Report</h3>
                  <p>Comprehensive annual review with full financial statements</p>
                </div>
              </div>
            </div>
            <div className="coming-soon">
              <h4>🚧 Coming Soon</h4>
              <p>Annual report generator will be available in Q1 2025</p>
            </div>
          </div>
        );
      default:
        return <MonthlyUpdateBuilder />;
    }
  };

  return (
    <div className="investor-reports-new">
      <ReportsOverview />
      <ReportTypeSelector />
      {renderReportBuilder()}
    </div>
  );
};

export default InvestorReports; 