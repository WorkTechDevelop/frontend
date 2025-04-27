import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthFormFields from '../pages/Auth/AuthFormFields';
import { formFieldsConfig } from '../pages/Auth/formFields'; // Import real config
import * as authUtils from '../pages/Auth/authUtils';
import { strengthLevels } from '../pages/Auth/authUtils';

// Mock icons used in the component
jest.mock('react-icons/fi', () => ({
  FiEye: () => <svg data-testid="eye-icon" />, // Mock FiEye
  FiEyeOff: () => <svg data-testid="eye-off-icon" />, // Mock FiEyeOff
}));

// Use spyOn to mock only the specific function
const calculatePasswordStrengthSpy = jest.spyOn(authUtils, 'calculatePasswordStrength');

// Helper to get fields for a specific mode
const getFieldsForMode = (mode) => {
  return Object.entries(formFieldsConfig)
      .filter(([, config]) => config.modes.includes(mode))
      .map(([key, config]) => ({ key, config }));
};

// Default props setup
const defaultProps = {
  register: jest.fn((name) => ({ name: name, ref: jest.fn(), onChange: jest.fn(), onBlur: jest.fn() })), // Add onChange/onBlur for RHF
  errors: {},
  isSubmitting: false,
  viewMode: 'login', 
  passwordValue: '',
};

describe('AuthFormFields Component', () => {
  beforeEach(() => {
    // Reset and configure the spy before each test
    calculatePasswordStrengthSpy.mockImplementation((pwd) => {
      if (pwd === 'TestPass') return 3; // Actual function returns 3 for "TestPass"
      if (pwd) return 1; // Default for other non-empty in tests
      return 0;
    });
  });

  afterEach(() => {
    // Restore all mocks after each test
    jest.restoreAllMocks();
  });

  test('renders login fields correctly', () => {
    const loginFields = getFieldsForMode('login');
    render(<AuthFormFields {...defaultProps} fields={loginFields} viewMode="login" />);

    // Use more specific selectors
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument(); 
    expect(screen.getByLabelText(/^пароль:/i)).toBeInTheDocument(); // Use exact label start
    expect(screen.queryByLabelText(/фамилия/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/подтвердите пароль/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: /пол/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Weak|Medium|Good|Strong/i)).not.toBeInTheDocument();
  });

  test('renders register fields correctly', () => {
    const registerFields = getFieldsForMode('register');
    render(<AuthFormFields {...defaultProps} fields={registerFields} viewMode="register" />);

    expect(screen.getByRole('textbox', { name: /фамилия/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /имя/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /отчество/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^пароль:/i)).toBeInTheDocument(); // Use exact label start for password
    expect(screen.getByLabelText(/подтвердите пароль:/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /пол/i })).toBeInTheDocument();
  });

  test('shows password strength indicator in register mode with password value', () => {
    const registerFields = getFieldsForMode('register');
    render(<AuthFormFields 
        {...defaultProps} 
        fields={registerFields} 
        viewMode="register" 
        passwordValue="TestPass" // Spy will return 3 (index)
    />);
    // Component should get index 3 from the spy
    // Assertion uses the imported strengthLevels index 3
    expect(screen.getByText(strengthLevels[3].label)).toBeInTheDocument(); // Expecting label for index 3
  });

  test('hides password strength indicator in login mode or without password value', () => {
    const loginFields = getFieldsForMode('login');
    const registerFields = getFieldsForMode('register');
    const { rerender } = render(
      <AuthFormFields {...defaultProps} fields={loginFields} viewMode="login" passwordValue="TestPass" />
    );
    expect(screen.queryByText(/Weak|Medium|Good|Strong/i)).not.toBeInTheDocument();

    rerender(
      <AuthFormFields {...defaultProps} fields={registerFields} viewMode="register" passwordValue="" />
    );
    expect(screen.queryByText(/Weak|Medium|Good|Strong/i)).not.toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    const loginFields = getFieldsForMode('login');
    render(<AuthFormFields {...defaultProps} fields={loginFields} viewMode="login" />);
    
    // Use exact label for password input
    const passwordInput = screen.getByLabelText(/^пароль:/i);
    const toggleButton = screen.getByRole('button', { name: /показать пароль/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument(); // Eye icon visible

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(toggleButton).toHaveAttribute('aria-label', 'Скрыть пароль');
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument(); // Eye-off icon visible

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(toggleButton).toHaveAttribute('aria-label', 'Показать пароль');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument(); // Eye icon visible again
  });

  test('displays field error messages', () => {
    const loginFields = getFieldsForMode('login');
    const errors = {
      email: { type: 'required', message: 'Email обязателен' }
    };
    render(<AuthFormFields {...defaultProps} fields={loginFields} errors={errors} viewMode="login" />);

    expect(screen.getByText('Email обязателен')).toBeInTheDocument();
    // Check aria-invalid using the role and name
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveAttribute('aria-invalid', 'true');
  });

  test('disables fields when isSubmitting is true', () => {
    const loginFields = getFieldsForMode('login');
    render(<AuthFormFields {...defaultProps} fields={loginFields} viewMode="login" isSubmitting={true} />);

    // Use specific selectors
    expect(screen.getByRole('textbox', { name: /email/i })).toBeDisabled();
    expect(screen.getByLabelText(/^пароль:/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /показать пароль/i })).toBeDisabled();
  });
}); 