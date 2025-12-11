import type { SimulationContext } from './types';
import { MOCK_HISTORY } from './mockMetrics';

// Helper functions available in the formula
const helpers = {
  // Normalize x to 0..1 range based on min/max
  norm: (x: number, min: number, max: number) => {
    if (x <= min) return 0;
    if (x >= max) return 1;
    return (x - min) / (max - min);
  },
  
  // Invert a 0..1 value (1 - x)
  invert: (x: number) => 1 - x,
  
  // Conditional (renamed to avoid reserved keyword conflict)
  ifelse: (condition: boolean | number, a: number, b: number) => (condition ? a : b),
  
  // Simple trend mock: returns a multiplier 0.9 - 1.1 based on "history"
  trend: (metricId: string) => {
    // In a real app, this would calculate slope of history
    // For mock, we'll just check if the last value > avg of history
    const history = MOCK_HISTORY[metricId];
    if (!history || history.length < 2) return 1.0;
    
    const current = history[history.length - 1];
    const prev = history[history.length - 2];
    
    if (current > prev) return 1.05; // Improving/Growing
    if (current < prev) return 0.95; // Declining
    return 1.0;
  },

  avg: (...args: number[]) => args.reduce((a, b) => a + b, 0) / args.length,
  min: (...args: number[]) => Math.min(...args),
  max: (...args: number[]) => Math.max(...args)
};

export const validateFormula = (expression: string): string | null => {
  // Check for balanced parentheses
  let balance = 0;
  for (const char of expression) {
    if (char === '(') balance++;
    if (char === ')') balance--;
    if (balance < 0) return "Unbalanced parentheses";
  }
  if (balance !== 0) return "Unbalanced parentheses";

  // Check for unknown tokens (simplistic check)
  // Ideally, we'd use a real parser. Here we just ensure used IDs exist.
  // This is a loose check for the prototype.
  return null;
};

export const evaluateFormula = (expression: string, context: SimulationContext): number | null => {
  try {
    // 1. Replace metric IDs with their values from context
    // We sort keys by length desc to avoid replacing substrings of other keys
    const sortedKeys = Object.keys(context).sort((a, b) => b.length - a.length);
    
    let parsedExpression = expression;
    
    sortedKeys.forEach(key => {
      // Regex to match the key as a whole word, not part of another word
      // Handle potential special regex chars in key if needed (though IDs are usually safe)
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      
      // Safety check: only replace if we actually find a match
      if (regex.test(parsedExpression)) {
        parsedExpression = parsedExpression.replace(regex, context[key].toString());
      }
    });

    // 1b. Replace 'if(' with 'ifelse(' to handle reserved keyword
    parsedExpression = parsedExpression.replace(/\bif\s*\(/g, 'ifelse(');

    // Debugging: Log the parsed expression before execution
    // console.log("Evaluated Expression:", parsedExpression);

    // 2. Prepare function body
    // We expose helpers by destructuring them in the function scope
    const helperNames = Object.keys(helpers);
    const helperValues = Object.values(helpers);
    
    // Create a function that takes helper values and returns the eval result
    // "return 0.35 * norm(24, 0, 40) + ..."
    const func = new Function(...helperNames, `return ${parsedExpression};`);
    
    // 3. Execute
    const result = func(...helperValues);
    
    if (isNaN(result) || !isFinite(result)) {
      console.warn("Formula result is NaN or Infinite:", result);
      return null;
    }
    return result;
  } catch (err) {
    console.error("Formula evaluation error:", err);
    return null;
  }
};
