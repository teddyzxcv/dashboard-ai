export type NodeType = 'Company' | 'BusinessUnit' | 'Product' | 'Team' | 'Employee';

export interface HierarchyNode {
  id: string;
  name: string;
  type: NodeType;
  health: number;
  children?: HierarchyNode[];
  desc?: string; // Description or path
  role?: string; // For Employee nodes
}

const generateRandomHealth = () => Math.floor(Math.random() * 101);

const generateChildren = (
  parentId: string,
  level: number,
  count: number
): HierarchyNode[] => {
  const types: NodeType[] = ['Company', 'BusinessUnit', 'Product', 'Team', 'Employee'];
  const currentType = types[level];
  
  if (level >= types.length) return [];

  return Array.from({ length: count }).map((_, index) => {
    const id = `${parentId}-${index}`;
    let name = `${currentType} ${index + 1}`;
    let role: string | undefined;
    let desc: string | undefined;
    
    // Add some flavor names
    if (currentType === 'BusinessUnit') {
      const names = ['Telecom', 'Fintech', 'Media', 'Cloud', 'Retail'];
      name = names[index % names.length] || name;
    } else if (currentType === 'Product') {
      const names = ['Kion', 'MTS Music', 'MTS Bank App', 'Smart Home', 'Cloud Storage', 'Travel'];
      name = names[index % names.length] || name;
    } else if (currentType === 'Employee') {
      const firstNames = ['Ivan', 'Maria', 'Dmitry', 'Anna', 'Sergey', 'Olga'];
      const lastNames = ['Ivanov', 'Petrova', 'Sidorov', 'Smirnova', 'Kuznetsov', 'Popova'];
      name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      
      const roles = ['QA Engineer', 'Product Manager', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Data Scientist', 'UX Designer'];
      role = roles[Math.floor(Math.random() * roles.length)];
      
      const descriptions = [
        "Consistently delivers high-quality code and mentors juniors.",
        "Great at identifying edge cases, but needs to improve on documentation.",
        "Leading the new initiative for cloud migration.",
        "Excellent communicator, bridges the gap between tech and business.",
        "Recently joined, showing great potential and rapid learning.",
        "Expert in their field, go-to person for complex issues."
      ];
      desc = descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    return {
      id,
      name,
      type: currentType,
      health: generateRandomHealth(),
      children: [], 
      role,
      desc
    };
  });
};

// Helper to build a tree. 
// Root (MTS) -> 3 BUs -> 2 Products each -> 2 Teams each -> 3 Employees each
// Total nodes: 1 + 3 + (3*2) + (3*2*2) + (3*2*2*3) = 1 + 3 + 6 + 12 + 36 = 58 nodes. manageable.

export const generateFullTree = (): HierarchyNode => {
  const root: HierarchyNode = {
    id: 'root',
    name: 'MTS',
    type: 'Company',
    health: generateRandomHealth(),
    children: [],
  };

  // Level 1: Business Units
  root.children = generateChildren(root.id, 1, 4); // 4 BUs

  // Level 2: Products
  root.children.forEach(bu => {
    bu.children = generateChildren(bu.id, 2, 3); // 3 Products per BU
    
    // Level 3: Teams
    bu.children.forEach(prod => {
      prod.children = generateChildren(prod.id, 3, 2); // 2 Teams per Product

      // Level 4: Employees
      prod.children.forEach(team => {
        team.children = generateChildren(team.id, 4, 4); // 4 Employees per Team
      });
    });
  });

  return root;
};

export const mockData = generateFullTree();

// Graph Data Helpers
export interface GraphNode {
  id: string;
  name: string;
  type: NodeType;
  health: number;
  val?: number; // For visual size
  color?: string;
  role?: string;
  desc?: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const getNodeColor = (health: number) => {
  if (health >= 80) return '#4ade80'; // Green
  if (health >= 40) return '#facc15'; // Yellow
  return '#f87171'; // Red
};
export const getNodeSize = (type: NodeType) => {
  switch (type) {
    case 'Company': return 20;
    case 'BusinessUnit': return 15;
    case 'Product': return 10;
    case 'Team': return 7;
    case 'Employee': return 4;
    default: return 5;
  }
};

// Helper to find a node in the tree
const findNode = (id: string, node: HierarchyNode): HierarchyNode | null => {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(id, child);
      if (found) return found;
    }
  }
  return null;
};

export const getInitialGraphData = (): GraphData => {
  const root = mockData;
  return {
    nodes: [{
      id: root.id,
      name: root.name,
      type: root.type,
      health: root.health,
      val: getNodeSize(root.type),
      color: getNodeColor(root.health)
    }],
    links: []
  };
};

export const getChildrenAsGraphData = (parentId: string): GraphData | null => {
  const parentNode = findNode(parentId, mockData);
  if (!parentNode || !parentNode.children || parentNode.children.length === 0) return null;

  const nodes: GraphNode[] = parentNode.children.map(child => ({
    id: child.id,
    name: child.name,
    type: child.type,
    health: child.health,
    val: getNodeSize(child.type),
    color: getNodeColor(child.health),
    role: child.role,
    desc: child.desc
  }));

  const links: GraphLink[] = parentNode.children.map(child => ({
    source: parentId,
    target: child.id
  }));

  return { nodes, links };
};

export const getAllDescendantIds = (nodeId: string): string[] => {
  const node = findNode(nodeId, mockData);
  if (!node) return [];
  
  let ids: string[] = [];
  if (node.children) {
    node.children.forEach(child => {
      ids.push(child.id);
      ids = ids.concat(getAllDescendantIds(child.id));
    });
  }
  return ids;
};

