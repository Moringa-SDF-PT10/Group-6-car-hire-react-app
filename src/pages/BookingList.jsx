import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContextUtils";
import { getUserBookings, deleteBooking } from "../services/api";

function BookingList() {
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
        const currentBookings = data.filter(booking => 
          new Date(booking.endDate) >= new Date()
        );
        setBookings(currentBookings);
      } catch (err) {
        setError(`Failed to load current bookings: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (err) {
      setError(`Failed to cancel booking: ${err.message}`);
    }
  };

  if (!user) return <div>Please log in to view bookings</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="booking-list">
      <h2>Current Bookings</h2>
      {bookings.length === 0 ? (
        <p>No current bookings</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <p>Car ID: {booking.carId}</p>
              <p>Dates: {booking.startDate} to {booking.endDate}</p>
              <p>Total: ${booking.totalPrice}</p>
              <button onClick={() => handleCancel(booking.id)}>
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;
