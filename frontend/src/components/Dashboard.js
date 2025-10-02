import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard, {user?.username}!</p>
      <div>
        <Link to="/tasks">
          <button>Manage Tasks</button>
        </Link>
        <Link to="/news">
          <button>View News</button>
        </Link>
        {isAdmin && (
          <Link to="/admin/users">
            <button>Admin Panel</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
