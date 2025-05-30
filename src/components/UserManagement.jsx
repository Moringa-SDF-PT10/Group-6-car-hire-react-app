import { useEffect, useState } from 'react';
import { apiGet } from '../api'; // Adjust the path if needed

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiGet('/users')
      .then(data => setUsers(data))
      .catch(error => console.error("Failed to fetch users:", error));
  }, []);

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
