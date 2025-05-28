import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BookingForm = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupDate: '',
    returnDate: ''
  });

  const [totalPrice, setTotalCost] = useState(0);

  useEffect(() => {
    fetch(`https://group-6-car-hire-react-app.onrender.com/cars/${id}`)
      .then(response => {
        if (!response.ok) throw new Error("Car not found");
        return response.json();
      })
      .then(data => setCar(data))
      .catch(error => console.error("Error:", error));
  }, [id]);

  useEffect(() => {
    if (formData.pickupDate && formData.returnDate && car) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalCost(days * car.pricePerDay);
      } else {
        setTotalCost(0);
      }
    }
  }, [formData, car]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
        ...formData,
        carId: parseInt(id),
        totalPrice
    };

    const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    });

    if (response.ok) {
        alert('Booking successful!');
    } else {
        alert('Booking failed. Please try again.');
    }
};

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h1>Book {car.make} {car.model}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Pickup Date:</label>
          <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Return Date:</label>
          <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
        </div>
        <div>Total Price: KES {totalPrice.toLocaleString()}</div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingForm;
