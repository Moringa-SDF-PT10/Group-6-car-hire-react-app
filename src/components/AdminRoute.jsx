// AdminRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Adjust as needed
  const isAdmin = user?.role === 'admin';

  return isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
