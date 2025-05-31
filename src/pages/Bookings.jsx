import { useAuth } from "./context/AuthContext";
import { fetchBookings } from "./api";
import { useState, useEffect } from "react";

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings().then(data => {
      setBookings(data.filter(b => new Date(b.endDate) > new Date()));
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Current Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}> 
              Car {booking.carId} • {booking.startDate} to {booking.endDate}
              <button>Cancel</button>
            </li>
          ))}
        </ul>
      ) : <p>No current bookings</p>}
    </div>
  );
}
