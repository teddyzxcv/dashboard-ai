import type { Metric, SimulationContext } from './types';

export const AVAILABLE_METRICS: Metric[] = [
  {
    id: 'jira_completed_story_points',
    label: 'Completed Story Points',
    source: 'Jira',
    level: 'employee',
    valueType: 'number',
    aggregation: 'sum',
    timeGrain: 'week',
    isManual: false,
    description: 'Total story points completed in the current sprint/period.'
  },
  {
    id: 'jira_bugs_raised',
    label: 'Bugs Raised',
    source: 'Jira',
    level: 'employee',
    valueType: 'number',
    aggregation: 'sum',
    timeGrain: 'week',
    isManual: false,
    description: 'Number of bugs raised by QA/Users against features.'
  },
  {
    id: 'overtime_hours',
    label: 'Overtime Hours',
    source: 'HR',
    level: 'employee',
    valueType: 'number',
    aggregation: 'sum',
    timeGrain: 'week',
    isManual: true,
    description: 'Hours worked beyond the standard schedule.'
  },
  {
    id: 'survey_burnout_risk',
    label: 'Burnout Risk Score',
    source: 'Survey',
    level: 'employee',
    valueType: 'percent',
    aggregation: 'avg',
    timeGrain: 'month',
    isManual: false,
    description: 'Calculated risk of burnout based on employee surveys (0.0 - 1.0).'
  },
  {
    id: 'feedback_nvc_index',
    label: 'NVC Feedback Index',
    source: 'HR',
    level: 'employee',
    valueType: 'number',
    aggregation: 'avg',
    timeGrain: 'month',
    isManual: false,
    description: 'Non-Violent Communication adherence score in feedback.'
  },
  {
    id: 'git_commits_count',
    label: 'Git Commits',
    source: 'Git',
    level: 'employee',
    valueType: 'number',
    aggregation: 'sum',
    timeGrain: 'day',
    isManual: false,
    description: 'Number of commits pushed to the main repository.'
  },
  {
    id: 'git_pr_review_time',
    label: 'PR Review Time (hrs)',
    source: 'Git',
    level: 'employee',
    valueType: 'number',
    aggregation: 'avg',
    timeGrain: 'week',
    isManual: false,
    description: 'Average time to review pull requests.'
  },
  {
    id: 'apm_error_rate',
    label: 'Error Rate',
    source: 'APM',
    level: 'product',
    valueType: 'percent',
    aggregation: 'avg',
    timeGrain: 'day',
    isManual: false,
    description: 'Percentage of requests resulting in 5xx errors.'
  }
];

export const MOCK_VALUES: SimulationContext = {
  jira_completed_story_points: 24,
  jira_bugs_raised: 2,
  overtime_hours: 6,
  survey_burnout_risk: 0.40,
  feedback_nvc_index: 0.70,
  git_commits_count: 12,
  git_pr_review_time: 4.5,
  apm_error_rate: 0.02
};

// Mock history for time-series charts (last 7 days/weeks)
export const MOCK_HISTORY: Record<string, number[]> = {
  jira_completed_story_points: [15, 20, 18, 25, 22, 24, 30],
  jira_bugs_raised: [1, 0, 2, 1, 3, 2, 1],
  overtime_hours: [0, 2, 5, 4, 8, 6, 2],
  survey_burnout_risk: [0.2, 0.25, 0.3, 0.35, 0.4, 0.4, 0.38],
  feedback_nvc_index: [0.6, 0.65, 0.68, 0.7, 0.72, 0.70, 0.75],
  git_commits_count: [5, 8, 12, 10, 15, 12, 18],
  git_pr_review_time: [5, 4, 6, 4.5, 3, 5, 4],
  apm_error_rate: [0.01, 0.015, 0.05, 0.02, 0.01, 0.02, 0.01]
};
