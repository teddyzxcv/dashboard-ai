import React, { useEffect, useRef } from 'react';
import '../App.css';
import GamepadImg from '../assets/Gamepad.png';
import BubblesImg from '../assets/WniteBubbles.png';
import GlassImg from '../assets/Glass.png';
import ZavitokImg from '../assets/Zavitok.png';

// Team Images
import NikitaImg from '../assets/nikita.jpeg';
import AlexanderImg from '../assets/alexardr.jpeg';
import PanImg from '../assets/pan.jpeg';
import EvgeniiImg from '../assets/evgenii.jpeg';
import GeorgeImg from '../assets/george.jpg';

interface LandingPageProps {
  onNavigate: () => void;
}

interface TeamMember {
  name: string;
  roleTag: string;
  roleDescription?: string;
  handle: string;
  place: string;
  image: string;
  tagColor?: string; // For specific tag styling if needed
}

const teamMembers: TeamMember[] = [
  {
    name: 'Верховод Никита',
    roleTag: 'BE',
    roleDescription: 'Backend Engineer',
    handle: '@hidlen',
    place: 'НИУ ВШЭ, MWS',
    image: NikitaImg
  },
  {
    name: 'Анисин Александр',
    roleTag: 'TW',
    roleDescription: 'Technical Writer',
    handle: '@alexanderanisin',
    place: 'НИУ ВШЭ, Т1-ИННОТЕХ',
    image: AlexanderImg
  },
  {
    name: 'Пань Чжэну',
    roleTag: 'MD',
    roleDescription: 'Mobile Developer',
    handle: '@teddyzxcv',
    place: 'НИУ ВШЭ, ЯНДЕКС',
    image: PanImg
  },
  {
    name: 'Солозобов Евгений',
    roleTag: 'BE',
    roleDescription: 'Backend Engineer',
    handle: '@grinderix',
    place: 'НИУ ВШЭ, РСХБ-ИНТЕХ',
    image: EvgeniiImg
  },
  {
    name: 'Ланин Георгий',
    roleTag: 'BE',
    roleDescription: 'Backend Engineer',
    handle: '@LaninGM',
    place: 'НИУ ВШЭ, MWS',
    image: GeorgeImg
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      container.style.setProperty('--scroll-y', `${scrollTop}px`);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container" ref={containerRef}>
      {/* Background Parallax Elements */}
      <div className="landing-background">
        <img src={GamepadImg} alt="" className="bg-gamepad" />
        <img src={BubblesImg} alt="" className="bg-bubbles" />
        <img src={GlassImg} alt="" className="bg-glass" />
        <img src={ZavitokImg} alt="" className="bg-zavitok" />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Дэшборд Здоровья МТС</h1>
          <p className="hero-subtitle">
            Визуализируйте здоровье организации, исследуйте иерархию команд и отслеживайте ключевые метрики в реальном времени.
          </p>
          <button onClick={onNavigate} className="cta-button">
            Смотреть Демо
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Ключевые Возможности</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🕸️</div>
            <h3>Интерактивная Иерархия</h3>
            <p>Навигация от уровня компании до отдельных сотрудников с помощью динамического графа.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Визуализация Здоровья</h3>
            <p>Мгновенная оценка эффективности с интуитивной цветовой кодировкой: Зеленый (Здоров), Желтый (Внимание), Красный (Критично).</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Детальная Аналитика</h3>
            <p>Детализация до конкретных подразделений и команд для просмотра подробных метрик, ролей и описаний.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">О Проекте</h2>
          <p>
            Дэшборд Здоровья МТС разработан для решения задачи визуализации сложных организационных структур и их метрик «здоровья». 
            Традиционные таблицы не позволяют охватить взаимосвязи и распределение показателей эффективности.
          </p>
          <p>
            Этот инструмент предоставляет современное интерактивное решение, позволяющее руководству быстро выявлять успешные области и зоны, требующие внимания.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Команда Проекта</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className={`role-tag ${member.roleTag.toLowerCase()}`}>
                {member.roleTag}
              </div>
              <div className="member-avatar">
                <img src={member.image} alt={member.name} />
              </div>
              <h3 className="member-name">{member.name}</h3>
              <div className="member-handle">{member.handle}</div>
              <div className="member-place">{member.place}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
