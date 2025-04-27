import React from 'react';
import { render, screen } from '@testing-library/react';
import WelcomeSection from '../pages/Auth/WelcomeSection';

// Mock SVG component imports
// Jest doesn't handle SVG imports like webpack/browser does
// We mock the object with ReactComponent property
jest.mock('../pages/Auth/icons/scale.svg', () => ({
  ReactComponent: () => <svg data-testid="scale-icon" />
}));
jest.mock('../pages/Auth/icons/group.svg', () => ({
  ReactComponent: () => <svg data-testid="group-icon" />
}));
jest.mock('../pages/Auth/icons/security.svg', () => ({
  ReactComponent: () => <svg data-testid="security-icon" />
}));

describe('WelcomeSection Component', () => {
  test('renders main heading and subtitle', () => {
    render(<WelcomeSection />);
    
    // Check for heading
    const headingElement = screen.getByRole('heading', { name: /welcome worktask/i, level: 1 });
    expect(headingElement).toBeInTheDocument();

    // Check for subtitle (using text match as it's a <p>)
    const subtitleElement = screen.getByText(/эффективное управление задачами/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders all feature items with icons and text', () => {
    render(<WelcomeSection />);

    // Feature 1
    expect(screen.getByTestId('scale-icon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /быстрое создание задач/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/повышайте эффективность и скорость/i)).toBeInTheDocument();

    // Feature 2
    expect(screen.getByTestId('group-icon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /командная работа/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/быстрая адаптация, интуитивный интерфейс/i)).toBeInTheDocument();

    // Feature 3
    expect(screen.getByTestId('security-icon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /безопасность данных/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/защита информации на корпоративном уровне/i)).toBeInTheDocument();
  });
}); 