import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '1 Dec', count: 1200 },
  { date: '2 Dec', count: 1350 },
  { date: '3 Dec', count: 1280 },
  { date: '4 Dec', count: 1450 },
  { date: '5 Dec', count: 1600 },
  { date: '6 Dec', count: 1550 },
  { date: '7 Dec', count: 1700 },
  { date: '8 Dec', count: 1850 },
  { date: '9 Dec', count: 1800 },
  { date: '10 Dec', count: 1950 },
];

const DAUChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 10 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#e30611" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#fff', stroke: '#e30611', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DAUChart;

