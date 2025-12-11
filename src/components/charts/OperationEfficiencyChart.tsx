import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '00:00', value: 94 },
  { time: '03:00', value: 95 },
  { time: '06:00', value: 92 },
  { time: '09:00', value: 88 },
  { time: '12:00', value: 96 },
  { time: '15:00', value: 98 },
  { time: '18:00', value: 95 },
  { time: '21:00', value: 93 },
];

const OperationEfficiencyChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e30611" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#e30611" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            domain={[80, 100]} 
            tick={{ fontSize: 10 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#e30611" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OperationEfficiencyChart;

