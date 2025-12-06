import React from 'react';
import './Tabs.css';

const ProductTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-header">
        <h2>Оценка эффективности MVP и Продукта</h2>
      </div>
      <div className="dashboard-grid">
        {/* MVP Effectiveness */}
        <div className="card">
          <h3>Оценка эффективности MVP</h3>
          <div className="card-content">
            <div className="chart-placeholder">
              <span>График эффективности</span>
            </div>
            <div className="metric-value">85%</div>
            <div className="metric-label">Успешность MVP</div>
          </div>
        </div>

        {/* Operation Efficiency */}
        <div className="card">
          <h3>Оценка эффективности в эксплуатации</h3>
          <div className="card-content">
            <div className="chart-placeholder">
              <span>График эксплуатации</span>
            </div>
            <div className="metric-value">92%</div>
            <div className="metric-label">Uptime / Stability</div>
          </div>
        </div>

        {/* Anonymous Feedback */}
        <div className="card">
          <h3>Анонимные комментарии</h3>
          <div className="card-content">
            <div className="list-item">
              <span>"Отличный релиз, но нужно улучшить UX."</span>
            </div>
            <div className="list-item">
              <span>"Процесс деплоя стал быстрее."</span>
            </div>
            <div className="list-item">
              <span>"Не хватает документации по API."</span>
            </div>
          </div>
        </div>

        {/* Custom Dashboard Builder */}
        <div className="card">
          <h3>Конструктор дашборда</h3>
          <div className="card-content">
            <p>Создайте свою формулу успеха.</p>
            <div className="chart-placeholder" style={{ height: '100px' }}>
              <span>Drag & Drop Metrics</span>
            </div>
          </div>
        </div>

        {/* Triggers */}
        <div className="card">
          <h3>Триггеры метрик</h3>
          <div className="card-content">
            <div className="list-item">
              <span>CPU Usage &gt; 90%</span>
              <span className="tag">Critical</span>
            </div>
            <div className="list-item">
              <span>DAU &lt; 1000</span>
              <span className="tag">Warning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTab;

