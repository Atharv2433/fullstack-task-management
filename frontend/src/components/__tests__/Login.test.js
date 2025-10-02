import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login';

jest.mock('axios');

describe('Login Component', () => {
  const loginMock = jest.fn();

  const renderLogin = () => render(
    <AuthContext.Provider value={{ login: loginMock }}>
      <Login />
    </AuthContext.Provider>
  );

  it('renders login form', () => {
    renderLogin();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error on empty submit', async () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('calls login function on successful submit', async () => {
    renderLogin();
    axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('fake-token');
    });
  });

  it('shows error message on failed login', async () => {
    renderLogin();
    axios.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
