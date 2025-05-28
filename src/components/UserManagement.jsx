import { useEffect, useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
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
