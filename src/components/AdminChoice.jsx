import { useNavigate } from 'react-router-dom';

const AdminChoice = () => {
  const navigate = useNavigate();

  const handleGoToUsers = () => navigate('/admin/users');
  const handleGoToCars = () => navigate('/admin/cars');

  return (
    <div>
      <h2>Welcome, Admin 👋</h2>
      <p>Choose what you want to manage:</p>
      <button onClick={handleGoToUsers}>User Management</button>
      <button onClick={handleGoToCars} style={{ marginLeft: '10px' }}>Car Management</button>
    </div>
  );
};

export default AdminChoice;
