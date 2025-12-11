import React from 'react';
import type { Metric } from './types';
import { AVAILABLE_METRICS, MOCK_VALUES } from './mockMetrics';

interface MetricSelectorProps {
  onSelect: (metric: Metric) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ onSelect }) => {
  return (
    <div className="metric-selector">
      <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
        <strong>Sources</strong>
      </div>
      {AVAILABLE_METRICS.map(metric => (
        <div 
          key={metric.id} 
          className="metric-item"
          onClick={() => onSelect(metric)}
          title={`Click to add ${metric.id}`}
        >
          <div className="metric-item-header">
            <span>{metric.label}</span>
            <span className="metric-source">{metric.source}</span>
          </div>
          <div className="metric-desc">{metric.description}</div>
          <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#666', display: 'flex', justifyContent: 'space-between' }}>
             <span>ID: <code>{metric.id}</code></span>
             <span style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
               Val: {MOCK_VALUES[metric.id] ?? 'N/A'}
             </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricSelector;
