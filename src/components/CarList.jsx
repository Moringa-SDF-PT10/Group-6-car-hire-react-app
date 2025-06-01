import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { Link } from "react-router-dom";
import { getCarImage } from "../utilities/imageUtilities";
import "../index.css";

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await apiGet("/cars");
        setCars(data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div className="loading-message">Loading cars...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="car-container">
        <h1 className="page-title">Available Cars</h1>
        <div className="car-grid">
          {cars.map(car => (
            <div key={car.id} className="car-card">
              <img
                src={getCarImage(car.make, car.model)}
                alt={`${car.make} ${car.model}`}
                className="car-image"
              />
              <div>
                  {cars.length > 0 ? (
                    cars.map(car => (
                      <li key={car.id}>
                        <Link to={`/book/${car.id}`}>
                          {car.make} {car.model} – KES {car.pricePerDay}/day
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>No cars available right now.</li>
                  )}
              </div>
              <div className="car-details">
                <h3>{car.make} {car.model}</h3>
                <Link to={`/cars/${car.id}`} className="btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>    
  );
}

export default CarList;
