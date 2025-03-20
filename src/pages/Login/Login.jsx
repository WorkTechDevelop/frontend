import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils/auth';
import { API_ENDPOINTS } from '../../config/api';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    if (!formData.email.trim()) newErrors.email = 'Email не может быть пустым';
    if (!formData.password.trim()) newErrors.password = 'Пароль не может быть пустым';
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', general: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        }),
      });

      
      if (!response.ok) {
        throw new Error(
          response.status === 400 ? 'Неверный email или пароль' :
            response.status === 404 ? 'Сервер не найден' :
              'Произошла ошибка при входе'
        );
      }

      const data = await response.json();
      setAuthToken(data.jwtToken);
      if (data.username) {
        const [lastName, firstName, middleName] = data.username.split(' ');
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('middleName', middleName);
      }

      navigate('/');
      
    } catch (err) {
      setErrors(prev => ({ ...prev, general: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h1>Авторизация</h1>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
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