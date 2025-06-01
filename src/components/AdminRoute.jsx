import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Adjust as needed
  const isAdmin = user?.role === 'admin';

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
