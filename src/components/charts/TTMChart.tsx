import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { version: 'v1.0', days: 45 },
  { version: 'v1.1', days: 30 },
  { version: 'v1.2', days: 25 },
  { version: 'v2.0', days: 40 },
  { version: 'v2.1', days: 20 },
];

const TTMChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            dataKey="version" 
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
            cursor={{ fill: '#f5f5f5' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
          <Bar 
            dataKey="days" 
            fill="#e30611" 
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TTMChart;

