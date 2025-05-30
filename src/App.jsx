import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard.jsx';
import BookingList from './pages/BookingList.jsx';
import BookingHistory from './pages/BookingHistory.jsx';
import UserProfile from './pages/UserProfile.jsx';

const Home = () => (
  <div className='home-container' id='home-container'>
    <h1>Home</h1>
    <Link to='/login' className='login-link' id='home-login-link'>Login</Link>
  </div>
);

const Login = () => (
  <div className='login-container' id='login-container'>
    <h1>Login</h1>
    <Link to='/dashboard' className='dashboard-link' id='login-dashboard-link'>Go to Dashboard</Link>
  </div>
);

const Register = () => <div className='register-container' id='register-container'>Register</div>;
const PasswordReset = () => <div className='password-reset-container' id='password-reset-container'>Password Reset</div>;
const CarList = () => <div className='car-list-container' id='car-list-container'>Car List</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/cars' element={<CarList />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/bookings' element={<ProtectedRoute><BookingList /></ProtectedRoute>} />
        <Route path='/bookings/history' element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
