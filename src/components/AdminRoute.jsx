import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiGet } from '../api.jsx';

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    apiGet('/auth/me')  
      .then((user) => {
        setIsAdmin(user.role === 'admin');
        setLoading(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute
