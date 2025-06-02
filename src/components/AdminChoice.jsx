import { useNavigate } from 'react-router-dom';

const AdminChoice = () => {
  const navigate = useNavigate();

  const handleGoToUsers = () => navigate('/admin/users');
  const handleGoToCars = () => navigate('/admin/cars');

  return (
    <div className="admin-choice-container">
      <h2 className="adminDashboard">Welcome to the Admin Dashboard</h2>
      <div className="button-group">
        <button
          onClick={handleGoToUsers}
          className="admin-button user-button"
          aria-label="Manage Users"
        >
          Manage Users
        </button>
        <button
          onClick={handleGoToCars}
          className="admin-button car-button"
          aria-label="Manage Cars"
        >
          Manage Cars
        </button>
      </div>
    </div>
  );
};

export default AdminChoice;
