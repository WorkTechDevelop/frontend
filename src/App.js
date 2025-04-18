import AuthView from "./pages/Auth/AuthView"
import Home from "./pages/Home/Home"
import UserProfile from "./pages/UserProfile/UserProfile"
import { Route, Routes } from 'react-router-dom';
import CreateTask from "./pages/CreateTask/CreateTask"
import Layout from "./layout/Layout"
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<AuthView />} />
        
        <Route path='/' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path='' element={<Home />} />
          <Route path='user' element={<UserProfile />} />
          <Route path='create-task' element={<CreateTask />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;