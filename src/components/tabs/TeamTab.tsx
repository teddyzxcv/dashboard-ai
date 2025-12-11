import React from 'react';
import FormulaBuilder from '../formula/FormulaBuilder';
import './Tabs.css';

const TeamTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-header">
        <h2>Оценка эффективности команды</h2>
      </div>
      <div className="dashboard-grid">
        {/* Team Effectiveness */}
        <div className="card">
          <h3>Эффективность команды</h3>
          <div className="card-content">
            <div className="chart-placeholder">
              <span>Velocity / Sprint Burndown</span>
            </div>
            <div className="metric-value">42 SP</div>
            <div className="metric-label">Средняя скорость спринта</div>
          </div>
        </div>

        {/* Anonymous Feedback */}
        <div className="card">
          <h3>Анонимные комментарии</h3>
          <div className="card-content">
            <div className="list-item">
              <span>"Нужно больше времени на рефакторинг."</span>
            </div>
            <div className="list-item">
              <span>"Дейли митинги слишком затянуты."</span>
            </div>
          </div>
        </div>

        {/* Triggers */}
        <div className="card">
          <h3>Триггеры команды</h3>
          <div className="card-content">
            <div className="list-item">
              <span>Пропущенные дедлайны &gt; 2</span>
              <span className="tag warning">Warning</span>
            </div>
          </div>
        </div>

        {/* Custom Dashboard - Spanning full width if possible or just as a large card */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <FormulaBuilder />
        </div>
      </div>
    </div>
  );
};

export default TeamTab;

