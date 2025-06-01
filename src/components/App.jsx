import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminChoice from './AdminChoice';
import BookingForm from './BookingForm';
import AdminRoute from './AdminRoute';
import CarManagement from './CarManagement';
import UserManagement from './UserManagement';
import AdminLogin from './AdminLogin';
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import NewPassword from "./NewPassword";
import CarList from "./CarList";
import CarDetails from "./CarDetails";
import "../index.css";

function App() {
  return (
    <Router>    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/car" element={<CarList />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/choice" element={<AdminChoice />} />
        
        {/* Admin routes */}
        <Route
          path="/admin/cars"
          element={
            <AdminRoute>
              <CarManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      <div className="app-layout">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>

        <main className="main-content-area">
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/update-password/:token" element={<NewPassword />} />
              <Route path="/cars" element={<CarList />} />
              <Route path="/cars/:id" element={<CarDetails />} />
            </Routes>
            <ToastContainer position="top-center" autoClose={3000} />
          </>
        </main>

        <footer className="main-footer">
          <p>© 2025 Car Hire Services. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
