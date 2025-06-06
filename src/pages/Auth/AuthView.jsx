import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  setAuthToken, 
  USER_LAST_NAME_KEY, 
  USER_FIRST_NAME_KEY, 
  USER_MIDDLE_NAME_KEY 
} from '../../utils/auth';
import { formFieldsConfig } from './formFields';
import { parseApiErrorResponse, loginUser, registerUser, applyApiErrorsToForm } from './authUtils';
import './AuthView.scss';
import WelcomeSection from './WelcomeSection';
import AuthFormFields from './AuthFormFields';
import AuthTabs from './AuthTabs';

const AuthView = () => {
  const [viewMode, setViewMode] = useState('login');
  const [globalError, setGlobalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const currentFields = useMemo(() => {
      return Object.entries(formFieldsConfig)
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
      defaultValues: useMemo(() => 
          currentFields.reduce((acc, { key }) => ({ ...acc, [key]: '' }), { rememberMe: false })
      , [currentFields])
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleViewChange = useCallback((newMode, prefillData = null) => {
    if (newMode !== viewMode && !isSubmitting) {
      setViewMode(newMode);
      setGlobalError('');
      clearErrors();
      const baseDefaults = newMode === 'login' ? { rememberMe: false } : {};
      const fieldDefaults = Object.entries(formFieldsConfig)
          .filter(([, config]) => config.modes.includes(newMode))
          .reduce((acc, [key]) => {
              acc[key] = prefillData && prefillData[key] ? prefillData[key] : '';
              return acc;
          }, {});
      reset({ ...baseDefaults, ...fieldDefaults });
    }
  }, [viewMode, isSubmitting, reset, clearErrors]);

  const passwordValue = watch('password');

  const onSubmit = async (formData) => {
    const isLogin = viewMode === 'login';
    setGlobalError('');
    clearErrors();

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        console.log('Login response data:', data);
        
        if (data.accessToken) {
          setAuthToken(data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }
          if (data.user) {
            const nameParts = data.user.fullName ? data.user.fullName.split(' ').filter(part => part) : [];
            if (nameParts.length >= 2) {
                localStorage.setItem(USER_LAST_NAME_KEY, nameParts[0]);
                localStorage.setItem(USER_FIRST_NAME_KEY, nameParts[1]);
                if (nameParts[2]) {
                    localStorage.setItem(USER_MIDDLE_NAME_KEY, nameParts[2]);
                } else {
                    localStorage.removeItem(USER_MIDDLE_NAME_KEY);
                }
            } else if (data.user.username) {
                localStorage.setItem(USER_FIRST_NAME_KEY, data.user.username);
                localStorage.removeItem(USER_LAST_NAME_KEY);
                localStorage.removeItem(USER_MIDDLE_NAME_KEY);
            }
          }
          navigate('/');
        } else {
          console.error('No access token in response:', data);
          setGlobalError('Ошибка авторизации: токен не получен');
        }
      } else {
        const { rememberMe, ...registerData } = formData;
        await registerUser(registerData);
        setSuccessMessage('Пользователь успешно зарегистрирован. Теперь вы можете войти.');
        handleViewChange('login', { email: registerData.email, password: registerData.password });
      }
    } catch (err) {
        let genericErrorMessage = `Ошибка ${isLogin ? 'входа' : 'регистрации'}. Пожалуйста, попробуйте еще раз.`;

        if (err instanceof Response) {
            const parsedError = await parseApiErrorResponse(err, genericErrorMessage);
            applyApiErrorsToForm(parsedError, setError, setGlobalError, currentFields, isLogin);
        } else if (err instanceof Error) {
            setGlobalError(err.message || genericErrorMessage);
        } else if (typeof err === 'string') {
            setGlobalError(err); 
        } else {
            setGlobalError(genericErrorMessage);
        }
    }
  };

  return (
    <div className="auth-page-container">
      <WelcomeSection />
      
      <div className="auth-section">
        <div className="auth-form-container">
            <AuthTabs 
              viewMode={viewMode} 
              handleViewChange={handleViewChange} 
              isSubmitting={isSubmitting} 
            />

            {globalError && !successMessage && (
               <div className="message-box general-error">{globalError}</div>
            )}
            {successMessage && (
              <div className="message-box success-message">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
                <div className="auth-form-content" key={viewMode}>
                    <AuthFormFields 
                      fields={currentFields}
                      register={register}
                      errors={errors}
                      isSubmitting={isSubmitting}
                      viewMode={viewMode}
                      passwordValue={passwordValue}
                    />

                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? 'Загрузка...' : (viewMode === 'login' ? 'Войти' : 'Зарегистрироваться')}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AuthView;