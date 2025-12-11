import React from 'react';

interface FormulaPreviewProps {
  result: number | null;
}

const FormulaPreview: React.FC<FormulaPreviewProps> = ({ result }) => {
  return (
    <div className="formula-preview">
      {result === null ? (
        <div style={{ color: 'var(--text-secondary)' }}>Enter a valid formula to see results</div>
      ) : (
        <>
          <div className="preview-kpi">{result.toFixed(2)}</div>
          <div className="preview-label">Calculated Score</div>
        </>
      )}
    </div>
  );
};

export default FormulaPreview;
