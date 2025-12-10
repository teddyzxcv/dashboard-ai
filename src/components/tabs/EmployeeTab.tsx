import React from 'react';
import './Tabs.css';

const EmployeeTab: React.FC = () => {
  return (
    <div className="tab-container">
      <div className="tab-header">
        <h2>Сотрудник: Иван Иванов (ML Engineer)</h2>
      </div>
      <div className="dashboard-grid">
        {/* ML Model Effectiveness */}
        <div className="card">
          <h3>Оценка эффективности (ML Model)</h3>
          <div className="card-content">
            <div className="chart-placeholder">
              <span>Performance Score</span>
            </div>
            <div className="metric-value">9.4/10</div>
            <div className="metric-label">AI Оценка производительности</div>
          </div>
        </div>

        {/* Competency Map */}
        <div className="card">
          <h3>Карта компетенций</h3>
          <div className="card-content">
            <div className="chart-placeholder">
              <span>Radar Chart</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span className="tag">Python</span>
              <span className="tag">PyTorch</span>
              <span className="tag">MLOps</span>
              <span className="tag">Docker</span>
            </div>
          </div>
        </div>

        {/* Social Graph */}
        <div className="card">
          <h3>Граф связей</h3>
          <div className="card-content">
            <div className="chart-placeholder">
              <span>Network Graph</span>
            </div>
            <p>Активное взаимодействие с командами Data Science и Backend.</p>
          </div>
        </div>

        {/* Custom Dashboard */}
        <div className="card">
          <h3>Личный дашборд</h3>
          <div className="card-content">
            <div style={{ marginBottom: '16px' }}>
              <span className="tag" style={{ backgroundColor: '#d1e7dd', color: '#0f5132' }}>Видно для сотрудника</span>
            </div>
            <p>Индивидуальные метрики роста.</p>
            <div className="list-item">
              <span>Курсы пройдено: 3</span>
            </div>
            <div className="list-item">
              <span>Менторство: 2 часа/неделю</span>
            </div>
          </div>
        </div>

        {/* Triggers */}
        <div className="card">
          <h3>Триггеры развития</h3>
          <div className="card-content">
            <div className="list-item">
              <span>Burnout Risk</span>
              <span className="tag low">Low</span>
            </div>
          </div>
        </div>

        {/* Recommendation for Manager */}
        <div className="card">
          <h3>Рекомендация (Менеджеру)</h3>
          <div className="card-content">
            <div style={{ marginBottom: '16px' }}>
              <span className="tag" style={{ backgroundColor: '#e3f2fd', color: '#0c5460' }}>Видно только для менеджера</span>
            </div>
            <p><strong>Цель:</strong> забота о ментальном здоровье сотрудника, а также его способности выполнять задачи</p>
            <p style={{ marginTop: '12px' }}>Сотрудник Иван Иванов не был в отпуске уже 180 дней, возможно стоит предложить ему отпуск.</p>
          </div>
        </div>

        {/* Recommendation for Employee */}
        <div className="card">
          <h3>Рекомендация (Сотруднику)</h3>
          <div className="card-content">
            <div style={{ marginBottom: '16px' }}>
              <span className="tag" style={{ backgroundColor: '#d1e7dd', color: '#0f5132' }}>Видно для сотрудника</span>
            </div>
            <p><strong>Цель:</strong> забота о своем ментальном здоровье</p>
            <p style={{ marginTop: '12px' }}>Наш помощник заметил, что вы давно не были в отпуске. Попробуйте спланировать, ваше здоровье превыше всего!</p>
          </div>
        </div>

        {/* ML Dismissal Model */}
        <div className="card" style={{ borderColor: '#d32f2f' }}>
          <h3>Прогноз увольнения (ML)</h3>
          <div className="card-content">
            <div style={{ marginBottom: '16px' }}>
              <span className="tag" style={{ backgroundColor: '#e3f2fd', color: '#0c5460' }}>Видно только для менеджера</span>
            </div>
            <div className="metric-value" style={{ color: '#d32f2f' }}>High Risk</div>
            <div className="metric-label">Вероятность ухода в ближайшие 3 мес.</div>
            <button className="btn-action">Анализ причин / Удержание</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTab;

