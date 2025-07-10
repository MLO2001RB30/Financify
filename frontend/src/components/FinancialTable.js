import React, { useState } from 'react';

const FinancialTable = ({ title, icon, isExpanded, onToggle, rows, monthLabels }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [showBudgetComparison, setShowBudgetComparison] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);

  // Financial metric definitions for tooltips
  const metricDefinitions = {
    'Revenue': 'Total income generated from sales of goods or services before any costs are deducted',
    'Direct costs': 'Costs directly attributable to producing goods or services (COGS)',
    'Gross profit': 'Revenue minus direct costs - shows production efficiency',
    'Gross margin': 'Gross profit / Revenue - percentage showing profitability after direct costs',
    'OPEX': 'Operating expenses - overhead costs to run the business (salaries, rent, marketing)',
    'EBITDA': 'Earnings Before Interest, Taxes, Depreciation & Amortization - operational profitability',
    'Assets': 'Resources owned by the company that have economic value',
    'Liabilities': 'Debts and obligations the company owes to others',
    'Equity': 'Owner\'s stake in the company (Assets - Liabilities)',
    'Operations': 'Cash flow from day-to-day business operations',
    'Movement in period': 'Net change in cash position during the period'
  };

  // Get icon based on row type
  const getRowTypeIcon = (row) => {
    if (row.type === 'revenue') return '💰';
    if (row.type === 'cost') return '🔻';
    if (row.type === 'profit') return '📈';
    if (row.type === 'percentage') return '%';
    if (row.type === 'growth') return '🔺';
    return '';
  };

  // Get color indicator based on row type
  const getRowTypeColor = (row) => {
    if (row.type === 'revenue') return '#137333';
    if (row.type === 'cost') return '#d93025';
    if (row.type === 'profit') return '#1a73e8';
    if (row.type === 'percentage') return '#8e24aa';
    if (row.type === 'growth') return '#137333';
    return '#3c4043';
  };

  const getRowClassName = (row) => {
    let className = 'table-row';
    
    if (row.isHighlight) className += ' highlight';
    if (row.type === 'cost') className += ' cost';
    if (row.type === 'profit') className += ' profit';
    if (row.type === 'growth') className += ' growth';
    if (row.type === 'percentage') className += ' percentage';
    if (row.type === 'validation') className += ' validation';
    if (row.type === 'revenue') className += ' revenue';
    
    return className;
  };

  const getCellClassName = (value, type) => {
    let className = 'table-cell';
    
    if (type === 'cost' && value.includes('-')) {
      className += ' negative';
    } else if ((type === 'profit' || type === 'revenue') && !value.includes('-') && value !== '0K') {
      className += ' positive';
    } else if (type === 'percentage') {
      className += ' percentage-value';
    }
    
    return className;
  };

  const formatQuarterlyData = (monthLabels) => {
    const quarters = [];
    for (let i = 0; i < monthLabels.length; i += 3) {
      const quarterNum = Math.floor(i / 3) + 1;
      quarters.push({
        label: `Q${quarterNum} '24`,
        index: i + 2, // Position after 3rd month
        isQuarter: true
      });
    }
    return quarters;
  };

  const quarterlyData = formatQuarterlyData(monthLabels);

  // Budget data (mock data for demonstration)
  const getBudgetData = (row, monthIndex) => {
    const budgetVariations = {
      'Revenue': [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
      'Direct costs': [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34],
      'OPEX': [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
      'EBITDA': [-19, -17, -15, -13, -7, 1, 3, 5, 7, 9, 11, 13]
    };
    
    const budget = budgetVariations[row.label] ? budgetVariations[row.label][monthIndex] : 0;
    return budget;
  };

  const calculateDeviation = (actual, budget) => {
    if (budget === 0) return { percentage: 0, status: 'neutral' };
    
    const actualNum = parseFloat(actual.replace(/[K$,-]/g, ''));
    const deviation = ((actualNum - budget) / Math.abs(budget)) * 100;
    
    let status = 'neutral';
    if (Math.abs(deviation) > 15) {
      status = deviation > 0 ? 'positive' : 'negative';
    } else if (Math.abs(deviation) > 5) {
      status = 'warning';
    }
    
    return { percentage: deviation, status };
  };

  const formatBudgetValue = (budget) => {
    return budget >= 0 ? `${budget}K` : `-${Math.abs(budget)}K`;
  };

  // Forecast confidence calculation
  const getForecastConfidence = (monthIndex) => {
    // Assume current month is June (index 5), everything after is forecast
    const currentMonthIndex = 5;
    
    if (monthIndex <= currentMonthIndex) {
      return { level: 100, type: 'actual' };
    }
    
    // Confidence decreases over time for forecasts
    const monthsAhead = monthIndex - currentMonthIndex;
    let confidence = Math.max(95 - (monthsAhead * 8), 45);
    
    let type = 'high';
    if (confidence < 70) type = 'medium';
    if (confidence < 55) type = 'low';
    
    return { level: confidence, type };
  };

  const getConfidenceColor = (confidence) => {
    if (confidence.type === 'actual') return '#ffffff';
    if (confidence.type === 'high') return '#e8f5e8';
    if (confidence.type === 'medium') return '#fff3cd';
    return '#f8d7da';
  };

  const getConfidenceBorder = (confidence) => {
    if (confidence.type === 'actual') return '1px solid #dadce0';
    if (confidence.type === 'high') return '1px solid #34a853';
    if (confidence.type === 'medium') return '1px solid #ea8600';
    return '1px solid #d93025';
  };

  // Sparkline chart component
  const SparklineChart = ({ values, type }) => {
    const numericValues = values.map(val => parseFloat(val.replace(/[K$,-]/g, '')));
    const max = Math.max(...numericValues);
    const min = Math.min(...numericValues);
    const range = max - min;
    
    // Generate SVG path
    const pathData = numericValues.map((value, index) => {
      const x = (index / (numericValues.length - 1)) * 100;
      const y = range === 0 ? 50 : ((max - value) / range) * 80 + 10;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
    
    const getSparklineColor = () => {
      if (type === 'revenue' || type === 'profit') return '#137333';
      if (type === 'cost') return '#d93025';
      if (type === 'growth') return '#1a73e8';
      return '#5f6368';
    };
    
    const trend = numericValues[numericValues.length - 1] > numericValues[0] ? 'up' : 'down';
    
    return (
      <div className="sparkline-container">
        <svg width="60" height="20" className="sparkline-svg">
          <path
            d={pathData}
            fill="none"
            stroke={getSparklineColor()}
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Data points */}
          {numericValues.map((value, index) => {
            const x = (index / (numericValues.length - 1)) * 100;
            const y = range === 0 ? 50 : ((max - value) / range) * 80 + 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1"
                fill={getSparklineColor()}
                opacity="0.6"
              />
            );
          })}
        </svg>
        <div className={`trend-indicator ${trend}`}>
          {trend === 'up' ? '↗' : '↘'}
        </div>
      </div>
    );
  };

  // Auto-explanation for significant changes
  const getAutoExplanation = (row, monthIndex) => {
    if (monthIndex === 0) return null; // No previous month to compare
    
    const currentValue = parseFloat(row.values[monthIndex].replace(/[K$€kr,-]/g, ''));
    const previousValue = parseFloat(row.values[monthIndex - 1].replace(/[K$€kr,-]/g, ''));
    
    if (previousValue === 0) return null;
    
    const percentChange = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
    const threshold = 15; // Trigger explanation for changes > 15%
    
    if (Math.abs(percentChange) < threshold) return null;
    
    const monthLabelsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = monthLabelsShort[monthIndex];
    const previousMonth = monthLabelsShort[monthIndex - 1];
    
    const explanations = {
      'Revenue': {
        positive: [
          `${currentMonth} revenue surge (+${percentChange.toFixed(0)}%) driven by new enterprise client onboarding and product launch campaign success.`,
          `Strong ${currentMonth} performance (+${percentChange.toFixed(0)}%) from seasonal demand increase and marketing campaign effectiveness.`,
          `${currentMonth} revenue growth (+${percentChange.toFixed(0)}%) attributed to expansion revenue from existing customers and new market penetration.`
        ],
        negative: [
          `${currentMonth} revenue decline (-${Math.abs(percentChange).toFixed(0)}%) due to seasonal slowdown and delayed client renewals.`,
          `Revenue drop in ${currentMonth} (-${Math.abs(percentChange).toFixed(0)}%) caused by market competition and customer churn.`,
          `${currentMonth} underperformance (-${Math.abs(percentChange).toFixed(0)}%) from delayed product releases and sales pipeline gaps.`
        ]
      },
      'Direct costs': {
        positive: [
          `${currentMonth} cost increase (+${percentChange.toFixed(0)}%) due to higher production volume and material cost inflation.`,
          `Direct costs rose in ${currentMonth} (+${percentChange.toFixed(0)}%) from scaling operations and quality improvements.`,
          `${currentMonth} cost growth (+${percentChange.toFixed(0)}%) driven by supply chain pressures and increased manufacturing.`
        ],
        negative: [
          `${currentMonth} cost reduction (-${Math.abs(percentChange).toFixed(0)}%) achieved through process optimization and supplier negotiations.`,
          `Direct costs decreased in ${currentMonth} (-${Math.abs(percentChange).toFixed(0)}%) from automation initiatives and efficiency gains.`,
          `${currentMonth} cost savings (-${Math.abs(percentChange).toFixed(0)}%) from bulk purchasing and operational improvements.`
        ]
      },
      'OPEX': {
        positive: [
          `${currentMonth} OPEX increase (+${percentChange.toFixed(0)}%) from strategic hiring and office expansion initiatives.`,
          `Operating expenses rose in ${currentMonth} (+${percentChange.toFixed(0)}%) due to marketing spend and R&D investments.`,
          `${currentMonth} OPEX growth (+${percentChange.toFixed(0)}%) driven by team scaling and infrastructure upgrades.`
        ],
        negative: [
          `${currentMonth} OPEX reduction (-${Math.abs(percentChange).toFixed(0)}%) through cost optimization and remote work savings.`,
          `Operating expenses decreased in ${currentMonth} (-${Math.abs(percentChange).toFixed(0)}%) from process automation and efficiency programs.`,
          `${currentMonth} cost control (-${Math.abs(percentChange).toFixed(0)}%) achieved via strategic cost management and vendor renegotiation.`
        ]
      },
      'EBITDA': {
        positive: [
          `${currentMonth} EBITDA improvement (+${percentChange.toFixed(0)}%) reflects strong revenue growth and operational efficiency gains.`,
          `EBITDA surge in ${currentMonth} (+${percentChange.toFixed(0)}%) driven by revenue scale and cost optimization initiatives.`,
          `${currentMonth} profitability boost (+${percentChange.toFixed(0)}%) from improved unit economics and operational leverage.`
        ],
        negative: [
          `${currentMonth} EBITDA decline (-${Math.abs(percentChange).toFixed(0)}%) due to strategic investments in growth and market expansion.`,
          `EBITDA pressure in ${currentMonth} (-${Math.abs(percentChange).toFixed(0)}%) from increased competition and cost structure challenges.`,
          `${currentMonth} margin compression (-${Math.abs(percentChange).toFixed(0)}%) caused by pricing pressures and investment in future growth.`
        ]
      }
    };
    
    const rowExplanations = explanations[row.label];
    if (!rowExplanations) return null;
    
    const direction = percentChange > 0 ? 'positive' : 'negative';
    const explanationList = rowExplanations[direction];
    const randomExplanation = explanationList[Math.floor(Math.random() * explanationList.length)];
    
    return {
      text: randomExplanation,
      magnitude: Math.abs(percentChange).toFixed(0),
      direction,
      significance: Math.abs(percentChange) > 30 ? 'high' : Math.abs(percentChange) > 20 ? 'medium' : 'low'
    };
  };

  return (
    <div className="financial-table">
      <div className="table-header" onClick={onToggle}>
        <div className="header-left">
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          <span className="table-icon">{icon}</span>
          <h3 className="table-title">{title}</h3>
        </div>
        <div className="header-right">
          <button 
            className={`btn-table-action ${showBudgetComparison ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowBudgetComparison(!showBudgetComparison);
            }}
            title="Toggle Budget Comparison"
          >
            📊
          </button>
          <button className="btn-table-action" onClick={(e) => e.stopPropagation()}>
            ⚙️
          </button>
          <button className="btn-table-action" onClick={(e) => e.stopPropagation()}>
            📈
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="table-content">
          {/* Enhanced Table Header Row with Quarterly Indicators */}
          <div className="table-row header-row">
            <div className="table-cell row-label-cell">
              <span className="formula-indicator">fx</span>
            </div>
            {monthLabels.map((month, index) => (
              <div key={index} className="table-cell month-header">
                <div className="month-label">{month}</div>
                {(index + 1) % 3 === 0 && (
                  <div className="quarter-indicator">
                    Q{Math.floor(index / 3) + 1}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Data Rows with Budget Comparison */}
          {rows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Main Metric Row */}
              <div className={getRowClassName(row)}>
                <div 
                  className="table-cell row-label-cell"
                  onMouseEnter={() => setHoveredCell(`${rowIndex}-label`)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <div className="row-label">
                    <div className="label-main">
                      <span 
                        className="row-type-indicator"
                        style={{ color: getRowTypeColor(row) }}
                      >
                        {getRowTypeIcon(row)}
                      </span>
                      <span className="label-text">{row.label}</span>
                      {metricDefinitions[row.label] && (
                        <span className="info-icon" title="Click for definition">ⓘ</span>
                      )}
                    </div>
                    
                    {/* Add sparkline for main metrics */}
                    {['Revenue', 'Direct costs', 'OPEX', 'EBITDA', 'Gross profit'].includes(row.label) && (
                      <div className="sparkline-wrapper">
                        <SparklineChart values={row.values} type={row.type} />
                      </div>
                    )}
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredCell === `${rowIndex}-label` && metricDefinitions[row.label] && (
                    <div className="metric-tooltip">
                      <div className="tooltip-title">{row.label}</div>
                      <div className="tooltip-description">{metricDefinitions[row.label]}</div>
                    </div>
                  )}
                </div>
                
                {row.values.map((value, colIndex) => {
                  const confidence = getForecastConfidence(colIndex);
                  const explanation = getAutoExplanation(row, colIndex);
                  
                  return (
                    <div 
                      key={colIndex} 
                      className={`${getCellClassName(value, row.type)} ${confidence.type}-confidence ${explanation ? 'has-explanation' : ''}`}
                      onMouseEnter={() => setHoveredCell(`${rowIndex}-${colIndex}`)}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => setSelectedCell({
                        row: row,
                        month: monthLabels[colIndex],
                        monthIndex: colIndex,
                        value: value,
                        confidence: confidence,
                        explanation: explanation
                      })}
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: getConfidenceColor(confidence),
                        border: getConfidenceBorder(confidence)
                      }}
                    >
                      <span className="cell-value">{value}</span>
                      
                      {/* Forecast confidence indicator */}
                      {confidence.type !== 'actual' && (
                        <div className="confidence-indicator">
                          <span className={`confidence-level ${confidence.type}`}>
                            {confidence.level}%
                          </span>
                        </div>
                      )}
                      
                      {/* Auto-explanation indicator */}
                      {explanation && (
                        <div className={`explanation-indicator ${explanation.significance}`}>
                          <span className="explanation-icon">
                            {explanation.direction === 'positive' ? '📈' : '📉'}
                          </span>
                        </div>
                      )}
                      
                      {row.type === 'growth' && !value.includes('-') && value !== '0K' && (
                        <span className="growth-indicator">↗️</span>
                      )}
                      {row.type === 'revenue' && !value.includes('-') && value !== '0K' && (
                        <span className="growth-indicator">📈</span>
                      )}
                      
                      {/* Enhanced cell hover with confidence and explanation info */}
                      {hoveredCell === `${rowIndex}-${colIndex}` && (
                        <div className="cell-tooltip enhanced">
                          <div>
                            {confidence.type === 'actual' ? 'Actual data' : `Forecast - ${confidence.level}% confidence`}
                          </div>
                          <div className="cell-detail">{row.label} • {monthLabels[colIndex]}</div>
                          
                          {explanation && (
                            <div className="explanation-detail">
                              <div className="explanation-text">{explanation.text}</div>
                              <div className="explanation-meta">
                                Change: {explanation.direction === 'positive' ? '+' : '-'}{explanation.magnitude}%
                                {explanation.significance === 'high' && ' (Significant)'}
                              </div>
                            </div>
                          )}
                          
                          {confidence.type !== 'actual' && (
                            <div className="confidence-note">
                              {confidence.type === 'high' && 'High confidence forecast'}
                              {confidence.type === 'medium' && 'Medium confidence forecast'}
                              {confidence.type === 'low' && 'Low confidence forecast'}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Quarterly highlighting */}
                      {(colIndex + 1) % 3 === 0 && (
                        <div className="quarter-separator"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Budget Comparison Row */}
              {showBudgetComparison && ['Revenue', 'Direct costs', 'OPEX', 'EBITDA'].includes(row.label) && (
                <div className="table-row budget-row">
                  <div className="table-cell row-label-cell">
                    <div className="budget-label">
                      <span className="budget-indicator">📋</span>
                      <span className="budget-text">Budget</span>
                    </div>
                  </div>
                  
                  {row.values.map((actualValue, colIndex) => {
                    const budget = getBudgetData(row, colIndex);
                    const deviation = calculateDeviation(actualValue, budget);
                    
                    return (
                      <div 
                        key={colIndex} 
                        className="table-cell budget-cell"
                        title={`Deviation: ${deviation.percentage.toFixed(1)}%`}
                      >
                        <div className="budget-value">{formatBudgetValue(budget)}</div>
                        <div className={`deviation-indicator ${deviation.status}`}>
                          {deviation.percentage > 0 ? '+' : ''}{deviation.percentage.toFixed(1)}%
                          {deviation.status === 'positive' && ' ✅'}
                          {deviation.status === 'negative' && ' ❌'}
                          {deviation.status === 'warning' && ' ⚠️'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Cell Detail Modal */}
      {selectedCell && (
        <CellDetailModal 
          cellData={selectedCell}
          onClose={() => setSelectedCell(null)}
        />
      )}
    </div>
  );
};

// Cell Detail Modal Component
const CellDetailModal = ({ cellData, onClose }) => {
  const { row, month, monthIndex, value, confidence, explanation } = cellData;
  
  const formatCurrency = (val) => {
    if (typeof val === 'string' && val.includes('K')) return val;
    return `${val}K`;
  };

  const getDetailedBreakdown = () => {
    // Mock detailed breakdown data
    const breakdowns = {
      'Revenue': {
        'Enterprise': '45%',
        'SMB': '30%', 
        'Self-serve': '25%'
      },
      'Direct costs': {
        'Materials': '60%',
        'Labor': '25%',
        'Shipping': '15%'
      },
      'OPEX': {
        'Salaries': '65%',
        'Rent': '20%',
        'Marketing': '10%',
        'Other': '5%'
      }
    };
    
    return breakdowns[row.label] || {};
  };

  const getAIInsights = () => {
    const insights = [
      `${month} ${row.label.toLowerCase()} shows ${confidence.type !== 'actual' ? 'projected' : 'actual'} performance`,
      explanation ? explanation.text : `Standard performance within expected range for ${month}`,
      `This metric is ${confidence.type === 'actual' ? 'confirmed' : `forecasted with ${confidence.level}% confidence`}`
    ];
    
    return insights;
  };

  const breakdown = getDetailedBreakdown();
  const aiInsights = getAIInsights();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cell-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span className="row-type-indicator">
              {row.icon || '📊'}
            </span>
            <span>{row.label} • {month}</span>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="metric-summary">
            <div className="metric-value-large">{value}</div>
            <div className="metric-meta">
              {confidence.type === 'actual' ? (
                <span className="status-badge actual">✅ Actual</span>
              ) : (
                <span className={`status-badge forecast ${confidence.type}`}>
                  📊 Forecast ({confidence.level}% confidence)
                </span>
              )}
              
              {explanation && (
                <span className={`change-badge ${explanation.direction}`}>
                  {explanation.direction === 'positive' ? '📈' : '📉'} 
                  {explanation.magnitude}% vs prev month
                </span>
              )}
            </div>
          </div>

          {Object.keys(breakdown).length > 0 && (
            <div className="breakdown-section">
              <h4>Breakdown</h4>
              <div className="breakdown-items">
                {Object.entries(breakdown).map(([key, percentage]) => (
                  <div key={key} className="breakdown-item">
                    <span className="breakdown-label">{key}</span>
                    <span className="breakdown-value">{percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="ai-insights-section">
            <h4>🤖 AI Insights</h4>
            <div className="insights-list">
              {aiInsights.map((insight, index) => (
                <div key={index} className="insight-item">
                  <span className="insight-bullet">•</span>
                  <span className="insight-text">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="actions-section">
            <button className="action-btn secondary" onClick={onClose}>
              📝 Add Comment
            </button>
            <button className="action-btn secondary" onClick={onClose}>
              📊 View Chart
            </button>
            <button className="action-btn primary" onClick={onClose}>
              🔍 Drill Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTable; 