import { useEffect, useState } from 'react';
import { apiGet, apiPost, apiDelete } from '../api';
import { toast } from 'react-toastify';
import "../index.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: '', model: '', pricePerDay: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await apiGet('/cars');
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      toast.error("Failed to load cars.");
    }
  };

  const handleAddCar = async () => {
    if (!newCar.make.trim() || !newCar.model.trim() || Number(newCar.pricePerDay) <= 0) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    setLoading(true);
    try {
      const added = await apiPost('/cars', {
        ...newCar,
        pricePerDay: Number(newCar.pricePerDay),
      });
      setCars(prev => [...prev, added]);
      toast.success('Car added! ✅');
      setNewCar({ make: '', model: '', pricePerDay: '' });
    } catch (error) {
      toast.error('Failed to add car. ❌');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      await apiDelete(`/cars/${id}`);
      setCars(prev => prev.filter(car => car.id !== id));
      toast.success('Car deleted ✅');
    } catch (error) {
      console.error("Failed to delete car:", error);
      toast.error('Failed to delete car ❌');
    }
  };

  return (
    <div className="car-management">
      <h2>Manage Cars</h2>

      <div className="form-group">
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
          placeholder="Price per Day"
          aria-label="Price per day"
          min="0"
          value={newCar.pricePerDay}
          onChange={e => setNewCar({ ...newCar, pricePerDay: e.target.value })}
        />
        <button onClick={handleAddCar} disabled={loading}>
          {loading ? 'Adding...' : 'Add Car'}
        </button>
      </div>

      <h3>Existing Cars</h3>
      <ul className="car-list">
        {cars.map(car => (
          <li key={car.id}>
            {car.make} {car.model} - KES {car.pricePerDay.toLocaleString()}
            <button
              onClick={() => handleDeleteCar(car.id)}
              className="delete-button"
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarManagement;
