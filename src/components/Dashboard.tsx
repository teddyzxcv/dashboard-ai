import { useState } from 'react';
import HealthGraph from './HealthGraph';
import type { GraphNode, NodeType } from '../data/mockData';
import '../App.css';
import './Dashboard.css';

const nodeTypeLabels: Record<NodeType, string> = {
  Company: 'Компания',
  BusinessUnit: 'Бизнес-юнит',
  Product: 'Продукт',
  Team: 'Команда',
  Employee: 'Сотрудник'
};

function Dashboard() {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <HealthGraph onNodeHover={setHoveredNode} />
      
      {/* Overlay UI */}
      <div className="dashboard-overlay">
        <h1 className="dashboard-title">Дэшборд Здоровья МТС</h1>
        
        <div className="legend-section">
          <h3 className="legend-title">Легенда</h3>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#4ade80', boxShadow: '0 0 0 2px rgba(74, 222, 128, 0.2)' }}></span>
            <span className="legend-text">Здоров (≥ 80)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#facc15', boxShadow: '0 0 0 2px rgba(250, 204, 21, 0.2)' }}></span>
            <span className="legend-text">Внимание (40 - 79)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#f87171', boxShadow: '0 0 0 2px rgba(248, 113, 113, 0.2)' }}></span>
            <span className="legend-text">Критично (0 - 39)</span>
          </div>
        </div>

        <div className="details-section">
          {hoveredNode ? (
            <div>
              <h2 className="node-title">{hoveredNode.name}</h2>
              <div className="node-subtitle">
                {nodeTypeLabels[hoveredNode.type]}
                {hoveredNode.role && <span style={{ color: 'var(--mts-black)' }}> • {hoveredNode.role}</span>}
              </div>

              {hoveredNode.desc && (
                <div className="node-desc">
                  "{hoveredNode.desc}"
                </div>
              )}
              
              <div className="health-display">
                <div className="health-value" style={{ color: hoveredNode.color }}>
                  {hoveredNode.health}
                </div>
                <div className="health-label">Показатель Здоровья</div>
              </div>
            </div>
          ) : (
            <p className="empty-state">
              Наведите на узел для деталей.<br/>
              Нажмите для раскрытия/сворачивания.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
