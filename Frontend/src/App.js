import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Feed from './components/Feed';
import LogoutButton from './components/LogoutButton';
import { AuthProvider } from './components/AuthContext';
import UserProfile from './components/UserProfile';

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="relative min-h-screen bg-gray-100">
      {!isLoginPage && <LogoutButton />}
      <Routes> 
   
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
          <Route path="/user-profile" element={<UserProfile />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
