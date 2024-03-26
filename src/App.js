import Registration from './components/Registration';
import Users from './components/Users';
import './App.css';
import UserContext from './contexts/UserContext';
import useFetchUsers from './hooks/useFetchUsers';
import NavBar from './components/NavBar';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

const App = () => {
  const users = useFetchUsers();
  return (
    <UserContext.Provider value={users}>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Registration />}
          />

          <Route
            path="registration"
            element={<Registration />}
          />
          <Route
            path="users"
            element={<Users />}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
