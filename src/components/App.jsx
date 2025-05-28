import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './BookingForm';
import AdminRoute from './AdminRoute';
import Home from './Home';
import CarManagement from './CarManagement';
import UserManagement from './UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookingForm />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/cars"
          element={<AdminRoute element={<CarManagement />} />}
        />
        <Route
          path="/admin/users"
          element={<AdminRoute element={<UserManagement />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
