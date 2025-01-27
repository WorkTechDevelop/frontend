import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({ login: '', password: '' }); // Логин и пароль
  const [errors, setErrors] = useState({ login: '', password: '', general: '' }); // Ошибки
  const [loading, setLoading] = useState(false); // Индикатор загрузки

  const validateForm = () => {
    const newErrors = { login: '', password: '', general: '' };
    if (!formData.login.trim()) newErrors.login = 'Логин не может быть пустым'; 
    if (!formData.password.trim()) newErrors.password = 'Пароль не может быть пустым';
    setErrors(newErrors);
    return !newErrors.login && !newErrors.password; // Если ошибок нет, возвращаем true
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', general: '' })); // Сбрасываем ошибку при изменении
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Если есть ошибки, выходим

    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Неверный логин или пароль');
        } else if (response.status === 404) {
          throw new Error('Сервер не найден.');
        } else if (response.status === 500) {
          throw new Error('Внутренняя ошибка сервера. Попробуйте позже.');
        } else {
          throw new Error(`Произошла ошибка: ${response.statusText || 'Неизвестная ошибка'}`);
        }
      }

      const data = await response.json();
      alert(`Добро пожаловать, ${data.userName || 'пользователь'}!`);
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err.message })); // Сохранение ошибки в общий блок
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
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
          {errors.login && <div className="error-message">{errors.login}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        {errors.general && <div className="error-message general-error">{errors.general}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;