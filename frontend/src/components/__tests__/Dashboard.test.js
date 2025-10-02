import { render, screen } from '@testing-library/react';
import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  it('renders dashboard heading', () => {
    render(
      <AuthContext.Provider value={{ user: { name: 'Test User' }, isAdmin: false }}>
        <Dashboard />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  // Add more tests for dashboard functionality as needed
});
