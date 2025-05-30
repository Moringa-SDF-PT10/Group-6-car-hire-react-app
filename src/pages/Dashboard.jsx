import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/api";

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await getUserBookings(user.id);
        setBookings(data);
      } catch (err) {
        setError(`Failed to load bookings: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return <div>Please log in to view dashboard</div>;
  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      
      <div className="stats">
        <h3>Total Bookings: {bookings.length}</h3>
        <h3>Recent Activity</h3>
        <ul>
          {bookings.slice(0, 3).map(booking => (
            <li key={booking.id}>
              Booked Car {booking.carId} on {booking.startDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
