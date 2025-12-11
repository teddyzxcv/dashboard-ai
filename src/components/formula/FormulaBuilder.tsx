import React, { useState, useEffect } from 'react';
import MetricSelector from './MetricSelector';
import FormulaEditor from './FormulaEditor';
import FormulaPreview from './FormulaPreview';
import { evaluateFormula, validateFormula } from './formulaUtils';
import { MOCK_VALUES } from './mockMetrics';
import './FormulaStyles.css';

const FormulaBuilder: React.FC = () => {
  // Complex example formula from spec
  const [expression, setExpression] = useState<string>(
    '0.35 * norm(jira_completed_story_points, 0, 40) + 0.25 * invert(norm(overtime_hours, 0, 10)) + 0.25 * invert(survey_burnout_risk) + 0.15 * feedback_nvc_index'
  );
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Debounce evaluation
    const timer = setTimeout(() => {
      const valError = validateFormula(expression);
      if (valError) {
        setError(valError);
        setResult(null);
        return;
      }

      const evalResult = evaluateFormula(expression, MOCK_VALUES);
      setResult(evalResult);
      setError(evalResult === null ? "Evaluation returned null (check metric IDs)" : null);
    }, 500);

    return () => clearTimeout(timer);
  }, [expression]);

  const handleMetricSelect = (metric: any) => {
    setExpression(prev => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + metric.id);
  };

  return (
    <div className="formula-builder">
      <div className="fb-header">
        <h3>Custom Formula Builder</h3>
        <button className="tool-btn" onClick={() => alert('Saved!')}>Save KPI</button>
      </div>

      <div className="fb-content">
        <MetricSelector onSelect={handleMetricSelect} />
        
        <div className="fb-main">
          <FormulaEditor 
            expression={expression} 
            onChange={setExpression} 
            error={error}
          />
          
          <FormulaPreview 
            result={result} 
          />
        </div>
      </div>
    </div>
  );
};

export default FormulaBuilder;
