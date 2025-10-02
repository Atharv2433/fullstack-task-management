import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { AuthContext } from '../../context/AuthContext';

describe('App Component', () => {
  it('renders login page for unauthenticated user', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContext.Provider value={{ isAuthenticated: false }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders dashboard for authenticated user', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContext.Provider value={{ isAuthenticated: true }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('renders task list page', () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <AuthContext.Provider value={{ isAuthenticated: true }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  });



  it('renders admin page for admin user', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthContext.Provider value={{ isAuthenticated: true, user: { role: 'admin' } }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/admin users/i)).toBeInTheDocument();
  });

  it('redirects to login for protected routes when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthContext.Provider value={{ isAuthenticated: false }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
