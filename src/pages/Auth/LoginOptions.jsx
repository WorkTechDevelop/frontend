import React from 'react';
import { Link } from 'react-router-dom';

const LoginOptions = ({ register, isSubmitting }) => {
  return (
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
        tabIndex={isSubmitting ? -1 : undefined} // Prevent tabbing when disabled
      >
        Забыли пароль?
      </Link>
    </div>
  );
};

export default LoginOptions; 