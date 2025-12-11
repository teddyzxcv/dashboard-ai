import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: 'Dec 9', guideline: 40, remaining: 40, isWeekend: false },
  { date: 'Dec 10', guideline: 36.9, remaining: 40, isWeekend: false },
  { date: 'Dec 11', guideline: 33.8, remaining: 40, isWeekend: false },
  { date: 'Dec 12', guideline: 30.8, remaining: 40, isWeekend: false },
  { date: 'Dec 13', guideline: 27.7, remaining: 22, isWeekend: true },
  { date: 'Dec 14', guideline: 24.6, remaining: 22, isWeekend: true },
  { date: 'Dec 15', guideline: 21.5, remaining: 22, isWeekend: true }, // Extending weekend visually
  { date: 'Dec 16', guideline: 18.5, remaining: 18, isWeekend: false },
  { date: 'Dec 17', guideline: 15.4, remaining: 14, isWeekend: false },
  { date: 'Dec 18', guideline: 12.3, remaining: 10, isWeekend: false },
  { date: 'Dec 19', guideline: 9.2, remaining: 6, isWeekend: false },
  { date: 'Dec 20', guideline: 6.2, remaining: 2, isWeekend: true },
  { date: 'Dec 21', guideline: 3.1, remaining: 2, isWeekend: true },
  { date: 'Dec 22', guideline: 0, remaining: 0, isWeekend: true },
];

const weekendAreas = [
  { x1: 'Dec 13', x2: 'Dec 15' },
  { x1: 'Dec 20', x2: 'Dec 22' },
];

const BurndownChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis 
            label={{ value: 'STORY POINTS', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#666', fontSize: '12px' } }}
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          
          {/* Weekend Highlights */}
          {weekendAreas.map((area, index) => (
             <ReferenceArea key={index} x1={area.x1} x2={area.x2} fill="#f0f0f0" fillOpacity={0.5} />
          ))}

          <Line 
            type="linear" 
            dataKey="guideline" 
            stroke="#999" 
            strokeWidth={2} 
            dot={false} 
            name="Руководство"
          />
          <Line 
            type="linear" 
            dataKey="remaining" 
            stroke="#d32f2f" 
            strokeWidth={2} 
            dot={{ r: 4, fill: '#fff', stroke: '#d32f2f', strokeWidth: 2 }} 
            name="Оставшиеся значения"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BurndownChart;

