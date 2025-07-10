import React from 'react';

const LandingPage = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="landing-page">
      {/* Header Navigation */}
      <header className="landing-header">
        <div className="container">
          <div className="nav-brand">
            <span className="logo">📊 Financify</span>
          </div>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#solution">Solution</a>
            <a href="#customers">Customers</a>
            <a href="#resources">Resources</a>
            <a href="#pricing">Pricing</a>
            <a href="#company">Company</a>
          </nav>
          <div className="nav-actions">
            <button className="btn-secondary" onClick={onLoginClick}>Log in</button>
            <button className="btn-primary" onClick={onSignupClick}>Get started →</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              The <span className="highlight">AI-powered</span><br />
              finance platform for<br />
              modern startups
            </h1>
            <p>
              Automate financial planning, track runway, and make data-driven decisions with 
              intelligent forecasting and real-time insights.
            </p>
            <div className="hero-actions">
              <button className="btn-primary-large" onClick={onSignupClick}>
                Start free trial
              </button>
              <a href="#demo" className="secondary-action">
                <span>▶</span>
                Watch demo
              </a>
            </div>
            <div className="trust-indicators">
              <span>Trusted by 1,000+ high-growth startups</span>
              <div className="trust-metrics">
                <div className="trust-metric">
                  <span className="number">$2.4B+</span>
                  <span className="label">Managed ARR</span>
                </div>
                <div className="trust-metric">
                  <span className="number">95%</span>
                  <span className="label">Accuracy rate</span>
                </div>
                <div className="trust-metric">
                  <span className="number">12mo</span>
                  <span className="label">Avg runway extension</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-tabs">
                  <span className="tab active">🚀 AI Insights</span>
                  <span className="tab">💰 Runway</span>
                  <span className="tab">📊 Forecasts</span>
                </div>
              </div>
              <div className="preview-content">
                <div className="ai-insights">
                  <div className="insight-card primary">
                    <div className="insight-icon">🎯</div>
                    <div className="insight-content">
                      <h4>Runway Alert</h4>
                      <p>Current burn rate: $45K/mo. Runway: 14.2 months</p>
                      <span className="insight-action">Optimize spend →</span>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">📈</div>
                    <div className="insight-content">
                      <h4>Growth Forecast</h4>
                      <p>Projected 240% ARR growth by Q4 2024</p>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">💡</div>
                    <div className="insight-content">
                      <h4>AI Recommendation</h4>
                      <p>Hire 2 engineers to reach growth targets</p>
                    </div>
                  </div>
                </div>
                <div className="metrics-grid">
                  <div className="metric">
                    <span className="metric-value positive">+$127K</span>
                    <span className="metric-label">MRR Growth</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">$642K</span>
                    <span className="metric-label">Cash Balance</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value negative">$45K</span>
                    <span className="metric-label">Monthly Burn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="features-header">
            <h2>Purpose-built for startup finance teams</h2>
            <p>From seed to Series C, Financify grows with your business</p>
          </div>
          <div className="features-grid">
            <div className="feature-card primary">
              <div className="feature-badge">🔥 Most Popular</div>
              <div className="feature-icon">🤖</div>
              <h3>AI Financial Copilot</h3>
              <p>Get instant answers about runway, burn optimization, and growth scenarios. 
                 Our AI analyzes your data to provide actionable insights in seconds.</p>
              <div className="feature-tags">
                <span>Runway forecasting</span>
                <span>Burn optimization</span>
                <span>Scenario planning</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Runway Tracking</h3>
              <p>Monitor cash flow, burn rate, and runway in real-time with automatic 
                 alerts when you need to take action.</p>
              <div className="feature-tags">
                <span>Live dashboards</span>
                <span>Smart alerts</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Investor-Ready Reports</h3>
              <p>Generate board decks, investor updates, and financial statements 
                 automatically with beautiful, professional formatting.</p>
              <div className="feature-tags">
                <span>Board decks</span>
                <span>Investor updates</span>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Seamless Integrations</h3>
              <p>Connect with Stripe, QuickBooks, your bank, and 50+ other tools. 
                 Data syncs automatically, no manual entry required.</p>
              <div className="feature-tags">
                <span>Auto-sync data</span>
                <span>50+ integrations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to 10x your financial insights?</h2>
          <p>Join 1,000+ startups using AI to make smarter financial decisions and extend runway by 12+ months</p>
          <div className="cta-actions">
            <button className="btn-primary-large" onClick={onSignupClick}>Start free trial</button>
            <span className="cta-note">✨ No credit card required • Setup in 5 minutes</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="logo">📊 Financify</span>
              <p>The future of financial planning</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#integrations">Integrations</a>
                <a href="#security">Security</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 