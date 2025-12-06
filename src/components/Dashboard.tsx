import { useState } from 'react';
import HealthGraph from './HealthGraph';
import type { GraphNode } from '../data/mockData';
import '../App.css';

function Dashboard() {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <HealthGraph onNodeHover={setHoveredNode} />
      
      {/* Overlay UI */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '12px',
        pointerEvents: 'none',
        backdropFilter: 'blur(4px)',
        minWidth: '250px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>MTS Health Dashboard</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Legend</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 8px #4ade80' }}></span>
            <span style={{ fontSize: '0.9rem' }}>Healthy (≥ 80)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#facc15', boxShadow: '0 0 8px #facc15' }}></span>
            <span style={{ fontSize: '0.9rem' }}>Warning (40 - 79)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f87171', boxShadow: '0 0 8px #f87171' }}></span>
            <span style={{ fontSize: '0.9rem' }}>Critical (0 - 39)</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
          {hoveredNode ? (
            <div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{hoveredNode.name}</h2>
              <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '10px' }}>
                {hoveredNode.type}
                {hoveredNode.role && <span style={{ color: '#fff', opacity: 0.8 }}> • {hoveredNode.role}</span>}
              </div>

              {hoveredNode.desc && (
                <div style={{ 
                  fontSize: '0.85rem', 
                  lineHeight: '1.4', 
                  color: 'rgba(255,255,255,0.8)', 
                  marginBottom: '15px',
                  fontStyle: 'italic' 
                }}>
                  "{hoveredNode.desc}"
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: hoveredNode.color 
                }}>
                  {hoveredNode.health}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Health Score</div>
              </div>
            </div>
          ) : (
            <p style={{ opacity: 0.6, fontSize: '0.9rem', margin: 0, fontStyle: 'italic' }}>
              Hover over a node to see details.<br/>
              Click to expand/collapse.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

