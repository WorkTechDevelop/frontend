import React, { useState, useMemo } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
// Import password logic from authUtils
import { calculatePasswordStrength, strengthLevels } from './authUtils';

// Helper to get autocomplete value (could be moved here or kept in AuthView)
const getAutocompleteValue = (key, viewMode) => {
  switch (key) {
    case 'email': return 'email';
    case 'password': return viewMode === 'login' ? 'current-password' : 'new-password';
    case 'confirmPassword': return 'new-password';
    case 'lastName': return 'family-name';
    case 'firstName': return 'given-name';
    case 'middleName': return 'additional-name';
    default: return 'off';
  }
};

// --- Password Strength Logic ---
// --- MOVED TO authUtils.js ---

const AuthFormFields = ({ 
  fields, 
  register, 
  errors, 
  isSubmitting, 
  viewMode,
  passwordValue // Needed for confirmPassword validation and strength check
}) => {
  // State for password visibility needs to be managed here now
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calculate password strength memoized (uses imported function)
  const passwordStrength = useMemo(() => {
    if (viewMode === 'register') {
      return calculatePasswordStrength(passwordValue || '');
    }
    return 0; // No indicator for login
  }, [passwordValue, viewMode]);

  // Use imported strengthLevels
  const currentStrength = strengthLevels[passwordStrength];

  return (
    <>
      {fields.map(({ key, config }) => {
        const isPasswordField = key === 'password';
        const isConfirmPasswordField = key === 'confirmPassword';
        const isPasswordType = config.type === 'password';
        let currentInputType = config.type;
        let showPasswordState = false;
        let togglePasswordVisibility = null;

        if (isPasswordField) {
          showPasswordState = showPassword;
          togglePasswordVisibility = () => setShowPassword(!showPassword);
        } else if (isConfirmPasswordField) {
          showPasswordState = showConfirmPassword;
          togglePasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
        }
        
        if (isPasswordType && showPasswordState) {
           currentInputType = 'text';
        }

        return (
          <div className="form-group-wrapper" key={key}>
            <label htmlFor={key}>{config.label}:</label>
            {config.type === 'select' ? (
              <select
                id={key} disabled={isSubmitting}
                {...register(key, { required: config.required ? `${config.label} не может быть пустым` : false })}
                className="form-select"
                aria-invalid={!!errors[key]}
              >
                {config.options?.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <div className={`input-group ${isPasswordType ? 'input-group--password' : ''}`}>
                <input
                  type={currentInputType} id={key} placeholder={config.placeholder}
                  disabled={isSubmitting} autoComplete={getAutocompleteValue(key, viewMode)}
                  aria-invalid={!!errors[key]}
                  {...register(key, {
                    required: config.required ? `${config.label} не может быть пустым` : false,
                    ...(config.type === 'email' && { pattern: { value: /\S+@\S+\.\S+/, message: "Некорректный формат email" } }),
                    ...(isConfirmPasswordField && { validate: value => value === passwordValue || "Пароли не совпадают" })
                  })}
                />
                {isPasswordType && (
                  <button
                    type="button" className="password-toggle-btn"
                    onClick={togglePasswordVisibility} disabled={isSubmitting}
                    aria-label={showPasswordState ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showPasswordState ? <FiEyeOff /> : <FiEye />}
                  </button>
                )}
              </div>
            )}
            {errors[key] && <div className="error-message">{errors[key].message}</div>}
            
            {/* Password Strength Indicator - only for password field in register mode */} 
            {key === 'password' && viewMode === 'register' && passwordValue && (
              <div className="password-strength-indicator">
                  <div className={`strength-bar ${currentStrength.colorClass}`}></div>
                  <span className={`strength-label ${currentStrength.colorClass}`}>{currentStrength.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default AuthFormFields; 