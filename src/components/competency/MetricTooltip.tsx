import React from 'react';

interface MetricTooltipProps {
  text: string;
}

const MetricTooltip: React.FC<MetricTooltipProps> = ({ text }) => {
  return (
    <div className="metric-tooltip-container">
      <span className="tooltip-icon">?</span>
      <div className="tooltip-content">
        {text}
      </div>
    </div>
  );
};

export default MetricTooltip;

