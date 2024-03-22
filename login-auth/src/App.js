import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreatePage from './CreatePage/CreatePage';
import Loginpage from './CreatePage/Loginpage';
import DashboardData from './Dashboard/Dashboard';
import Note from './Dashboard/Notes';
import NoPage from './componets/404/index';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLogin ? <Navigate to="/dashboard" /> : <Navigate to="/createAc" />}
          />
          <Route
            path="/createAc"
            element={isLogin ? <Navigate to="/dashboard" /> : <CreatePage />}
          />
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/dashboard" /> : <Loginpage setIsLogin={setIsLogin} />}
          />
          <Route path="/dashboard" element={!isLogin ? <Navigate to="/login" /> : <DashboardData setIsLogin={setIsLogin} />} />
          <Route path="/notes" element={!isLogin ? <Navigate to="/login" /> : <Note />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
