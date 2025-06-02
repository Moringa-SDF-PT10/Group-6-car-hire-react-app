import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { getCarImage } from "../utilities/imageUtilities";
import "../index.css";

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token);

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

  const handleBrowseAll = () => {
    if (isLoggedIn) {
      navigate("/cars");
    } else {
      navigate("/login", { state: { from: "/cars" } }); 
    }
  };

  return (
    <div className="home-container">
      <header className="header-section">
        <h1>Welcome to Group 6 Car Hire Services</h1>
        <p className="header-subtitle">Find the best car rentals at unbeatable prices!</p>
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
                  <p className="pricePerDay">Kshs. {car.pricePerDay}/day</p>
                  <Link 
                    to={`/cars/${car.id}`} 
                    className="btn-outline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <button className="btn-browse"
            onClick={handleBrowseAll}
          >
            {isLoggedIn ? "Browse All Cars" : "Log In to Browse All Cars"}
          </button>
    </div>
  );
}

export default Home;