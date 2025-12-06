import hierarchyData from './hierarchy.yaml';

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


// Helper to generate random employees for a team
const generateEmployees = (teamId: string, count: number): HierarchyNode[] => {
  const firstNames = ['Иван', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Алексей', 'Елена', 'Андрей', 'Татьяна'];
  const lastNames = ['Иванов', 'Петрова', 'Сидоров', 'Смирнова', 'Кузнецов', 'Попова', 'Соколов', 'Лебедева', 'Козлов', 'Новикова'];
  const roles = ['QA Инженер', 'Продакт Менеджер', 'Frontend Разработчик', 'Backend Разработчик', 'DevOps Инженер', 'Data Scientist', 'UX Дизайнер'];
  
  const descriptions = [
    "Стабильно выдает качественный код и менторит младших сотрудников.",
    "Отлично находит граничные случаи, но стоит улучшить документацию.",
    "Лидирует новую инициативу по миграции в облако.",
    "Отличный коммуникатор, связующее звено между технарями и бизнесом.",
    "Недавно в команде, показывает отличный потенциал и быстро учится.",
    "Эксперт в своей области, к нему идут со сложными вопросами."
  ];

  return Array.from({ length: count }).map((_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const isFemale = ['а', 'я'].includes(firstName.slice(-1));
    if (isFemale && !lastName.endsWith('а')) {
      lastName += 'а';
    } else if (!isFemale && lastName.endsWith('а')) {
      lastName = lastName.slice(0, -1);
    }

    return {
      id: `${teamId}-emp-${i}`,
      name: `${firstName} ${lastName}`,
      type: 'Employee',
      health: generateRandomHealth(),
      role: roles[Math.floor(Math.random() * roles.length)],
      desc: descriptions[Math.floor(Math.random() * descriptions.length)],
      children: []
    };
  });
};

// Helper to generate random teams for a product
const generateTeams = (productId: string, count: number): HierarchyNode[] => {
  const teamNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega', 'Core', 'Platform', 'Feature'];
  
  return Array.from({ length: count }).map((_, i) => {
    const teamId = `${productId}-team-${i}`;
    const name = `Команда ${teamNames[i % teamNames.length]}`;
    return {
      id: teamId,
      name: name,
      type: 'Team',
      health: generateRandomHealth(),
      children: generateEmployees(teamId, 3) // 3 employees per team
    };
  });
};

// Recursive function to process YAML data
const processYamlNode = (node: any, parentId: string | null = null, index: number = 0): HierarchyNode => {
  // Use provided ID or generate one
  const id = node.id || (parentId ? `${parentId}-${index}` : 'root');
  const type = node.type as NodeType;
  
  let children: HierarchyNode[] = [];

  // If YAML has explicit children, process them recursively
  if (node.children && Array.isArray(node.children)) {
    children = node.children.map((child: any, i: number) => processYamlNode(child, id, i));
  } 
  // If it's a Product leaf in the YAML, generate mock Teams/Employees
  else if (type === 'Product') {
    // Generate 1-2 teams per product
    children = generateTeams(id, Math.floor(Math.random() * 2) + 1);
  }

  return {
    id,
    name: node.name,
    type,
    health: generateRandomHealth(),
    children
  };
};

export const generateFullTree = (): HierarchyNode => {
  return processYamlNode(hierarchyData);
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
  return '#FF0032'; // Red (MTS Brand)
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
