import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api'; // adjust path if needed
import { toast, ToastContainer } from 'react-toastify';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: '', model: '', pricePerDay: '' });

  useEffect(() => {
    // Fetch existing cars using centralized API function
    apiGet('/cars')
      .then(data => setCars(data))
      .catch(error => console.error("Failed to fetch cars:", error));
  }, []);

  const handleAddCar = async () => {
    try {
      await apiPost('/cars', {
        ...newCar,
        pricePerDay: Number(newCar.pricePerDay), // ensure number
      });
      toast.success('Car added! ✅');
      
      // Refresh car list after adding
      const updatedCars = await apiGet('/cars');
      setCars(updatedCars);

      // Clear input fields
      setNewCar({ make: '', model: '', pricePerDay: '' });
    } catch (error) {
      toast.error('Failed to add car. ❌');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manage Cars</h2>
      <input
        type="text"
        placeholder="Make"
        value={newCar.make}
        onChange={e => setNewCar({ ...newCar, make: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        value={newCar.model}
        onChange={e => setNewCar({ ...newCar, model: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newCar.pricePerDay}
        onChange={e => setNewCar({ ...newCar, pricePerDay: e.target.value })}
      />
      <button onClick={handleAddCar}>Add Car</button>

      <h3>Existing Cars</h3>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} - KES {car.pricePerDay.toLocaleString()}
          </li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default CarManagement;
