import { useAuth } from "../context/authContextUtils";
import { apiGet } from "../components/api";
import { useState, useEffect } from "react";

export default function BookingHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet().then(data => {
      setBookings(data.filter(b => new Date(b.endDate) <= new Date()));
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Booking History</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              Car {booking.carId} • {booking.startDate} to {booking.endDate}
            </li>
          ))}
        </ul>
      ) : <p>No past bookings</p>}
    </div>
  );
}
