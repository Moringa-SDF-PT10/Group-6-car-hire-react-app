import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/api";

function BookingHistory() {
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
        const pastBookings = data.filter(booking => 
          new Date(booking.endDate) < new Date()
        );
        setBookings(pastBookings);
      } catch (err) {
        setError(`Failed to load booking history: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return <div>Please log in to view booking history</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      {bookings.length === 0 ? (
        <p>No past bookings found</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <p>Car ID: {booking.carId}</p>
              <p>Dates: {booking.startDate} to {booking.endDate}</p>
              <p>Total: ${booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
