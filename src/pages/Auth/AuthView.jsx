import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { 
  setAuthToken, 
  USER_LAST_NAME_KEY, 
  USER_FIRST_NAME_KEY, 
  USER_MIDDLE_NAME_KEY 
} from '../../utils/auth';
import { formFieldsConfig } from './formFields';
import { parseApiErrorResponse, loginUser, registerUser } from './authUtils';
import './AuthView.scss';
import WelcomeSection from './WelcomeSection';
import AuthFormFields from './AuthFormFields';

const allFieldsConfig = formFieldsConfig;

const AuthView = () => {
  const [viewMode, setViewMode] = useState('login');
  const [successMessage, setSuccessMessage] = useState('');
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
    clearErrors,
    reset,
    watch
  } = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onBlur',
  });

  const handleViewChange = (newMode) => {
    if (newMode !== viewMode) {
      setViewMode(newMode);
      setSuccessMessage('');
      clearErrors();
    }
  };

  useEffect(() => {
    const initialData = currentFields.reduce((acc, { key }) => ({ ...acc, [key]: '' }), {});
    if (viewMode === 'login') {
        initialData.rememberMe = false;
    }
    reset(initialData, { keepValues: false });
    setSuccessMessage('');
    clearErrors();
  }, [viewMode, reset, currentFields, clearErrors]);

  const passwordValue = watch('password');
  const onSubmit = async (formData) => {
    const isLogin = viewMode === 'login';
    setSuccessMessage('');
    clearErrors();

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        setAuthToken(data.jwtToken);
        if (data.username) {
          const [lastName, firstName, middleName] = data.username.split(' ');
          localStorage.setItem(USER_LAST_NAME_KEY, lastName);
          localStorage.setItem(USER_FIRST_NAME_KEY, firstName);
          localStorage.setItem(USER_MIDDLE_NAME_KEY, middleName);
        }
        navigate('/');
      } else {
        const { rememberMe, ...registerData } = formData;
        await registerUser(registerData);
        setSuccessMessage('Пользователь успешно зарегистрирован');
        reset();
      }

    } catch (err) {
      let errorMessage = 'Произошла неизвестная ошибка';
      let fieldErrors = null;

      if (err instanceof Response) {
        const errorData = await parseApiErrorResponse(err, null);
        if (typeof errorData === 'object' && errorData !== null) {
          fieldErrors = errorData;
          errorMessage = `Ошибка ${isLogin ? 'входа' : 'регистрации'}. Проверьте поля.`;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else {
          errorMessage = `Ошибка ${isLogin ? 'входа' : 'регистрации'} (Статус: ${err.status} ${err.statusText})`;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([fieldName, message]) => {
          const fieldExists = currentFields.some(({ key }) => key === fieldName);
          if (fieldExists) {
            setError(fieldName, { type: 'server', message });
          } else {
            errorMessage += ` (${fieldName}: ${message})`;
          }
        });
        setError('root.serverError', { type: 'server', message: errorMessage });
      } else {
        setError('root.serverError', { type: 'server', message: errorMessage });
      }
    }
  };

  return (
    <div className="auth-page-container">
      <WelcomeSection />
      
      <div className="auth-section">
        <div className="auth-form-container">
            <div className="auth-tabs">
                {['login', 'register'].map(mode => (
                    <button
                    key={mode}
                    className={`tab-button ${viewMode === mode ? 'active' : ''}`}
                    onClick={() => handleViewChange(mode)}
                    disabled={isSubmitting}
                    >
                    {mode === 'login' ? 'Вход' : 'Регистрация'}
                    </button>
                ))}
            </div>

            {errors.root?.serverError && !successMessage && (
               <div className="message-box error-message general-error">{errors.root.serverError.message}</div>
            )}
            {successMessage && (
              <div className="message-box success-message">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <AuthFormFields 
                  fields={currentFields}
                  register={register}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  viewMode={viewMode}
                  passwordValue={passwordValue}
                />

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
                        <Link 
                          to="/forgot-password" 
                          className="forgot-password-link" 
                          onClick={(e) => { if (isSubmitting) e.preventDefault(); }}
                          aria-disabled={isSubmitting}
                        >
                          Забыли пароль?
                        </Link>
                    </div>
                )}

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