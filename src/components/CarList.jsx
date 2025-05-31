import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api';

function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    apiGet('/cars')
      .then(data => setCars(data))
      .catch(err => console.error("Failed to fetch cars", err));
  }, []);

  return (
    <div>
      <h1>Select a car to book</h1>
      <ul>
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
      </ul>
    </div>
  );
}

export default CarList;
