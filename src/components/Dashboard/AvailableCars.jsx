import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../api";
import { getCarImage } from "../../utilities/imageUtilities";
import "../../index.css";

function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      try {
        const allCars = await apiGet("/cars");
        const availableCars = allCars.filter((car) => car.status === "available");
        setCars(availableCars);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars.");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  if (loading) return <p>Loading available cars...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="available-cars-container">
      <h2>Available Cars</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img
              src={getCarImage(car.make, car.model)}
              alt={`${car.make} ${car.model}`}
              className="car-image"
            />
            <div className="car-info">
              <h3>{car.make} {car.model}</h3>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Price per Day:</strong> KES {car.pricePerDay.toLocaleString()}</p>
              <button className="book-btn" onClick={() => navigate(`/book/${car.id}`)}>Book This Car</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableCars;
