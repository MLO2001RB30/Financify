import React, { useState } from 'react';

const IntegrationsHub = ({ companyData }) => {
  const [integrations, setIntegrations] = useState({
    stripe: {
      name: 'Stripe',
      logo: '🔵',
      status: 'connected',
      lastSync: '2 minutes ago',
      data: {
        mrr: 127000,
        transactions: 1543,
        customers: 347
      }
    },
    quickbooks: {
      name: 'QuickBooks',
      logo: '🟢',
      status: 'connected',
      lastSync: '1 hour ago',
      data: {
        expenses: 45000,
        invoices: 89,
        accounts: 12
      }
    },
    mercury: {
      name: 'Mercury Bank',
      logo: '🔵',
      status: 'connected',
      lastSync: '30 minutes ago',
      data: {
        balance: 642000,
        transactions: 234,
        accounts: 2
      }
    },
    hubspot: {
      name: 'HubSpot',
      logo: '🟠',
      status: 'pending',
      lastSync: 'Never',
      data: null
    },
    slack: {
      name: 'Slack',
      logo: '🟣',
      status: 'connected',
      lastSync: '5 minutes ago',
      data: {
        alerts: 3,
        channels: 8
      }
    },
    intercom: {
      name: 'Intercom',
      logo: '🔵',
      status: 'error',
      lastSync: '2 days ago',
      data: null
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddIntegration, setShowAddIntegration] = useState(false);

  const categories = {
    all: { name: 'All Integrations', icon: '🔗' },
    payments: { name: 'Payments', icon: '💳' },
    banking: { name: 'Banking', icon: '🏦' },
    accounting: { name: 'Accounting', icon: '📊' },
    crm: { name: 'CRM & Sales', icon: '👥' },
    communication: { name: 'Communication', icon: '💬' }
  };

  const availableIntegrations = [
    { name: 'Plaid', category: 'banking', logo: '🟦', description: 'Connect bank accounts for real-time balance tracking' },
    { name: 'Xero', category: 'accounting', logo: '🔵', description: 'Sync financial data and automate bookkeeping' },
    { name: 'Salesforce', category: 'crm', logo: '🔵', description: 'Track deals and customer lifecycle' },
    { name: 'Notion', category: 'communication', logo: '⚫', description: 'Share reports and collaborate on planning' },
    { name: 'Google Sheets', category: 'accounting', logo: '🟢', description: 'Export data to spreadsheets automatically' },
    { name: 'Zapier', category: 'all', logo: '🟠', description: 'Connect to 1000+ apps with custom workflows' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return '✅';
      case 'pending': return '⏳';
      case 'error': return '❌';
      default: return '⚪';
    }
  };

  const handleConnect = (integrationKey) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        status: 'pending'
      }
    }));

    // Simulate connection process
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [integrationKey]: {
          ...prev[integrationKey],
          status: 'connected',
          lastSync: 'Just now'
        }
      }));
    }, 3000);
  };

  const handleDisconnect = (integrationKey) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        status: 'disconnected',
        lastSync: 'Never'
      }
    }));
  };

  const CategorySelector = () => (
    <div className="category-selector">
      {Object.entries(categories).map(([key, category]) => (
        <button
          key={key}
          className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
          onClick={() => setSelectedCategory(key)}
        >
          <span className="category-icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  );

  const IntegrationCard = ({ integrationKey, integration }) => (
    <div className={`integration-card ${integration.status}`}>
      <div className="integration-header">
        <div className="integration-info">
          <span className="integration-logo">{integration.logo}</span>
          <div className="integration-details">
            <h4>{integration.name}</h4>
            <div className="integration-status">
              <span className="status-indicator" style={{ color: getStatusColor(integration.status) }}>
                {getStatusIcon(integration.status)}
              </span>
              <span className="status-text">{integration.status}</span>
            </div>
          </div>
        </div>
        
        <div className="integration-actions">
          {integration.status === 'connected' ? (
            <div className="connected-actions">
              <button className="sync-btn">🔄</button>
              <button className="disconnect-btn" onClick={() => handleDisconnect(integrationKey)}>
                Disconnect
              </button>
            </div>
          ) : integration.status === 'pending' ? (
            <div className="pending-actions">
              <span className="pending-text">Connecting...</span>
            </div>
          ) : (
            <button 
              className="connect-btn"
              onClick={() => handleConnect(integrationKey)}
            >
              Connect
            </button>
          )}
        </div>
      </div>

      {integration.status === 'connected' && integration.data && (
        <div className="integration-data">
          <div className="data-header">
            <span>Last sync: {integration.lastSync}</span>
          </div>
          <div className="data-metrics">
            {Object.entries(integration.data).map(([key, value]) => (
              <div key={key} className="data-metric">
                <span className="metric-label">{key}</span>
                <span className="metric-value">
                  {typeof value === 'number' && value > 1000 
                    ? value.toLocaleString() 
                    : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {integration.status === 'error' && (
        <div className="integration-error">
          <span className="error-message">
            Connection failed. Please check credentials and try again.
          </span>
          <button className="retry-btn" onClick={() => handleConnect(integrationKey)}>
            Retry Connection
          </button>
        </div>
      )}
    </div>
  );

  const DataFlowDiagram = () => (
    <div className="data-flow">
      <h3>Data Flow Overview</h3>
      <div className="flow-diagram">
        <div className="flow-source">
          <div className="source-item">
            <span className="source-icon">🔵</span>
            <span>Stripe</span>
          </div>
          <div className="source-item">
            <span className="source-icon">🟢</span>
            <span>QuickBooks</span>
          </div>
          <div className="source-item">
            <span className="source-icon">🔵</span>
            <span>Mercury</span>
          </div>
        </div>
        
        <div className="flow-arrow">→</div>
        
        <div className="flow-center">
          <div className="center-hub">
            <span className="hub-icon">🤖</span>
            <span>AI Engine</span>
          </div>
        </div>
        
        <div className="flow-arrow">→</div>
        
        <div className="flow-destination">
          <div className="destination-item">
            <span className="dest-icon">📊</span>
            <span>Dashboard</span>
          </div>
          <div className="destination-item">
            <span className="dest-icon">📈</span>
            <span>Forecasts</span>
          </div>
          <div className="destination-item">
            <span className="dest-icon">💼</span>
            <span>Reports</span>
          </div>
        </div>
      </div>
      
      <div className="flow-stats">
        <div className="flow-stat">
          <span className="stat-value">Real-time</span>
          <span className="stat-label">Data sync</span>
        </div>
        <div className="flow-stat">
          <span className="stat-value">99.9%</span>
          <span className="stat-label">Uptime</span>
        </div>
        <div className="flow-stat">
          <span className="stat-value">Bank-grade</span>
          <span className="stat-label">Security</span>
        </div>
      </div>
    </div>
  );

  const AddIntegrationModal = () => (
    showAddIntegration && (
      <div className="modal-overlay" onClick={() => setShowAddIntegration(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Add New Integration</h3>
            <button 
              className="modal-close"
              onClick={() => setShowAddIntegration(false)}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <div className="available-integrations">
              {availableIntegrations.map((integration, index) => (
                <div key={index} className="available-integration">
                  <div className="available-info">
                    <span className="available-logo">{integration.logo}</span>
                    <div className="available-details">
                      <h4>{integration.name}</h4>
                      <p>{integration.description}</p>
                    </div>
                  </div>
                  <button className="add-btn">Add Integration</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );

  const SyncStatus = () => (
    <div className="sync-status">
      <div className="sync-header">
        <h3>Sync Status</h3>
        <button className="sync-all-btn">🔄 Sync All</button>
      </div>
      
      <div className="sync-timeline">
        <div className="sync-item recent">
          <span className="sync-time">2 min ago</span>
          <span className="sync-source">Stripe</span>
          <span className="sync-result success">✅ Synced 23 transactions</span>
        </div>
        <div className="sync-item">
          <span className="sync-time">30 min ago</span>
          <span className="sync-source">Mercury</span>
          <span className="sync-result success">✅ Updated account balance</span>
        </div>
        <div className="sync-item">
          <span className="sync-time">1 hour ago</span>
          <span className="sync-source">QuickBooks</span>
          <span className="sync-result success">✅ Imported 15 expenses</span>
        </div>
        <div className="sync-item error">
          <span className="sync-time">2 days ago</span>
          <span className="sync-source">Intercom</span>
          <span className="sync-result error">❌ Authentication failed</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="integrations-hub">
      <div className="hub-header">
        <div className="header-content">
          <h2>Integrations Hub</h2>
          <p>Connect your financial tools for automated data sync and insights</p>
        </div>
        <button 
          className="add-integration-btn"
          onClick={() => setShowAddIntegration(true)}
        >
          + Add Integration
        </button>
      </div>

      <CategorySelector />

      <div className="hub-content">
        <div className="integrations-grid">
          {Object.entries(integrations).map(([key, integration]) => (
            <IntegrationCard 
              key={key} 
              integrationKey={key} 
              integration={integration} 
            />
          ))}
        </div>

        <div className="hub-sidebar">
          <DataFlowDiagram />
          <SyncStatus />
        </div>
      </div>

      <AddIntegrationModal />
    </div>
  );
};

export default IntegrationsHub; 