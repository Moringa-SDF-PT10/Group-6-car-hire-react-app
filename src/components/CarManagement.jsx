import { useEffect, useState } from 'react';

const CarManagement = () => {
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({ make: '', model: '', pricePerDay: '' });

    useEffect(() => {
        fetch('https://group-6-car-hire-react-app.onrender.com/cars')
            .then(res => res.json())
            .then(data => setCars(data));
    }, []);

    const handleAddCar = () => {
        fetch('https://group-6-car-hire-react-app.onrender.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        }).then(() => {
            alert('Car added!');
            
        });
    };

    return (
        <div>
            <h2>Manage Cars</h2>
            <input type="text" placeholder="Make" onChange={e => setNewCar({ ...newCar, make: e.target.value })} />
            <input type="text" placeholder="Model" onChange={e => setNewCar({ ...newCar, model: e.target.value })} />
            <input type="number" placeholder="Price" onChange={e => setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })} />
            <button onClick={handleAddCar}>Add Car</button>
        </div>
    );
};

export default CarManagement;
