import React from 'react';
import { ReactComponent as SpeedIcon } from './icons/scale.svg';
import { ReactComponent as TeamIcon } from './icons/group.svg';
import { ReactComponent as SecurityIcon } from './icons/security.svg';

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <h1>Welcome WorkTask</h1>
      <p className="subtitle">Эффективное управление задачами для вашей команды</p>
      <div className="features">
        <div className="feature-item">
          <SpeedIcon className="feature-icon" />
          <div>
            <h2>Быстрое создание задач</h2>
            <p>Повышайте эффективность и скорость, создавая задачи налету</p>
          </div>
        </div>
        <div className="feature-item">
          <TeamIcon className="feature-icon" />
          <div>
            <h2>Командная работа</h2>
            <p>Быстрая адаптация, интуитивный интерфейс</p>
          </div>
        </div>
        <div className="feature-item">
          <SecurityIcon className="feature-icon" />
          <div>
            <h2>Безопасность данных</h2>
            <p>Защита информации на корпоративном уровне</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 