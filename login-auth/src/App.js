// import React, { useEffect, useState } from 'react';
// import "./App.css";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import CreatePage from "./CreatePage/CreatePage";
// import DashboardData from "./Dashboard/Dashboard";
// import Loginpage from "./CreatePage/Loginpage";
// import Note from "./Dashboard/Notes";
// import NoPage from "./componets/404/index"

// function App() {
//   const [isLogin, setIsLogin] = useState(false);
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setIsLogin(true)
//     }
//   }, []);
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/createAc" />} />
//           <Route path="/createAc" element={isLogin ? <Navigate to="/dashbord" /> : <CreatePage />} />
//           <Route path="/login" element={isLogin ? <Navigate to="/dashbord" /> : <Loginpage />} />

//           <Route path="/dashbord" element={!isLogin ? <Navigate to="/login" /> : <DashboardData setIsLogin={setIsLogin} />} />
//           <Route path="/notes" element={!isLogin ? <Navigate to="/login" /> : <Note />} />

//           <Route path="*" element={<NoPage />} />

//         </Routes>
//       </BrowserRouter>
//     </>);
// }




// export default App;

// Import necessary components and libraries
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreatePage from './CreatePage/CreatePage';
import DashboardData from './Dashboard/Dashboard';
import Loginpage from './CreatePage/Loginpage';
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
