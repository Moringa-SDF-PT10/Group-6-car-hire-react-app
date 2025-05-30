import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import BookingForm from './BookingForm';
import AdminRoute from './AdminRoute';
import CarManagement from './CarManagement';
import UserManagement from './UserManagement';
import AdminLogin from './AdminLogin';

//import 'react-toastify/dist/ReactToastify.css';

const Home = () => (
  <div>
     <div>
      <h1>Welcome to the Car Hire System</h1>
      
      <p>Want to book a car?</p>
      <Link to="/book">
        <button>Book a Car</button>
      </Link>
    </div>
    <section>
      <h2>Admin Login</h2>
      <p>If you are an admin, please log in to manage cars and users.</p>
      <Link to="/admin/login">Admin Login</Link>
    </section>
  </div>
);

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
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
      </Routes>
    </Router>
  );
}

export default App;
