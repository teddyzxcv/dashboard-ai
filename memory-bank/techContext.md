# Technical Context

## Development Environment
- **OS**: macOS
- **Shell**: zsh
- **Package Manager**: npm
- **Build Tool**: Vite

## Core Dependencies
| Package | Version | Purpose |
|Ob | | |
| `react` | ^19.2.0 | UI Library |
| `react-force-graph-2d` | ^1.29.0 | Canvas-based graph visualization |
| `typescript` | ~5.9.3 | Static typing |

## Data Structures
The project uses two main representations of data:
1.  **Hierarchy Tree** (`HierarchyNode`): Nested objects representing the full truth of the organization.
    - Attributes: `id`, `name`, `type`, `health`, `children`, `role`, `desc`.
2.  **Graph Data** (`GraphNode`, `GraphLink`): Flat arrays used by the visualization library.
    - Nodes contain visual properties like `x`, `y`, `color`, `val` (size).

## Constraints
- **Demo Nature**: Data is mocked and randomized on client load. No persistent backend.
- **Performance**: `react-force-graph-2d` uses HTML5 Canvas, which performs well for the expected node count (~100-500), but expanding *all* nodes at once might clutter the view.



