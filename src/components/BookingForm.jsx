import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../api';
import { toast, } from 'react-toastify';

//this is my original
const BookingForm = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupDate: '',
    returnDate: ''
  });



  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    apiGet(`/cars/${id}`)
      .then(data => setCar(data))
      .catch(err => {
        console.error("Error loading car:", err);
        setError("❌ Failed to load car information.");
        toast.error("Could not load car details.");
      });
  }, [id]);

  useEffect(() => {
    if (formData.pickupDate && formData.returnDate && car) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days > 0 ? days * car.pricePerDay : 0);
    }
  }, [formData, car]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);

    if (end <= start) {
      toast.warn("Return date must be after pickup date.");
      return;
    }

    const bookingData = {
      ...formData,
      carId: parseInt(id),
      totalPrice
    };

    try {
      await apiPost('/bookings', bookingData);
      toast.success(' Booking successful!');

      setFormData({
        name: '',
        email: '',
        pickupDate: '',
        returnDate: ''
      });
    } catch (err) {
      console.error("Booking error:", err);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!car) return <div>Loading car details...</div>;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h1>Book {car.make} {car.model}</h1>
      <form onSubmit={handleSubmit}>
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
