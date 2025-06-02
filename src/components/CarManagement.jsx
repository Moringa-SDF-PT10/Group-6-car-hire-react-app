import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api';
import { toast } from 'react-toastify';
import "../index.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: '', model: '', pricePerDay: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet('/cars')
      .then(data => setCars(data))
      .catch(error => {
        console.error("Failed to fetch cars:", error);
        toast.error("Failed to load cars.");
      });
  }, []);

  const handleAddCar = async () => {
    if (!newCar.make.trim() || !newCar.model.trim() || Number(newCar.pricePerDay) <= 0) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    setLoading(true);
    try {
      await apiPost('/cars', {
        ...newCar,
        pricePerDay: Number(newCar.pricePerDay),
      });
      toast.success('Car added! ✅');

      const updatedCars = await apiGet('/cars');
      setCars(updatedCars);

      setNewCar({ make: '', model: '', pricePerDay: '' });
    } catch (error) {
      toast.error('Failed to add car. ❌');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="car-management">
      <h2>Manage Cars</h2>
      <input
        type="text"
        placeholder="Make"
        aria-label="Car make"
        value={newCar.make}
        onChange={e => setNewCar({ ...newCar, make: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        aria-label="Car model"
        value={newCar.model}
        onChange={e => setNewCar({ ...newCar, model: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        aria-label="Price per day"
        min="0"
        value={newCar.pricePerDay}
        onChange={e => setNewCar({ ...newCar, pricePerDay: e.target.value })}
      />
      <button onClick={handleAddCar} disabled={loading}>
        {loading ? 'Adding...' : 'Add Car'}
      </button>

      <h3>Existing Cars</h3>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.make} {car.model} - KES {car.pricePerDay.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarManagement;
