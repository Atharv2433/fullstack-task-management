import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (err) {
        setError('Failed to fetch task');
      }
    };

    if (isEditing) {
      fetchTask();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isEditing) {
        await api.put(`/tasks/${id}`, { title, description, status });
        setSuccess('Task updated successfully!');
      } else {
        await api.post('/tasks', { title, description, status });
        setSuccess('Task created successfully!');
      }
      setTimeout(() => navigate('/tasks'), 1500);
    } catch (err) {
      setError('Failed to save task');
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</button>
        <button type="button" onClick={() => navigate('/tasks')}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
