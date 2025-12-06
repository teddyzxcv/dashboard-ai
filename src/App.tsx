import { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ProductTab from './components/tabs/ProductTab';
import TeamTab from './components/tabs/TeamTab';
import EmployeeTab from './components/tabs/EmployeeTab';
import './App.css';

type Tab = 'home' | 'demo' | 'product' | 'team' | 'employee';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

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
