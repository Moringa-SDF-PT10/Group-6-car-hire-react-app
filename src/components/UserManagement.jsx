import { useEffect, useState } from 'react';
import { apiGet } from '../api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet('/users')
      .then(data => setUsers(data))
      .catch(error => {
        console.error("Failed to fetch users:", error);
        setError("Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
