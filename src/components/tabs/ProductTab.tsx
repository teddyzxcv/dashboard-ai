import React from 'react';
import './Tabs.css';
import OperationEfficiencyChart from '../charts/OperationEfficiencyChart';
import DAUChart from '../charts/DAUChart';
import TTMChart from '../charts/TTMChart';

const ProductTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-header">
        <h2>Оценка эффективности Продукта</h2>
      </div>
      <div className="dashboard-grid">
        {/* Operation Efficiency */}
        <div className="card">
          <h3>Оценка эффективности в эксплуатации</h3>
          <div className="card-content">
            <div style={{ height: '200px', width: '100%', marginBottom: '1rem' }}>
              <OperationEfficiencyChart />
            </div>
            <div className="metric-value">92%</div>
            <div className="metric-label">Uptime / Stability</div>
          </div>
        </div>

        {/* DAU */}
        <div className="card">
          <h3>DAU (Daily Active Users)</h3>
          <div className="card-content">
            <div style={{ height: '200px', width: '100%', marginBottom: '1rem' }}>
              <DAUChart />
            </div>
            <div className="metric-value">1,950</div>
            <div className="metric-label">Активные пользователи сегодня</div>
          </div>
        </div>

        {/* TTM */}
        <div className="card">
          <h3>TTM (Time to Market)</h3>
          <div className="card-content">
            <div style={{ height: '200px', width: '100%', marginBottom: '1rem' }}>
              <TTMChart />
            </div>
            <div className="metric-value">20 дней</div>
            <div className="metric-label">Последний релиз</div>
          </div>
        </div>

        {/* Other Metrics */}
        <div className="card">
          <h3>Другие метрики</h3>
          <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
             <p style={{ textAlign: 'center', color: '#666' }}>и другие метрики у вашего продукта</p>
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

