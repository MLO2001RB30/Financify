import React, { useState } from 'react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [activeView, setActiveView] = useState('Dashboard');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme');
  };

  // Sidebar Navigation Component
  const Sidebar = () => (
    <div className="nexus-sidebar">
      <div className="sidebar-header">
        <div className="brand-logo">
          <span className="logo-icon">⚡</span>
          <span className="brand-name">Nexus</span>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="nav-section">
          <div className="section-label">GENERAL</div>
          <nav className="nav-menu">
            <a href="#" className={`nav-item ${activeView === 'Dashboard' ? 'active' : ''}`}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💳</span>
              <span className="nav-text">Payment</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">👥</span>
              <span className="nav-text">Customers</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-text">Message</span>
              <span className="nav-badge">8</span>
            </a>
          </nav>
        </div>

        <div className="nav-section">
          <div className="section-label">TOOLS</div>
          <nav className="nav-menu">
            <a href="#" className="nav-item">
              <span className="nav-icon">📦</span>
              <span className="nav-text">Product</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🧾</span>
              <span className="nav-text">Invoice</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">📈</span>
              <span className="nav-text">Analytics</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🤖</span>
              <span className="nav-text">Automation</span>
              <span className="nav-tag">BETA</span>
            </a>
          </nav>
        </div>

        <div className="nav-section">
          <div className="section-label">SUPPORT</div>
          <nav className="nav-menu">
            <a href="#" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🛡️</span>
              <span className="nav-text">Security</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">❓</span>
              <span className="nav-text">Help</span>
            </a>
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="team-section">
          <div className="team-info">
            <div className="team-avatar">
              <span className="avatar-icon">📈</span>
            </div>
            <div className="team-details">
              <div className="team-name">Team</div>
              <div className="team-role">Marketing</div>
            </div>
          </div>
          <button className="upgrade-btn">Upgrade Plan</button>
        </div>
        <div className="copyright">© 2023 Nexus.io, Inc.</div>
      </div>
    </div>
  );

  // Main Dashboard Header
  const DashboardHeader = () => (
    <div className="dashboard-header">
      <div className="header-left">
        <h1 className="page-title">Dashboard</h1>
      </div>
             <div className="header-right">
         <div className="date-range">📅 Oct 18 - Nov 18</div>
         <select className="period-select" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
           <option>Monthly</option>
           <option>Weekly</option>
           <option>Daily</option>
         </select>
         <button className="action-btn">🔍 Filter</button>
         <button className="action-btn">📤 Export</button>
         <button className="action-btn theme-toggle" onClick={toggleTheme}>
           {isDarkTheme ? '☀️' : '🌙'} Theme
         </button>
       </div>
    </div>
  );

  // KPI Cards Component
  const KPICards = () => (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-title">
            <span className="kpi-icon">👁️</span>
            Page Views
            <span className="info-icon">ℹ️</span>
          </div>
        </div>
        <div className="kpi-value">12,450</div>
        <div className="kpi-change positive">15.8% ↗</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-title">
            <span className="kpi-icon">💰</span>
            Total Revenue
            <span className="info-icon">ℹ️</span>
          </div>
        </div>
        <div className="kpi-value">$ 363.95</div>
        <div className="kpi-change negative">34.0% ↓</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-title">
            <span className="kpi-icon">⚡</span>
            Bounce Rate
            <span className="info-icon">ℹ️</span>
          </div>
        </div>
        <div className="kpi-value">86.5%</div>
        <div className="kpi-change positive">24.2% ↗</div>
      </div>
    </div>
  );

  // Sales Overview Component
  const SalesOverview = () => (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">📊 Sales Overview</h3>
        <div className="card-actions">
          <button className="card-action">🔍 Filter</button>
          <button className="card-action">📶 Sort</button>
          <button className="card-action">⋯</button>
        </div>
      </div>
      <div className="card-content">
        <div className="chart-value">
          <span className="main-value">$ 9,257.51</span>
          <div className="value-change">
            <span className="change-percent positive">15.8% ↗</span>
            <span className="change-amount">+ $143.50 increased</span>
          </div>
        </div>
        <div className="stacked-chart">
          <div className="chart-bars">
            <div className="chart-month">
              <div className="month-label">Oct</div>
              <div className="stacked-bar">
                <div className="bar-segment china" style={{height: '60px'}}></div>
                <div className="bar-segment uk" style={{height: '40px'}}></div>
                <div className="bar-segment usa" style={{height: '30px'}}></div>
                <div className="bar-segment canada" style={{height: '20px'}}></div>
                <div className="bar-segment other" style={{height: '15px'}}></div>
              </div>
              <div className="month-value">$2,988.20</div>
            </div>
            <div className="chart-month">
              <div className="month-label">Nov</div>
              <div className="stacked-bar">
                <div className="bar-segment china" style={{height: '45px'}}></div>
                <div className="bar-segment uk" style={{height: '35px'}}></div>
                <div className="bar-segment usa" style={{height: '25px'}}></div>
                <div className="bar-segment canada" style={{height: '20px'}}></div>
                <div className="bar-segment other" style={{height: '18px'}}></div>
              </div>
              <div className="month-value">$1,765.09</div>
            </div>
            <div className="chart-month">
              <div className="month-label">Dec</div>
              <div className="stacked-bar">
                <div className="bar-segment china" style={{height: '70px'}}></div>
                <div className="bar-segment uk" style={{height: '50px'}}></div>
                <div className="bar-segment usa" style={{height: '40px'}}></div>
                <div className="bar-segment canada" style={{height: '30px'}}></div>
                <div className="bar-segment other" style={{height: '25px'}}></div>
              </div>
              <div className="month-value">$4,005.65</div>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color china"></span>
              <span className="legend-label">China</span>
            </div>
            <div className="legend-item">
              <span className="legend-color uk"></span>
              <span className="legend-label">UK</span>
            </div>
            <div className="legend-item">
              <span className="legend-color usa"></span>
              <span className="legend-label">USA</span>
            </div>
            <div className="legend-item">
              <span className="legend-color canada"></span>
              <span className="legend-label">Canada</span>
            </div>
            <div className="legend-item">
              <span className="legend-color other"></span>
              <span className="legend-label">Other</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Total Subscribers Component
  const TotalSubscribers = () => (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">👥 Total Subscriber</h3>
        <select className="card-select">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="card-content">
        <div className="chart-value">
          <span className="main-value">24,473</span>
          <div className="value-change">
            <span className="change-percent positive">8.3% ↗</span>
            <span className="change-amount">+ 749 increased</span>
          </div>
        </div>
        <div className="weekly-chart">
          <div className="week-bars">
            <div className="week-day">
              <div className="day-bar" style={{height: '20px'}}></div>
              <div className="day-label">Sun</div>
            </div>
            <div className="week-day">
              <div className="day-bar" style={{height: '30px'}}></div>
              <div className="day-label">Mon</div>
            </div>
            <div className="week-day">
              <div className="day-bar" style={{height: '25px'}}></div>
              <div className="day-label">Tue</div>
            </div>
            <div className="week-day">
              <div className="day-bar" style={{height: '35px'}}></div>
              <div className="day-label">Wed</div>
            </div>
            <div className="week-day">
              <div className="day-bar" style={{height: '40px'}}></div>
              <div className="day-label">Thu</div>
            </div>
            <div className="week-day">
              <div className="day-bar" style={{height: '60px'}}></div>
              <div className="day-label">Fri</div>
              <div className="day-value">3,874</div>
            </div>
            <div className="week-day">
              <div className="day-bar" style={{height: '15px'}}></div>
              <div className="day-label">Sat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sales Distribution Component
  const SalesDistribution = () => (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">📊 Sales Distribution</h3>
        <select className="card-select">
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>
      <div className="card-content">
        <div className="distribution-stats">
          <div className="stat-item">
            <div className="stat-icon website"></div>
            <div className="stat-details">
              <div className="stat-label">Website</div>
              <div className="stat-value">$ 374.82</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon mobile"></div>
            <div className="stat-details">
              <div className="stat-label">Mobile App</div>
              <div className="stat-value">$ 241.60</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon other"></div>
            <div className="stat-details">
              <div className="stat-label">Other</div>
              <div className="stat-value">$ 213.42</div>
            </div>
          </div>
        </div>
        <div className="donut-chart">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e7ff" strokeWidth="20"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#8b5cf6" strokeWidth="20" 
                    strokeDasharray="94 314" strokeDashoffset="0" transform="rotate(-90 60 60)"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#06b6d4" strokeWidth="20" 
                    strokeDasharray="63 314" strokeDashoffset="-94" transform="rotate(-90 60 60)"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="20" 
                    strokeDasharray="47 314" strokeDashoffset="-157" transform="rotate(-90 60 60)"/>
          </svg>
        </div>
      </div>
    </div>
  );

  // Integration List Component
  const IntegrationList = () => (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">📱 List of Integration</h3>
        <button className="see-all-btn">See All</button>
      </div>
      <div className="card-content">
        <div className="integration-table">
          <div className="table-header">
            <div className="table-col">APPLICATION</div>
            <div className="table-col">TYPE</div>
            <div className="table-col">RATE</div>
            <div className="table-col">PROFIT</div>
          </div>
          <div className="table-row">
            <div className="app-info">
              <div className="app-icon stripe">S</div>
              <span className="app-name">Stripe</span>
            </div>
            <div className="app-type">Finance</div>
            <div className="app-rate">
              <div className="rate-bar">
                <div className="rate-fill" style={{width: '40%'}}></div>
              </div>
              <span className="rate-text">40%</span>
            </div>
            <div className="app-profit">$650.00</div>
          </div>
          <div className="table-row">
            <div className="app-info">
              <div className="app-icon zapier">⚡</div>
              <span className="app-name">Zapier</span>
            </div>
            <div className="app-type">CRM</div>
            <div className="app-rate">
              <div className="rate-bar">
                <div className="rate-fill" style={{width: '80%'}}></div>
              </div>
              <span className="rate-text">80%</span>
            </div>
            <div className="app-profit">$720.50</div>
          </div>
          <div className="table-row">
            <div className="app-info">
              <div className="app-icon shopify">🛍️</div>
              <span className="app-name">Shopify</span>
            </div>
            <div className="app-type">Marketplace</div>
            <div className="app-rate">
              <div className="rate-bar">
                <div className="rate-fill" style={{width: '20%'}}></div>
              </div>
              <span className="rate-text">20%</span>
            </div>
            <div className="app-profit">$432.25</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="nexus-dashboard">
      <Sidebar />
      <div className="main-content">
        <DashboardHeader />
        <div className="dashboard-content">
          <KPICards />
          <div className="charts-row">
            <SalesOverview />
            <TotalSubscribers />
          </div>
          <div className="bottom-row">
            <SalesDistribution />
            <IntegrationList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 