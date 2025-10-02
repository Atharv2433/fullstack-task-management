import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <Link to="/tasks/new">
        <button>Add New Task</button>
      </Link>
      {error && <div className="error">{error}</div>}
      <div>
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
            <Link to={`/tasks/edit/${task.id}`}>
              <button>Edit</button>
            </Link>
            <button className="danger" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
