# Active Context

## Current Status
The application is functional and meets the user's initial requirements for a demo.
- Basic hierarchy visualization is complete.
- Interaction (expand/collapse) is working.
- Custom visuals (labels, health colors, employee icons) are implemented.
- UI Overlay shows detailed information.
- **Data Model Update**: The mock data has been restructured to reflect the specific MTS Group hierarchy (Telecom, Ecosystem -> Fintech, Media, Adtech, Urent, MWS).
- **Tabbed Interface**: Expanding the application to include dedicated tabs for "Product", "Team", and "Employee" alongside the existing graph demo.

## Recent Changes
- **Documentation Update**: Updated project brief and context files to include new tab requirements.
- **Mock Data Reorganization**: Updated `mockData.ts` to match the specific business unit and product structure provided in the Mermaid diagram.
  - Root: MTS Group.
  - Major branches: Telecom and Ecosystem.
  - Ecosystem contains: Fintech, Media, Adtech, Urent, MWS.
  - Products are mapped specifically to these units.
- Added naming labels directly to nodes.
- Updated health color logic (Green ≥ 80, Yellow 40-79, Red < 40).
- Added "Role" and "Description" fields to Employee nodes.
- Added a "person" icon to Employee nodes in the graph.
- Localized the entire application to Russian (UI, Documentation, Mock Data).

## Next Steps
- Create `src/components/tabs` directory and components (`ProductTab`, `TeamTab`, `EmployeeTab`).
- Implement navigation in `App.tsx`.
- Flesh out the mock UI for each new tab based on the requirements (Charts, Forms, Triggers, etc.).
- Verify the Russian translations and layout adjustments.


## Active Decisions
- **Visual Style**: Sticking to a dark high-contrast theme for dashboard appeal.
- **Icon Implementation**: Using direct Canvas API calls (`ctx.arc`, etc.) for icons instead of loading external images to keep the demo self-contained and fast.
- **Data Structure**: Using a recursive `BusinessUnit` structure to accommodate the "Ecosystem" container which holds other Business Units.
