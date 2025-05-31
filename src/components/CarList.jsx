import { useEffect, useState } from "react";
import { apiGet } from "../api.jsx";
function CarList() {
  const [cars, setCars] = useState([]);

   useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await apiGet("/cars"); 
        setCars(data); 
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars.");
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>Available Cars</h1>
      <ul>
  {cars.map(car => (
    <li key={car.id}>
      {car.make} - {car.model}
      <img src={`/assets/${car.make.toLowerCase()}-${car.model.toLowerCase()}.jpg`} 
           alt={`${car.make} ${car.model}`} width="300" />
    </li>
  ))}
</ul>

    </div>
  );
}

export default CarList;
