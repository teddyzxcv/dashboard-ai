import React from 'react';
import '../App.css';

interface LandingPageProps {
  onNavigate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">MTS Health Dashboard</h1>
          <p className="hero-subtitle">
            Visualize organizational health, explore team hierarchies, and identify key performance metrics in real-time.
          </p>
          <button onClick={onNavigate} className="cta-button">
            View Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🕸️</div>
            <h3>Interactive Hierarchy</h3>
            <p>Navigate from the company level down to individual employees with our dynamic force-directed graph.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Health Visualization</h3>
            <p>Instantly assess performance with intuitive color-coded nodes: Green (Healthy), Yellow (Warning), Red (Critical).</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Detailed Insights</h3>
            <p>Drill down into specific units and teams to view detailed metrics, roles, and descriptions.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About the Project</h2>
          <p>
            The MTS Health Dashboard is designed to solve the challenge of visualizing complex organizational structures and their associated "health" metrics. 
            Traditional tables fail to capture the relationships and distribution of performance scores.
          </p>
          <p>
            This tool provides a modern, interactive solution that allows management to quickly identify areas of success and those needing attention.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

