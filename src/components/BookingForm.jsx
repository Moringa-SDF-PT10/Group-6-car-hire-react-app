import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../api'; // Adjust path if needed
import { toast } from 'react-toastify';

const BookingForm = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [allCars, setAllCars] = useState([]);
  const [formData, setFormData] = useState({
    carId: '',
    name: '',
    email: '',
    pickupDate: '',
    returnDate: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  // Load car info if ID exists or load all cars if no ID
  useEffect(() => {
    if (id) {
      apiGet(`/cars/${id}`)
        .then(data => {
          setCar(data);
          setFormData(prev => ({ ...prev, carId: data.id.toString() }));
        })
        .catch(err => {
          console.error("Error loading car:", err);
          setError("Failed to load car information.");
        });
    } else {
      apiGet('/cars')
        .then(data => setAllCars(data))
        .catch(err => {
          console.error("Error loading cars:", err);
          setError("Failed to load cars.");
        });
    }
  }, [id]);

  // Set car when carId changes (for dropdown selection)
  useEffect(() => {
    console.log("All cars:", allCars);
console.log("Selected carId from formData:", formData.carId);
  if (!id && formData.carId && allCars.length > 0) {
    const selected = allCars.find(c => c.id === Number(formData.carId));
    if (selected) {
      setCar(selected);
    } else {
      console.warn("No matching car found for ID:", formData.carId);
    }
  }
}, [formData.carId, allCars, id]);

  // Calculate total price when pickupDate, returnDate or car changes
  useEffect(() => {
  // console.log("Calculating total price...");
  // console.log("Pickup Date:", formData.pickupDate);
  // console.log("Return Date:", formData.returnDate);
  // console.log("Car:", car);

    if (!car || !formData.pickupDate || !formData.returnDate) return;

  const start = new Date(formData.pickupDate);
  const end = new Date(formData.returnDate);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    setTotalPrice(diffDays * Number(car.pricePerDay));
  } else {
    setTotalPrice(0);
  }
  }, [formData.pickupDate, formData.returnDate, car]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.carId) {
      toast.error("Please select a car.");
      return;
    }
    if (!formData.pickupDate || !formData.returnDate) {
      toast.error("Please select both pickup and return dates.");
      return;
    }

    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    if (end <= start) {
      toast.error("Return date must be after pickup date.");
      return;
    }

    try {
      await apiPost("/bookings", {
        ...formData,
        carId: parseInt(formData.carId),
        totalPrice
      });
      toast.success("Booking submitted successfully!");
      setFormData({
        carId: '',
        name: '',
        email: '',
        pickupDate: '',
        returnDate: ''
      });
      setCar(null);
      setTotalPrice(0);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Failed to submit booking.");
    }
  };

  if (error) return <div>{error}</div>;
  if (id && !car) return <div>Loading car details...</div>;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h1>Car Booking Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Car selection if no ID */}
        {!id && (
          <div>
            <label>Select Car:</label>
            <select
              name="carId"
              value={formData.carId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a car --</option>
              {allCars.map(c => (
                <option key={c.id} value={c.id}>
                  {c.make} {c.model} - KES {c.pricePerDay}/day
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Car preview if selected */}
        {car && (
          <div>
            <strong>Booking:</strong> {car.make} {car.model} – KES {car.pricePerDay}/day
          </div>
        )}

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Pickup Date:</label>
          <input
            type="date"
            name="pickupDate"
            min={today}
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Return Date:</label>
          <input
            type="date"
            name="returnDate"
            min={formData.pickupDate || today}
            value={formData.returnDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <strong>Total Price:</strong> KES {totalPrice.toLocaleString()}
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
