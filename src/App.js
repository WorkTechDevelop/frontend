import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import UserProfile from "./pages/UserProfile/UserProfile"


import { Route, Routes } from 'react-router-dom';
import CreateTask from "./pages/CreateTask/CreateTask"
import Layout from "./layout/Layout"

function App () {
  
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='user' element={<UserProfile />} />
          <Route path='create-task' element={<CreateTask />} />
          </Route>

      <Route path='/login' element={<Login />} />

      </Routes>
    </div>
  );
};

export default App;