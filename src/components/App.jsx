import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminChoice from './AdminChoice';
import BookingForm from './BookingForm';
import AdminRoute from './AdminRoute';
import Home from './Home';
import CarManagement from './CarManagement';
import UserManagement from './UserManagement';
import AdminLogin from './AdminLogin';
import CarList from './CarList';

function App() {
  return (
    <Router>
      <ToastContainer
       
      />

      {/* Nav bar directly in App.jsx */}
      

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
    </Router>
  );
}

export default App;
