# MTS Health Dashboard - Project Brief

## Overview
A web-based demonstration dashboard for visualizing the organizational health of a company (specifically modeled after MTS). The application uses a force-directed graph to represent the hierarchy from the top company level down to individual employees, color-coding nodes based on "health" metrics.

## Core Features
- **Interactive Hierarchy**: Visualizes Company -> Business Unit -> Product -> Team -> Employee.
- **Health Visualization**: Nodes are color-coded based on health scores:
    - **Green**: Healthy (≥ 80)
    - **Yellow**: Warning (40 - 79)
    - **Red**: Critical (0 - 39)
- **Expand/Collapse**: Users can navigate the tree by clicking nodes to expand or collapse their children.
- **Detailed Inspection**: Hovering over a node provides detailed metrics, including roles and performance descriptions for employees.
- **Mock Data**: Generates a consistent, randomized data structure for demonstration purposes.
- **Localization**: Full Russian interface and data.

## Technology Stack
- **Frontend**: React 19, Vite, TypeScript
- **Visualization**: `react-force-graph-2d`
- **Styling**: CSS (Dark Mode)


