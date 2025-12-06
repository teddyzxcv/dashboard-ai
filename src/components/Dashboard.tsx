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
        top: 24,
        left: 24,
        color: 'var(--mts-black)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '24px',
        borderRadius: '24px',
        pointerEvents: 'none',
        backdropFilter: 'blur(8px)',
        minWidth: '280px',
        maxWidth: '320px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>MTS Health Dashboard</h1>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mts-dark-gray)', fontWeight: '600' }}>Legend</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 0 2px rgba(74, 222, 128, 0.2)' }}></span>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Healthy (≥ 80)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#facc15', boxShadow: '0 0 0 2px rgba(250, 204, 21, 0.2)' }}></span>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Warning (40 - 79)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f87171', boxShadow: '0 0 0 2px rgba(248, 113, 113, 0.2)' }}></span>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Critical (0 - 39)</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '20px' }}>
          {hoveredNode ? (
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: '700' }}>{hoveredNode.name}</h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--mts-dark-gray)', marginBottom: '16px', fontWeight: '500' }}>
                {hoveredNode.type}
                {hoveredNode.role && <span style={{ color: 'var(--mts-black)' }}> • {hoveredNode.role}</span>}
              </div>

              {hoveredNode.desc && (
                <div style={{ 
                  fontSize: '0.9rem', 
                  lineHeight: '1.5', 
                  color: 'var(--mts-black)', 
                  marginBottom: '20px',
                }}>
                  "{hoveredNode.desc}"
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '800', 
                  color: hoveredNode.color,
                  lineHeight: 1
                }}>
                  {hoveredNode.health}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--mts-dark-gray)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Health Score</div>
              </div>
            </div>
          ) : (
            <p style={{ opacity: 0.6, fontSize: '0.9rem', margin: 0, color: 'var(--mts-dark-gray)' }}>
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
