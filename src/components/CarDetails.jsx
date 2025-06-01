import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { getCarImage } from "../utilities/imageUtilities";
import "../index.css";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await apiGet(`/cars/${id}`);
        setCar(data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Could not load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <p className="loading-message">Loading car details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!car) return null;

  return (
    <div className="car-details-page">
      <h2>{car.make} {car.model}</h2>
      <img
        src={getCarImage(car.make, car.model)}
        alt={`${car.make} ${car.model}`}
        className="car-details-image"
      />
      <ul>
        <li><strong>Fuel Type:</strong> {car.fuelType}</li>
        <li><strong>Capacity:</strong> {car.capacity}</li>
        <li><strong>Price per Day:</strong> Kshs. {car.pricePerDay}</li>
        <li><strong>Status:</strong> {car.status}</li>
      </ul>
    </div>
  );
}

export default CarDetails;
