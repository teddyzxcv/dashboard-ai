export type DataSource = 'Jira' | 'Git' | 'HR' | 'APM' | 'Survey';
export type Level = 'employee' | 'team' | 'product';
export type ValueType = 'number' | 'percent';
export type Aggregation = 'sum' | 'avg' | 'min' | 'max';
export type TimeGrain = 'day' | 'week' | 'month';

export interface Metric {
  id: string;
  label: string;
  source: DataSource;
  level: Level;
  valueType: ValueType;
  aggregation: Aggregation;
  timeGrain: TimeGrain;
  isManual: boolean;
  description?: string;
}

export interface SavedFormula {
  id: string;
  name: string;
  expression: string;
  metricsUsed: string[]; // List of Metric IDs
  level: Level;
  outputType: 'KPI';
}

export interface SimulationContext {
  [metricId: string]: number;
}
