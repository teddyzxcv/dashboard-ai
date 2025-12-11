import React from 'react';

interface FormulaEditorProps {
  expression: string;
  onChange: (value: string) => void;
  error: string | null;
}

const FormulaEditor: React.FC<FormulaEditorProps> = ({ expression, onChange, error }) => {
  const insertText = (text: string) => {
    // Simple append for now. 
    // In a real app, we'd insert at cursor position.
    onChange(expression + text);
  };

  return (
    <div className="formula-editor-container">
      <div className="editor-tools">
        <button className="tool-btn" onClick={() => insertText(' + ')}>+</button>
        <button className="tool-btn" onClick={() => insertText(' - ')}>-</button>
        <button className="tool-btn" onClick={() => insertText(' * ')}>*</button>
        <button className="tool-btn" onClick={() => insertText(' / ')}>/</button>
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px' }} />
        <button className="tool-btn" onClick={() => insertText('norm(x, 0, 100)')}>norm</button>
        <button className="tool-btn" onClick={() => insertText('invert(x)')}>invert</button>
        <button className="tool-btn" onClick={() => insertText('if(cond, a, b)')}>if</button>
        <button className="tool-btn" onClick={() => insertText('trend(metric_id)')}>trend</button>
      </div>
      
      <textarea
        className="formula-input-area"
        value={expression}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Select metrics from the left or type formula here..."
        spellCheck={false}
      />
      
      {error && (
        <div className="error-message">
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
};

export default FormulaEditor;

