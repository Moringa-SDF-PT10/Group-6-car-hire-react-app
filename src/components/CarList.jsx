import { useEffect, useState } from "react";
import { apiGet } from "../api.jsx";
import "../index.css";

function CarList() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await apiGet("/cars"); 
        setCars(data); 
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again later.");
      }
    };

    fetchCars();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="car-container">
      <h1 className="page-title">Available Cars</h1>
      
      {cars.length === 0 ? (
        <p className="loading-message">Loading cars...</p>
      ) : (
        <div className="car-grid">
          {cars.map(car => (
            <div key={car.id} className="car-card">
              <img 
                src={`/assets/${car.make.toLowerCase()}-${car.model.toLowerCase()}.jpg`} 
                alt={`${car.make} ${car.model}`} 
                className="car-image"
              />
              <div className="car-details">
                <h3>{car.make} {car.model}</h3>
                <button className="btn-primary">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarList;