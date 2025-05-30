// AdminRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Replace 'user' with your actual key
  const isAdmin = user?.role === 'admin';

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
