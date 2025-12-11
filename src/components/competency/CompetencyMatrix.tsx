import React, { useState, useEffect } from 'react';
import MetricTooltip from './MetricTooltip';
import type { SkillData, CompetencyWeights } from '../../data/mockData';

interface CompetencyMatrixProps {
  skills: SkillData[];
  weights: CompetencyWeights;
  onWeightChange: (key: keyof CompetencyWeights, value: number) => void;
  isEditable?: boolean; // If true, allows editing weights directly in headers (optional, for management)
  onSkillSelect?: (skillId: string) => void;
  selectedSkillId?: string | null;
}

// Inner component to handle input state
const WeightInput: React.FC<{ 
  value: number; 
  onChange: (val: number) => void 
}> = ({ value, onChange }) => {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    // Only update text from props if it differs numerically to avoid overriding user typing (e.g. "0.")
    // But if props changed significantly from outside, we should sync.
    // parseFloat("") is NaN.
    if (parseFloat(text) !== value && text !== "" && text !== "0." && text !== "0.0" && text !== "0.00") {
       setText(String(value));
    }
  }, [value, text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setText(newVal);

    const parsed = parseFloat(newVal);
    if (!isNaN(parsed)) {
      if (parsed >= 0 && parsed <= 1) {
         onChange(parsed);
      }
    }
  };

  return (
    <input 
      type="number" 
      step="0.001" 
      min="0" 
      max="1" 
      value={text}
      onChange={handleChange}
      className="weight-input"
    />
  );
};

const CompetencyMatrix: React.FC<CompetencyMatrixProps> = ({ 
  skills, 
  weights,
  onWeightChange,
  isEditable = false,
  onSkillSelect,
  selectedSkillId
}) => {
  // Helper to calculate score (duplicating logic for display, but main logic should be centralized or passed down)
  const calculateScore = (skill: SkillData) => {
    return (
      weights.KD * skill.KD +
      weights.KB * skill.KB +
      weights.TC * skill.TC +
      weights.PFN * skill.PFN
    ).toFixed(2);
  };

  const calculateGap = (skill: SkillData) => {
    const score = parseFloat(calculateScore(skill));
    return (skill.SEL - score).toFixed(2);
  };

  const metrics = [
    { key: 'KD', label: 'KD', name: 'Knowledge Depth' },
    { key: 'KB', label: 'KB', name: 'Knowledge Breadth' },
    { key: 'TC', label: 'TC', name: 'Task Complexity' },
    { key: 'PFN', label: 'PFN', name: 'Peer Feedback' },
  ] as const;

  return (
    <div className="competency-matrix">
      <table className="competency-table">
        <thead>
          <tr>
            <th>Навык</th>
            {metrics.map(m => (
              <th key={m.key}>
                <div className="th-content">
                  <span>{m.label}</span>
                  <MetricTooltip text={m.name} />
                  {isEditable && (
                    <div className="weight-input-container">
                       <span className="weight-label">w:</span>
                       <WeightInput 
                         value={weights[m.key as keyof CompetencyWeights]}
                         onChange={(val) => onWeightChange(m.key as keyof CompetencyWeights, val)}
                       />
                    </div>
                  )}
                </div>
              </th>
            ))}
            <th>
              <div className="th-content">
                <span>SkillScore</span>
                <MetricTooltip text="0.4*KD + 0.3*KB + 0.2*TC + 0.1*PFN" />
              </div>
            </th>
            <th>
              <div className="th-content">
                <span>GapIndex</span>
                <MetricTooltip text="SEL (Target) - SkillScore" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map(skill => {
            const score = calculateScore(skill);
            const gap = parseFloat(calculateGap(skill));
            return (
              <tr 
                key={skill.id} 
                onClick={() => onSkillSelect && onSkillSelect(skill.id)}
                className={selectedSkillId === skill.id ? 'selected-row' : ''}
                style={{ cursor: onSkillSelect ? 'pointer' : 'default', backgroundColor: selectedSkillId === skill.id ? 'rgba(229, 57, 53, 0.1)' : undefined }}
              >
                <td className="font-medium">{skill.name}</td>
                <td>{skill.KD}</td>
                <td>{skill.KB}</td>
                <td>{skill.TC}</td>
                <td>{skill.PFN}</td>
                <td>
                  <span className={`score-badge ${parseFloat(score) > 0.6 ? 'green' : 'yellow'}`}>
                    {score}
                  </span>
                </td>
                <td>
                  <span style={{ color: gap > 0.1 ? '#d32f2f' : '#2e7d32' }}>
                    {gap > 0 ? `+${gap.toFixed(2)}` : gap.toFixed(2)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompetencyMatrix;
