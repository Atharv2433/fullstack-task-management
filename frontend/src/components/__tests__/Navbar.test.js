import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders navbar for unauthenticated user', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: false }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('renders navbar for authenticated user', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: true, logout: jest.fn(), user: { username: 'testuser' }, isAdmin: true }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  it('renders admin link for admin user', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: true, user: { role: 'admin' }, logout: jest.fn() }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});
