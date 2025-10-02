import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  return (
    <div>
      <h2>Admin Panel - All Users</h2>
      {error && <div className="error">{error}</div>}
      <div>
        {users.map(user => (
          <div key={user.id} className="task-item">
            <h3>{user.username}</h3>
            <p>Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
