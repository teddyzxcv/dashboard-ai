import React, { useState, useCallback, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { 
  getInitialGraphData, 
  getChildrenAsGraphData, 
  getAllDescendantIds, 
} from '../data/mockData';
import type { GraphData, GraphNode } from '../data/mockData';

interface HealthGraphProps {
  onNodeHover?: (node: GraphNode | null) => void;
}

const HealthGraph: React.FC<HealthGraphProps> = ({ onNodeHover }) => {
  const [graphData, setGraphData] = useState<GraphData>(getInitialGraphData());
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set());
  const fgRef = useRef<any>(null);

  const handleNodeClick = useCallback((node: any) => {
    const nodeId = node.id;
    const isExpanded = expandedNodeIds.has(nodeId);

    if (isExpanded) {
      // Collapse
      const descendantIds = getAllDescendantIds(nodeId);
      const descendantSet = new Set(descendantIds);
      
      setGraphData(prev => ({
        nodes: prev.nodes.filter(n => !descendantSet.has(n.id)),
        links: prev.links.filter(l => {
           const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
           const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
           return !descendantSet.has(sourceId) && !descendantSet.has(targetId);
        })
      }));
      
      setExpandedNodeIds(prev => {
        const next = new Set(prev);
        next.delete(nodeId);
        // Also remove descendants from expanded set to reset their state if re-expanded
        descendantIds.forEach(id => next.delete(id));
        return next;
      });

    } else {
      // Expand
      const childrenData = getChildrenAsGraphData(nodeId);
      if (childrenData) {
        setGraphData(prev => ({
          nodes: [...prev.nodes, ...childrenData.nodes],
          links: [...prev.links, ...childrenData.links]
        }));
        setExpandedNodeIds(prev => {
          const next = new Set(prev);
          next.add(nodeId);
          return next;
        });
      }
    }
  }, [expandedNodeIds]);

  const handleNodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = 14 / globalScale;
    const radius = node.val || 5;

    // Draw Node
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color || '#ffffff';
    ctx.fill();
    
    // Draw Border (optional, for better visibility)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5 / globalScale;
    ctx.stroke();

    // Draw Label
    ctx.font = `600 ${fontSize}px MTSText, Montserrat, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1D2023'; // MTS Black
    // Position text below the node
    ctx.fillText(label, node.x, node.y + radius + fontSize);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#F2F3F7' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeCanvasObject={handleNodeCanvasObject}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          const radius = node.val || 5;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fill();
        }} 
        onNodeClick={handleNodeClick}
        onNodeHover={onNodeHover}
        backgroundColor="#F2F3F7"
        linkColor={() => '#1D202320'} // Low opacity black for links
      />
    </div>
  );
};

export default HealthGraph;