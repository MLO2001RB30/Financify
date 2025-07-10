import React, { useState } from 'react';

const FinancialWidgets = ({ companyData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const metrics = {
    mrr: {
      current: 127000,
      previous: 107000,
      growth: 18.7,
      trend: 'up'
    },
    arr: {
      current: 1524000,
      previous: 1284000,
      growth: 18.7,
      trend: 'up'
    },
    cashBalance: {
      current: 642000,
      previous: 687000,
      growth: -6.5,
      trend: 'down',
      runway: 14.3
    },
    burnRate: {
      current: 45000,
      previous: 40000,
      growth: 12.5,
      trend: 'up'
    },
    customers: {
      current: 347,
      previous: 324,
      growth: 7.1,
      trend: 'up'
    },
    cac: {
      current: 850,
      previous: 980,
      growth: -13.3,
      trend: 'down'
    },
    ltv: {
      current: 12400,
      previous: 11800,
      growth: 5.1,
      trend: 'up'
    },
    churnRate: {
      current: 2.1,
      previous: 2.4,
      growth: -12.5,
      trend: 'down'
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatPercentage = (value) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const getGrowthColor = (growth, isInverse = false) => {
    const isPositive = isInverse ? growth < 0 : growth > 0;
    return isPositive ? '#10b981' : '#ef4444';
  };

  const MetricCard = ({ title, icon, value, subtitle, growth, trend, isInverse = false, suffix = '' }) => (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-info">
          <span className="metric-icon">{icon}</span>
          <span className="metric-title">{title}</span>
        </div>
        <div className="metric-period">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7d">7d</option>
            <option value="30d">30d</option>
            <option value="90d">90d</option>
          </select>
        </div>
      </div>
      
      <div className="metric-value">
        <span className="value-main">{value}{suffix}</span>
        {subtitle && <span className="value-subtitle">{subtitle}</span>}
      </div>
      
      <div className="metric-change">
        <span 
          className="change-indicator"
          style={{ color: getGrowthColor(growth, isInverse) }}
        >
          {trend === 'up' ? '↗' : '↘'} {formatPercentage(Math.abs(growth))}
        </span>
        <span className="change-period">vs last {selectedPeriod}</span>
      </div>
    </div>
  );

  const RunwayWidget = () => (
    <div className="runway-widget">
      <div className="runway-header">
        <h3>Cash Runway</h3>
        <div className="runway-status safe">Safe</div>
      </div>
      
      <div className="runway-main">
        <div className="runway-months">
          <span className="runway-number">{metrics.cashBalance.runway}</span>
          <span className="runway-label">months</span>
        </div>
        <div className="runway-date">
          <span>Runway until</span>
          <span className="runway-end-date">March 2025</span>
        </div>
      </div>
      
      <div className="runway-chart">
        <div className="chart-placeholder">
          📈 Cash Flow Projection Chart
        </div>
      </div>
      
      <div className="runway-breakdown">
        <div className="breakdown-item">
          <span>Current burn</span>
          <span>{formatCurrency(metrics.burnRate.current)}/mo</span>
        </div>
        <div className="breakdown-item">
          <span>Avg 3mo burn</span>
          <span>$42K/mo</span>
        </div>
      </div>
    </div>
  );

  const CustomerMetrics = () => (
    <div className="customer-metrics">
      <div className="metrics-header">
        <h3>Customer Metrics</h3>
        <div className="metrics-period">{selectedPeriod}</div>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-label">CAC</div>
          <div className="metric-main">{formatCurrency(metrics.cac.current)}</div>
          <div className="metric-change positive">
            ↘ {formatPercentage(Math.abs(metrics.cac.growth))}
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">LTV</div>
          <div className="metric-main">{formatCurrency(metrics.ltv.current)}</div>
          <div className="metric-change positive">
            ↗ {formatPercentage(metrics.ltv.growth)}
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">LTV/CAC</div>
          <div className="metric-main">{(metrics.ltv.current / metrics.cac.current).toFixed(1)}x</div>
          <div className="metric-change positive">Healthy</div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Churn Rate</div>
          <div className="metric-main">{metrics.churnRate.current}%</div>
          <div className="metric-change positive">
            ↘ {formatPercentage(Math.abs(metrics.churnRate.growth))}
          </div>
        </div>
      </div>
    </div>
  );

  const GrowthChart = () => (
    <div className="growth-chart">
      <div className="chart-header">
        <h3>Revenue Growth</h3>
        <div className="chart-controls">
          <button className="chart-btn active">MRR</button>
          <button className="chart-btn">ARR</button>
          <button className="chart-btn">Customers</button>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-placeholder">
          📊 Interactive Revenue Growth Chart
          <div className="chart-stats">
            <div>Current MRR: {formatCurrency(metrics.mrr.current)}</div>
            <div>Growth Rate: {formatPercentage(metrics.mrr.growth)} MoM</div>
            <div>Projected ARR: {formatCurrency(metrics.mrr.current * 12)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="financial-widgets">
      <div className="widgets-grid">
        {/* Key Metrics Row */}
        <div className="metrics-row">
          <MetricCard
            title="Monthly Recurring Revenue"
            icon="💰"
            value={formatCurrency(metrics.mrr.current)}
            growth={metrics.mrr.growth}
            trend={metrics.mrr.trend}
          />
          
          <MetricCard
            title="Annual Recurring Revenue"
            icon="🎯"
            value={formatCurrency(metrics.arr.current)}
            growth={metrics.arr.growth}
            trend={metrics.arr.trend}
          />
          
          <MetricCard
            title="Total Customers"
            icon="👥"
            value={metrics.customers.current.toLocaleString()}
            growth={metrics.customers.growth}
            trend={metrics.customers.trend}
          />
          
          <MetricCard
            title="Monthly Burn Rate"
            icon="🔥"
            value={formatCurrency(metrics.burnRate.current)}
            growth={metrics.burnRate.growth}
            trend={metrics.burnRate.trend}
            isInverse={true}
          />
        </div>

        {/* Runway and Customer Metrics */}
        <div className="detailed-row">
          <RunwayWidget />
          <CustomerMetrics />
        </div>

        {/* Growth Chart */}
        <div className="chart-row">
          <GrowthChart />
        </div>
      </div>
    </div>
  );
};

export default FinancialWidgets; 