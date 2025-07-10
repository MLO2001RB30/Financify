import React, { useState } from 'react';

const Sidebar = ({ user, onLogout, isCollapsed, onToggleCollapse }) => {
  const [activeSection, setActiveSection] = useState('modeling');

  const navigationItems = [
    {
      id: 'overview',
      icon: '📊',
      label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'metrics', label: 'Key Metrics', icon: '📈' }
      ]
    },
    {
      id: 'modeling',
      icon: '🧮',
      label: 'Financial model',
      items: [
        { id: 'financial-model', label: 'Financial model', icon: '📊', active: true },
        { id: 'q2-forecast', label: 'Q2 Forecast', icon: '🔮' },
        { id: 'scenarios', label: 'Scenarios', icon: '🎯' }
      ]
    },
    {
      id: 'sheets',
      icon: '📋',
      label: 'Sheets',
      items: [
        { id: 'consolidation', label: 'Consolidation', icon: '📊' },
        { id: 'central-park', label: 'Central Park', icon: '🏢' },
        { id: 'brooklyn', label: 'Brooklyn', icon: '🏢' },
        { id: 'west-village', label: 'West Village', icon: '🏢' },
        { id: 'nyu-campus', label: 'NYU Campus', icon: '🏢' }
      ]
    },
    {
      id: 'analysis',
      icon: '🔍',
      label: 'Analysis',
      items: [
        { id: 'headcount', label: 'Headcount', icon: '👥' },
        { id: 'assumptions', label: 'Assumptions', icon: '📝' }
      ]
    }
  ];

  const integrations = [
    { id: 'sync-app', label: 'Synced app', icon: '🔄', status: 'connected' }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle" 
          onClick={onToggleCollapse}
          data-tooltip={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
        {!isCollapsed && (
          <div className="company-info">
            <div className="company-icon">🏢</div>
            <div className="company-details">
              <h3 className="company-name">{user.companyName}</h3>
              <p className="company-type">Technology Startup</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigationItems.map((section) => (
          <div key={section.id} className="nav-section">
            {!isCollapsed && (
              <div 
                className="section-header"
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <span className="section-icon">{section.icon}</span>
                <span className="section-label">{section.label}</span>
                <span className="expand-icon">
                  {activeSection === section.id ? '▼' : '▶'}
                </span>
              </div>
            )}
            
            {(isCollapsed || activeSection === section.id) && (
              <div className="nav-items">
                {section.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`nav-item ${item.active ? 'active' : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Integrations */}
      {!isCollapsed && (
        <div className="sidebar-integrations">
          <h4 className="integrations-title">
            <span className="help-icon">❓</span>
            Integrations
            <button className="refresh-btn">🔄</button>
          </h4>
          <div className="integration-items">
            {integrations.map((integration) => (
              <div key={integration.id} className="integration-item">
                <span className="integration-icon">{integration.icon}</span>
                <span className="integration-label">{integration.label}</span>
                <span className={`integration-status ${integration.status}`}>
                  {integration.status === 'connected' ? '✅' : '❌'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="user-profile">
            <div className="user-avatar">
              {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="user-details">
              <p className="user-name">{user.fullName}</p>
              <p className="user-email">{user.email}</p>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Logout">
              🚪
            </button>
          </div>
        )}
        {isCollapsed && (
          <button className="logout-btn collapsed" onClick={onLogout} title="Logout">
            🚪
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 