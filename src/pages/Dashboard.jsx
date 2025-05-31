import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
import { fetchBookings } from "./api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings()
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please <Link to="/login">log in</Link></div>;
  if (error) return <div>{error}</div>;

  const currentBookings = bookings.filter(b => new Date(b.endDate) > new Date());
  const pastBookings = bookings.filter(b => new Date(b.endDate) <= new Date());

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>Total Bookings: {bookings.length}</p>

      <section>
        <h2>Current Bookings ({currentBookings.length})</h2>
        {currentBookings.length > 0 ? (
          <ul>
            {currentBookings.map(booking => (
              <li key={booking.id}> 
                Car {booking.carId} • {booking.startDate} to {booking.endDate}
                <Link to={`/bookings/${booking.id}`}>View</Link>
              </li>
            ))}
          </ul>
        ) : <p>No current bookings</p>}
      </section>

      <section>
        <h2>Recent Activity</h2>
        {pastBookings.slice(0, 3).map(booking => (
          <div key={booking.id}> 
            Past booking: Car {booking.carId} • {booking.startDate}
          </div>
        ))}
      </section>

      <nav>
        <Link to="/bookings">All Bookings</Link>
        <Link to="/bookings/history">History</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}
