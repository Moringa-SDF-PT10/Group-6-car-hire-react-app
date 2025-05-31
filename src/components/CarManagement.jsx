import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api';
import { toast } from 'react-toastify';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: '', model: '', pricePerDay: '' });

  useEffect(() => {
    apiGet('/cars')
      .then(data => {setCars(data);
        
      })
      .catch(error => {
        console.error("Failed to fetch cars:", error);
        toast.error("Failed to load cars.");
      });
  }, []);

  const handleAddCar = async () => {
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

 
    </div>
  );
};

export default CarManagement;
