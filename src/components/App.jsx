import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import NewPassword from "./NewPassword";
import CarList from "./CarList";
import CarDetails from "./CarDetails";
import BookingForm from "./BookingForm";
import Dashboard from "./Dashboard/Dashboard";
import AvailableCars from "./Dashboard/AvailableCars";
import MyBookings from './Dashboard/MyBookings';
import EditProfile from "./Dashboard/EditProfile";
import RequireAuth from "./RequireAuth";
import AdminChoice from './AdminChoice';
import AdminRoute from './AdminRoute';
import CarManagement from './CarManagement';
import UserManagement from './UserManagement';
import AdminLogin from './AdminLogin';

import "../index.css";

// ✅ DEFINE Layout before App
function Layout() {
  return (
    <div className="app-layout">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </nav>

      <main className="main-content-area">
        <Outlet />
        <ToastContainer position="top-center" autoClose={3000} />
      </main>

      <footer className="main-footer">
        <p>© 2025 Car Hire Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route path="update-password/:token" element={<NewPassword />} />
          <Route path="cars" element={<CarList />} />
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="book/:id" element={<BookingForm />} />

          {/* Protected Dashboard Routes */}
          <Route path="dashboard" element={<RequireAuth role="user"><Dashboard /></RequireAuth>}>
            <Route index element={<AvailableCars />} />
            <Route path="available-cars" element={<AvailableCars />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/choice" element={<RequireAuth role="admin"><AdminChoice /></RequireAuth>} />
          <Route path="admin/cars" element={<AdminRoute><CarManagement /></AdminRoute>} />
          <Route path="admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
