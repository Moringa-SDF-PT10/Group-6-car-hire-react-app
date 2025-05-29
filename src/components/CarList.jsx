import { useEffect, useState } from "react";

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://group-6-car-hire-react-app.onrender.com/cars")
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error("Error fetching cars:", error));
  }, []);

  return (
    <div>
      <h1>Available Cars</h1>
      <ul>
        {cars.map(car => (
          <li key={car.id}>{car.make} - {car.model}</li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
