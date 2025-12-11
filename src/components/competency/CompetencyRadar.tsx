import React from 'react';

interface RadarChartProps {
  data: Record<string, number>;
  maxValue?: number;
  size?: number;
  color?: string;
  labels?: Record<string, string>;
}

const RadarChart: React.FC<RadarChartProps> = ({ 
  data, 
  maxValue = 1, 
  size = 300, 
  color = 'rgba(255, 0, 50, 0.6)',
  labels
}) => {
  const keys = Object.keys(data);
  const numPoints = keys.length;
  const center = size / 2;
  const radius = (size / 2) - 40; // Padding for labels
  const angleSlice = (Math.PI * 2) / numPoints;

  // Helper to get coordinates
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleSlice - (Math.PI / 2); // Start from top
    const r = (value / maxValue) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points
  const points = keys.map((key, i) => {
    const { x, y } = getCoordinates(data[key], i);
    return `${x},${y}`;
  }).join(' ');

  // Generate grid levels (0.2, 0.4, 0.6, 0.8, 1.0)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="radar-chart-container" style={{ width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size}>
        {/* Grid Levels */}
        {levels.map((level, i) => {
          const levelPoints = keys.map((_, j) => {
            const { x, y } = getCoordinates(level * maxValue, j);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={i}
              points={levelPoints}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}

        {/* Axes */}
        {keys.map((_, i) => {
          const { x, y } = getCoordinates(maxValue, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={points}
          fill={color}
          stroke={color.replace('0.6', '1')}
          strokeWidth="2"
          fillOpacity="0.5"
        />

        {/* Labels */}
        {keys.map((key, i) => {
          const { x, y } = getCoordinates(maxValue * 1.15, i); // Place labels slightly outside
          const labelText = labels?.[key] || key;
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#333"
              fontWeight="500"
            >
              {labelText}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;

