import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import BookingList from './pages/BookingList';
import BookingHistory from './pages/BookingHistory';
import UserProfile from './pages/UserProfile';

//Placeholders
const Home = () => <div>Home</div>; 
const Login = () => <div>Login</div>;
const Register = () => <div>Register</div>;
const PasswordReset = () => <div>PasswordReset</div>;
const CarList = () => <div>CarList</div>;


    function App () {
        return (
            <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingList /></ProtectedRoute>} />
        <Route path="/bookings/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />        
            </Routes>
        </BrowserRouter>
        );  
      
    }
    export default App;
