import { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'demo'>('home');

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">MTS Dashboard</div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Demo
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'home' ? (
          <LandingPage onNavigate={() => setActiveTab('demo')} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;
