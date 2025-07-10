import React, { useState, useEffect } from 'react';

const ScenarioPlanning = ({ companyData }) => {
  const [activeScenario, setActiveScenario] = useState('hiring');
  const [scenarios, setScenarios] = useState([
    {
      id: 'hiring',
      name: 'Team Expansion',
      icon: '👨‍💻',
      description: 'Model the impact of scaling your team',
      status: 'active'
    },
    {
      id: 'funding',
      name: 'Funding Round',
      icon: '💰',
      description: 'Plan your next funding round',
      status: 'draft'
    },
    {
      id: 'growth',
      name: 'Growth Strategy',
      icon: '📈',
      description: 'Revenue and customer expansion',
      status: 'draft'
    },
    {
      id: 'market',
      name: 'Market Expansion',
      icon: '🌍',
      description: 'Enter new markets and segments',
      status: 'draft'
    }
  ]);

  const [scenarioData, setScenarioData] = useState({
    hiring: {
      engineers: 5,
      designers: 2,
      salesReps: 3,
      avgSalary: 90000,
      timeline: 6
    },
    funding: {
      amount: 2000000,
      valuation: 15000000,
      runway: 24,
      dilution: 13.3,
      timeline: 4
    },
    growth: {
      revenueGrowth: 25,
      customerGrowth: 20,
      pricingIncrease: 15,
      churnReduction: 0.5,
      timeline: 12
    },
    market: {
      targetMarkets: 3,
      marketSize: 50000000,
      penetration: 2.5,
      timeline: 18
    }
  });

  const baseMetrics = {
    mrr: 127000,
    burnRate: 45000,
    cashBalance: 642000,
    customers: 347,
    runway: 14.3,
    teamSize: 23
  };

  const [calculations, setCalculations] = useState({});

  useEffect(() => {
    // Recalculate whenever scenario data changes
    const newCalculations = {
      hiring: calculateHiringImpact(),
      funding: calculateFundingImpact(),
      growth: calculateGrowthImpact(),
      market: calculateMarketImpact()
    };
    setCalculations(newCalculations);
  }, [scenarioData]);

  const calculateHiringImpact = () => {
    const { engineers, designers, salesReps, avgSalary, timeline } = scenarioData.hiring;
    const totalHires = engineers + designers + salesReps;
    const additionalCost = totalHires * (avgSalary / 12);
    const newBurnRate = baseMetrics.burnRate + additionalCost;
    const newRunway = baseMetrics.cashBalance / newBurnRate;
    
    // Estimated revenue impact
    const revenueBoost = engineers * 3000 + designers * 1500 + salesReps * 8000;
    const breakEvenMonths = additionalCost / revenueBoost;
    const projectedMRR = baseMetrics.mrr + (revenueBoost * (timeline / 6));
    
    return {
      additionalCost,
      newBurnRate,
      newRunway,
      revenueBoost,
      breakEvenMonths,
      totalHires,
      projectedMRR,
      riskLevel: newRunway < 6 ? 'high' : newRunway < 12 ? 'medium' : 'low'
    };
  };

  const calculateFundingImpact = () => {
    const { amount, valuation, timeline } = scenarioData.funding;
    const newCashBalance = baseMetrics.cashBalance + amount;
    const newRunway = newCashBalance / baseMetrics.burnRate;
    const dilution = (amount / (valuation + amount)) * 100;
    const monthsAdded = newRunway - baseMetrics.runway;
    
    return {
      newCashBalance,
      newRunway,
      dilution,
      monthsAdded,
      postMoneyValuation: valuation + amount,
      timeToRaise: timeline
    };
  };

  const calculateGrowthImpact = () => {
    const { revenueGrowth, customerGrowth, pricingIncrease, timeline } = scenarioData.growth;
    const monthlyGrowthRate = revenueGrowth / 100 / 12;
    const projectedMRR = baseMetrics.mrr * Math.pow(1 + monthlyGrowthRate, timeline);
    const priceBoost = baseMetrics.mrr * (pricingIncrease / 100);
    const totalNewMRR = projectedMRR + priceBoost;
    
    const newCustomers = baseMetrics.customers * (1 + customerGrowth / 100);
    const arrProjection = totalNewMRR * 12;
    
    return {
      projectedMRR: totalNewMRR,
      mrrIncrease: totalNewMRR - baseMetrics.mrr,
      newCustomers,
      arrProjection,
      growthMultiple: totalNewMRR / baseMetrics.mrr
    };
  };

  const calculateMarketImpact = () => {
    const { targetMarkets, marketSize, penetration, timeline } = scenarioData.market;
    const totalAddressableMarket = marketSize * targetMarkets;
    const potentialCustomers = (totalAddressableMarket * penetration) / 100 / 1000; // Assuming $1K ARPA
    const potentialRevenue = potentialCustomers * 1000 / 12; // Monthly
    
    return {
      totalAddressableMarket,
      potentialCustomers: Math.round(potentialCustomers),
      potentialRevenue: Math.round(potentialRevenue),
      marketMultiple: potentialRevenue / baseMetrics.mrr
    };
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${Math.round(value).toLocaleString()}`;
  };

  const ScenarioTabs = () => (
    <div className="scenario-tabs">
      {scenarios.map(scenario => (
        <button
          key={scenario.id}
          className={`scenario-tab ${activeScenario === scenario.id ? 'active' : ''}`}
          onClick={() => setActiveScenario(scenario.id)}
        >
          <div className="tab-icon">{scenario.icon}</div>
          <div className="tab-content">
            <div className="tab-name">{scenario.name}</div>
            <div className="tab-description">{scenario.description}</div>
          </div>
          <div className={`tab-status ${scenario.status}`}>
            {scenario.status === 'active' ? '🟢' : scenario.status === 'draft' ? '🟡' : '⭕'}
          </div>
        </button>
      ))}
    </div>
  );

  const ScenarioOverview = () => (
    <div className="scenario-overview">
      <div className="overview-header">
        <h2>Scenario Planning Dashboard</h2>
        <p>Model different growth scenarios and their financial impact on your business</p>
      </div>
      
      <div className="overview-metrics">
        <div className="base-metrics">
          <h3>Current Baseline</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Monthly Recurring Revenue</div>
              <div className="metric-value">{formatCurrency(baseMetrics.mrr)}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Monthly Burn Rate</div>
              <div className="metric-value">{formatCurrency(baseMetrics.burnRate)}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Cash Runway</div>
              <div className="metric-value">{baseMetrics.runway}mo</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Team Size</div>
              <div className="metric-value">{baseMetrics.teamSize}</div>
            </div>
          </div>
        </div>

        <div className="scenarios-summary">
          <h3>Scenario Impact Summary</h3>
          <div className="summary-cards">
            {Object.entries(calculations).map(([key, calc]) => {
              if (!calc) return null;
              
              return (
                <div key={key} className="summary-card">
                  <div className="summary-header">
                    <span className="summary-icon">
                      {scenarios.find(s => s.id === key)?.icon}
                    </span>
                    <span className="summary-name">
                      {scenarios.find(s => s.id === key)?.name}
                    </span>
                  </div>
                  <div className="summary-impact">
                    {key === 'hiring' && (
                      <>
                        <div className="impact-item">
                          <span>Runway:</span>
                          <span className={calc.riskLevel === 'high' ? 'negative' : calc.riskLevel === 'medium' ? 'warning' : 'positive'}>
                            {calc.newRunway?.toFixed(1)}mo
                          </span>
                        </div>
                        <div className="impact-item">
                          <span>New MRR:</span>
                          <span className="positive">+{formatCurrency(calc.revenueBoost)}</span>
                        </div>
                      </>
                    )}
                    {key === 'funding' && (
                      <>
                        <div className="impact-item">
                          <span>Extended Runway:</span>
                          <span className="positive">+{calc.monthsAdded?.toFixed(1)}mo</span>
                        </div>
                        <div className="impact-item">
                          <span>Dilution:</span>
                          <span className="warning">{calc.dilution?.toFixed(1)}%</span>
                        </div>
                      </>
                    )}
                    {key === 'growth' && (
                      <>
                        <div className="impact-item">
                          <span>Projected MRR:</span>
                          <span className="positive">{formatCurrency(calc.projectedMRR)}</span>
                        </div>
                        <div className="impact-item">
                          <span>Growth Multiple:</span>
                          <span className="positive">{calc.growthMultiple?.toFixed(1)}x</span>
                        </div>
                      </>
                    )}
                    {key === 'market' && (
                      <>
                        <div className="impact-item">
                          <span>Potential Revenue:</span>
                          <span className="positive">{formatCurrency(calc.potentialRevenue)}</span>
                        </div>
                        <div className="impact-item">
                          <span>Market Multiple:</span>
                          <span className="positive">{calc.marketMultiple?.toFixed(1)}x</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const ScenarioDetails = () => {
    const currentScenario = scenarios.find(s => s.id === activeScenario);
    const currentCalculation = calculations[activeScenario];
    
    if (!currentScenario || !currentCalculation) return null;

    return (
      <div className="scenario-details">
        <div className="details-header">
          <div className="scenario-info">
            <span className="scenario-icon">{currentScenario.icon}</span>
            <div className="scenario-text">
              <h3>{currentScenario.name}</h3>
              <p>{currentScenario.description}</p>
            </div>
          </div>
          <div className="scenario-actions">
            <button className="action-btn secondary">Save Scenario</button>
            <button className="action-btn primary">Run Analysis</button>
          </div>
        </div>

        <div className="details-content">
          <div className="parameters-section">
            <h4>Scenario Parameters</h4>
            <div className="parameters-grid">
              {activeScenario === 'hiring' && (
                <>
                  <div className="parameter-group">
                    <label>Engineers to Hire</label>
                    <input
                      type="number"
                      value={scenarioData.hiring.engineers}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        hiring: { ...prev.hiring, engineers: parseInt(e.target.value) || 0 }
                      }))}
                      min="0"
                      max="20"
                    />
                  </div>
                  <div className="parameter-group">
                    <label>Designers to Hire</label>
                    <input
                      type="number"
                      value={scenarioData.hiring.designers}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        hiring: { ...prev.hiring, designers: parseInt(e.target.value) || 0 }
                      }))}
                      min="0"
                      max="10"
                    />
                  </div>
                  <div className="parameter-group">
                    <label>Sales Reps to Hire</label>
                    <input
                      type="number"
                      value={scenarioData.hiring.salesReps}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        hiring: { ...prev.hiring, salesReps: parseInt(e.target.value) || 0 }
                      }))}
                      min="0"
                      max="15"
                    />
                  </div>
                  <div className="parameter-group">
                    <label>Average Annual Salary</label>
                    <input
                      type="number"
                      value={scenarioData.hiring.avgSalary}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        hiring: { ...prev.hiring, avgSalary: parseInt(e.target.value) || 0 }
                      }))}
                      step="5000"
                    />
                  </div>
                </>
              )}
              
              {activeScenario === 'funding' && (
                <>
                  <div className="parameter-group">
                    <label>Funding Amount</label>
                    <input
                      type="number"
                      value={scenarioData.funding.amount}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        funding: { ...prev.funding, amount: parseInt(e.target.value) || 0 }
                      }))}
                      step="100000"
                    />
                  </div>
                  <div className="parameter-group">
                    <label>Pre-money Valuation</label>
                    <input
                      type="number"
                      value={scenarioData.funding.valuation}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        funding: { ...prev.funding, valuation: parseInt(e.target.value) || 0 }
                      }))}
                      step="1000000"
                    />
                  </div>
                  <div className="parameter-group">
                    <label>Target Runway (months)</label>
                    <input
                      type="number"
                      value={scenarioData.funding.runway}
                      onChange={(e) => setScenarioData(prev => ({
                        ...prev,
                        funding: { ...prev.funding, runway: parseInt(e.target.value) || 0 }
                      }))}
                      min="12"
                      max="48"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="results-section">
            <h4>Impact Analysis</h4>
            <div className="results-grid">
              {activeScenario === 'hiring' && (
                <>
                  <div className="result-card">
                    <div className="result-header">
                      <span className="result-icon">💰</span>
                      <span className="result-title">Financial Impact</span>
                    </div>
                    <div className="result-metrics">
                      <div className="metric-row">
                        <span>Additional Monthly Cost:</span>
                        <span className="metric-value negative">
                          {formatCurrency(currentCalculation.additionalCost)}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span>New Burn Rate:</span>
                        <span className="metric-value">
                          {formatCurrency(currentCalculation.newBurnRate)}/mo
                        </span>
                      </div>
                      <div className="metric-row">
                        <span>New Runway:</span>
                        <span className={`metric-value ${currentCalculation.riskLevel === 'high' ? 'negative' : currentCalculation.riskLevel === 'medium' ? 'warning' : 'positive'}`}>
                          {currentCalculation.newRunway.toFixed(1)} months
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="result-card">
                    <div className="result-header">
                      <span className="result-icon">📈</span>
                      <span className="result-title">Revenue Opportunity</span>
                    </div>
                    <div className="result-metrics">
                      <div className="metric-row">
                        <span>Monthly Revenue Boost:</span>
                        <span className="metric-value positive">
                          +{formatCurrency(currentCalculation.revenueBoost)}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span>Break-even Timeline:</span>
                        <span className="metric-value">
                          {currentCalculation.breakEvenMonths.toFixed(1)} months
                        </span>
                      </div>
                      <div className="metric-row">
                        <span>Projected MRR (6mo):</span>
                        <span className="metric-value positive">
                          {formatCurrency(currentCalculation.projectedMRR)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="scenario-planning-new">
      <ScenarioOverview />
      <ScenarioTabs />
      <ScenarioDetails />
    </div>
  );
};

export default ScenarioPlanning; 