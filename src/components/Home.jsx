import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../api";


function Home() {
  const [cars, setCars] = useState([]);
useEffect(() => {
  const fetchCars = async () => {
    try {
      const data = await apiGet("/cars"); 
      setCars(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching cars:", error); 
    }
  };

  fetchCars();
}, []);


  return (
    <div>
      <header>
        <h1>Welcome to Car Hire Services</h1>
        <p>Find the best car rentals at unbeatable prices!</p>
        <Link to="/cars"><button>View Cars</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </header>

      <section>
        <h2>Frequently hired Cars</h2>
        <ul>
          {cars.map(car => (
            <li key={car.id}>{car.make} - {car.model}</li>
          ))}
        </ul>
      </section>

      <footer>
        <p>© 2025 Car Hire Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
