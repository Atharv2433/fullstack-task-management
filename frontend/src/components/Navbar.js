import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      <div>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}!</span>
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>
            <Link to="/tasks">
              <button>Tasks</button>
            </Link>
            <Link to="/news">
              <button>News</button>
            </Link>
            {isAdmin && (
              <Link to="/admin/users">
                <button>Admin</button>
              </Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
