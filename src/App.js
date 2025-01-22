import React from 'react';
import Layout from "./layout/Layout"
import Home from "./pages/Home/Home"
import UserProfile from "./pages/UserProfile/UserProfile"
import CreateTask from "./pages/CreateTask/CreateTask"
import Login from "./pages/Login/Login"

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='user' element={<UserProfile />} />
          <Route path='create-task' element={<CreateTask />} />
          </Route>
      </Routes>

      <Route path='/login' element={<Login />} />
    </div>
  );
};

export default App;