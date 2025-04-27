import React from 'react';

const AuthTabs = ({ viewMode, handleViewChange, isSubmitting }) => {
  return (
    <div className="auth-tabs">
      {['login', 'register'].map(mode => (
        <button
          key={mode}
          className={`tab-button ${viewMode === mode ? 'active' : ''}`}
          onClick={() => handleViewChange(mode)}
          disabled={isSubmitting}
          aria-current={viewMode === mode ? 'page' : undefined}
        >
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs; 