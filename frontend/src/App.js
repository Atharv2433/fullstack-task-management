import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminUsers from './components/AdminUsers';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/tasks/new" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/tasks/edit/:id" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/admin/users" element={isAuthenticated && isAdmin ? <AdminUsers /> : <Navigate to="/dashboard" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
