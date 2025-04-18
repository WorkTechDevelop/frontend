import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils/auth';
import { API_ENDPOINTS } from '../../config/api';
import { formFieldsConfig } from './formFields';
import { parseApiErrorResponse } from './authUtils';
import { ReactComponent as SpeedIcon } from './icons/scale.svg'; 
import { ReactComponent as TeamIcon } from './icons/group.svg';   
import { ReactComponent as SecurityIcon } from './icons/security.svg';
import { ReactComponent as GroupIcon } from './icons/manAvatar.svg';
import './AuthView.scss';

const allFieldsConfig = formFieldsConfig;
 
const getAutocompleteValue = (key, viewMode) => {
  switch (key) {
    case 'email':
      return 'email';
    case 'password':
      return viewMode === 'login' ? 'current-password' : 'new-password';
    case 'confirmPassword':
      return 'new-password';
    case 'lastName':
      return 'family-name';
    case 'firstName':
      return 'given-name';
    case 'middleName':
      return 'additional-name';
    default:
      return 'off';
  }
};

const AuthView = () => {
  const [viewMode, setViewMode] = useState('login');
  const navigate = useNavigate();

  const currentFields = useMemo(() => {
      return Object.entries(allFieldsConfig)
          .filter(([, config]) => config.modes.includes(viewMode))
          .map(([key, config]) => ({ key, config }));
  }, [viewMode]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch
  } = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {}
  });

  useEffect(() => {
    const initialData = currentFields.reduce((acc, { key }) => ({ ...acc, [key]: '' }), {});
    if (viewMode === 'login') {
        initialData.rememberMe = false; 
    }
    reset(initialData);
  }, [viewMode, reset, currentFields]);

  const passwordValue = watch('password');

  const onSubmit = async (formData) => {
    const isLogin = viewMode === 'login';
    const endpoint = isLogin ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;
    let body;
    const { rememberMe, ...submitData } = formData; 

    if (isLogin) {
      body = JSON.stringify({ username: submitData.email, password: submitData.password });
    } else {
      body = JSON.stringify(submitData);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: body,
      });

      if (!response.ok) {
         throw response;
      }

      if (isLogin) {
          const data = await response.json();
          setAuthToken(data.jwtToken);
          if (data.username) {
            const [lastName, firstName, middleName] = data.username.split(' ');
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('middleName', middleName);
          }
          navigate('/');
      } else {
          setViewMode('login'); 
          reset(); 
      }

    } catch (err) {
        let errorMessageOrObject = 'Произошла ошибка';
        if (err instanceof Error) {
            errorMessageOrObject = err.message;
        } else if (err instanceof Response) {
            errorMessageOrObject = await parseApiErrorResponse(err, `Ошибка ${isLogin ? 'входа' : 'регистрации'}`);
        } else if (typeof err === 'string') {
            errorMessageOrObject = err;
        }

        if (typeof errorMessageOrObject === 'object' && errorMessageOrObject !== null) {
            Object.entries(errorMessageOrObject).forEach(([fieldName, message]) => {
                const fieldExists = currentFields.some(({ key }) => key === fieldName);
                if (fieldExists) {
                    setError(fieldName, { type: 'server', message });
                } else {
                     setError('root.serverError', { type: 'server', message: `${fieldName}: ${message}` });
                }
            });
        } else {
            setError('root.serverError', { type: 'server', message: errorMessageOrObject });
        }
    } 
  };

  return (
    <div className="auth-page-container">
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

        <div className="auth-section">
            <div className="quote-section">
                <GroupIcon className="quote-avatar"/>
                <div className="quote-text">
                    <p>"WorkTask нам показал, что всё гениальное - просто"</p>
                    <span>Команда разработки</span>
                </div>
            </div>

            <div className="auth-form-container">
                <div className="auth-tabs">
                    {['login', 'register'].map(mode => (
                        <button
                        key={mode}
                        className={`tab-button ${viewMode === mode ? 'active' : ''}`}
                        onClick={() => setViewMode(mode)} 
                        disabled={isSubmitting}
                        >
                        {mode === 'login' ? 'Вход' : 'Регистрация'}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    {currentFields.map(({ key, config }) => (
                        <div className="form-group-wrapper" key={key}>
                        <label htmlFor={key}>{config.label}:</label>
                        <input
                            type={config.type}
                            id={key}
                            placeholder={config.placeholder}
                            disabled={isSubmitting}
                            autoComplete={getAutocompleteValue(key, viewMode)}
                            {...register(key, {
                                required: config.required ? `${config.label} не может быть пустым` : false,
                                ...(config.type === 'email' && { 
                                    pattern: { 
                                        value: /\S+@\S+\.\S+/,
                                        message: "Некорректный формат email"
                                    }
                                }),
                                ...(key === 'confirmPassword' && {
                                    validate: value =>
                                        value === passwordValue || "Пароли не совпадают"
                                })
                            })}
                        />
                        {errors[key] && <div className="error-message">{errors[key].message}</div>}
                        </div>
                    ))}
                    {viewMode === 'login' && (
                        <div className="login-options">
                            <div className="remember-me">
                                <input 
                                    type="checkbox" 
                                    id="rememberMe" 
                                    disabled={isSubmitting}
                                    {...register('rememberMe')} 
                                />
                                <label htmlFor="rememberMe">Запомнить меня</label>
                            </div>
                        </div>
                    )}

                    {errors.root?.serverError && <div className="error-message general-error">{errors.root.serverError.message}</div>}
                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? 'Загрузка...' : (viewMode === 'login' ? 'Войти' : 'Зарегистрироваться')}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default AuthView;