# System Patterns

## Architecture
The application follows a standard Single Page Application (SPA) architecture using React.

```mermaid
graph TD
    App[App Component] -->|Manages Hover State| Overlay[UI Overlay]
    App -->|Passes Hover Callback| Graph[HealthGraph Component]
    Graph -->|Uses| ForceGraph[react-force-graph-2d]
    Graph -->|Fetches/Manages| DataMgr[Data Manager (mockData)]
```

## Component Responsibilities

### `App.tsx`
- **Layout Container**: Holds the graph and the UI overlay.
- **State Management**: Tracks the currently `hoveredNode` to display details in the overlay.
- **UI Overlay**: Renders the legend and the details panel (Name, Health, Role, Description).

### `components/HealthGraph.tsx`
- **Graph Rendering**: Wraps `ForceGraph2D`.
- **Interaction Logic**: Handles node clicks for expansion/collapse logic.
- **Custom Rendering**: Uses `nodeCanvasObject` to draw custom node visuals (circles + text labels + icons for employees).
- **State Management**: Maintains `graphData` (visible nodes/links) and `expandedNodeIds` (tracking open branches).

### `data/mockData.ts`
- **Types**: Defines `HierarchyNode`, `GraphNode`, `NodeType`, etc.
- **Generation**: `generateFullTree()` creates the nested structure.
- **Helpers**: 
    - `getInitialGraphData()`: Returns root.
    - `getChildrenAsGraphData()`: Returns children for a parent.
    - `getAllDescendantIds()`: Helper for collapsing nodes recursively.
    - `getNodeColor()` / `getNodeSize()`: Visual styling logic.

## Design Patterns
- **On-Demand Loading (Mocked)**: The graph does not load the entire tree at once. It starts with the root and adds nodes to the dataset as the user expands them.
- **Canvas Customization**: extending the default force graph rendering context to add labels and icons directly to the canvas layer for performance and specific visual requirements.






