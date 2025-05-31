import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { getCarImage } from "../utilities/imageUtilities";

import "../index.css";

const carImages = import.meta.glob('../assets/*.png', { eager: true });

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await apiGet("/cars"); 
        setCars(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to load featured cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="home-container">
      <header className="header-section">
        <h1>Welcome Group 6 to Car Hire Services</h1>
        <p className="header-subtitle">Find the best car rentals at unbeatable prices!</p>
        <div className="header-actions">
          <Link to="/cars" className="home-container-btn">Browse All Cars</Link>
        </div>
      </header>

      <section className="featured-cars">
        <h2>Frequently Hired Cars</h2>
        {loading ? (
          <p className="loading-message">Loading featured cars...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="car-grid">
            {cars.map(car => (
              <div key={car.id} className="car-card">
                <img 
                  src={getCarImage(car.make, car.model)}
                  alt={`${car.make} ${car.model}`}
                  className="car-image"
                />
                <div className="car-details">
                  <h3>{car.make} {car.model}</h3>
                  <Link to={`/cars/${car.id}`} className="btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="main-footer">
        <p>© 2025 Car Hire Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;