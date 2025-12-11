import { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ProductTab from './components/tabs/ProductTab';
import TeamTab from './components/tabs/TeamTab';
import EmployeeTab from './components/tabs/EmployeeTab';
import easterEggImg from './assets/easter.jpeg';
import './App.css';

type Tab = 'home' | 'demo' | 'product' | 'team' | 'employee';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [eggClickCount, setEggClickCount] = useState(0);

  const handleTitleClick = () => {
    setActiveTab('home');
    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);
    
    if (newCount === 5) {
      setShowEasterEgg(true);
      setTitleClickCount(0);
      setEggClickCount(0);
    }
  };

  const handleEggClick = () => {
    const newCount = eggClickCount + 1;
    if (newCount >= 5) {
      setShowEasterEgg(false);
      setEggClickCount(0);
    } else {
      setEggClickCount(newCount);
    }
  };

  return (
    <div className="app-container">
      {showEasterEgg && (
        <div className="easter-egg-overlay" onClick={() => setShowEasterEgg(false)}>
          <img 
            src={easterEggImg} 
            alt="Easter Egg" 
            className="easter-egg-image"
            style={{ transform: `scale(${1 + eggClickCount * 0.5})` }}
            onClick={(e) => {
              e.stopPropagation();
              handleEggClick();
            }}
          />
        </div>
      )}
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={handleTitleClick}>MTS Brainpulse</div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Главная
          </button>
          <button 
            className={`nav-link ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Демо
          </button>
          <button 
            className={`nav-link ${activeTab === 'product' ? 'active' : ''}`}
            onClick={() => setActiveTab('product')}
          >
            Продукт
          </button>
          <button 
            className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Команда
          </button>
          <button 
            className={`nav-link ${activeTab === 'employee' ? 'active' : ''}`}
            onClick={() => setActiveTab('employee')}
          >
            Сотрудник
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'home' && (
          <LandingPage onNavigate={() => setActiveTab('demo')} />
        )}
        {activeTab === 'demo' && (
          <Dashboard />
        )}
        {activeTab === 'product' && (
          <ProductTab />
        )}
        {activeTab === 'team' && (
          <TeamTab />
        )}
        {activeTab === 'employee' && (
          <EmployeeTab />
        )}
      </main>
    </div>
  );
}

export default App;
