import { useEffect, useState } from "react";
import { apiGet } from "../../api";
import { getCarImage } from "../../utilities/imageUtilities";
import "../../index.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user || !user.email) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const allBookings = await apiGet("/bookings");
        const userBookings = allBookings.filter(
          (booking) => booking.email === user.email
        );

        const allCars = await apiGet("/cars");

        setBookings(userBookings);
        setCars(allCars);
      } catch (err) {
        console.error("Error fetching bookings or cars:", err);
        setError("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const getCarById = (id) => cars.find((car) => Number(car.id) === Number(id));

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have not booked any cars yet.</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => {
            const car = getCarById(booking.carId);
            return (
              <div key={booking.id} className="booking-card">
                {car ? (
                  <>
                    <img
                      src={getCarImage(car.make, car.model)}
                      alt={`${car.make} ${car.model}`}
                      className="car-image"
                    />
                    <div className="booking-info">
                      <h3>{car.make} {car.model}</h3>
                      <p><strong>Pickup Date:</strong> {booking.pickupDate}</p>
                      <p><strong>Return Date:</strong> {booking.returnDate}</p>
                      <p><strong>Total Price:</strong> KES {booking.totalPrice.toLocaleString()}</p>
                    </div>
                  </>
                ) : (
                  <p>Car info not available</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
