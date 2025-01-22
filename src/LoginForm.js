import React, { useState } from 'react';

const LoginForm = () => {
  // Состояние для логина, ошибки логина, пароля, ошибки пароля и загрузки
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Функция для сабмита формы
  const onSubmit = (event) => {
    event.preventDefault(); // предотвращение стандартного сабмита формы

    // Валидация логина
    if (!login.trim()) {
      setLoginError('Логин не может быть пустым');
      return;
    }

    // Валидация пароля
    if (!password.trim()) {
      setPasswordError('Пароль не может быть пустым');
      return;
    }

    // Отправка данных на сервер
    setLoading(false);
    console.log('Отправка логина:', login);
    console.log('Отправка пароля:', password);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: login, password: password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ответ не ок ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      setLoading(false);
      setLoginError('Ошибка при отправке логина');
      setPasswordError('Ошибка при отправке пароля')
    });
  };

  // Функция для изменения значения логина
  const onChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  //Функция для изменения значения пароля
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // Функция для отображения ошибки логина
  const showLoginError = () => {
    return loginError.length ? <div>{loginError}</div> : null;
  };

  //Функция для отображения ошибки пароля
  const showPasswordError = () => {
    return passwordError.length ? <div>{passwordError}</div> : null;
  };

  //Функция для отображения сообщения о загрузке
  const showLoading = () => {
    return loading ? <div className="loading">Отправка данных...</div> : null;
  };

  return (
    <form onSubmit={onSubmit}>
    <div> 
      <label htmlFor="login">Логин:</label>
      <input type="text" name="Логин" value={login} onChange={onChangeLogin} placeholder="Введите логин" required />        {showLoginError()}
    </div>

    <div>
      <label htmlFor="password">Пароль:</label>
      <input type="password" name="Пароль" value={password} onChange={onChangePassword} placeholder="Введите пароль" required />        {showPasswordError()}
    </div>

    <div>
    <button type="submit" disabled={loading}>Войти</button>
    </div>

    <div>
    {showLoading()}
    </div>
  </form>
  );
};

export default LoginForm;