import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  const [login, setLogin] = useState(''); //Хранение значения поля "Логин"
  const [password, setPassword] = useState(''); //Хранение значения поля "Пароль"
  const [loading, setLoading] = useState(false); //Показывает, выполняется ли запрос (нужен для блокировки кнопки)
  const [error, setError] = useState(''); //Хранит сообщение об ошибке, если авторизация не удалась

  const onSubmit = async (e) => {
    e.preventDefault(); //Предотвращение перезагрузки страницы
    setLoading(true); //Показ индикатора загрузки
    setError(''); //Очистка предыдущих ошибок

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //Указание, что шлем JSON
        },
        body: JSON.stringify({ login, password }), //Преобразование данных в строку
      });

      if (!response.ok) {
        const message = await response.text(); //Получение 
        throw new Error(message || 'Ошибка авторизации');
      }

      const data = await response.json();
      alert(`Добро пожаловать, ${data.userName || 'пользователь'}!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h1>Авторизация</h1>
        <div className="form-group">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;