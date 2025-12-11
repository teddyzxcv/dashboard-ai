import React, { useState, useMemo } from 'react';
import CompetencyMatrix from './CompetencyMatrix';
import CompetencyRadar from './CompetencyRadar';
import MetricTooltip from './MetricTooltip';
import { getMockCompetencyData } from '../../data/mockData';
import type { CompetencyWeights } from '../../data/mockData';

const CompetencySection: React.FC = () => {
  const [data] = useState(getMockCompetencyData());
  const [weights, setWeights] = useState<CompetencyWeights>(data.defaultWeights);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const handleWeightChange = (key: keyof CompetencyWeights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  // 1. Calculate SkillScores
  const skillsWithScores = useMemo(() => {
    return data.skills.map(skill => {
      const score = 
        weights.KD * skill.KD +
        weights.KB * skill.KB +
        weights.TC * skill.TC +
        weights.PFN * skill.PFN;
      
      return {
        ...skill,
        calculatedScore: score,
        gapIndex: skill.SEL - score
      };
    });
  }, [data.skills, weights]);

  // 2. Calculate Aggregates (Maturity Index)
  const averages = useMemo(() => {
    const sum = skillsWithScores.reduce((acc, skill) => ({
      KD: acc.KD + skill.KD,
      KB: acc.KB + skill.KB,
      TC: acc.TC + skill.TC,
      PFN: acc.PFN + skill.PFN,
      calculatedScore: acc.calculatedScore + skill.calculatedScore
    }), { KD: 0, KB: 0, TC: 0, PFN: 0, calculatedScore: 0 });

    const count = skillsWithScores.length;
    return {
      KD: sum.KD / count,
      KB: sum.KB / count,
      TC: sum.TC / count,
      PFN: sum.PFN / count,
      calculatedScore: sum.calculatedScore / count
    };
  }, [skillsWithScores]);

  const maturityIndex = (averages.calculatedScore * data.rif).toFixed(2);

  // Prepare Radar Data
  // If a skill is selected, show that skill's data. Otherwise show averages.
  const radarDataSource = selectedSkillId 
    ? skillsWithScores.find(s => s.id === selectedSkillId) 
    : averages;

  const radarData = radarDataSource ? {
    KD: radarDataSource.KD,
    KB: radarDataSource.KB,
    TC: radarDataSource.TC,
    PFN: radarDataSource.PFN,
    // Add SkillScore as 5th dimension to make it a pentagon
    Score: 'calculatedScore' in radarDataSource ? radarDataSource.calculatedScore : 0
  } : { KD: 0, KB: 0, TC: 0, PFN: 0, Score: 0 };

  const radarLabels = {
    KD: 'KD (Depth)',
    KB: 'KB (Breadth)',
    TC: 'TC (Complexity)',
    PFN: 'PFN (Feedback)',
    Score: 'Skill Score'
  };

  return (
    <div className="competency-section">
      <div className="section-header">
        <h3>Карта компетенций</h3>
        <div className="maturity-badge">
          <span>Maturity Index: <strong>{maturityIndex}</strong></span>
          <MetricTooltip text="Average(SkillScore) * RIF (Role Impact)" />
        </div>
      </div>

      <div className="competency-controls">
        <div className="control-group">
          <label>Настройка весов (Global):</label>
          <div className="weights-display">
            {Object.entries(weights).map(([key, val]) => (
              <div key={key} className="weight-item">
                <span>{key}: {val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="formula-display">
          <code>Score = {weights.KD}*KD + {weights.KB}*KB + {weights.TC}*TC + {weights.PFN}*PFN</code>
        </div>
      </div>

      <div className="competency-content">
        {/* Left: Matrix */}
        <div className="competency-left">
          <CompetencyMatrix 
            skills={data.skills} 
            weights={weights} 
            onWeightChange={handleWeightChange}
            isEditable={true}
            onSkillSelect={setSelectedSkillId}
            selectedSkillId={selectedSkillId}
          />
          
          <div className="ai-insight-box">
            <div className="ai-header">
              <span className="ai-icon">✨</span>
              <h4>AI Recommendation</h4>
            </div>
            <p>
              На основе <strong>GapIndex</strong> равного {skillsWithScores[0].gapIndex.toFixed(2)} для Python, 
              рекомендуется назначать более сложные задачи (TC) для повышения глубины знаний (KD).
            </p>
          </div>
        </div>

        {/* Right: Radar */}
        <div className="competency-right">
          <div className="chart-title">
            {selectedSkillId 
              ? `Профиль: ${skillsWithScores.find(s => s.id === selectedSkillId)?.name}` 
              : 'Усредненный профиль сотрудника'}
          </div>
          <CompetencyRadar 
            data={radarData as any} 
            labels={radarLabels}
            maxValue={1}
            size={320}
          />
          <div className="chart-legend">
             {/* Legend placeholder */}
          </div>
        </div>
      </div>

      <div className="metrics-explanation">
         <h4>Справочник метрик</h4>
         <div className="metrics-grid">
           <div className="metric-card">
             <strong>KD (Knowledge Depth)</strong>
             <p>Глубина знаний технологии. Оценивается по сложности решенных задач.</p>
           </div>
           <div className="metric-card">
             <strong>KB (Knowledge Breadth)</strong>
             <p>Ширина кругозора. Количество смежных технологий.</p>
           </div>
           <div className="metric-card">
             <strong>TC (Task Complexity)</strong>
             <p>Сложность выполняемых задач (Story Points / Time).</p>
           </div>
           <div className="metric-card">
             <strong>PFN (Peer Feedback)</strong>
             <p>Оценка коллег (360 review), нормализованная.</p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default CompetencySection;

