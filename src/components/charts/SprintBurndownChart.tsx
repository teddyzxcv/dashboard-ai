import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

const data = [
  { date: 'Dec 9', ideal: 40, actual: 40, isNonWorking: false },
  { date: 'Dec 10', ideal: 36.9, actual: 40, isNonWorking: false },
  { date: 'Dec 11', ideal: 33.8, actual: 40, isNonWorking: false },
  { date: 'Dec 12', ideal: 30.7, actual: 40, isNonWorking: false },
  { date: 'Dec 13', ideal: 27.6, actual: null, isNonWorking: true },
  { date: 'Dec 14', ideal: 24.5, actual: null, isNonWorking: true },
  { date: 'Dec 15', ideal: 21.4, actual: null, isNonWorking: true },
  { date: 'Dec 16', ideal: 18.3, actual: null, isNonWorking: false },
  { date: 'Dec 17', ideal: 15.2, actual: null, isNonWorking: false },
  { date: 'Dec 18', ideal: 12.1, actual: null, isNonWorking: false },
  { date: 'Dec 19', ideal: 9.0, actual: null, isNonWorking: false },
  { date: 'Dec 20', ideal: 5.9, actual: null, isNonWorking: true },
  { date: 'Dec 21', ideal: 2.8, actual: null, isNonWorking: true },
  { date: 'Dec 22', ideal: 0, actual: null, isNonWorking: true },
];

const SprintBurndownChart: React.FC = () => {
  const [showNonWorkingDays, setShowNonWorkingDays] = useState(true);

  // Identify non-working ranges for ReferenceArea
  const nonWorkingRanges = [];
  let start = null;
  
  for (let i = 0; i < data.length; i++) {
    if (data[i].isNonWorking) {
      if (start === null) start = data[i].date;
    } else {
      if (start !== null) {
        nonWorkingRanges.push({ start, end: data[i-1].date });
        start = null;
      }
    }
  }
  if (start !== null) {
    nonWorkingRanges.push({ start, end: data[data.length - 1].date });
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', right: 10, top: 0, zIndex: 10, fontSize: '12px', background: 'rgba(255,255,255,0.8)', padding: '5px', borderRadius: '4px' }}>
         <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showNonWorkingDays}
            onChange={(e) => setShowNonWorkingDays(e.target.checked)}
          />
          Показать нерабочие дни
        </label>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis 
            domain={[0, 45]} 
            tick={{ fontSize: 10 }} 
            label={{ value: 'STORY POINTS', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, fontSize: 10 }}
          />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          
          {showNonWorkingDays && nonWorkingRanges.map((range, index) => (
            <ReferenceArea
              key={index}
              x1={range.start}
              x2={range.end}
              fill="#eee"
              fillOpacity={0.5}
            />
          ))}

          <Line 
            type="monotone" 
            dataKey="ideal" 
            name="Руководство" 
            stroke="#999" 
            strokeWidth={2} 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            name="Оставшиеся значения" 
            stroke="#d32f2f" 
            strokeWidth={2} 
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SprintBurndownChart;

